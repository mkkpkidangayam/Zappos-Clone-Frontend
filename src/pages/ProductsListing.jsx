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
              <ProductCard />
              // <Link
              //   key={product._id}
              //   to={`/product/${product._id}`}
              //   className="w-full bg-white rounded-lg shadow-2xl overflow-hidden"
              // >
              //   <div className="p-4 ">
              //     <div className="h-">
              //       <img
              //         src={product.images[0]}
              //         alt={product.title}
              //         className="w-full mb-2"
              //       />
              //     </div>
              //     <h3 className="text-xl font-semibold text-gray-800 mb-2">
              //       {product.title}
              //     </h3>
              //     <p className="text-gray-600 mb-1">Color: {product.color}</p>
              //     <p className="text-gray-700 mb-1">
              //       <strong> ${product.price}.</strong>
              //     </p>
              //     <p className="text-gray-700 mb-4">
              //       {product.rating} out of 5 stars
              //     </p>
              //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              //       Buy Now
              //     </button>
              //   </div>
              // </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
