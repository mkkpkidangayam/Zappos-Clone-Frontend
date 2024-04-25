import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
// import DeleteIcon from "@mui/icons-material/Delete";

const WishlistPage = () => {
  const {userId} = useParams()
  const [wishlist, setWishlist] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/wishlist/${userId}`
        );
        setWishlist(response.data);
        setIsLoding(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4323/api/remove-from-wishlist/${userId}/${itemId}`
      );
      toast.success(response.data.message);
      const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error removing item from wislist:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 ">Wishlist</h1>
      <hr className="mb-3" />

      {isLoding ? (
        <LoadingSpinner />
      ) : wishlist.length === 0 ? (
        <p className="font-semibold text-blue-600 text-3xl">
          Your wishlist is empty!
        </p>
      ) : (
        <div>
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <Link to={`/product/${item._id}`} className=" hover:underline">
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-20 h-20 object-cover border p-2 mr-4"
                />
              </Link>
              <div>
                <Link to={`/product/${item._id}`} className=" hover:underline">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </Link>
                <p className="text-gray-500 font-mono">
                  <sup>₹</sup>
                  {item.price.toFixed(2)}
                </p>
                <p className="text-gray-500">Color: {item.color}</p>
                <p className="text-gray-500">{item.category.sub}</p>

                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Link className="px-2 text-blue-600 rounded-lg hover:underline" to={'/products'}>Continue Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
