import { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(products);

  useEffect(() => {
    Axios.get(`/admin/product-list`)
      .then((response) => {
        setProducts(response.data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto ">
      <div>
        <label htmlFor="category">Select category</label>
        <select name="category" id="category">
          <option value="all">All products</option>
          {products?.gender?.map((category) =>
            <option value="category">{category}</option>
          )}
        </select>
        <h1 className="text-3xl font-bold text-center text-green-800 mb-4">
          Manage Products
        </h1>
      </div>
      <hr />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <Link key={product._id} to={`/admin/products/${product._id}`}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.images[0]} // Assuming images is an array of URLs
                  alt={product.title}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.brand}
                  </h2>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.category.sub}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">₹{product.price}</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
