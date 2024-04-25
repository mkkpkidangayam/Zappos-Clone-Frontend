import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const UserAccount = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  console.log(userData);

  useEffect(() => {
    axios
      .get(`http://localhost:4323/api/user/profile/${userId}`)
      .then((response) => {
        setUserData(response.data);

        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching userdata", error));
  }, [userId]);
  const userAddress = userData?.address;
  console.log(userAddress);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      {userData ? (
        <div className="max-w-4xl px-4 py-8 bg-white shadow-md rounded-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-center">
              {`Hello, ${userData?.name}!`}
            </h1>
            <p className="text-center text-gray-600">
              You are logged in as {userData?.email}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="px-4 py-6 bg-gray-50 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">My Account</h2>
              <p className="text-gray-600">
                You are logged in as {userData?.email}
              </p>
            </div>
            <div className="px-4 py-6 bg-gray-50 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Your Primary Account Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Primary Shipping Address</h3>
                  {userAddress && userAddress.street ? (
                    <div className="text-gray-600">
                      <p>
                        {userAddress.street}, {userAddress.city},{" "}
                        {userAddress.state}, {userAddress.zipCode}
                      </p>
                      <p>{userAddress.phoneNumber}</p>
                      {userAddress.label && (
                        <p>{`Label: ${userAddress.label}`}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">No address available</p>
                  )}
                  <a
                    href="/addresses/new"
                    className="text-blue-600 hover:underline"
                  >
                    Add a new shipping address
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold">Primary Payment Information</h3>
                  <p className="text-gray-600">No card set as primary</p>
                  <a
                    href="/payments/new"
                    className="text-blue-600 hover:underline"
                  >
                    Add a new card
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold">Name, Email & Password</h3>
                  <p className="text-gray-600">{userData?.name}</p>
                  <p className="text-gray-600">{userData?.email}</p>
                  <p className="text-gray-600">********</p>
                  <ol className="list-decimal list-inside">
                    <li>
                      <a href="/" className="text-blue-600 hover:underline">
                        Manage Account Info
                      </a>
                    </li>
                    <li>
                      <a
                        href="/subscriptions"
                        className="text-blue-600 hover:underline"
                      >
                        Manage Email Subscriptions
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Order History</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <p className="text-gray-600">Your order history is empty.</p>
            </div>
          </div>
          <div className="mt-8">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="/orders" className="text-blue-600 hover:underline">
                  View Order History
                </a>
              </li>
              <li>
                <a
                  href="/account/favorites"
                  className="text-blue-600 hover:underline"
                >
                  Favorites
                </a>
              </li>
              <li>
                <a href="/c/vip-dash" className="text-blue-600 hover:underline">
                  Rewards
                </a>
              </li>
              <li>
                <a href="/payments" className="text-blue-600 hover:underline">
                  Payment Information
                </a>
              </li>
              <li>
                <a href="/addresses" className="text-blue-600 hover:underline">
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="https://www.zappos.com/ap/cnep"
                  className="text-blue-600 hover:underline"
                >
                  Account Information
                </a>
              </li>
              <li>
                <a
                  href="/subscriptions"
                  className="text-blue-600 hover:underline"
                >
                  Subscriptions
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default UserAccount;
