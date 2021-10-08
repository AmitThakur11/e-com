import React from "react";
import {
  Home,
  Signup,
  Wishlist,
  Cart,
  Login,
  Product,
  Store,
  Address,
  Order
} from "../../pages";
import { Loader ,LoginModel } from "../../component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../../pages/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../context/auth/index";
import { useUser} from "../../context/user/index"
import "./style.css";
export default function Content() {
  const { loading  } = useAuth();
  const {modal} = useUser()
  return (
    <div className="content">
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      {loading && <Loader />}
      {modal && <LoginModel/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<Product />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/address" element={<Address />} />
        <PrivateRoute path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
