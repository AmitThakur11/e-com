import { useContext, createContext, useState  } from "react";
export const authContext = createContext();

const AuthProvider = ({ children }) => {

  

  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(localStorage.getItem("login"));
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

  return (
    <authContext.Provider
      value={{
        userInput,
        setUserInput,
        initialUser,
        getInput,
        isLogin,
        setLogin,
        loading,
        setLoading
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
