import { useContext, useEffect } from "react";
import logo from "../Assets/zappos-logo-black.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DropdownLogin from "./DropdownLogin";
import myContext from "../../context/myContextxt";
import Footer from "../Footer/FooterMain";
import TopBar from "./TopBar";
import WomenMenu from "../SubCategory/WomenMenu";
import MenMenu from "../SubCategory/MenMenu";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    userData,
    isMenuOpen,
    isLogin,
    SetIsMenuOpen,
    setIsLogin,
    setUserData,
    showModal,
    setShowModal,
    menu,
    setMenu,
    search,
    setSearch,
  } = useContext(myContext);
  console.log(userData);

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
    firstName = userName?.substring(0, 8).toUpperCase();
  }

  const toggleMenu = () => {
    if (isLogin) {
      SetIsMenuOpen(!isMenuOpen);
    } else {
      navigate("/login");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search.toLowerCase())}`);
  };

  return (
    <>
      <TopBar />
      {/* <hr /> */}
      <div>
        <div className="container mx-auto pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center pl-7">
              <div className="ml-3 mr-10">
                <a href="/">
                  <img
                    src={logo}
                    alt="Welcome! Go to Zappos Homepage!"
                    className="h-12"
                  />
                </a>
              </div>
              <div className="flex items-center  rounded-full border border-black">
                <span className="translate-x-2">
                  <SearchIcon />
                </span>
                <form action="products" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`${
                      userName ? `${firstName}, search` : "Search"
                    } for shoes, clothes, etc.`}
                    className=" w-[400px] rounded-full px-4 py-2 border-none focus:outline-none"
                  />
                  <button
                    className="w-24 border-l border-black py-2"
                    type="submit"
                  >
                    <b>Search</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="flex items-center mr-2 pr-5">
              {isLogin && (
                <Link to="/wishlist">
                  <svg
                    className="h-10 w-10 mx-2 cursor-pointer rounded-full hover:bg-zinc-300"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M23.5143 21.5031C25.1357 20.1174 26.539 18.7679 27.1262 17.8205C28.0184 16.3801 28.6486 14.8035 28.5435 12.7233C28.3578 9.04119 25.5203 6 22.0454 6C18.6268 6 15.9446 10.045 15.9446 10.045C15.9446 10.045 15.9445 10.0447 15.9441 10.0442C15.9438 10.0447 15.9436 10.045 15.9436 10.045C15.9436 10.045 13.2614 6 9.84275 6C6.36787 6 3.53038 9.04119 3.34469 12.7233C3.23963 14.8035 3.8698 16.3801 4.76202 17.8205C6.55297 20.7103 15.9362 27.3396 15.9441 27.3333C15.9473 27.3358 17.4365 26.2865 19.3409 24.8402" />
                  </svg>
                </Link>
              )}
              <button
                onClick={toggleMenu}
                className="flex items-center gap-x-1 px-1 rounded-full hover:bg-zinc-300 relative"
              >
                <svg
                  className="h-10 w-10 cursor-pointer rounded-full hover:bg-zinc-300"
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
                {firstName && (
                  <span className="text-sm font-bold">{firstName}</span>
                )}
              </button>
              {isMenuOpen && <DropdownLogin />}

              <button
                onClick={() => {
                  userData ? (
                    navigate("/cart")
                  ) : (
                    <>
                      {toast.error("Please login first")}
                      {navigate("/login")}
                    </>
                  );
                }}
              >
                <svg
                  className="h-10 w-10 mx-2 cursor-pointer rounded-full hover:bg-zinc-300 "
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
          <div className="flex justify-between mt-4 pl-6">
            <div className="flex justify-between items-center">
              <ul className="flex text-dark font-bold">
                <button
                  onClick={() => {
                    setMenu("new");
                    navigate("/products ");
                  }}
                >
                  <li
                    className={`hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "new" && "bg-black text-white"
                    }`}
                  >
                    New
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("women");
                  }}
                >
                  <li
                    className={`  hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "women" ? "bg-black text-white" : null
                    }`}
                  >
                    Women
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("men");
                    toggleModal();
                  }}
                >
                  <li
                    className={`  hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "men" ? "bg-black text-white" : null
                    }`}
                  >
                    Men
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("kids");
                  }}
                >
                  <li
                    className={`hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "kids" ? "bg-black text-white" : null
                    }`}
                  >
                    Kids
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("collections");
                  }}
                >
                  <li
                    className={`  hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "collections" ? "bg-black text-white" : null
                    }`}
                  >
                    Collections
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("brands");
                  }}
                >
                  <li
                    className={`  hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "brands" ? "bg-black text-white" : null
                    }`}
                  >
                    Brands
                  </li>
                </button>
                <button
                  onClick={() => {
                    setMenu("sale");
                  }}
                >
                  <li
                    className={`hover:bg-zinc-300 cursor-pointer relative rounded-full px-4  py-1  ${
                      menu === "sale" ? "bg-black text-white" : null
                    }`}
                  >
                    Sale
                  </li>
                </button>
              </ul>
            </div>
            <div className="flex items-center mr-3 pr-6">
              <a
                href="*"
                className="text-black font-bold hover:bg-zinc-300 p-1  rounded-full"
              >
                Help & Support
              </a>
            </div>
          </div>
          <div className="mx-auto">
            {/* Submenu components for Women, Men, Kids */}
            {menu === "Women" && <WomenMenu />}
            {/* {menu === "Men" && <MenMenu />}
          {menu === "Kids" && <KidsMenu />}
          */}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      {showModal && (
        <>
          <MenMenu />
        </>
      )}
      <div>
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
