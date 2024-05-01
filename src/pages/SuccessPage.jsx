import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../MainPage";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const selectedAddressId = localStorage.getItem("selectedAddressId");
  useEffect(() => {
    Axios
      .post(`/create-order/${userId}`, {
        selectedAddressId: selectedAddressId,
      })
      .then((response) => {
        toast.success("Order processed successfully!");
        localStorage.removeItem("selectedAddressId");
      })
      .catch((error) => {
        console.error("Error processing order:", error);
      });
  }, [userId, selectedAddressId]);
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-800">
          Payment Successful!
        </h1>
        <p className="text-green-600">
          Your payment has been processed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
