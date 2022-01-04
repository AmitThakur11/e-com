import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "../auth/index";
import { initialUser, userReducer } from "./reducer";
import { loadUser } from "../../apiCalls";
export const userContext = createContext();

const UserProvider = ({ children }) => {
  const { setLogin, setLoading } = useAuth();
  const [modal, setModal] = useState(false);
  const [user, userDispatch] = useReducer(userReducer, initialUser);

  useEffect(() => {
    loadUser(setLoading, setLogin, userDispatch);
  }, [setLoading, setLogin]);

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
