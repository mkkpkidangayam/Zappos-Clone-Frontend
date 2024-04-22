import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate()
  document.title = "Payment Successful";
  const { userId } = useParams();
  useEffect(() => {
    axios
      .post(`http://localhost:4323/api/payment-success/${userId}`)
      .then((response) => {
        toast.success("Order processed successfully!");
      })
      .catch((error) => {
        console.error("Error processing order:", error);
        toast.error("Failed to process order.");
      });
  },[userId]);
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-800">
          Payment Successful!
        </h1>
        <p className="text-green-600">
          Your payment has been processed successfully.
        </p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
