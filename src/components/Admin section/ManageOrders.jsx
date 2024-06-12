import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Assets/LoadingSpinner";
import Cookies from "js-cookie";

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    Axios.get("/admin/orders", {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl text-center font-bold pb-4 border-b">
        Manage Orders
      </h1>
      <div className="my-2 ">
        <label
          htmlFor="statusFilter"
          className=" text-sm font-medium text-gray-700"
        >
          Filter by Status:
          <select
            id="statusFilter"
            className="ml-3 pl-2 border py-1 text-base border-gray-300   sm:text-sm rounded-md"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out of delivery">Out of Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </label>
      </div>
      {orders.length !== 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                NO
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Order ID
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Customer Name
              </th>
              {/* <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
              Customer Email
            </th> */}
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Order Date & Time
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Total Items
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Total Price
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Applied Coupon
              </th>
              <th className="w-auto px-2 py-4 text-center uppercase font-semibold text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredOrders?.map((order, index) => (
              <tr
                key={order._id}
                onClick={() => navigate(`/admin/order/${order._id}`)}
                className={`border-b hover:bg-slate-300 cursor-pointer`}
              >
                <td className="w-auto p-2 text-center">{index + 1}</td>
                <td className="w-auto p-2 text-center">{order._id}</td>
                <td className="w-auto p-2 text-center capitalize">
                  {order?.customer?.name}
                </td>
                {/* <td className="w-auto p-2 text-center">{order.customer.email}</td> */}
                <td className="w-auto p-2 text-center">
                  {formatDateTime(order.createdAt)}
                </td>
                {/* <td className="w-auto p-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</td> */}
                <td className="w-auto p-2 text-center">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>
                <td className="w-auto p-2 text-center">
                  {order.totalPrice.toFixed(2)}
                </td>
                <td className="w-auto p-2 text-center">
                  {order.appliedCoupon === "nil" ? "--" : order.appliedCoupon}
                </td>
                <td
                  className={`w-auto p-2 font-semibold text-center capitalize ${
                    order.status === "delivered"
                      ? "bg-green-200"
                      : order.status === "pending"
                      ? "bg-red-300"
                      : order.status === "shipped"
                      ? "bg-amber-200"
                      : order.status === "out of delivery"
                      ? "bg-yellow-200"
                      : "bg-red-200"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ManageOrders;
