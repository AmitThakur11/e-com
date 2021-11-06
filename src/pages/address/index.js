import "./style.css";
import {useState}from "react";
import { useUser } from "../../context/user/index";
import {useNavigate} from "react-router-dom"
import {AddressForm} from "../../component"
import { AddressCard } from "../../component";
import { EditAddressForm } from "../../component";
import {addOrder} from "../../apiCalls"
import {useAuth} from "../../context/auth/index"
export default function Address() {
  const {user , userDispatch } = useUser();
  const {setLoading} = useAuth();
  const navigate = useNavigate()
  const initialEdit = {
    isEdit : false,
    editAddress : null
  }
  const [edit , setEdit] = useState(initialEdit);
  let cartId = user.cart.map(({ productId : {_id} }) => _id);
  let cartProduct = user.cart.map(({productId}) => productId)

  console.log(cartId)
  
  return (
    <div className="addressPage">
      <AddressForm/>
      <section className= "addressSection">
        {user?.address.map((address) => {
          return (
            user.address.length && <AddressCard key={address._id} address = {address} setEdit = {setEdit} />
          );
        })}
      </section>
      {edit.isEdit && <EditAddressForm edit = {edit} setEdit = {setEdit}/>}

      
      
      {user.address.length ? <div className ="placeOrder_btn">
        <button onClick = {()=>{
          userDispatch({type : "UPDATE ORDER", payload : {orderedProduct : cartProduct ,address : user.defaultAddress}})
          addOrder(cartId,user.defaultAddress,userDispatch,setLoading)
          
          navigate("/order")
        }
        }>Place Order</button>
      </div>:""}
    </div>
  );
}
