import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
// import DeleteIcon from "@mui/icons-material/Delete";

const WishlistPage = () => {
  const { userData } = useContext(myContext);
  const [wishlist, setWishlist] = useState([]);
  console.log("Wishlist:", wishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/wishlist/${userData._id}`
        );
        setWishlist(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [userData]);

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4323/api/remove-from-wishlist/${userData._id}/${itemId}`
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
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      <hr />
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.images}
                alt={item.title}
                className="w-20 h-20 object-cover border p-2 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
                <p className="text-gray-500">{item.category.sub}</p>
                <Link
                  to={`/product/${item._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Product
                </Link>
                <button className="ml-3 text-red-600"
                onClick={() => removeFromWishlist(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
