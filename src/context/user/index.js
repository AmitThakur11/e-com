import { useContext, createContext, useEffect, useReducer , useState} from "react";
import { useAuth } from "../auth/index";
import axios from "axios"
import {toast} from "react-toastify"
export const userContext = createContext();


const UserProvider = ({ children }) => {
  const {setLogin, setLoading, isLogin } = useAuth();
  const [modal , setModal] = useState(false)
  const initialUser = {
    username: null,
    wishlist: [],
    cart: [],
    address: [],
    order: [],
  };

  const userReducer = (user, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOAD USER": {
        console.log("load user")
        return {
          ...user,
          username: payload.data.username,
          wishlist: payload.data.wishlist,
          cart: payload.data.cart,
          address: payload.data.address,
          order: payload.data.order,
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
        return {...user , order : payload}
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

      if (token) {
        setLogin(true);
        setLoading(true);
        const { data } = await axios.get("/user_data/userinfo");
        setLoading(false);
        userDispatch({ type: "LOAD USER", payload: data });
      } else {
        setLoading(false)
        userDispatch({ type: "LOAD USER", payload: {data : initialUser} });
      }
    })();

   }catch(error){
     setLoading(false);
     toast(error.response.data.msg)
   }
  },[isLogin]);

  return (
    <userContext.Provider value={{ user, userDispatch ,modal , setModal}}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
