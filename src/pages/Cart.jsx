import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";

const CartPage = () => {
  const { userData } = useContext(myContext);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

  const userId = userData._id;

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4323/api/get-cart/${userId}`);

        const cartData = response.data;
        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCart();
  }, [userId]);

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <Link to={`/product/${item.product._id}`}>
            <div key={item.product._id} className="flex items-center border-b border-gray-200 py-4">
              <img src={item.product.images} alt={item.product.name} className="w-20 h-20 object-cover mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{item.product.brand}, {item.product.title}</h2>
                <p className="text-gray-500">${item.product.price}</p>
                <div className="flex items-center mt-2">
                  <span>Size: {item.size}</span>
                  <button className="text-gray-500 mr-2">-</button>
                  <span>{item.quantity}</span>
                  <button className="text-gray-500 ml-2">+</button>
                </div>
              </div>
            </div> 
            </Link>
          ))}
          <div className="flex justify-between mt-6">
            <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
            <div>
              <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
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
