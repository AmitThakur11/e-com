import { Header, Content } from "./container";
import "./index.css";

import { useAuth } from "./context/auth/index";
import { useEffect } from "react";
import { axiosInitializer } from "./utils/axiosInitializer";
function App() {
  const {setLogin } = useAuth();

  useEffect(() => {
    (()=>{
      axiosInitializer()
    })()
    
  }, [setLogin,]);

  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
