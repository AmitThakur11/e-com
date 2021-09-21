import React from "react";
import {
  Home,
  Signup,
  Wishlist,
  Cart,
  Login,
  Product,
  Store,
} from "../../pages";
import { Loader } from "../../component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../../pages/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../context/auth/index";
import "./style.css";
export default function Content() {
  const { loading  } = useAuth();
  return (
    <div className="content">
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<Product />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
