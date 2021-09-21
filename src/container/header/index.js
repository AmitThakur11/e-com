import "./style.css"
import Logo from "../../image/logo.png";
import {Link} from "react-router-dom"
import {ShoppingCartOutlined , FavoriteBorderOutlined } from '@material-ui/icons';
import { useNavigate } from "react-router";
import {useAuth} from "../../context/auth/index"

import {toast} from "react-toastify"
export default function Header() {
    const navigate = useNavigate();
    const {isLogin , setLogin , setRender , setLoading} = useAuth();
  
    const login_logout= ()=>{
        if(isLogin){
            setLoading(true)
            localStorage.removeItem("token")
            setLogin(false)
            setLoading(false)
            navigate("/store");
            setRender(render=>!render)
            toast.success("user logged out ")

            
        }else{
            
            navigate("/login")
            
        }
        
    }
    return (
        <div className ="header">
            <Link to ="/">
            <div className ="logo">
                <img src ={Logo} alt=""/>
                <p>SOULMADE!</p>
            </div>
            </Link>
            
            <div className ="headerOptions">
            <div className = "headerOptions_menu">
                <Link to ="/store">Product</Link>
                <Link to ="/about">About</Link>
                <button className ="loginBtn" onClick = {()=>login_logout()}>
                    {isLogin?"Log out" : "Log in"}
                    </button>
                
            </div>
                <Link to ="/cart">
                <div className ="headerOptions__icon">
                    <ShoppingCartOutlined style={{fontSize : "26px"}}/>
                    <span>0</span>
                </div>
                </Link>
                <Link to ="/wishlist">
                <div className ="headerOptions__icon">
                    <FavoriteBorderOutlined style={{fontSize : "26px"}} />
                    <span>0</span>
                    </div>
                </Link>
                {/* <div className ="headerOptions__icon"><MenuOutlined/></div> */}
            </div>
            
        </div>
    )
}
