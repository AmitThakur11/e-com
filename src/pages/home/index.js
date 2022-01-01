import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { features } from "./utils";
export default function Home() {
  return (
    <div className="home">
      <div className="innerHome">
        <div className="bannerSection">
          <div className="imageContainer"></div>
          <div className="bannerDetail">
            <div className="detail">
              Tshirt's <span>made</span> for your <span>soul</span> .
            </div>
            <Link to="/store">
              <button className="shopBtn">Shop.</button>
            </Link>
          </div>
        </div>

        <div className="features">
          <div className="innerFeatures">
            {features.map(({ id, img, name }) => {
              return (
                <div className="featureBox">
                  <img
                    src={img}
                    alt="features"
                  />
                  <div className="name">{name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
