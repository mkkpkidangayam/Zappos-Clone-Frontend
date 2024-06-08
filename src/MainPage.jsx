import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/ProductsListing";
import Brands from "./pages/Brands";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import myContext from "./context/myContextxt";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Registeration from "./pages/Registration";
import OtpVerification from "./pages/otpVerification";
import ProtectedRoute from "./components/Authentication/ProtectedRoute ";
import AdminLogin from "./components/Admin section/AdminLogin";
import AddProductForm from "./components/Admin section/AddProductForm";
import ProductDetails from "./pages/ProductDetails";
import axios from "axios";
import UserAddress from "./pages/UserAddress";
import CategoryPage from "./pages/CategoryPage";
import SuccessPage from "./pages/SuccessPage";
import FailurePage from "./pages/FailurePage";
import LoginProtect from "./components/Authentication/LoginProtect";
import Filteredproduct from "./pages/FilteredProduct";
import AdminHome from "./components/Admin section/AdminHome";
import ManageUsers from "./components/Admin section/ManageUsers";
import Cookies from "js-cookie";
import AdminNav from "./components/Admin section/AdminNav";
import ProductList from "./components/Admin section/ProductsList";
import AdminLoginProttect from "./components/Admin section/AdminAuth/AdminLoginProttect";
import AdminProttect from "./components/Admin section/AdminAuth/AdminProttect";
import ManageProduct from "./components/Admin section/ManageProduct";
import ContentPage from "./components/Admin section/ContentsPage";
import ManageOrders from "./components/Admin section/ManageOrders";
import OrderDetailsAdmin from "./components/Admin section/OrderDetailsAdmin";
import OrderDetails from "./pages/OrderDetails";
import NotFoundPage from "./components/Assets/PageNotFond";
import { useMediaQuery } from "react-responsive";
import MobileNavbar from "./components/Navbar/MobileNavbar";

export const Axios = axios.create({
  baseURL: "https://zappos-clone-backend.onrender.com/api",
  headers: {
    Authorization: Cookies.get("token"),
  },
});

const MainPage = () => {
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [product, setProduct] = useState(null);
  const [menu, setMenu] = useState("");
  const [subMenu, setSubMenu] = useState(""); // For menu bar
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    Axios.get("/products")
      .then((response) => {
        const data = response.data;
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }

    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userData = JSON.parse(userInfoString);
      setUserData(userData);
      setIsLogin(true);
    }
  }, []);

  const details = {
    isMenuOpen,
    SetIsMenuOpen,
    userData,
    setUserData,
    isLogin,
    setIsLogin,
    showModal,
    setShowModal,
    isAdminLogin,
    setIsAdminLogin,
    product,
    setProduct,
    menu,
    setMenu,
    isLoading,
    setIsLoading,
    subMenu,
    setSubMenu,
    filteredProducts,
    setFilteredProducts,
  };

    // Use react-responsive to detect screen size
    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <Toaster />
      <myContext.Provider value={details}>
        <Routes>
          <Route path="/" element={isMobileOrTablet ? <MobileNavbar /> : <Navbar />}>
            <Route index element={<Home />} />
            <Route path="/women" element={<Products />} />
            <Route path="/men" element={<Products />} />
            <Route path="/kids" element={<Products />} />
            <Route path="/collections" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/p/:gender/:mainCategory/:subCategory"
              element={<Filteredproduct />}
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/user/:userId/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/c/:userId/orders"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId/bag"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <LoginProtect>
                <Login />
              </LoginProtect>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/register"
            element={
              <LoginProtect>
                <Registeration />
              </LoginProtect>
            }
          />
          <Route
            path="/otp-verify"
            element={
              <LoginProtect>
                <OtpVerification />
              </LoginProtect>
            }
          />
          <Route
            path="//user/:userId/shipping-address"
            element={
              <ProtectedRoute>
                <UserAddress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success/user/:userId"
            element={<SuccessPage />}
          />
          <Route
            path="/payment-failure/user/:userId"
            element={<FailurePage />}
          />

          <Route
            path="/admin-login"
            element={
              <AdminLoginProttect>
                <AdminLogin />
              </AdminLoginProttect>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminProttect>
                <AdminNav />
              </AdminProttect>
            }
          >
            <Route
              index
              element={
                <AdminProttect>
                  <AdminHome />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <AdminProttect>
                  <ManageUsers />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/products-list"
              element={
                <AdminProttect>
                  <ProductList />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/add-products"
              element={
                <AdminProttect>
                  <AddProductForm />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/manage-product/:id"
              element={
                <AdminProttect>
                  <ManageProduct />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/manage-contents"
              element={
                <AdminProttect>
                  <ContentPage />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/manage-orders"
              element={
                <AdminProttect>
                  <ManageOrders />
                </AdminProttect>
              }
            />
            <Route
              path="/admin/order/:orderId"
              element={
                <AdminProttect>
                  <OrderDetailsAdmin />
                </AdminProttect>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </myContext.Provider>
    </>
  );
};

export default MainPage;
