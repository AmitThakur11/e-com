import React from 'react';
import "./style.css";
import {useState} from "react";
import {updateAddress} from "../../apiCalls"
import {useUser} from "../../context/user/index"
import { useAuth } from "../../context/auth/index";

export default function EditAddressForm({edit , setEdit}) {
  const { userDispatch} = useUser();
  const { setLoading } = useAuth();
  const {editAddress : {_id,name,phoneNo,appartment,city,state,postalCode}} = edit
    const initialAddress = {
        name: name,
        phoneNo: phoneNo,
        appartment: appartment,
        city: city,
        state: state,
        postalCode: postalCode,
      };
      const [address, setAddress] = useState(initialAddress);


      const getAddress = (e) => {
    
        const { name, value } = e.target;
        setAddress((address) => {
          return { ...address, [name]: value };
        });
      };

      const updateHandler = ()=>{
        updateAddress(_id,userDispatch,setLoading,address)
        setEdit((edit=>{
          return {...edit , isEdit : false}
        }))
        

      }
  
    
    return (
      <div className="editAddressForm">
        <div className="editAddressForm_box">
          <input
            onChange={(e) => getAddress(e)}
            name="name"
            className="editAddressInput"
            placeholder="Name"
            value  = {address.name}
          />
          <input
            onChange={(e) => getAddress(e)}
            name="phoneNo"
            className="editAddressInput"
            placeholder="Phone no."
            value  = {address.phoneNo}
          />
          <input
            onChange={(e) => getAddress(e)}
            name="appartment"
            className="editAddressInput"
            placeholder="Appartment"
            value  = {address.appartment}
          />
          <input
            onChange={(e) => getAddress(e)}
            name="city"
            className="editAddressInput"
            placeholder="City"
            value ={address.city}
          />
          <input
            onChange={(e) => getAddress(e)}
            name="state"
            className="editAddressInput"
            placeholder="State"
            value ={address.state}
          />
          <input
            onChange={(e) => getAddress(e)}
            name="postalCode"
            className="editAddressInput"
            placeholder="Postal code"
            value = {address.postalCode}
          />
         
        </div>
        <div className ="editAddressForm_btn">
        <button onClick = {()=>updateHandler()}>Update</button>
        <button onClick = {()=>setEdit((edit=>{
          return {...edit , isEdit : false}
        }))}>Cancel</button>
        </div>
      </div>
    )
}
