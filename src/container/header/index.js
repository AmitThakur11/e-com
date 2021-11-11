import "./style.css"
import Logo from "../../image/logo.png";
import {useState} from "react";
import {Link} from "react-router-dom"
import {ShoppingCartOutlined , FavoriteBorderOutlined , MenuOutlined } from '@material-ui/icons';
import { useNavigate } from "react-router";
import {useAuth} from "../../context/auth/index"
import {useUser} from "../../context/user/index"
import axios from "axios"
import {toast} from "react-toastify"
export default function Header() {
    const navigate = useNavigate();
    const {isLogin , setLogin ,  setLoading} = useAuth();
    const {user:{wishlist ,cart},initialUser , userDispatch} = useUser()
    const [menuToggle,setMenuToggle] = useState(false)
  
    const login_logout= ()=>{
        if(isLogin){
            setLoading(true)
            localStorage.removeItem("token")
            delete axios.defaults.headers.common["Authorization"];
            setLogin(false)
            setLoading(false)
            userDispatch({type :"LOAD USER" , payload : {data : initialUser}})
            navigate("/store");
            toast.success("user logged out ")
        }else{ 
            navigate("/login")
        }
        setMenuToggle(false)
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
            <div className = {!menuToggle ? "headerOptions_menu" :"headerOptions_menuActive"}>
                <Link to ="/store" onClick = {()=>setMenuToggle(false)}>Product</Link>
                <Link to ="/order" onClick = {()=>setMenuToggle(false)}>Order</Link>
                
                <button className ="loginBtn" onClick = {()=>login_logout()}>
                    {localStorage.getItem('token')?"Log out" : "Log in"}
                    </button>
                
            </div>
                <Link to ="/cart">
                <div className ="headerOptions__icon">
                    <ShoppingCartOutlined style={{fontSize : "26px"}}/>
                    {cart.length ? <span>{cart.length}</span>: ""}
                </div>
                </Link>
                <Link to ="/wishlist">
                <div className ="headerOptions__icon">
                    <FavoriteBorderOutlined style={{fontSize : "26px"}} />
                    {wishlist.length?<span>{wishlist.length}</span> : ""}
                    </div>
                </Link>
                <div className ="headerOptions__icon menuIcon" ><MenuOutlined onClick ={()=>{
                    console.log(menuToggle)
                    setMenuToggle((menu)=>!menu)
                    
                }
                 } /></div> 
            </div>
            
        </div>
    )
}
