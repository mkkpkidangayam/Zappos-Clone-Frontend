import React, { useState } from "react";
import { Axios } from "../MainPage";
import { Link } from "react-router-dom";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/forgot-password", { email });
      setMessage(response.data);
      setEmail("")
    } catch (error) {
      setMessage("Error sending reset email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="h-24 flex justify-center items-center ">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Request Password Reset
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordResetRequest;
