import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import { Axios } from "../MainPage";
import Cookies from "js-cookie";
import myContext from "../context/myContextxt";

const UserProfile = () => {
  const { orderCount } = useContext(myContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/user/profile/${userId}`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching user data", error));
  }, [userId]);

  const userAddress = userData?.address;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      {userData ? (
        <div className="w-full max-w-4xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{`Welcome, ${userData?.name}`}</h1>
            <p className="text-lg text-gray-600">{`Logged in as ${userData?.email}`}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
              <ul className="text-gray-600 capitalize">
                <li>
                  <strong>Email:</strong> {userData?.email}
                </li>
                <li>
                  <strong>Login Type:</strong> {userData?.loginType}
                </li>
                <li>
                  <strong>Join Date: </strong>
                  {new Date(userData?.createdAt).toLocaleString()}
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Addresses
              </h2>
              {userAddress && userAddress.length > 0 ? (
                userAddress.map((address, index) => (
                  <div key={address._id} className="mb-4">
                    <h3 className="font-semibold">{`Address ${index + 1}`}</h3>
                    <p>{`${address.label}: ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}</p>
                    <p>{`Phone: ${address.phoneNumber}`}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No addresses available.</p>
              )}
              {/* <a
                href="/addresses/new"
                className="text-blue-600 hover:underline"
              >
                Add a new address
              </a> */}
            </div>
          </div>
          {/* <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <p className="text-gray-600">No primary payment method set.</p>
            <a href="/payments/new" className="text-blue-600 hover:underline">
              Add a new card
            </a>
          </div> */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <Link to={`/c/${userData._id}/orders`}>
              <h2 className="text-2xl font-semibold mb-4 hover:underline">
                Order History
              </h2>
            </Link>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default UserProfile;
