import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";
import Cookies from "js-cookie";

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
        const response = await Axios.get(`/admin/product/${id}`, {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        });
        const product = response.data;
        setProduct(product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await Axios.put(`/admin/product/edit/${id}`, {
  //       title: product.title,
  //       price: product.price,
  //       brand: product.brand,
  //       images: [...product.images, newImage],
  //       sizes: [...product.sizes, { size: newSize, quantity: newQuantity }],
  //       info: [...product.info, newInfo],
  //     });
  //     setEditMode(false);
  //     setNewImage(null);
  //     setNewSize("");
  //     setNewQuantity(1);
  //     setNewInfo("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSave = async () => {
    try {
       await Axios.put(`/api/products/${id}`, {
        title: product.title,
        price: product.price,
        brand: product.brand,
        images: [...product.images, newImage],
        sizes: [...product.sizes, { size: newSize, quantity: newQuantity }],
        info: [...product.info, newInfo],
      });
      setEditMode(false);
      setNewImage(null);
      setNewSize("");
      setNewQuantity(1);
      setNewInfo("");
    } catch (error) {
      console.error(error);
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

  const deleteProduct = async (productId) => {
    try {
      await Axios.delete(`/admin/product/delete/${productId}`, {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      });
      const updatedProducts = product.filter(
        (product) => product._id !== productId
      );
      setProduct(updatedProducts);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
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
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              className="text-3xl font-semibold mb-4 w-full border-b-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="text-4xl mb-2 text-blue-600 font-semibold w-full border-b-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="text"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
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
            {/* <img
              src={product.images[0]}
              alt={product.title}
              className="w h-auto mb-4 object-cover mix-blend-darken"
            /> */}
            {product.images.map((image, index) => (
              <div className="border">

              <img
                key={index}
                src={image}
                alt={product.title}
                className="w-full mb-4 object-cover mix-blend-darken"
                />
                <button >Change Image</button>
                </div>
              
            ))}
          </div>
          <div className="md:col-span-1">
            <button
              onClick={handleEdit}
              className="bg-blue-600 w-2/5 text-white my-3 font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
            >
              Edit
            </button>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-lg mb-2">{product.brand}</p>
            <p className="text-lg mb-2">
              <sup>₹</sup>
              {product.price.toFixed(2)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
