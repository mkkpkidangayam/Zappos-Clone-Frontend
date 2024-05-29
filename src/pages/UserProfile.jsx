import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import { Axios } from "../MainPage";
import Cookies from "js-cookie";

const UserAccount = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  console.log(userData);

  useEffect(() => {
    Axios.get(`/user/profile/${userId}`,{
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching userdata", error));
  }, [userId]);
  const userAddress = userData?.address;

  console.log(userAddress);
  // console.log(userAddress.street);

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
                  <h3 className="font-semibold">Shipping Addresses</h3>
                  {userAddress.length > 0 ? (
                    userAddress.map((address, index) => (
                      <div key={address._id} className="text-gray-800">
                        <h3 className="font-bold">Address {index + 1}</h3>
                        <p className="font-medium">
                          {`Label: ${address?.label}`}
                        </p>
                        <p>
                          {address.street}, {address.city},{address.state},{" "}
                          {address.zipCode}
                        </p>
                        <p>{address.phoneNumber}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Address not available</p>
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
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default UserAccount;
