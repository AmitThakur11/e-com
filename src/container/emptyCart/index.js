import React from "react";
import "./style.css";
import emptyCartImg from "../../image/emptyCart.svg";
import { Link } from "react-router-dom";
export default function EmptyCart() {
  return (
    <div className="emptyCart">
      <div className="emptyCart_info">
        {" "}
        <p className="emptyCart_heading">Your cart is Empty</p>
        <Link to="/store">
          <button className="emptyCart_btn">Check Products</button>
        </Link>
      </div>

      <img src={emptyCartImg} alt="empty cart" />
    </div>
  );
}
