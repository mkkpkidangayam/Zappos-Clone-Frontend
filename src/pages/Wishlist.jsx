import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myContext from "../context/myContextxt";

const WishlistPage = () => {
  const { userData } = useContext(myContext);
  const [wishlist, setWishlist] = useState([]);
  console.log(userData._id);

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
  }, [userData._id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <Link
                  to={`/product/${item._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
