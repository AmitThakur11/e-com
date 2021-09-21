import { useEffect } from "react";
import "../login/style.css"
import SignupImg from "../../image/signup.svg"
import {useAuth} from "../../context/auth/index"
const Signup = () => {
  const {getInput , userInput ,setUserInput , register , initialUser} = useAuth()
  useEffect(() => {
    setUserInput(initialUser)
  },[])
  

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
        <button onClick = {()=>register()
        } className="loginBox_btn">Register</button>
        
        </div>
        </div>

      </div>
    </div>
  )
   
};

export default Signup;

