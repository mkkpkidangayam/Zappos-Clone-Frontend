import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/myContextxt";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import Sidebar from "./Sidebar";

const ProductsListing = () => {
  const { product, isLoading } = useContext(myContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    if (product && searchQuery) {
      const filtered = product.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, product]);

  return (
    <div className="container my-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-60 ml-10 mb-4 md:mb-0">
          <div>
            <h1 className="font-bold text-2xl">Category Name</h1>
            <h2 className="text-gray-600">
              ({product ? product.length : 0}) items found
            </h2>
          </div>
        </div>
        <div className="w-full md:w-60 md:h-24 mr-7 py-5">
          <label htmlFor="sort" className=" mb-2 mr-2 font-semibold">
            Sort By
          </label>
          <select className="p-2 rounded-2xl border" name="sort" id="sort">
            <option value="relevance">Relevance</option>
            <option value="newArrivals">New Arrivals</option>
            <option value="customerRating">Customer Rating</option>
            <option value="bestSellers">Best Sellers</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 md:px-10">
        {/* Sidebar */}
        <div className="w-48 md:block">
          <Sidebar/>
        </div>

        {/* Product listings */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              <LoadingSpinner />
              <LoadingSpinner />
              <LoadingSpinner />
              <LoadingSpinner />
            </>
          ) : filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id}
                className="block font-semibold mb-4 relative"
                to={`/product/${product._id}`}
              >
                <article className="bg-white shadow-md rounded-lg p-6 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full"
                  />
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="w-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
                  />

                  <span className="block mt-2 font-semibold hover:underline mb-2">
                    {product.brand}
                  </span>
                  <span className="block  hover:underline mb-2">
                    <span className="">{product.title}</span>Grand
                  </span>
                  <p className="mb-2">
                    <span className="font-semibold">
                      Color: {product.color}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Price: </span>$
                    {product.price}
                  </p>
                  <p className="mb-2">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-yellow-500 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      5.0 out of 5 stars
                    </span>
                  </p>
                </article>
              </Link>
            ))
          ) : (
            product.map((product) => (
              <Link
                key={product._id}
                className="block font-semibold mb-4 relative"
                to={`/product/${product._id}`}
              >
                <article className="bg-white shadow-md border h-[500px] rounded-lg p-6 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full"
                  />
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="w-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
                  />
                  <div className="">
                    <span className="block mt-2 font-semibold hover:underline mb-2">
                      {product.brand}
                    </span>
                    <span className="block  hover:underline mb-2">
                      <span className="">{product.title}</span>Grand
                    </span>
                    <p className="mb-2">
                      <span className="font-semibold">
                        Color: {product.color}
                      </span>
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Price: </span>$
                      {product.price}
                    </p>
                    <p className="mb-2">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-yellow-500 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        5.0 out of 5 stars
                      </span>
                    </p>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
