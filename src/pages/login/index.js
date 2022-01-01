import { Link } from "react-router-dom";
import "./style.css";
import LoginImg from "../../image/login.svg";
import { useAuth } from "../../context/auth/index";
import { getLogin } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
import { loginInputs } from "./utils";
const Login = () => {
  const { getInput, userInput, setLoading, setLogin } = useAuth();
  const { userDispatch } = useUser();
  const { email, password } = userInput;
  const navigate = useNavigate();
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <img src={LoginImg} alt="/" />
        <div className="loginBox__input">
          <div className="loginBox__inner">
            <div style={{ fontSize: "20px", fontWeight: "600" }}>Login</div>
            {loginInputs.map((data) => {
              return (
                <input
                  {...data}
                  value= {userInput[data.name]}
                  onChange={(e) => getInput(e)}
                 
                />
              );
            })}

           
            <div className="btnFlex">
              <button
                className="loginBox__btn"
                onClick={() =>
                  getLogin(
                    userInput,
                    setLoading,
                    setLogin,
                    navigate,
                    userDispatch
                  )
                }
              >
                Log in
              </button>
              <button
                className="loginBox__btn"
                onClick={() =>
                  getLogin(
                    { email: "test1@gmail.com", password: "test12345" },
                    setLoading,
                    setLogin,
                    navigate,
                    userDispatch
                  )
                }
              >
                Demo
              </button>
            </div>
            <div className="loginBox__account">
              New to site?<Link to="/signup">Create a account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
