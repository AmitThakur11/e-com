import {Header , Content} from "./container";
import "./index.css"
import axios from "axios"
import {useAuth} from "./context/auth/index"
import {useEffect} from "react"
function App() {
  const {isLogin} = useAuth()
  useEffect(()=>{
    (()=>{
      axios.defaults.baseURL = "https://soulmadeapi.herokuapp.com/"
      axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
    })()

  },[isLogin])

  return (
    <div className="app">
      <Header/>
      <Content/>
      

    </div>
  );
}

export default App;
