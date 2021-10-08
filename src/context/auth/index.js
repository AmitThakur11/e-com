import { useContext, createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {} from "./utils";
import {useNavigate} from 'react-router'
export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate()
  const initialUser = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [userInput, setUserInput] = useState(initialUser);

  const getInput = (e) => {
    const { name, value } = e.target;
    setUserInput(() => {
      return { ...userInput, [name]: value };
    });
  };
  const getLogin = async () => {
    try {
      const { email, password } = userInput;
      if (email && password) {
        setLoading(true);
        const { data } = await axios.post("/user/login", {
          email: email,
          password: password,
        });
        setLoading(false);
        localStorage.setItem("token", data?.token);

        setLogin(true);
        navigate("/store")
       
        toast.success(data?.msg);

        return;
      }
      toast.warn("empty field");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.msg);
    }
  };

  const register = async () => {
    const { username, email, password, cpassword } = userInput;
    try {
      if (username && email && password && cpassword) {
        setLoading(true);

        const { data } = await axios.post("/user/signup", {
          username: username,
          email: email,
          password: password,
        });
        setLoading(false);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setLogin(true)
          setUserInput(initialUser);
          return toast.success(data.msg);
        }
      }
      setLoading(false);
      toast.error("Input field empty");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  // useEffect(()=>{
  //   const token = JSON.parse(localStorage?.getItem('token'))
  //   if(!token){
  //     setLogin(false)
  //   }

  // },[isLogin])

  return (
    <authContext.Provider
      value={{
        userInput,
        setUserInput,
        initialUser,
        getInput,
        getLogin,
        isLogin,
        setLogin,
        register,
        loading,
        setLoading,
        render,
        setRender,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
