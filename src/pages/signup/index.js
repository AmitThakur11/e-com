import "../login/style.css"
import SignupImg from "../../image/signup.svg"
import { register } from "../../apiCalls";
import {useAuth} from "../../context/auth/index"
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const {getInput , userInput, setLoading} = useAuth()
  const navigate = useNavigate()

  return (
    <div className = "loginContainer">
      <div className ="loginBox">
        
        <img src ={SignupImg} alt ="/"/>
        <div className ="loginBox_input">
        <div className ="loginBox_inner">
        <div style={{fontSize:"20px", fontWeight:"600"}}>Register</div>
        <input name = "username" placeholder="-Name" onChange = {(e)=>getInput(e)} value = {userInput.username}/>
        <input name = "email" placeholder="-Email"  onChange = {(e)=>getInput(e) } value = {userInput.email}/>
        <input name = "password" type ="password"  placeholder="-Password" onChange = {(e)=>getInput(e)} value = {userInput.password}/>
        <input name = "cpassword" type ="password" placeholder="-Confirm password" onChange = {(e)=>getInput(e)} value = {userInput.cpassword} />
        <button onClick = {()=>register(userInput,setLoading ,navigate)
        } className="loginBox_btn">Register</button>
        
        </div>
        </div>

      </div>
    </div>
  )
   
};

export default Signup;

