import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Link, Outlet } from "react-router-dom";

const AdminNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-1/5 h-screen ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-mono font-bold p-6 border-b-2">Admin</h1>
        <ul>
          <li className="py-4 px-6">
            <Link to={"/admin/manage-users"}>Users</Link>
          </li>
          <li className="py-4 px-6">
            <Link>Products</Link>
          </li>
          <li className="py-4 px-6">Dashboard</li>
          <li className="py-4 px-6">Users</li>
          <li className="py-4 px-6">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full p-3">
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
