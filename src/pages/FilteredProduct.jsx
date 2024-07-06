import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/myContextxt";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/Assets/LoadingSpinner";
// import Sidebar from "./Sidebar";

const Filteredproduct = () => {
  const { gender, mainCategory, subCategory } = useParams();
  const { product, isLoading } = useContext(myContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("newArrivals");

  useEffect(() => {
    const filtered = product?.filter((item) => {
      if (subCategory === "all") {
        return item.gender === gender && item.category.main === mainCategory;
      } else {
        return (
          item.gender === gender &&
          item.category.main === mainCategory &&
          item.category.sub === subCategory
        );
      }
    });
    setFilteredProducts(filtered);
  }, [product, gender, mainCategory, subCategory]);

  useEffect(() => {
    let sorted = filteredProducts ? [...filteredProducts] : null;
    switch (sortOrder) {
      // case "customerRating":
      //   sorted?.sort((a, b) => a.rating - b.rating);
      //   break;
      case "lowToHigh":
        sorted?.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sorted?.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted?.sort((a, b) => a.timestamp - b.timestamp);
        break;
    }
    setSortedProducts(sorted);
  }, [sortOrder, filteredProducts]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="container my-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-60 ml-10 mb-4 md:mb-0">
          <div className="md:w-80">
            <h1 className="font-bold md:text-3xl capitalize">
              {subCategory === "all"
                ? `${gender}'s ${mainCategory}`
                : `${gender}'s ${subCategory}`}
            </h1>
            {filteredProducts?.length > 0 && (
              <p className="font-semibold text-gray-600">
                {filteredProducts?.length === 1
                  ? `( ${filteredProducts?.length} item found )`
                  : `( ${filteredProducts?.length} items found )`}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-60 md:h-24 mr-7 py-5">
          <label htmlFor="sort" className=" mb-2 mr-2 font-semibold">
            Sort By
          </label>
          <select
            className="p-2 rounded-2xl border"
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-10">
        {/* Sidebar */}
        {/* <div className="w-48 md:block">
          <Sidebar />
        </div> */}

        {/* Product listings */}
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading ? (
            <div className="mx-auto col-span-4   ">
              <LoadingSpinner />
            </div>
          ) : (
            sortedProducts?.map((product) => (
              <article
                key={product._id}
                className="bg-white shadow-md border rounded-lg p-6 mb-4"
              >
                <Link
                  className="block font-semibold mb-4 relative"
                  to={`/product/${product._id}`}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full hover:opacity-0"
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
                    <span className="font-semibold">Price: </span>₹
                    {product.price}
                  </p>
                  <p className="mb-2">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-blue-500 mr-1"
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
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Filteredproduct;
