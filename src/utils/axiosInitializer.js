import axios from "axios"
export const axiosInitializer = ()=>{
    axios.defaults.baseURL = "http://localhost:3002/"
    // axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
}

// https://soulmadeapi.herokuapp.com/

// 