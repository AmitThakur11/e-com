import "./style.css";
import {useState}from "react";
import { useUser } from "../../context/user/index";
import {useNavigate} from "react-router-dom"
import {AddressForm} from "../../component"
import { AddressCard } from "../../component";
import { EditAddressForm } from "../../component";
import {addOrder} from "../../apiCalls"
export default function Address() {
  const {user , userDispatch } = useUser();
  const navigate = useNavigate()
  const initialEdit = {
    isEdit : false,
    editAddress : null
  }
  const [edit , setEdit] = useState(initialEdit);
  return (
    <div className="addressPage">
      <AddressForm/>
      <section className= "addressSection">
        {user?.address.map((address) => {
          return (
            user.address.length && <AddressCard address = {address} setEdit = {setEdit} />
          );
        })}
      </section>
      {edit.isEdit && <EditAddressForm edit = {edit} setEdit = {setEdit}/>}

      
      
      {user.address.length ? <div className ="placeOrder_btn">
        <button onClick = {()=>{
          addOrder(user.cart,user.defaultAddress)
          userDispatch({type : "UPDATE ORDER", payload : {cart : user.cart ,address : user.defaultAddress}})
          navigate("/order")
        }
        }>Place Order</button>
      </div>:""}
    </div>
  );
}
