import React from "react";
import "./style.css";
import emptyWishlistImg from "../../image/emptyWishlist.svg";
import { Link } from "react-router-dom";
export default function EmptyWishlist() {
  return (
    <div className="emptyWishlist">
      <div className="emptyWishlist_info">
        {" "}
        <p className="emptyWishlist_heading">Your wishlist is empty</p>
        <Link to="/store">
          <button className="emptyWishlist_btn">Check Products</button>
        </Link>
      </div>

      <img src={emptyWishlistImg} alt="empty cart" />
    </div>
  );
}
