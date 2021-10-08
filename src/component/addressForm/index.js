import React from 'react';
import "./style.css";
import {useState} from "react";
import {addAddress} from "../../apiCalls"
import {useUser} from "../../context/user/index"
import { useAuth } from "../../context/auth/index";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  const { userDispatch} = useUser();
  const { setLoading } = useAuth();
    const initialAddress = {
        name: "",
        phoneNo: "",
        appartment :"",
        city: "",
        state: "",
        postalCode: "",
      };
      const [address, setAddress] = useState(initialAddress);
      const [addressToggle, setAddressToggle] = useState(false);
      const getAddress = (e) => {
    
        const { name, value } = e.target;
        setAddress((address) => {
          return { ...address, [name]: value };
        });
      };
    
      const addressHandler = () => {
        const {name,phoneNo,appartment,city,state,postalCode} = address;
        if(name && phoneNo && appartment && city && state && postalCode){
          addAddress(address, userDispatch, setLoading);
          setAddress(initialAddress);
          setAddressToggle(!addressToggle);
          
        }
        else{
          toast("empty field")
        }
        
       
      };
    
    return (
        <div>
            {!addressToggle && (
        <button
          onClick={() => setAddressToggle(!addressToggle)}
          className="addressBtn"
        >
          Add Address
        </button>
      )}
      {addressToggle && ( 
      <div className="addressForm">
        <div className="addressForm_box">
          <input
            onChange={(e) => getAddress(e)}
            name="name"
            className="addressInput"
            placeholder="Name"
          />
          <input
            onChange={(e) => getAddress(e)}
            name="phoneNo"
            className="addressInput"
            placeholder="Phone no."
          />
          <input
            onChange={(e) => getAddress(e)}
            name="appartment"
            className="addressInput"
            placeholder="Appartment"
          />
          <input
            onChange={(e) => getAddress(e)}
            name="city"
            className="addressInput"
            placeholder="City"
          />
          <input
            onChange={(e) => getAddress(e)}
            name="state"
            className="addressInput"
            placeholder="State"
          />
          <input
            onChange={(e) => getAddress(e)}
            name="postalCode"
            className="addressInput"
            placeholder="Postal code"
          />
          <div style ={{display:"flex" , justifyContent : "center"}}>
          <button className="addressBtn" onClick={() => addressHandler()}>
            Add Address
          </button>
          <button className="addressBtn" onClick={()=>setAddressToggle(false)}>
            Cancel
          </button>
          </div>
        </div>
      </div>
      )}
      </div>
    )
}
