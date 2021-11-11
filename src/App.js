import { Header, Content } from "./container";
import "./index.css";
import axios from "axios";
import { useAuth } from "./context/auth/index";
import { useEffect } from "react";
function App() {
  const { setLogin } = useAuth();

  useEffect(() => {
    (() => {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      console.log(process.env)
      console.log("effect run");
      if (localStorage.getItem("token")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "token"
        );
        setLogin(true);

        return;
      }
    })();
  }, [setLogin]);

  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
