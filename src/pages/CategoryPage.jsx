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
    <div className="md:px-10">
      <h1 className="md:ml-10 text-center md:text-left text-4xl capitalize font-bold">
        {category}
      </h1>
      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subCategoryItems.map((item) => (
          <Link
            key={item._id}
            className="block font-semibold mb-4 relative"
            to={`/product/${item._id}`}
          >
            <article className="bg-white shadow-md border flex flex-col justify-evenly lg:min-h-[550px] rounded-lg p-6 mb-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full object-cover hover:opacity-0"
              />
              <img
                src={item.images[1]}
                alt={item.title}
                className="w-full absolute top-3 left-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="p-4 bg-slate-100">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-2">{item.brand}</p>
                <p className="text-gray-800 font-bold">₹{item.price}</p>
                <p className="text-gray-700">Color: {item.color}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
