import axios from 'axios'
import {addOrder} from "../apiCalls"
export const loadScript =(src)=>{
  return new Promise((resolve)=>{
  const script= document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
  script.onload = ()=>{
   
    resolve(true)
  }
  script.onerror = ()=>{
    resolve(false)

  }

  })
}


export const addRazorpay = async (user,navigate,userDispatch,setLoading)=>{
  const src = "https://checkout.razorpay.com/v1/checkout.js";
  const response = await loadScript(src);
  if(!response){
    alert("kuch gadbad h dayaa")
  }


  const data = await axios.post("/user_data/order/create")
  var options = {
    "key": "rzp_test_vZaorXyCcQmPq5", 
    "amount": data.data.amount * 100, 
    "currency": "INR",
    "name": "Soulmade",
    "description": "Test Transaction",
    "image": "./image/logo.png",
    "order_id": data.data.id, 
    "handler": function (response){
        const paymentData = {
            payment_id  : response.razorpay_payment_id,
            order_id : response.razorpay_order_id,
            signature : response.razorpay_signature
        }
        addOrder(navigate,userDispatch,setLoading,paymentData)
    },
    "prefill": {
        "name": user.username,
        "email": user.email,
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

  const razorpayPayment = new window.Razorpay(options);
  razorpayPayment.open()
  
}
