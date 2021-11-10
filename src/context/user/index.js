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
      case "ADD ORDER":{
        
        return {...user , order : [...user.order , payload]}
      }
      case "REMOVE ORDER":{
        return {...user , order : payload}

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


    (async () => {
      const token = localStorage.getItem("token");
      console.log("running")

      try{

        if (token) {
          setLogin(true);
          setLoading(true);
          const {data} = await axios.get("/user_data/userinfo");
          setLoading(false);
          if(!data.success){
            console.log("failed")
            localStorage.removeItem("token")
            setLogin(false)
            delete axios.defaults.headers.common["Authorization"];
  
          }
          
          userDispatch({ type: "LOAD USER", payload: data });
        } else {
          setLoading(false)
          
        }

      }catch(err){
        setLoading(false);
      toast(err.response.data.msg)

      }
     
    })();

  
  },[setLogin ,userDispatch,setLoading]);

  return (
    <userContext.Provider value={{ user, userDispatch ,modal , setModal , initialUser}}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
