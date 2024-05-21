import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../MainPage";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LoadingSpinner from "../Assets/LoadingSpinner";
import Cookies from "js-cookie";

const OrderDetailsAdmin = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`/admin/order/${orderId}`, {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    })
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setLoading(false);
      });
  }, [orderId]);

  const updateOrderStatus = async (newStatus, orderId) => {
    try {
      await Axios.put(
        `/admin/order/update/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    updateOrderStatus(newStatus, orderId);
  };

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

  //   const generatePDF = () => {
  //     const doc = new jsPDF();

  //     doc.setFontSize(20);
  //     doc.text("Receipt", 14, 22);
  //     doc.setFontSize(12);
  //     doc.text(`Order ID: ${order._id}`, 14, 32);
  //     doc.text(`Customer Name: ${order.customer.name}`, 14, 42);
  //     doc.text(`Customer Email: ${order.customer.email}`, 14, 52);
  //     doc.text(`Order Date: ${formatDateTime(order.createdAt)}`, 14, 62);
  //     doc.text(`Total Price: ₹${order.totalPrice.toFixed(2)}`, 14, 72);
  //     doc.text(
  //       `Applied Coupon: ${order.appliedCoupon === "nil" ? "--" : order.appliedCoupon}`,
  //       14,
  //       82
  //     );
  //     doc.text(`Last Updation: ${formatDateTime(order.updatedAt)}`, 14, 102);

  //     doc.text("Shipping Address:", 14, 112);
  //     doc.text(`Street: ${order.address?.street}`, 14, 122);
  //     doc.text(`City: ${order.address?.city}`, 14, 132);
  //     doc.text(`State: ${order.address?.state}`, 14, 142);
  //     doc.text(`Postal Code: ${order.address?.zipCode}`, 14, 152);
  //     doc.text(`Phone Number: ${order.address?.phoneNumber}`, 14, 162);

  //     const items = order.items.map((item, index) => [
  //       index + 1,
  //       item.item.title,
  //       `₹${item.item.price.toFixed(2)}`,
  //       item.quantity,
  //       item.size,
  //     ]);

  //     doc.autoTable({
  //       startY: 172,
  //       head: [["No", "Product Title", "Price", "Quantity", "Size"]],
  //       body: items,
  //     });

  //     doc.save(`Invoice_${order._id}.pdf`);
  //   };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    const title = "Receipt";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;

    doc.text(title, textX, 22);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 32);
    doc.text(`Customer Name: ${order.customer.name}`, 14, 42);
    doc.text(`Customer Email: ${order.customer.email}`, 14, 52);
    doc.text(`Order Date: ${formatDateTime(order.createdAt)}`, 14, 62);
    doc.text(`Total Price: ₹${order.totalPrice.toFixed(2)}`, 14, 72);
    doc.text(
      `Applied Coupon: ${
        order.appliedCoupon === "nil" ? "--" : order.appliedCoupon
      }`,
      14,
      82
    );

    doc.text("Shipping Address:", 14, 112);
    doc.text(`Street: ${order.address?.street}`, 14, 122);
    doc.text(`City: ${order.address?.city}`, 14, 132);
    doc.text(`State: ${order.address?.state}`, 14, 142);
    doc.text(`Postal Code: ${order.address?.zipCode}`, 14, 152);
    doc.text(`Phone Number: ${order.address?.phoneNumber}`, 14, 162);

    const items = order.items.map((item, index) => [
      index + 1,
      item.item._id,
      item.item.title,
      `₹${item.item.price.toFixed(2)}`,
      item.quantity,
      item.size,
    ]);

    doc.autoTable({
      startY: 172,
      head: [
        ["No", "Product Id", "Product Title", "Price", "Quantity", "Size"],
      ],
      body: items,
    });

    doc.save(`Invoice_${order._id}.pdf`);
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-200";
      case "pending":
        return "bg-red-300";
      case "shipped":
        return "bg-amber-200";
      case "out of delivery":
        return "bg-yellow-200";
      default:
        return "bg-red-200";
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center p-4">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-4">
        Order Details
      </h1>
      <hr />
      <div>
        <div className="flex justify-between my-3">
          <table className="md:w-2/5 table-auto shadow-md border-collapse ">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Order ID</td>
                <td className="border px-4 py-2">{order._id}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Customer Name
                </td>
                <td className="border px-4 py-2 capitalize">
                  {order.customer.name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Customer Email
                </td>
                <td className="border px-4 py-2">{order.customer.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Order Date</td>
                <td className="border px-4 py-2">
                  {formatDateTime(order.createdAt)}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Total Price</td>
                <td className="border px-4 py-2">
                  ₹{order.totalPrice.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Applied Coupon
                </td>
                <td className="border px-4 py-2">
                  {order.appliedCoupon === "nil" ? "--" : order.appliedCoupon}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Status</td>
                <td className="border px-2 py-2 flex justify-between">
                  <select
                    defaultValue={order.status}
                    onChange={(event) => handleStatusChange(event, order._id)}
                    className={`border border-gray-300 font-medium rounded-md py-1 px-1  ${getStatusBgColor(
                      order.status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out of delivery">Out of Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Last Updation
                </td>
                <td className="border px-4 py-2">
                  {formatDateTime(order.updatedAt)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="md:w-2/5 shadow-md p-3">
            <h2 className="text-2xl font-bold mb-2 ">Shipping Address:</h2>
            <p className="mb-2">
              <strong>Street:</strong> {order.address?.street}
            </p>
            <p className="mb-2">
              <strong>City:</strong> {order.address?.city}
            </p>
            <p className="mb-2">
              <strong>State:</strong> {order.address?.state}
            </p>
            <p className="mb-2">
              <strong>Postal Code:</strong> {order.address?.zipCode}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {order.address?.phoneNumber}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-auto p-2 text-center">No</th>
              <th className="w-auto p-2 text-center">Product Id</th>
              <th className="w-auto p-2 text-center">Product Title</th>
              <th className="w-auto p-2 text-center">Price</th>
              <th className="w-auto p-2 text-center">Quantity</th>
              <th className="w-auto p-2 text-center">Size</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="w-auto p-2 text-center">{index + 1}</td>
                <td className="w-auto p-2 text-center">
                  <Link
                    className="hover:underline hover:text-blue-600"
                    to={`/admin/manage-product/${item.item._id}`}
                  >
                    {item.item._id}
                  </Link>
                </td>
                <td className="w-auto p-2 text-center">
                  <Link
                    className="hover:underline hover:text-blue-600"
                    to={`/admin/manage-product/${item.item._id}`}
                  >
                    {item.item.title}
                  </Link>
                </td>
                <td className="w-auto p-2 text-center">
                  ₹{item.item.price.toFixed(2)}
                </td>
                <td className="w-auto p-2 text-center">{item.quantity}</td>
                <td className="w-auto p-2 text-center">
                  {item.size === "One size" ? "--" : item.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={generatePDF}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded"
        >
          Download receipt
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsAdmin;
