import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage"; // Assuming Axios is set up elsewhere in your project
import LoadingSpinner from "../Assets/LoadingSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/admin/products-list?page=${currentPage}`, {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    })
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setIsLoading(false);
      });
  }, [currentPage]);

  const deleteProduct = async (productId) => {
    try {
      await Axios.delete(`/admin/product/delete/${productId}`, {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      });
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-center text-green-800 font-bold mb-4">
        Manage Products
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex justify-end">
                <button
                  className={`px-1 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-slate-700 text-white"
                  }`}
                  onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowBackIcon />
                </button>
                <span className="mx-2 font-medium">Page: {currentPage}</span>
                <button
                  className={`px-1 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-slate-700 text-white"
                  }`}
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowForwardIcon />
                </button>
              </div>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr
                        onClick={() =>
                          navigate(`/admin/manage-product/${product._id}`)
                        }
                        key={product._id}
                        className="hover:shadow-2xl duration-300 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            className="w-10"
                            src={product.images[0]}
                            alt={product.title}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {product.gender}' {product.category.sub}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹{product.price}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            !product.isHide ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {!product.isHide ? "Active" : "Hided"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
