import React from "react";
import "./style.css";
import Loading from "../../image/loader1.gif";
export default function Loader() {
  return (
    <div className="loader ">
      <img src={Loading} alt="/" />
    </div>
  );
}
