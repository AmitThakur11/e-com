import React from "react";
import "./style.css";
import { Link , useNavigate } from "react-router-dom";
import { features } from "./utils";
export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home">
      <div className="innerHome">
        <section className="bannerSection">
          <div className="imageContainer">
          </div>
          <section className="bannerDetail">
            <div className="detail">
              Tshirt's <span>made</span> for your <span>soul</span> .
            </div>
            <Link to="/store">
              <button className="shopBtn">Shop.</button>
            </Link>
          </section>
        </section>

        <section className="features">
          <div className="innerFeatures">
            {features.map(({ id, img, name }) => {
              return (
                <div key ={id} onClick ={()=>navigate("/store")} className="featureBox">
                  <img
                    src={img}
                    alt="features"
                  />
                  <div className="name">{name}</div>
                </div>
              );
            })}
            
          </div>
        </section>
        
      </div>
    </div>
  );
}
