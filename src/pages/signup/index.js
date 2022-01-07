import "./style.css";
import SignupImg from "../../image/signup.svg";
import { register } from "../../apiCalls";
import { useAuth } from "../../context/auth/index";
import { useNavigate } from "react-router-dom";
import { signUpInputs } from "./utils";
const Signup = () => {
  const { getInput, userInput, setLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="signUp__container">
      <div className="signUp__box">
        <img src={SignupImg} alt="/" />
        <div className="signUp__boxInput">
          <div className="signUp__boxInner">
            <div style={{ fontSize: "20px", fontWeight: "600" }}>Register</div>
            {
              signUpInputs.map((data)=>{
                return <input
                {...data}
                onChange={(e) => getInput(e)}
                value={userInput[data.name]}
              />
              })
              
}
            <button
              onClick={() => register(userInput, setLoading, navigate)}
              className="signUp__boxBtn"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
