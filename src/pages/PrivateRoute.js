import {Route , Navigate} from "react-router-dom";

const PrivateRoute = ({path , ...props})=>{
    return localStorage.getItem('token') ? <Route path = {path} {...props} /> : <Navigate  state = {{from : path}}  replace to = "/login"/>
}

export default PrivateRoute