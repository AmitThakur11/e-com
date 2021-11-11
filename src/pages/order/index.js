import "./style.css";

import React from "react";
import { useUser } from "../../context/user/index";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../context/auth/index";
import { cancelOrder } from "../../apiCalls";
export default function Order() {
  const {
    user: { order },
    userDispatch,
  } = useUser();

  console.log(order);
  const { setLoading } = useAuth();
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week[new Date().getDay() + 3];
  let date = new Date().getDate() + 3;
  return (
    <div>
      <h1>ORDERS</h1>

      <div className="orderContainer">
        {order.map(({ _id, orderedProduct, address }) => {
          return (
            <div className="orderCard">
              <div className="cartBox">
                {orderedProduct.map(({ _id, img, name, price }) => {
                  return (
                    <div className="cartBox__item">
                      <img src={img} alt="" />
                      <div className="cartBox__itemSection">
                        <div className="cartBox__itemName">{name}</div>
                        {/* <div className = "cartBox__itemQty"><span>Qty: </span>{qty}</div> */}
                        <div className="cartBox__itemPrice">
                          <span>Price : </span>
                          {price}Rs
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="orderAddress">
                Order will soon deleivered to :{" "}
                <span>
                  House no. {address.appartment},{address.city},{address.state}{" "}
                  on {day},{date}
                </span>
                <div
                  className="orderCard__remove"
                  onClick={() => cancelOrder(_id, userDispatch, setLoading)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
