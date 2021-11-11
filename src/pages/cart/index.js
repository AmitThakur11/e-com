import React from "react";
import { useUser } from "../../context/user";
import { CartCard } from "../../component";
import { EmptyCart } from "../../container";
import { CheckOutCard } from "../../component";

import "./style.css";
export default function Cart() {
  const {
    user: { cart },
  } = useUser();
  return !cart.length ? (
    <EmptyCart />
  ) : (
    <div className="cartPage">
      <div className="cartPage_product">
        {cart.map((product) => {
          return <CartCard cart={product} key={product.productId._id} />;
        })}
      </div>
      <div className="cartPage_checkout">
        <CheckOutCard cart={cart} />
      </div>
    </div>
  );
}
