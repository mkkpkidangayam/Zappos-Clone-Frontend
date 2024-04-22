import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
// import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const CartPage = () => {
  document.title = "Your Bag";
  const navigate = useNavigate();
  const { userData } = useContext(myContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/get-cart/${userData._id}`
        );
        setCartItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    console.log("jjkh");
    getCart();
  }, [userData._id]);

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
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.product.price || 0) * (item.quantity || 0),
      0
    );
  };

  const placeOrder = async (userId) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const result = await axios.post(
        `http://localhost:4323/api/order/${userId}`,
        {},
        { withCredentials: true }
      );
      const paymentLink = result.data;
      window.open(paymentLink, "_blank");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Error placing order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto  px-4 pt-10 pb-14">
      <div className="flex justify-between mx-3 ">
        <h1 className="text-3xl font-bold mb-6">My Bag</h1>
        <Link
          to="/products"
          className="text-blue-700 font-semibold hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
      <hr />

      {isLoding ? (
        <LoadingSpinner />
      ) : cartItems.length === 0 ? (
        <p className="text-2xl mt-3 text-red-700 font-semibold">
          Your cart is empty!
        </p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <Link to={`/product/${item.product._id}`}>
                <img
                  src={item.product.images}
                  alt={item.product.title || ""}
                  className="w-20 h-20 object-cover mr-4"
                />
              </Link>
              <div>
                <p className="font-mono">{item.product.brand}</p>
                <Link
                  to={`/product/${item.product._id}`}
                  className="text-lg hover:underline font-semibold"
                >
                  {item.product.title}
                </Link>
                <p className="text-gray-900 text-xl font-semibold">
                  <sup>₹</sup>
                  {item.product.price.toFixed(2) || 0}
                </p>
                <p className="text-gray-500">
                  {item.size !== "One size" ? `Size: ${item.size}` : null}
                </p>
                <p className="text-gray-500">Color: {item.product.color}</p>
                <div className="flex items-center mt-2">
                  <p className="text-gray-500 ">Qty: </p>
                  <select
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="border border-gray-300 rounded-md mx-2 cursor-pointer"
                  >
                    {Array.from(
                      {
                        length: Math.min(
                          item.product.sizes.find(
                            (size) => size.size === item.size
                          )?.quantity || 0,
                          4
                        ),
                      },
                      (_, i) => i + 1
                    ).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>

                  <button
                    className="text-red-600 ml-2 hover:underline"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                    {/* <DeleteIcon /> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="sticky bottom-10 right-10 float-right">
          <p className="text-2xl text-blue-700 font-semibold">
            Total: <sup>₹</sup>
            {calculateTotal().toFixed(2)}
          </p>
          <button
            onClick={() => navigate(`/user/${userData._id}/shipping-address`)}
            className=" bg-black text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
