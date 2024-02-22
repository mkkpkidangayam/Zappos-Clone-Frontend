import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import myContext from "./context/myContextxt";
import UsersData from "./components/Data/UserData";
import UserAccount from "./pages/UserAccount";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "react-hot-toast";
// import ProductData from './components/Data/ProductData'

const MainPage = () => {
  const [userData, setUserData] = useState(UsersData);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isMenuOpen, SetIsMenuOpen] = useState(false);

  const details = {
    userData,
    setUserData,
    email,
    setEmail,
    userName,
    setUserName,
    isMenuOpen,
    SetIsMenuOpen,
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
            <Route path="/collections" element={<Products />}>
              <Route path=":productId" element={<Products />} />
            </Route>
            <Route path="/brands" element={<Brands />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/useraccount" element={<UserAccount />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </myContext.Provider>
    </>
  );
};

export default MainPage;
