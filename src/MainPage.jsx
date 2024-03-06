import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import myContext from "./context/myContextxt";
import UserAccount from "./pages/UserAccount";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Registeration from "./pages/Registration";
import OtpVerification from "./pages/otpVerification";
import ProtectedRoute from "./components/Authentication/ProtectedRoute ";
import AdminLogin from "./components/Admin section/AdminLogin";
import AddProductForm from "./components/Admin section/AddProductForm";

const MainPage = () => {
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  console.log("userdata: ", userData);

  useEffect(() => {
    // Check if the user is logged in from local storage
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }

    // Retrieve user data from local storage if available
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
  };

  return (
    <>
      <Toaster />
      <myContext.Provider value={details}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/women" element={<Products category="women" />} />
            <Route path="/men" element={<Products category="men" />} />
            <Route path="/kids" element={<Products category="kids" />} />
            <Route path="/collections" element={<Products />} />
            <Route path=":productId" element={<Products />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/sale" element={<Sale />} />
            <Route
              path="/useraccount"
              element={
                isLogin ? (
                  <ProtectedRoute>
                    <UserAccount />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/cart"
              element={
                isLogin ? (
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/wishlist"
              element={
                isLogin ? (
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/otp-verify" element={<OtpVerification />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/add-product" element={<AddProductForm />} />
        </Routes>
      </myContext.Provider>
    </>
  );
};

export default MainPage;
