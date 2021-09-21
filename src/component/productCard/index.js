import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {FavoriteBorderOutlined } from "@material-ui/icons";
import {useUser} from "../../context/user/index"
import {addToWishlist} from "../../apiCalls"
import {useAuth} from "../../context/auth"


export default function ProductCard({ product }) {
  const {userDispatch} = useUser();
  const {setLoading} = useAuth();
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
      <div className ="x-card-icon" onClick = {()=>addToWishlist(product._id , userDispatch, setLoading)} ><FavoriteBorderOutlined style ={{fontSize : "18px"}}/></div>

      {product.badge && <div className="x-vertical-badge">{product.badge}</div>}
    </section>
  );
}


