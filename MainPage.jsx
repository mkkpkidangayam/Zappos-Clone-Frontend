import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home";
import Products from "./src/pages/Products";
import Brands from "./src/pages/Brands";
import Sale from "./src/pages/Sale";
import Login from "./src/pages/Sale";
import Register from "./src/pages/Sale";
import Navbar from "./src/components/Navbar/Navbar";


const MainPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<Products category="women" />} />
          <Route path="/men" element={<Products category="men" />} />
          <Route path="/kids" element={<Products category="kids" />} />
          <Route path="/collections" element={<Products />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/sale" element={<Sale />} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/login" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainPage;
