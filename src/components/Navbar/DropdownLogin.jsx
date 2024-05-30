import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContextxt";
import { FaUser } from "react-icons/fa";
import { useClickAway } from "react-use";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const DropdownLogin = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { userData, setUserData, isMenuOpen, SetIsMenuOpen, setIsLogin } =
    useContext(myContext);

  const handleClickAway = () => {
    SetIsMenuOpen(!isMenuOpen);
  };

  useClickAway(ref, handleClickAway);
  function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleLogout = () => {
    navigate("/");
    SetIsMenuOpen(!isMenuOpen);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    Cookies.remove("token");
    setIsLogin(false);
    setUserData(null);
    const userName = userData ? capitalize(userData.name) : "User";
    toast.success(`${userName}, sign-out successful`);
  };

  return (
    <div
      ref={ref}
      data-side="bottom"
      data-align="end"
      role="menu"
      aria-orientation="vertical"
      data-state="open"
      data-radix-menu-content=""
      dir="ltr"
      id="radix-3"
      aria-labelledby="radix-1"
      className="
        absolute
        top-24
        right-5
        isolate
        z-50
       bg-slate-100
        border border-black
        overflow-hidden
        rounded-xl
        bg-default-minimal
        p-1
        shadow-[2px_8px_16px_rgba(0,0,0,0.12)]
      "
      tabIndex="-1"
      data-orientation="vertical"
      style={{
        outline: "none",
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
        pointerEvents: "auto",
      }}
    >
      <div role="group" className="flex flex-col gap-y-1">
        <h2 className="flex w-40 items-center p-2 justify-start gap-1 capitalize rounded-xl font-bold transition-colors ">
          <FaUser /> {userData.name}
        </h2>
        <hr className="border-t-2 border-t-black" />

        <span
          aria-disabled="true"
          aria-label="Account Overview"
          className="flex w-40 items-center justify-between p-2 cursor-pointer rounded-xl transition-colors border hover:bg-slate-300 hover:border-blue-700"
          onClick={() => {
            navigate(`/user/${userData._id}/profile`);
            SetIsMenuOpen(!isMenuOpen);
          }}
          role="menuitem"
          tabIndex="-1"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <span>Account Overview</span>
        </span>

        <span
          aria-disabled="true"
          aria-label="View Orders/Return"
          className="flex w-40 items-center justify-between p-2 rounded-xl transition-colors border hover:bg-slate-300 hover:border-blue-700"
          onClick={() => {
            navigate(`/c/${userData._id}/orders`);
            SetIsMenuOpen(!isMenuOpen);
          }}
          role="menuitem"
          tabIndex="-1"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <span>View Orders/Return</span>
        </span>
        <button
          aria-label="Sign Out"
          className="flex w-40 items-center justify-between p-2 rounded-xl transition-colors border hover:bg-slate-300 hover:border-blue-700"
          onClick={handleLogout}
          role="menuitem"
          tabIndex="-1"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <span>Sign Out</span>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            height="24"
            width="24"
            className="ml-2"
          >
            <path
              d="M28.2918 15.9954H12.0418M28.2918 15.9954L25.1668 12.8704M28.2918 15.9954L25.1668 19.1204M19.9585 11.8287V7.8704C19.9585 5.5691 18.093 3.70374 15.7918 3.70374H7.87516C5.57397 3.70374 3.7085 5.5691 3.7085 7.8704V24.1204C3.7085 26.4216 5.57397 28.2871 7.87516 28.2871H15.7918C18.093 28.2871 19.9585 26.4216 19.9585 24.1204V20.1621"
              stroke="currentcolor"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DropdownLogin;
