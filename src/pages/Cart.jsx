import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";

const CartPage = () => {
  const {userData} = useContext(myContext)

  const userId = userData._id
  console.log(userId);

  const getCart = async() => {
    try {
      const response = await axios.get(`http://localhost:4323/api/get-cart/${userId}`)
    } catch (error) {
      
    }
  }
  const cartItems = ''


  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button className="text-gray-500 mr-2">-</button>
                  <span>{item.quantity}</span>
                  <button className="text-gray-500 ml-2">+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
            <div>
              <p className="text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
