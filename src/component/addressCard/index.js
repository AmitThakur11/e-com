import "./style.css";

import React from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useUser } from "../../context/user";
import { useAuth } from "../../context/auth";
import { removeAddress ,addDefaultAddress} from "../../apiCalls";

export default function AddressCard({ address, setEdit }) {
  const {userDispatch } = useUser();
  const { setLoading } = useAuth();
  const selectTheme = {
    backgroundColor : "#f34b4c",
    fontWeight : "600",
  
  }

  const isSelected = address.isDefault ? selectTheme : {}

  return (
    <div className="addressCard" style = {isSelected}  key = {address._id}>
      <input
        onClick={() =>{
          addDefaultAddress(address._id, userDispatch, setLoading)
          userDispatch({ type: "SELECT ADDRESS", payload: address })
        }
        }
        name="address"
        checked= {address.isDefault}
        type="radio"
        
      />
      <div className="addressCard_data">
        <div className="addressCard_item">{address.name} </div>

        <div className="addressCard_item">#{address.appartment}</div>
        <div className="addressCard_item">{address.city}</div>
        <div className="addressCard_item">{address.state}</div>
        <div className="addressCard_item">{address.phoneNo} </div>
        <div className="addressCard_item">{address.postalCode}</div>
      </div>
      <div
        className="addressDelete"
        onClick={() =>  removeAddress(address._id, userDispatch, setLoading) }>
        <RiDeleteBin6Line />
      </div>
      <div
        className="addressEdit"
        onClick={() =>
          setEdit((edit) => {
            return { ...edit, isEdit: !edit.isEdit, editAddress: address };
          })
        }
      >
        <RiEdit2Line />
      </div>
    </div>
  );
}
