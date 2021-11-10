import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"
export default function Home() {
    return (
        <div className ="home">
            <div className ="innerHome">
                <div className ="bannerSection">
                    <div className ="imageContainer">
                    </div>
                    <div className ="bannerDetail">
                        <div className ="detail">
                            
                            Tshirt's made for your soul .
                           
                        </div>
                        <Link to="/store">
                            <button className ="shopBtn">Shop.</button>
                        </Link>
                    </div>
                </div>

                <div className ="features">
                    <div className="innerFeatures">
                    <div className="featureBox">
                        <img src="https://cdn-icons-png.flaticon.com/512/4411/4411347.png" alt="/"/>
                        <div className="name">100% Cotton</div>
                    </div>
                    <div className="featureBox">
                        <img src="https://cdn-icons.flaticon.com/png/512/717/premium/717492.png?token=exp=1636530091~hmac=863fcea16ebadd34283a71db224fea44" alt="/"/>
                        <div className="name">Regular fit</div>
                    </div>
                    <div className="featureBox">
                        <img src="https://cdn-icons-png.flaticon.com/512/1075/1075355.png" alt="/"/>
                        <div className="name">Bio washed</div>
                    </div>
                    <div className="featureBox">
                        <img src="https://cdn-icons-png.flaticon.com/512/3501/3501844.png" alt="/"/>
                        <div className="name">180 GSM</div>
                    </div>
                    <div className="featureBox">
                        <img src="https://cdn-icons-png.flaticon.com/512/5321/5321510.png" alt="/"/>
                        <div className="name">Breathable</div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
