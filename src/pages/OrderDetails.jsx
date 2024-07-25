import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../MainPage";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const OrderDetails = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`/user/orders/${userId}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setLoading(false);
      });
  }, [userId]);

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FBBF24"; // Yellow
      case "processing":
        return "#3B82F6"; // Blue
      case "shipped":
        return "#8B5CF6"; // Purple
      case "out of delivery":
        return "#F97316"; // Orange
      case "delivered":
        return "#10B981"; // Green
      default:
        return "#9CA3AF"; // Gray
    }
  };

  const statusSteps = [
    { status: "pending", label: "Order Placed" },
    { status: "processing", label: "Processing" },
    { status: "shipped", label: "Shipped" },
    { status: "out of delivery", label: "Out for Delivery" },
    { status: "delivered", label: "Delivered" },
  ];

  const getStatusTimelineItems = (order) => {
    const currentStatusIndex = statusSteps.findIndex(
      (step) => step.status === order.status
    );

    return statusSteps.slice(0, currentStatusIndex + 1).map((step, index) => (
      <TimelineItem key={index}>
        <TimelineSeparator>
          <TimelineDot
            style={{ backgroundColor: getStatusColor(step.status) }}
          />
          {index < currentStatusIndex && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          {step.label} -{" "}
          {formatDateTime(
            step.status === "pending" ? order.createdAt : order.updatedAt
          )}
        </TimelineContent>
      </TimelineItem>
    ));
  };

  return (
    <div className="container md:px-10 mt-8 min-h-screen">
      <h1 className="md:text-3xl text-2xl text-center md:text-left font-bold text-emerald-800 pb-4 mb-4 border-b">
        My Orders
      </h1>

      {loading ? (
        <div className="h-screen flex justify-center">
          <LoadingSpinner />
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg md:p-4 border border-gray-200 flex-col"
            >
              <div className="md:flex md:justify-between my-2">
                <div className="mb-2 px-2">
                  <h2 className="text-xl font-semibold">Order: {index + 1}</h2>
                  <p className="text-gray-500">
                    Order Date: {formatDateTime(order.createdAt)}
                  </p>
                  <p className="text-gray-500">
                    Total Price: ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <p className={`text-gray-500 capitalize`}>
                    Status: {order.status}
                  </p>
                  {order.appliedCoupon !== "nil" && (
                    <p className="text-gray-500">
                      Applied Coupon: {order.appliedCoupon}
                    </p>
                  )}

                  <div className="lg:mt-10 my-2">
                    <h3 className="text-lg font-semibold">Shipping Address:</h3>
                    <p>{order.address?.street}</p>
                    <p>
                      {order.address?.city}, {order.address?.state} -{" "}
                      {order.address?.zipCode}
                    </p>
                    <p>Phone: {order.address?.phoneNumber}</p>
                  </div>
                </div>

                <div className="">
                  <Timeline position="alternate">
                    {getStatusTimelineItems(order)}
                  </Timeline>
                </div>
                <div className="space-y-2 lg:w-1/3 px-2">
                  <h3 className="text-lg font-semibold mb-2">Items:</h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 border border-gray-300 rounded-lg flex"
                    >
                      <Link to={`/product/${item.item._id}`}>
                        <img
                          className="w-20 h-auto mr-4 border p-2"
                          src={item.item.images[0]}
                          alt={item.item.title}
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item.item._id}`}>
                          <p className="font-medium hover:text-blue-600">
                            {item.item.title}
                          </p>
                        </Link>
                        {item.size !== "One size" && <p>Size: {item.size}</p>}
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium my-5 h-svh">No orders found!</p>
      )}
    </div>
  );
};

export default OrderDetails;
