import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";

const CartPage = () => {
  const { userData } = useContext(myContext);
  const [cartItems, setCartItems] = useState([]);
  console.log(": ",userData._id);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/get-cart/${userData._id}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCart();
  }, [userData]);

  const updateCart = async (userId, updatedCart) => {
    try {
      const response = await axios.put(
        `http://localhost:4323/api/update-cart/${userId}`,
        updatedCart
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    updateCart(userData._id, updatedCartItems);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4323/api/remove-from-cart/${userData._id}/${itemId}`
      );
      console.log(response.data);
      const updatedCartItems = cartItems.filter(item => item.product._id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  useEffect(() => {
    setCartItems()
  })


  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <Link
                  to={`/product/${item.product._id}`}
                  className="text-lg underline font-semibold"
                >
                  {item.product.brand}, {item.product.title}
                </Link>
                <p className="text-gray-900 font-semibold">
                  ${item.product.price}
                </p>
                <p className="text-gray-500">Size: {item.size}</p>
                <div className="flex items-center mt-2">
                  <p className="text-gray-500 ">Qty: </p>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="border border-gray-300 rounded-md mx-2"
                  >
                    {Array.from(
                      {
                        length:
                          item.product.sizes.find(
                            (size) => size.size === item.size
                          )?.quantity || 0,
                      },
                      (_, i) => i + 1
                    ).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                  <button className="text-red-600 ml-2" onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <Link to="/" className="text-blue-500 hover:underline">
              Continue Shopping
            </Link>
            <div>
              <p className="text-lg font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </p>
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
