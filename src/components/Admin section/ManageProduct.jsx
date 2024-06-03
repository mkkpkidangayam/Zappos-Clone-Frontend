import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Ensure you have installed axios
import LoadingSpinner from "../Assets/LoadingSpinner";
import Cookies from "js-cookie";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

const ManageProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newSize, setNewSize] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newInfo, setNewInfo] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/admin/product/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
        const product = response.data;
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("brand", product.brand);
    if (newImage) {
      formData.append("images", newImage);
    }
    formData.append("sizes", JSON.stringify([...product.sizes, { size: newSize, quantity: newQuantity }]));
    formData.append("info", JSON.stringify([...product.info, newInfo]));

    try {
      await axios.put(
        `/api/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditMode(false);
      setNewImage(null);
      setNewSize("");
      setNewQuantity(1);
      setNewInfo("");
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Failed to save changes", error);
      toast.error("Failed to save changes");
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSizeChange = (e) => {
    setNewSize(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleInfoChange = (e) => {
    setNewInfo(e.target.value);
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`Copied: ${text}`))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="container mx-auto px-4 bg-[#fff9f9]">
      <h1 className="text-4xl text-center mb-4 font-mono font-bold text-lime-800">
        {product.title}
      </h1>
      <hr />
      {editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative md:col-span-2 p-2">
            <input
              type="text"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="text-3xl font-semibold mb-4 w-full border-b-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="text-4xl mb-2 text-blue-600 font-semibold w-full border-b-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="text"
              value={product.brand}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              className="text-2xl mb-2 font-semibold w-full border-b-2 focus:outline-none focus:border-blue-600"
            />
            <input type="file" onChange={handleImageChange} className="mb-2" />
            <button
              onClick={handleSave}
              className="bg-orange-800 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
          <div className="md:col-span-1">
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
                {product.sizes.map((size, index) => (
                  <tr key={index}>
                    <td className="border font-semibold px-4 py-2">
                      {size.size}
                    </td>
                    <td className="border px-4 py-2">{size.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              type="text"
              value={newSize}
              onChange={handleSizeChange}
              className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600"
              placeholder="Enter new size"
            />
            <input
              type="number"
              value={newQuantity}
              onChange={handleQuantityChange}
              className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600"
              placeholder="Enter new quantity"
            />
            <button
              onClick={() => {
                setProduct({
                  ...product,
                  sizes: [
                    ...product.sizes,
                    { size: newSize, quantity: newQuantity },
                  ],
                });
                setNewSize("");
                setNewQuantity(1);
              }}
              className="bg-blue-600 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Add Size
            </button>
            <h2 className="text-xl font-semibold mt-5 mb-3">
              Product Information
            </h2>
            <hr className="border-t border-dashed border-black " />
            <ul className="my-4 list-disc pl-5">
              {product.info.map((info, index) => (
                <li key={index} className="mb-2">
                  {info}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newInfo}
              onChange={handleInfoChange}
              className="text-lg mb-2 w-full border-b-2 focus:outline-none focus:border-blue-600"
              placeholder="Enter new info"
            />
            <button
              onClick={() => {
                setProduct({ ...product, info: [...product.info, newInfo] });
                setNewInfo("");
              }}
              className="bg-blue-600 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Add Info
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative md:col-span-2 p-2 grid grid-cols-3 grid-rows-5 gap-2">
            {product?.images?.map((image, index) => (
              <div key={index} className="border">
                <img
                  src={image}
                  alt={product.title}
                  className="w-full mb-4 object-cover mix-blend-darken"
                />
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="my-3 flex">
              <h2 className="text-xl font-mono mb-2">Id: {product._id}</h2>
              <button
                onClick={() => copyToClipboard(product._id)}
                className="mx-2 py-1 px-1 rounded hover:bg-slate-400"
              >
                <ContentCopyIcon />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Title: {product.title}</h2>
            <p className="text-lg mb-2">Brand: {product.brand}</p>
            <p className="text-lg mb-2">
              Price: <sup>₹</sup>
              {product?.price.toFixed(2)}
            </p>
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
                {product?.sizes?.map((size, index) => (
                  <tr key={index}>
                    <td className="border font-semibold px-4 py-2">
                      {size.size}
                    </td>
                    <td className="border px-4 py-2">{size.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleEdit}
              className="bg-blue-600 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Edit
            </button>
            <h2 className="text-xl font-semibold mt-5 mb-3">
              Product Information
            </h2>
            <hr className="border-t border-dashed border-black " />
            <ul className="my-4 list-disc pl-5">
              {product?.info?.map((info, index) => (
                <li key={index} className="mb-2">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
