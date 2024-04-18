import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import myContext from "../context/myContextxt";

const SubCategoryPage = () => {
  const { sub } = useParams();
  const { product } = useContext(myContext);
  const [subCategoryItems, setSubCategoryItems] = useState([]);

  useEffect(() => {
    const filteredItems = product.filter((item) => item.category.sub === sub);
    setSubCategoryItems(filteredItems);
  }, [sub, product]);

  return (
    <div className="container px-10">
      <h1 className="ml-10 text-4xl font-bold">{sub}</h1>
      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subCategoryItems.map((item) => (
          <Link
            key={item._id}
            className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl"
            to={`/product/${item._id}`}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-2">{item.brand}</p>
              <p className="text-gray-800 font-bold">${item.price}</p>
              <p className="text-gray-700">Color: {item.color}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryPage;
