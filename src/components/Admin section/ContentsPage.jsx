import React, { useState } from "react";
import { Axios } from "../../MainPage";

const ContentPage = () => {
  const [topBarContent, setTopBarContent] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleTopBarContentChange = (e) => {
    setTopBarContent(e.target.value);
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleCouponDiscountChange = (e) => {
    setCouponDiscount(e.target.value);
  };

  const handleAddTopBarContent = async () => {
    try {
      await Axios.post("/api/topbar", { text: topBarContent });
      alert("Top bar content added successfully!");
    } catch (error) {
      console.error("Error adding top bar content:", error);
      alert("Failed to add top bar content. Please try again.");
    }
  };

  const handleAddCoupon = async () => {
    try {
      await Axios.post("/api/coupons", {
        code: couponCode,
        discount: couponDiscount,
      });
      alert("Coupon added successfully!");
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert("Failed to add coupon. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className=" text-3xl text-center font-semibold mb-4">Create Contents</h1>
      <hr />
      <div className="flex justify-around mt-6 ">
        <div className="mb-6 ">
          <h2 className="text-xl font-semibold mb-2">Add Top Bar Content</h2>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            rows="4"
            value={topBarContent}
            onChange={handleTopBarContentChange}
            placeholder="Enter top bar content"
          ></textarea>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAddTopBarContent}
          >
            Add Top Bar Content
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Coupon</h2>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            value={couponCode}
            onChange={handleCouponCodeChange}
            placeholder="Coupon code"
          />
          <input
            type="number"
            min="0"
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            value={couponDiscount}
            onChange={handleCouponDiscountChange}
            placeholder="Discount percentage"
          />
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAddCoupon}
          >
            Add Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
