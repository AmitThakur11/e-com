
import "./style.css"
import {useNavigate} from "react-router"
import {useUser} from '../../context/user/index'

const LoginModel =()=>{
    const navigate = useNavigate()
    const {setModal , modal} = useUser()

    const loginAction = ()=>{
        navigate("/login");
        setModal(false)

    }
    return(
        modal && <section className="login-modal-section">
            <div className="login-modal">
                <div className="modal-text">
                    Please login to continue!
                </div>
                <div className="modal-btn">
                    <button onClick ={()=>loginAction()
                    } className="btn-1 ">Login</button>
                    <button className="btn-2" onClick = {()=>setModal(false)}>Cancel</button>
                </div>
            </div>
        </section>
                
    )
}


export default LoginModel