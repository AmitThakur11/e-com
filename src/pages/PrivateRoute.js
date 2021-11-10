import {Route , Navigate} from "react-router-dom";
import {useAuth} from "../context/auth/index"
const PrivateRoute = ({path , ...props})=>{
    const {isLogin} = useAuth()
    console.log(isLogin)
    return isLogin ? <Route path = {path} {...props} /> : <Navigate  state = {{from : path}}  replace to = "/login"/>
}

export default PrivateRoute