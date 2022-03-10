import "./style.css";

import React from "react";
import { useUser } from "../../context/user/index";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../context/auth/index";
import { cancelOrder } from "../../apiCalls";
import NoOrder from "../../image/noorder.png"
export default function Order() {
  const {
    user: { order },
    userDispatch,
  } = useUser();
  const { setLoading } = useAuth();
 
  return (
    <div>
      {order.length > 0 && <h2 className ="pageTitle">ORDERS</h2>}
      {order.length  ? (<div className="orderContainer">
      
        {order.map(({ _id, orderedProducts, address,total }) => {
          return (
            <div  key = {_id} className="orderCard">
              <div className="cartBox">
                {orderedProducts.map(({productId:{img,_id,name,price,discount},qty}) => {
                  return (
                    <div  key ={_id} className="cartBox__item">
                      <img src={img} alt="" />
                      <div className="cartBox__itemSection">
                        <p className="cartBox__itemName">{name}</p>
                        <p className="cartBox__itemPrice">
                          <span>Price : </span>
                          {price - discount }({qty})
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className ="totalPrice"> <span>Total : </span> <span>{total} Rs</span></div>
              <div className="orderAddress">
                Order will soon deleivered to :{" "}
                <span>
                  House no. {address.appartment},{address.city},{address.state}{" "}
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
      </div>):(<div className ="noOrder__section">
        <div className ="orderTitle">No Orders</div>
        <img src={NoOrder} alt="/"/>
      </div>)}
    </div>
  );
}
