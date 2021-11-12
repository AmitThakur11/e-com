import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import { useAuth } from "../auth/index";
import axios from "axios";
import { toast } from "react-toastify";
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
    defaultAddress: {},
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
        return { ...user, order: payload };
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

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user_data/userinfo");
      if (data.success) {
        setLogin(true);
        setLoading(false);
        userDispatch({ type: "LOAD USER", payload: data });
        return;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      localStorage.getItem("login") && toast.info("session expired");
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      setLogin(false);
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [setLoading, setLogin, userDispatch]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
