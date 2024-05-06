import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";

const ManageProduct = () => {
  const { id } = useParams();
  const [productById, setProductById] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await Axios.get(`/product/${id}`);
        const product = response.data;
        setProductById(product);
      } catch (error) {
        toast.error("Failed to fetch product details");
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setProductById(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const updateProduct = async () => {
    try {
      const response = await Axios.put(`/product/${id}`, productById);
      toast.success(response.data.message);
      setEditMode(false); // Exit edit mode after saving changes
    } catch (error) {
      toast.error("Failed to update product details");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 bg-[#fff9f9]">
      <h1 className="text-4xl text-center mb-4 font-mono font-bold text-lime-800">
        {productById?.title}
      </h1>
      <hr />
      {productById ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative md:col-span-2 p-2">
            <img
              src={productById.images[0]}
              alt={productById.title}
              className="w-full h-auto mb-4 object-cover mix-blend-darken"
            />

            <div className="grid grid-cols-2 gap-3">
              {productById.images.slice(1, 7).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={productById.title}
                  className="w-full h-auto mb-4 object-cover mix-blend-darken"
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            {editMode ? ( // Show inputs only in edit mode
              <>
                <div className="flex justify-end mb-4">
                  <button onClick={updateProduct} className="bg-orange-800 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700">
                    Save Changes
                  </button>
                  <button onClick={() => setEditMode(false)} className="bg-gray-500 ml-3 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-gray-700">
                    Cancel
                  </button>
                </div>
                <input type="text" value={productById.title} onChange={(e) => handleInputChange(e, 'title')} className="text-3xl font-semibold mb-4 w-full border-b-2 focus:outline-none focus:border-blue-600" />
                <input type="number" value={productById.price} onChange={(e) => handleInputChange(e, 'price')} className="text-4xl mb-2 text-blue-600 font-semibold w-full border-b-2 focus:outline-none focus:border-blue-600" />
                <select value={productById.category.sub} onChange={(e) => handleInputChange(e, 'category')} className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600">
                  <option value="shoe">Shoe</option>
                  <option value="cloth">Cloth</option>
                  <option value="accessories">Accessories</option>
                </select>
                <select value={productById.gender} onChange={(e) => handleInputChange(e, 'gender')} className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600">
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="girls">Girls</option>
                  <option value="boys">Boys</option>
                </select>
                <input type="text" value={productById.color} onChange={(e) => handleInputChange(e, 'color')} className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600" />
              </>
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <button onClick={() => setEditMode(true)} className="bg-blue-600 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700">
                    Edit
                  </button>
                </div>
                <Link className="text-2xl mb-2 font-semibold hover:underline hover:text-blue-600">
                  {productById.brand}
                </Link>
                <h1 className="text-3xl font-semibold mb-4">{productById.title}</h1>
                <p className="text-4xl mb-2 text-blue-600 font-semibold">
                  <sup>₹</sup>
                  {productById.price.toFixed(2)}
                </p>
                <p className="text-lg mb-2">
                  {productById.category.sub} for {productById.gender.toUpperCase()}
                </p>
                <p className="text-lg mb-2">
                  <b>Color:</b> {productById.color}
                </p>
              </>
            )}

            <h2 className="text-xl font-semibold mb-2">
              Available Sizes & Quantities:
            </h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productById.sizes.map((sizeItem, index) => (
                  <tr key={index}>
                    <td className="border font-semibold px-4 py-2">{sizeItem.size}</td>
                    <td className="border px-4 py-2">{sizeItem.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mt-5 mb-3">
              Product Information
            </h2>
            <hr className="border-t border-dashed border-black " />
            <ul className="my-4 list-disc pl-5">
              {productById.info.map((info, index) => (
                <li key={index} className="mb-2">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ManageProduct;
