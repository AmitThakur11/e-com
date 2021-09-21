import React from 'react'
import "./style.css"
import {useAuth} from "../../context/auth/index"
import {Link} from "react-router-dom"
export default function Home() {
    const {login} = useAuth();
    console.log(login)
    return (
        <div className ="home">
            <div className ="homeBanner">
                
                    <Link to ="/store">
                        <div className = "homeBanner__btn">Shop</div>
                    </Link>
                
        </div>
        </div>
    )
}
