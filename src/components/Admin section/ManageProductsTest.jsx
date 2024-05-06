import { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(`/admin/product-list`, { params: { page, limit } })
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setIsLoading(false);
      });
  }, [page, limit]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage(prev => prev - 1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset page number when changing limit
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div>
          <label htmlFor="category">Select category</label>
          <select name="category" id="category">
            <option value="all">All products</option>
            {/* Assuming you might have categories available separately */}
          </select>
        </div>
        <h1 className="text-3xl font-bold text-center text-green-800 mb-4">
          Manage Products
        </h1>
        <div className="mb-4 flex justify-end">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="px-3 py-1 border border-gray-300 rounded-md"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="ml-2 px-3 py-1 border border-gray-300 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="ml-2 px-3 py-1 border border-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <hr />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link key={product._id} to={`/admin/products/${product._id}`}>
              <div className="max-h-64 bg-white shadow-lg rounded-sm overflow-hidden hover:shadow-2xl duration-300">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full object-cover object-center"
                  // style={{ height: '250px' }}
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
