import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const AdminNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    Cookies.remove("adminToken");
    navigate("/admin-login");
    toast.success("Successful logout");
  };

  return (
    <div className="flex  h-full">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 left-0 text-white min-w-min w-56 h-screen ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div>
              {isSidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className="px-2 py-1 bg-gray-200 m-2 text-gray-800 rounded-md float-right"
                >
                  <KeyboardDoubleArrowLeftIcon />
                </button>
              )}
              <h1 className="text-3xl font-mono font-bold p-6 border-b-2 bg-gray-800 text-white">
                Admin
              </h1>
            </div>
            <ul className="font-medium">
              <Link to={"/admin"}>
                <li
                  onClick={() => setMenu("home")}
                  className={`py-4 px-6 hover:underline ${
                    menu === "home" ? "bg-white text-gray-800" : ""
                  }`}
                >
                  <HomeIcon /> Home
                </li>
              </Link>
              <Link to={"/admin/manage-users"}>
                <li
                  onClick={() => setMenu("users")}
                  className={`py-4 px-6 hover:underline ${
                    menu === "users" ? "bg-white text-gray-800" : ""
                  }`}
                >
                  <PeopleAltIcon /> Users
                </li>
              </Link>
              <Link to={"/admin/products-list"}>
                <li
                  onClick={() => setMenu("products")}
                  className={`py-4 px-6 hover:underline ${
                    menu === "products" ? "bg-white text-gray-800" : ""
                  }`}
                >
                  <CategoryIcon /> Products
                </li>
              </Link>
              <Link to={"/admin/manage-orders"}>
                <li
                  onClick={() => setMenu("order")}
                  className={`py-4 px-6 hover:underline ${
                    menu === "order" ? "bg-white text-gray-800" : ""
                  }`}
                >
                  <LocalShippingIcon /> Orders
                </li>
              </Link>
              <Link to={"/admin/manage-contents"}>
                <li
                  onClick={() => setMenu("coupon")}
                  className={`py-4 px-6 hover:underline ${
                    menu === "coupon" ? "bg-white text-gray-800" : ""
                  }`}
                >
                  <LocalOfferIcon /> Coupon
                </li>
              </Link>

              <Link to={"/"}>
                <li className="py-4 px-6 hover:underline">
                  <LanguageIcon /> Go to wbsite
                </li>
              </Link>
            </ul>
          </div>
          <div className="mb-10">
            <button onClick={handleLogOut} className="px-5 hover:underline">
              <LogoutIcon /> Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen p-3 w-full overflow-scroll">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="px-2 py-1 bg-gray-400 text-gray-800 rounded-md absolute"
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNav;
