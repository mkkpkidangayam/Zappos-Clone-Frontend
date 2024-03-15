import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/myContextxt";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsListing = () => {
  const { product, setProduct } = useContext(myContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:4323/api/products");

        const data = await response.data;
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [setProduct]);

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
        <div className="w-48 md:block bg-slate-200">
          {/* Sidebar content */}
          <div>Side Bar for filter</div>
        </div>

        {/* Product listings */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            product.map((product) => (
                <Link
                  key={product._id}
                  className="block text-xl font-semibold mb-4 "
                  to={`/product/${product._id}`}
                >
              <article className="bg-white shadow-md rounded-lg p-6 mb-4">
                  <img src={product.images[0]} alt={product.title} />
                

                <span
                  className="block font-semibold hover:underline mb-2"
                >
                {product.brand}
                </span>
                <span
                  className="block  hover:underline mb-2"
                >
                  <span className="">{product.title}</span>Grand
                 
                </span>
                <p className="mb-2">
                  <span className="font-semibold">Color: </span>Tornado
                  Nubuck/Woodbury/Ivory
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Price: </span>${product.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Rating: </span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
