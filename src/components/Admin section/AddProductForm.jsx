import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  document.title = "Add-Product";

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    images: [],
    gender: "",
    category: {
      main: "",
      sub: "",
    },
    sizes: [],
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("category")) {
      const categoryName = name.split("[")[1].split("]")[0];
      setProductData({
        ...productData,
        category: {
          ...productData.category,
          [categoryName]: value,
        },
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      images: files,
    });
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...productData.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [name]: value };
    setProductData({
      ...productData,
      sizes: updatedSizes,
    });
  };

  const handleAddSize = () => {
    setProductData({
      ...productData,
      sizes: [...productData.sizes, { size: "", quantity: 1 }],
    });
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...productData.sizes];
    updatedSizes.splice(index, 1);
    setProductData({
      ...productData,
      sizes: updatedSizes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => formData.append("images", image));
        } else if (key === "sizes") {
          formData.append("sizes", JSON.stringify(value));
        } else if (key === "category") {
          formData.append("category[main]", value.main);
          formData.append("category[sub]", value.sub);
        } else {
          formData.append(key, value);
        }
      });
      await axios.post("http://localhost:4323/api/admin/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      // Optionally, you can redirect the user to another page
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };
  console.log(productData);
  return (
    <div className="container">
      <div className="w-2/4 mx-auto border p-10">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block mb-2">
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          {/* Add other input fields for gender, category, color */}
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            >
              <option value="">Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="girls">Girls</option>
              <option value="boys">Boys</option>
            </select>
          </div>
          {/* Add category field */}
          <div className="mb-4">
            <label htmlFor="mainCategory" className="block mb-2">
              Main Category:
            </label>
            <select
              id="mainCategory"
              name="category[main]"
              value={productData.category.main}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            >
              <option value="">Select Main Category</option>
              <option value="shoe">Shoe</option>
              <option value="cloth">Cloth</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subCategory" className="block mb-2">
              Sub Category:
            </label>
            <input
              type="text"
              id="subCategory"
              name="category[sub]"
              value={productData.category.sub}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          {/* Add file input for images */}
          <div className="mb-4">
            <label htmlFor="images" className="block mb-2">
              Images:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              className="border border-gray-400 p-2 rounded"
              multiple
            />
          </div>
          {/* Add size input fields */}
          <div className="mb-4">
            <label className="block mb-2">Sizes:</label>
            {productData.sizes.map((size, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  name="size"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  placeholder="Size"
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <input
                  type="number"
                  name="quantity"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(index, e)}
                  placeholder="Quantity"
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSize(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            >
              Add Size
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block mb-2">
              Color:
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
