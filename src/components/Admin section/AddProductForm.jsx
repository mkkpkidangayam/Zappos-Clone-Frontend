import React, { useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../../MainPage";
import Cookies from "js-cookie";

const AddProduct = () => {
  document.title = "Add-Product";

  const [productData, setProductData] = useState({
    title: "",
    info: [""],
    price: "",
    brand: "",
    imageUrls: [""],
    imageFiles: [],
    gender: "",
    category: {
      main: "",
      sub: "",
    },
    sizes: [],
    color: "",
    ratings: [],
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

  const handleInfoChange = (index, value) => {
    const updatedInfo = [...productData.info];
    updatedInfo[index] = value;
    setProductData({
      ...productData,
      info: updatedInfo,
    });
  };

  const handleAddInfo = () => {
    setProductData({
      ...productData,
      info: [...productData.info, ""],
    });
  };

  const handleRemoveInfo = (index) => {
    const updatedInfo = [...productData.info];
    updatedInfo.splice(index, 1);
    setProductData({
      ...productData,
      info: updatedInfo,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      imageFiles: files,
    });
  };

  const handleImageUrlChange = (index, value) => {
    const updatedImageUrls = [...productData.imageUrls];
    updatedImageUrls[index] = value;
    setProductData({
      ...productData,
      imageUrls: updatedImageUrls,
    });
  };

  const handleAddImageUrl = () => {
    setProductData({
      ...productData,
      imageUrls: [...productData.imageUrls, ""],
    });
  };

  const handleRemoveImageUrl = (index) => {
    const updatedImageUrls = [...productData.imageUrls];
    updatedImageUrls.splice(index, 1);
    setProductData({
      ...productData,
      imageUrls: updatedImageUrls,
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

  const handleRatingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRatings = [...productData.ratings];
    updatedRatings[index] = { ...updatedRatings[index], [name]: value };
    setProductData({
      ...productData,
      ratings: updatedRatings,
    });
  };

  const handleAddRating = () => {
    setProductData({
      ...productData,
      ratings: [...productData.ratings, { score: "", customer: "", comment: "" }],
    });
  };

  const handleRemoveRating = (index) => {
    const updatedRatings = [...productData.ratings];
    updatedRatings.splice(index, 1);
    setProductData({
      ...productData,
      ratings: updatedRatings,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "imageFiles") {
          value.forEach((image) => formData.append("images", image));
        } else if (key === "sizes" || key === "ratings" || key === "info" || key === "imageUrls") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "category") {
          formData.append("category[main]", value.main);
          formData.append("category[sub]", value.sub);
        } else {
          formData.append(key, value);
        }
      });

      await Axios.post("/admin/addproduct", formData, {
        headers: {
          Authorization: Cookies.get("adminToken"),
        }
      });

      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="w-2/4 mx-auto border p-10">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title:</label>
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
            <label htmlFor="info" className="block mb-2">Info:</label>
            {productData.info.map((infoItem, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={infoItem}
                  onChange={(e) => handleInfoChange(index, e.target.value)}
                  className="border border-gray-400 p-2 rounded mr-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInfo(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddInfo}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            >
              Add Info
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Price:</label>
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
            <label htmlFor="brand" className="block mb-2">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">Gender:</label>
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
          <div className="mb-4">
            <label htmlFor="mainCategory" className="block mb-2">Main Category:</label>
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
            <label htmlFor="subCategory" className="block mb-2">Sub Category:</label>
            <input
              type="text"
              id="subCategory"
              name="category[sub]"
              value={productData.category.sub}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block mb-2">Color:</label>
            <input
              type="text"
              id="color"
              name="color"
              value={productData.color}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrls" className="block mb-2">Image URLs:</label>
            {productData.imageUrls.map((url, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  className="border border-gray-400 p-2 rounded mr-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImageUrl(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            >
              Add Image URL
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block mb-2">Image Files:</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              className="border border-gray-400 p-2 rounded"
              multiple
            />
          </div>
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
            <label className="block mb-2">Ratings:</label>
            {productData.ratings.map((rating, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="number"
                  name="score"
                  value={rating.score}
                  onChange={(e) => handleRatingChange(index, e)}
                  placeholder="Score (1-5)"
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <input
                  type="text"
                  name="customer"
                  value={rating.customer}
                  onChange={(e) => handleRatingChange(index, e)}
                  placeholder="Customer ID"
                  className="border border-gray-400 p-2 rounded mr-2"
                />
                <input
                  type="text"
                  name="comment"
                  value={rating.comment}
                  onChange={(e) => handleRatingChange(index, e)}
                  placeholder="Comment"
                  className="border border-gray-400 p-2 rounded flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRating(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddRating}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            >
              Add Rating
            </button>
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
