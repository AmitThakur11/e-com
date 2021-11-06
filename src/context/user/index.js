import { useContext, createContext, useEffect, useReducer , useState} from "react";
import { useAuth } from "../auth/index";
import axios from "axios"
import {toast} from "react-toastify"
export const userContext = createContext();


const UserProvider = ({ children }) => {
  const {setLogin, setLoading } = useAuth();
  const [modal , setModal] = useState(false)
  const initialUser = {
    username: "",
    wishlist: [],
    cart: [],
    address: [],
    order: [{
      orderedProduct: [],
      address : {}
    }
    ],
    defaultAddress : {}
  };

  const userReducer = (user, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOAD USER": {
        const {data : {username , wishlist , cart , address , order}} = payload
        console.log(username)
        return {
          ...user,
          username: username,
          wishlist: wishlist,
          cart: cart,
          address: address,
          order: [...order]
        };
      }
      case "UPDATE WISHLIST": {
        return {...user , wishlist : payload};
      }
      case "UPDATE CART": {
        return {...user , cart : payload};
      }
      case "UPDATE ADDRESS":{
        return {...user , address : payload}
      }
      case "UPDATE ORDER":{
        
        return {...user , order : [...user.order , {orderedProduct :payload.orderedProduct, address : payload.address}]}
      }
      case "SELECT ADDRESS":{
        return {...user, defaultAddress : payload}
      }
      default: {
        return user;
      }
    }
  };
  const [user, userDispatch] = useReducer(userReducer, initialUser);

  useEffect(() => {
   try{

    (async () => {
      const token = localStorage.getItem("token");
      console.log("running")
      if (token) {
        setLogin(true);
        setLoading(true);
        const {data} = await axios.get("/user_data/userinfo");
        console.log(data.success)
        setLoading(false);
        userDispatch({ type: "LOAD USER", payload: data });
      } else {
        setLoading(false)
        
      }
    })();

   }catch(error){
     setLoading(false);
     toast(error.response.data.msg)
   }
  },[setLogin ,userDispatch,setLoading]);

  return (
    <userContext.Provider value={{ user, userDispatch ,modal , setModal , initialUser}}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
