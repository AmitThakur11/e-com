
import {Route , Navigate} from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({path , ...props})=>{
    const {isLogin} = useAuth()
    return isLogin ? <Route path = {path} {...props} /> : <Navigate  state = {{from : path}}  replace to = "/login"/>
}

export default PrivateRoute