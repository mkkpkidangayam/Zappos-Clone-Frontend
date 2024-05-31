import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage"; // Assuming Axios is set up elsewhere in your project
import LoadingSpinner from "../Assets/LoadingSpinner";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gender, setGender] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(
      `/admin/products-list?page=${currentPage}&gender=${gender}&category=${category}`,
      {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      }
    )
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setIsLoading(false);
      });
  }, [currentPage, gender, category]);

  useEffect(() => {
    let filtered = products;
    if (gender !== "all" ) {
      filtered = products.filter((product) => product.gender === gender);
    }

    filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [gender, products, search, category]);

  const handleGenderChanges = (event) => {
    setGender(event.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-around items-center">
        <div>
          <label className="ml-7 font-medium" htmlFor="gender">
            Gender:
          </label>
          <select
            value={gender}
            onChange={handleGenderChanges}
            className="rounded-lg mx-2 border border-black"
          >
            <option value="all">ALL</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="girls">Girls</option>
            <option value="boys">Boys</option>
          </select>
          <label className="ml-7 font-medium" htmlFor="category">
            Category:
          </label>
          <select
            className="rounded-lg mx-2 border border-black"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="shoe">Shoes</option>
            <option value="cloth">Cloths</option>
            <option value="accessories">Accessories</option>
            {products.category?.sub?.map((SubCategory) => 
            <option value={SubCategory}>{SubCategory}</option>
            )}
          </select>
          
        </div>
        <h1 className="text-3xl text-center w-1/4 text-green-800 font-bold mb-4">
          Products List
        </h1>
        <div>
          <label className="font-medium" htmlFor="search">
            Search:{" "}
          </label>
          <input
            className="border-2 rounded-xl px-2 border-green-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Products"
            name="search"
            id="search"
          />
        </div>
        <button onClick={() => navigate("/admin/add-products")} className="bg-green-800 text-white font-medium py-1 px-2 rounded-lg hover:bg-green-600">Add Product</button>
      </div>
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
                  onClick={handlePreviousPage}
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
                  onClick={handleNextPage}
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
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Category Main/Sub
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
                    {filteredProducts?.map((product, index) => (
                      <tr
                        onClick={() =>
                          navigate(`/admin/manage-product/${product._id}`)
                        }
                        key={product._id}
                        className="hover:bg-slate-200 duration-300 cursor-pointer"
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
                          {product.gender}{" "}
                        </td>
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {product.category.main} / {product.category.sub}
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
