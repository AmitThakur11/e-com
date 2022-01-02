import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "../auth/index";

import {loadUser} from "../../apiCalls"
export const userContext = createContext();


const UserProvider = ({ children }) => {
  const { setLogin, setLoading } = useAuth();
  const [modal, setModal] = useState(false);
  const initialUser = {
    username: "",
    wishlist: [],
    cart: [],
    address: [],
    order: [],
    defaultAddress: null,
  };

  const userReducer = (user, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOAD USER": {
        const {
          data: { username, wishlist, cart, address, order },
        } = payload;
        return {
          ...user,
          username: username,
          wishlist: wishlist,
          cart: cart,
          address: address,
          order: [...order],
        };
      }
      case "UPDATE WISHLIST": {
        return { ...user, wishlist: payload };
      }
      case "UPDATE CART": {
        return { ...user, cart: payload };
      }
      case "UPDATE ADDRESS": {
        return { ...user, address: payload };
      }
      case "ADD ORDER": {
        return { ...user, order: payload , cart : [] };
      }
      case "REMOVE ORDER": {
        return { ...user, order: payload };
      }
      case "SELECT ADDRESS": {
        return { ...user, defaultAddress: payload };
      }
      default: {
        return user;
      }
    }
  };
  const [user, userDispatch] = useReducer(userReducer, initialUser);


  useEffect(()=>{
      loadUser(setLoading ,setLogin,userDispatch)
  },[setLoading,setLogin])

  return (
    <userContext.Provider
      value={{ user, userDispatch, modal, setModal, initialUser }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
