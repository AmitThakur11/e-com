import { Header, Content } from "./container";
import "./index.css";

import { useAuth } from "./context/auth/index";
import {useData} from "./context/data"
import { useEffect } from "react";
import { axiosInitializer } from "./utils/axiosInitializer";
import {loadProducts} from "./apiCalls"
function App() {
  const {setLogin , setLoading} = useAuth();
  const {setProductList} = useData()

  useEffect(() => {
    (()=>{
      axiosInitializer();
      loadProducts(setLoading, setProductList);

    })()
    
  }, [setLogin,setProductList ,setLoading]);

  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
