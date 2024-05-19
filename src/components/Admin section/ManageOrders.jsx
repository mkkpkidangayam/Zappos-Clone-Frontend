import React, { useEffect, useState } from 'react';
import { Axios } from '../../MainPage';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await Axios.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await Axios.put(`/api/admin/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(order => order.status === statusFilter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Filter by Status:</label>
        <select
          id="statusFilter"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Order ID</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Customer Name</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Customer Email</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Total Price</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Applied Coupon</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Status</th>
            <th className="w-1/6 py-3 px-4 text-center uppercase font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {filteredOrders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="w-1/6 py-3 px-4 text-center">{order._id}</td>
              <td className="w-1/6 py-3 px-4 text-center">{order.customer.name}</td>
              <td className="w-1/6 py-3 px-4 text-center">{order.customer.email}</td>
              <td className="w-1/6 py-3 px-4 text-center">{order.totalPrice.toFixed(2)}</td>
              <td className="w-1/6 py-3 px-4 text-center">{order.appliedCoupon ==="nil" ? "--" : order.appliedCoupon}</td>
              <td className="w-1/6 py-3 px-4 text-center">
                <select
                  value={order.status}
                  onChange={(event) => handleStatusChange(event, order._id)}
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out of delivery">Out of Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="w-1/6 py-3 px-4 text-center">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  onClick={() => console.log('Delete functionality goes here')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
