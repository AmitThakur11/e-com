import axios from "axios"
export const axiosInitializer = ()=>{
    axios.defaults.baseURL = "https://soulmadeapi.herokuapp.com/"
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
}



// http://localhost:3002/