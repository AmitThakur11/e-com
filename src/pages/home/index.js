import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"
export default function Home() {
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
