import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";

const ContentPage = () => {
  const [topBarContent, setTopBarContent] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [contents, setContents] = useState([]);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

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
      const response = await Axios.post(
        "/admin/topbar-content/create",
        {
          text: topBarContent,
        },
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
      const updatedContents = await Axios.get("/admin/get-contents", {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      });
      setTopBarContent("");
      setContents(updatedContents.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding top bar content:", error);
      toast.error("Failed to add top bar content. Please try again.");
    }
  };

  useEffect(() => {
    Axios.get("/admin/get-contents", {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    }).then((response) => {
      if (Array.isArray(response.data)) {
        setContents(response.data);
      } else {
        console.error("API response is not an array:", response.data);
      }
    });
  }, []);

  const handleDeleteContent = async (contentId) => {
    try {
      const response = await Axios.delete(
        `/admin/delete-content/${contentId}`,
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
      const updatedContents = contents.filter(
        (content) => content._id !== contentId
      );
      setContents(updatedContents);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete content", error);
    }
  };

  const handleAddCoupon = async () => {
    try {
      await Axios.post(
        "/admin/create-coupon",
        {
          code: couponCode,
          discount: couponDiscount,
        },
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      ).then(async (response) => {
        toast.success(response.data.message);
        const updatedCouponsResponse = await Axios.get("/admin/get-coupons", {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        });
        setCoupons(updatedCouponsResponse.data);
        setCouponCode("");
        setCouponDiscount("");
      });
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    Axios.get("/admin/get-coupons", {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    }).then((response) => {
      setCoupons(response.data);
    });
  }, []);

  const handleBlockCoupon = async (couponId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/admin/coupon-unblock/${couponId}`
        : `/admin/coupon-block/${couponId}`;
      await Axios.patch(
        endpoint,
        {},
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
      const updatedCoupons = coupons.map((coupon) => {
        if (coupon._id === couponId) {
          return { ...coupon, isBlocked: !isBlocked };
        }
        return coupon;
      });
      setCoupons(updatedCoupons);
    } catch (error) {
      console.error("Failed to block/unblock user", error);
    }
  };

  const openDeleteConfirmationModal = (couponId) => {
    setCouponToDelete(couponId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setCouponToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCoupon = async () => {
    try {
      const response = await Axios.delete(
        `/admin/delete-coupon/${couponToDelete}`,
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
      const updatedCoupons = coupons.filter(
        (coupon) => coupon._id !== couponToDelete
      );
      setCoupons(updatedCoupons);
      toast.success(response.data.message);
      closeDeleteConfirmationModal();
    } catch (error) {
      console.error("Failed to delete coupon", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className=" text-3xl text-emerald-800 text-center font-bold mb-4">
        Create Contents & Coupons
      </h1>
      <hr />
      <div className="flex justify-between mt-6 ">
        <div className="mb mr-4 mb-6 ">
          <table className="min-w-full table-auto border mb-4">
            <thead>
              <tr className="bg-gray-800 text-white rounded-2xl">
                <th className="px-6 py-3 text-left">Topbar Content</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contents &&
                contents.map((content) => (
                  <tr key={content._id} className="bg-white border-b">
                    <td className="px-6 py-4">{content.text}</td>
                    <td className="px-6 py-4">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteContent(content._id)}
                        className="px-1  text-red-500  hover:text-red-700"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="border border-black rounded p-4">
            <h2 className="text-xl text-emerald-800 font-bold mb-2">
              Add Top Bar Content
            </h2>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              rows="3"
              value={topBarContent}
              onChange={handleTopBarContentChange}
              placeholder="Enter top bar content"
            />
            <button
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-600"
              onClick={handleAddTopBarContent}
            >
              Add Top Bar Content
            </button>
          </div>
        </div>
        <div>
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-800 text-white rounded-2xl">
                <th className="px-6 py-3 text-left">Coupon</th>
                <th className="px-6 py-3 text-left">Discount (%)</th>
                <th className="px-6 py-3 text-left">Created At</th>
                <th className="px-6 py-3 text-left">Usage</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((coupon) => (
                <tr key={coupon._id} className="bg-white border-b">
                  <td className="px-6 py-4">{coupon.code}</td>
                  <td className="px-6 py-4">{coupon.discount}</td>
                  <td className="px-6 py-4">
                    {new Date(coupon.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{coupon.usageCount}</td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      coupon.isBlocked ? "text-red-700" : "text-green-700 "
                    }`}
                  >
                    {coupon.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-6 py-4 flex flex-row justify-between">
                    <button
                      onClick={() =>
                        handleBlockCoupon(coupon._id, coupon.isBlocked)
                      }
                      className={`pr-1 rounded hover:underline ${
                        coupon.isBlocked ? "text-green-600" : "text-yellow-500"
                      } `}
                    >
                      {coupon.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => openDeleteConfirmationModal(coupon._id)}
                      className="px-1  text-red-500  hover:text-red-700"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-4 border border-black mb-4 p-4 rounded">
            <h2 className="text-xl text-emerald-800 font-bold mb-2">
              Add Coupon
            </h2>
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
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-600"
              onClick={handleAddCoupon}
            >
              Add Coupon
            </button>
          </div>
        </div>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this coupon?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                onClick={handleDeleteCoupon}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300 ml-2"
                onClick={closeDeleteConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
