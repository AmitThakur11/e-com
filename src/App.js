import {Header , Content} from "./container";
import "./index.css"
import axios from "axios"
import {useAuth} from "./context/auth/index"
import {useEffect} from "react"
// import { useUser } from "./context/user";
function App() {
  const {setLogin} = useAuth()
  // const {userDispatch}= useUser()
  useEffect(()=>{
    (()=>{
      axios.defaults.baseURL = "https://soulmadeapi.herokuapp.com/"
      console.log("effect run")
      if(localStorage.getItem('token')){
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('token')
        return setLogin(true)
      }
      setLogin(false)
    })()

  },[setLogin]);

  // useEffect(()=>{
  //   (async()=>{
  //     setLoading(true)
  //     const {data} = await axios.get("/product");
  //     console.log(data)
  //     setLoading(false)
      
  //   })()
  // },[userDispatch,setLoading])
  return (
    <div className="app">
      <Header/>
      <Content/>
      

    </div>
  );
}

export default App;

