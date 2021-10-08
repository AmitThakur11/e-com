import React from "react";
import { Link, Navigate  } from "react-router-dom";

import "./style.css";
import { FavoriteBorderOutlined, Favorite } from "@material-ui/icons";
import { addToWishlist, removeFromWishlist } from "../../apiCalls";
import { useAuth } from "../../context/auth";
import {useUser} from "../../context/user/index"


export default function ProductCard({ product }) {
  const {
    user: { wishlist },
    userDispatch,setModal
  } = useUser();
  const { setLoading , isLogin } = useAuth();
  const likedOrNot = wishlist.find((item) => item._id === product._id);
  return (
    <section key={product._id} className="x-vertical-card">
      <Link to={`/store/${product._id}`}>
        <img src={product.img} alt="female-tshirt-2" border="0" />

        <div className="vertical-card-content">
          <div className="title">{product.name}</div>
          <div className="sub_title">{product.brand}</div>
          <div className="x_price">
            Rs.{product.price}
            <span> (Rs.{product.price + product.discount})</span>
          </div>
        </div>
      </Link>
      <div
        className="x-card-icon"
        onClick={() =>
          isLogin? (likedOrNot
            ?removeFromWishlist(product._id, userDispatch, setLoading): addToWishlist(product._id, userDispatch, setLoading)):setModal(true)
            
        }
      >
        {likedOrNot?<Favorite style={{ fontSize: "18px" }} />:<FavoriteBorderOutlined style={{ fontSize: "18px" }} />}
      </div>

      {product.badge && <div className="x-vertical-badge">{product.badge}</div>}
    </section>
  );
}
