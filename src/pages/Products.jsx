import React from "react";

const Products = () => {
  return (
    <div className="container my-6">
      <div className=" flex justify-between ">
        <div className="w-60 ml-10 ">
          <div>
            <h1 className="font-bold my-2 text-2xl h-6">{"Category Name"}</h1>
            <h2>{"10"} items found</h2>
          </div>
        </div>
        <div className="w-60 h-24 mr-10 py-5 ">
          <label htmlFor="sort">
            <b>Sort By </b>
          </label>
          <select className="ml-2 p-2 rounded-2xl border" name="sort" id="sort">
            <option value="relevance">Relevance</option>
            <option value="newArrivals">New Arrivals</option>
            <option value="customerRating">Customer Rating</option>
            <option value="bestSellers">Best Sellers</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="mx-10  bg-slate-300">
        <h1>product</h1>
      </div>
    </div>
  );
};

export default Products;
