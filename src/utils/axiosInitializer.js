import axios from "axios"
export const axiosInitializer = ()=>{
    console.log("hey")
    axios.defaults.baseURL = "https://soulmadeapi.herokuapp.com/"
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
}