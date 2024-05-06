import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Link, Outlet } from "react-router-dom";

const AdminNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menu, setMenu] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex  h-full">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 left-0 text-white min-w-min w-56 h-screen ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-mono font-bold p-6 border-b-2 bg-gray-800 text-white">
          Admin
        </h1>
        <ul className="font-medium">
          <Link to={"/admin"}>
            <li
              onClick={() => setMenu("home")}
              className={`py-4 px-6 ${
                menu === "home" ? "bg-white text-black" : ""
              }`}
            >
              Home
            </li>
          </Link>
          <Link to={"/admin/manage-users"}>
            <li
              onClick={() => setMenu("users")}
              className={`py-4 px-6 ${
                menu === "users" ? "bg-white text-black" : ""
              }`}
            >
              Users
            </li>
          </Link>
          <Link to={"/admin/products-list"}>
            <li
              onClick={() => setMenu("products")}
              className={`py-4 px-6 ${
                menu === "products" ? "bg-white text-black" : ""
              }`}
            >
              Products
            </li>
          </Link>

          <Link to={"/"}>
            <li className="py-4 px-6">Go to wbsite</li>
          </Link>
          <li className="py-4 px-6">Users</li>
          <li className="py-4 px-6">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="h-screen p-3 w-full overflow-scroll">
        <button
          onClick={toggleSidebar}
          className="px-2 py-1 bg-gray-400 text-gray-800 rounded-md absolute"
        >
          {isSidebarOpen ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminNav;
