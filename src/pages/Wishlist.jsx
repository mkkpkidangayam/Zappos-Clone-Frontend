import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
// import DeleteIcon from "@mui/icons-material/Delete";

const WishlistPage = () => {
  const { userData } = useContext(myContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4323/api/wishlist/${userData._id}`
        );
        setWishlist(response.data);
        setIsLoding(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [userData._id]);

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
      <h1 className="text-3xl font-bold mb-4 ">Wishlist</h1>
      <hr className="mb-3" />

      {isLoding ? (
        <p className="text-3xl font-semibold">Loding....</p>
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
                <p className="text-gray-500">${item.price}</p>
                <p className="text-gray-500">{item.category.sub}</p>

                <button
                  className="px-2 border bg-red-600 text-white rounded-md hover:bg-red-500"
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
