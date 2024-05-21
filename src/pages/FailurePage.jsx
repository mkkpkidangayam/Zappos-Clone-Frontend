import React from "react";

const FailurePage = () => {
  document.title = "Payment Failed";
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-800">Payment Failed</h1>
        <p className="text-red-600">
          There was an issue processing your payment. Please try again later.
        </p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
