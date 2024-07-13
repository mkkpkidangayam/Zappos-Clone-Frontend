import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../MainPage";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const SuccessPage = () => {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();
  const selectedAddressId = localStorage.getItem("selectedAddressId");
  const couponCode = localStorage.getItem("cpo");
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    Axios.post(`/create-order/${userId}`, {
      selectedAddressId: selectedAddressId,
      couponCode: couponCode,
    })
      .then((response) => {
        setOrderId(response.data.orderId);
        toast.success(response.data.message);
        localStorage.removeItem("selectedAddressId");
        localStorage.removeItem("cpo");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error processing order:", error);
      });
  }, [userId, selectedAddressId, couponCode]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-800">
          Payment Successful!
        </h1>
        <p className="text-green-600">
          Your payment has been processed successfully.
        </p>
        <p>OrderId: {orderId}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-teal-700 text-white rounded hover:bg-fuchsia-600"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate(`/c/${userId}/orders`)}
          className="m-4 px-4 py-2 bg-teal-700 text-white rounded hover:bg-fuchsia-600"
        >
          Go to Order
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
