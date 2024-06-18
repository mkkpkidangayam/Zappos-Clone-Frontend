import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/myContextxt";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
import Sidebar from "./Sidebar";

const ProductsListing = () => {
  const { product, isLoading, menu } = useContext(myContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("newArrivals");

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    if (product && searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      // const regex = new RegExp(lowerCaseQuery, "gi");
      const filtered = product.filter(
        (product) =>
          // [...Object.values(product)].some(
          //   (value) => value.matchAll(regex).next().done === false
          // )
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.brand.toLowerCase().includes(lowerCaseQuery) ||
          product.gender.toLowerCase().includes(lowerCaseQuery) ||
          product.category.main.toLowerCase().includes(lowerCaseQuery) ||
          product.category.sub.toLowerCase().includes(lowerCaseQuery) ||
          product.color.toLowerCase().includes(lowerCaseQuery) ||
          product.info.some((item) =>
            item.toLowerCase().includes(lowerCaseQuery)
          )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, product, menu]);

  useEffect(() => {
    if (Array.isArray(product)) {
      let sortedProducts = [...product];
      switch (sortOrder) {
        //   case "customerRating":
        //     sortedProducts.sort((a, b) => a.rating - b.rating);
        //     break;
        case "lowToHigh":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "highToLow":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          sortedProducts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
      }
      setFilteredProducts(sortedProducts);
    }
  }, [sortOrder, setFilteredProducts, product]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const productCount =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts.length
      : product && product.length > 0
      ? product.length
      : 0;

  return (
    <div className="container my-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="md:w-60 md:ml-10 mb-4 md:mb-0">
          <h1 className="font-bold text-4xl capitalize">{"Collections"}</h1>
          <p className="text-gray-600 text-center md:text-left">
            ({productCount}) items found
          </p>
        </div>
        <div className="md:w-full md:h-24 mr-7 py-5 sm:flex justify-center md:justify-end">
          <label htmlFor="sort" className="md:m-2 font-semibold">
            Sort By
            <select
              className="ml-2 p-2 rounded-xl border"
              name="sort"
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="newArrivals">New Arrivals</option>
              {/* <option value="customerRating">Customer Rating</option> */}
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:px-5">
        {/* Sidebar */}
        <div className="md:block">
          <Sidebar />
        </div>

        {/* Product listings */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="mx-auto col-span-4   ">
              <LoadingSpinner />
            </div>
          ) : filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id}
                className="block font-semibold mb-4 relative"
                to={`/product/${product._id}`}
              >
                <article className="bg-white shadow-md border flex flex-col justify-evenly lg:min-h-[550px] rounded-lg p-6 mb-4 ">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full hover:opacity-0 focus:opacity-0"
                  />
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="w-full absolute top-3 left-0 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-1000"
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
                      <span className="font-semibold">Price: </span>₹
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
          ) : (
            product.map((product) => (
              <Link
                key={product._id}
                className="block font-semibold mb-4 relative"
                to={`/product/${product._id}`}
              >
                <article className="bg-white shadow-md border flex flex-col justify-evenly min-h-[550px] rounded-lg p-6 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full hover:opacity-0"
                  />
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="w-full absolute top-3 left-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
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
                      <span className="font-semibold">Price: </span>₹
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
