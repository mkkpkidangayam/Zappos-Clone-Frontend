import { useContext, useState, useEffect } from "react";
import logo from "../Assets/zappos-logo-black.svg";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, Outlet, useNavigate } from "react-router-dom";
import myContext from "../../context/myContextxt";
import DropdownLogin from "./DropdownLogin";
import SubMenu from "../SubCategory/SubMenu";
import toast from "react-hot-toast";
import TopBar from "./TopBar";
import MobileFooter from "../Footer/MobileFooter";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const {
    userData,
    isLogin,
    setIsLogin,
    setUserData,
    showModal,
    setShowModal,
    menu,
    setMenu,
    setSubMenu,
    isMenuOpen,
    SetIsMenuOpen,
  } = useContext(myContext);
  const [search, setSearch] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }

    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userData = JSON.parse(userInfoString);
      setUserData(userData);
    }
  }, [setIsLogin, setUserData]);

  const userName = userData && userData.name ? userData.name : false;
  let firstName = "";
  if (userName) {
    firstName = userName.substring(0, 8).toUpperCase();
    const spaceIndex = firstName.lastIndexOf(" ");

    if (spaceIndex !== -1) {
      firstName = firstName.substring(0, spaceIndex);
    }
  }

  const toggleMenu = () => {
    if (isLogin) {
      SetIsMenuOpen(!isMenuOpen);
    } else {
      navigate("/login");
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search?.toLowerCase())}`);
  };

  return (
    <div className="lg:hidden">
      <TopBar />
      {/* Hide on large screens */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <button onClick={toggleNav}>
            {isNavOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Link to="/" className="ml-3 mt-2">
            <img
              src={logo}
              alt="Welcome! Go to Zappos Homepage!"
              className="h-8"
            />
          </Link>
        </div>
        <div className="flex items-center">
          {isLogin && (
            <Link to={`/user/${userData?._id}/wishlist`}>
              <svg
                className="h-8 w-8 mx-2"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
              >
                <path d="M23.5143 21.5031C25.1357 20.1174 26.539 18.7679 27.1262 17.8205C28.0184 16.3801 28.6486 14.8035 28.5435 12.7233C28.3578 9.04119 25.5203 6 22.0454 6C18.6268 6 15.9446 10.045 15.9446 10.045C15.9446 10.045 15.9445 10.0447 15.9441 10.0442C15.9438 10.0447 15.9436 10.045 15.9436 10.045C15.9436 10.045 13.2614 6 9.84275 6C6.36787 6 3.53038 9.04119 3.34469 12.7233C3.23963 14.8035 3.8698 16.3801 4.76202 17.8205C6.55297 20.7103 15.9362 27.3396 15.9441 27.3333C15.9473 27.3358 17.4365 26.2865 19.3409 24.8402" />
              </svg>
            </Link>
          )}
          <button onClick={toggleMenu} className="mr-3">
            <svg
              className="h-8 w-8"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              data-tip="Click to login"
            >
              <path d="M8.9993 25.1863C8.99977 25.1802 9.00024 25.1741 9.00118 25.168M9.00118 25.168C9.34102 21.6017 12.3447 18.8127 16.0001 18.8127C19.6554 18.8127 22.6586 21.6012 22.9995 25.1675M9.00118 25.168C10.9413 26.6511 13.367 27.5313 16 27.5313C18.6334 27.5313 21.0593 26.6506 22.9995 25.1675M9.00118 25.168C6.24535 23.0623 4.46875 19.7406 4.46875 16C4.46875 9.62688 9.62594 4.46875 16 4.46875C18.6658 4.46875 21.1191 5.37109 23.0711 6.88741M22.9995 25.1675C25.7552 23.0619 27.5313 19.7402 27.5313 16C27.5313 13.8093 26.922 11.7624 25.8635 10.0191M16 16.9375C13.9323 16.9375 12.25 15.2552 12.25 13.1875C12.25 11.1198 13.9323 9.43751 16 9.43751C18.0677 9.43751 19.75 11.1198 19.75 13.1875C19.75 15.2552 18.0677 16.9375 16 16.9375Z" />
              <path
                d="M25.0938 8.3125C25.0938 8.57139 24.8838 8.78125 24.625 8.78125C24.3662 8.78125 24.1562 8.57139 24.1562 8.3125C24.1562 8.05361 24.3662 7.84375 24.625 7.84375C24.8838 7.84375 25.0938 8.05361 25.0938 8.3125Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {isMenuOpen && <DropdownLogin />}
          <button
            onClick={() => {
              userData ? (
                navigate(`/user/${userData._id}/bag`)
              ) : (
                <>
                  {toast.error("Please login first")}
                  {navigate("/login")}
                </>
              );
            }}
          >
            <svg
              className="h-8 w-8"
              viewBox="0 0 32 34"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M22.6458 13.9375V9.12496C22.6458 5.45457 19.6704 2.47913 16 2.47913C12.3296 2.47913 9.35417 5.45457 9.35417 9.12496V13.9375M23.3333 27.2291H27.9167M25.625 24.9375V29.5208M28 20.2424V9.33329H4V29.3333H18.2041"
                stroke="currentcolor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isNavOpen && (
        <div className="p-4 border-b absolute font-medium bg-slate-200 z-50 bg-opacity-95">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center mb-4"
          >
            <SearchIcon className="mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for shoes, clothes, etc."
              className="flex-1 px-2 py-1 border border-gray-300 rounded"
            />
            <button
              className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
              type="submit"
            >
              Search
            </button>
          </form>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setMenu("women");
                    setSubMenu("women");
                    toggleNav();
                  }}
                  className={`w-full flex justify-between px-4 py-2 ${
                    menu === "women"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Women <ArrowForwardIosIcon />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu("men");
                    setSubMenu("men");
                    toggleNav();
                  }}
                  className={`flex justify-between w-full text-left px-4 py-2 ${
                    menu === "men" ? "bg-black text-white" : "hover:bg-gray-200"
                  }`}
                >
                  Men <ArrowForwardIosIcon />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu("girls");
                    setSubMenu("girls");
                    toggleNav();
                  }}
                  className={`flex justify-between w-full text-left px-4 py-2 ${
                    menu === "girls"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Girls <ArrowForwardIosIcon />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu("boys");
                    setSubMenu("boys");
                    toggleNav();
                  }}
                  className={`flex justify-between w-full text-left px-4 py-2 ${
                    menu === "boys"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Boys <ArrowForwardIosIcon />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu("collections");
                    navigate("/products");
                    setShowModal(false);
                    toggleNav();
                  }}
                  className={`block w-full text-left px-4 py-2 ${
                    menu === "collections"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenu("brands");
                    setShowModal(false);
                  }}
                  className={`block w-full text-left px-4 py-2 ${
                    menu === "brands"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Brands
                </button>
              </li>
              <li>
                <Link
                  to="/help"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <div className="flex justify-center">{showModal && <SubMenu />}</div>
      {/* {showModal && <SubMenu />} */}
      <div className="flex justify-center">
        <Outlet />
      </div>
      <div className="flex justify-center">
        <MobileFooter />
      </div>
    </div>
  );
};

export default MobileNavbar;
