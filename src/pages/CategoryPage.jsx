import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import myContext from "../context/myContextxt";
import LoadingSpinner from "../components/Assets/LoadingSpinner";

const SubCategoryPage = () => {
  const { category } = useParams();
  document.title = category;
  const { product } = useContext(myContext);
  const [subCategoryItems, setSubCategoryItems] = useState([]);

  useEffect(() => {
    if (product) {
      const filteredItems = product.filter(
        (item) =>
          item.category.sub === category || item.category.main === category
      );
      setSubCategoryItems(filteredItems);
    }
  }, [category, product]);

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container px-10">
      <h1 className="ml-10 text-4xl capitalize font-bold">{category}</h1>
      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subCategoryItems.map((item) => (
          <Link
            key={item._id}
            className="block rounded-lg w-80 overflow-hidden shadow-md hover:shadow-xl border"
            to={`/product/${item._id}`}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full object-cover"
            />

            <div className="p-4 bg-slate-100">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-2">{item.brand}</p>
              <p className="text-gray-800 font-bold">₹{item.price}</p>
              <p className="text-gray-700">Color: {item.color}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
