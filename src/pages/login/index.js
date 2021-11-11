import {Link} from "react-router-dom";
import "./style.css";
import LoginImg from "../../image/login.svg"
import {useAuth } from "../../context/auth/index"
import {getLogin} from "../../apiCalls"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";


const Login = () => {
  
  const {getInput, userInput,setLoading , setLogin} = useAuth();
  const {userDispatch} = useUser()
  const {email , password} = userInput ;
  const navigate = useNavigate();
  return(
    <div className = "loginContainer">
      <div className ="loginBox">
        
        <img src ={LoginImg} alt ="/"/>
        <div className ="loginBox_input">
        <div className ="loginBox_inner">
        <div style={{fontSize:"20px", fontWeight:"600"}}>Login</div>
        <input name = "email" value ={email} onChange = {(e)=>getInput(e)} placeholder="-Email"  />
        <input name ="password" value = {password}  onChange = {(e)=>getInput(e)} type ="password" placeholder="-password"/>
        <div className ="btn-flex">
        <button  className="loginBox_btn" onClick = {()=>getLogin(userInput,setLoading,setLogin,navigate,userDispatch)}>Log in</button>
        <button  className="loginBox_btn" onClick={()=>getLogin({email : "test1@gmail.com" ,  password : "test12345" },setLoading,setLogin,navigate,userDispatch)}>Demo</button>
        </div>
        <div className="loginBox_account">New to site?<Link to ="/signup">Create a account</Link></div>
        </div>
        </div>

      </div>
    </div>
  )
}



export default Login