import {Route , Navigate} from "react-router-dom";
import {useAuth} from "../context/auth/index"
const PrivateRoute = ({path , ...props})=>{
    const {login} = useAuth()
    console.log(login)
    return login ? <Route path = {path} {...props} /> : <Navigate  state = {{from : path}}  replace to = "/login"/>
}

export default PrivateRoute