import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order details by orderId
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4323/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : order ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <p className="text-gray-500">Order Date: {new Date(order.orderTime).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index} className="mb-2">
                  <p>{item.title}</p>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Address:</h3>
            <p>{order.address.street}</p>
            <p>{order.address.city}, {order.address.state} - {order.address.zipCode}</p>
            <p>Phone: {order.address.phoneNumber}</p>
          </div>
        </div>
      ) : (
        <p>No order found with ID: {orderId}</p>
      )}
    </div>
  );
};

export default OrderDetails;
