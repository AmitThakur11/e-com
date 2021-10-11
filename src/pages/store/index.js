import { useData } from "../../context/data/index";
import { SideBar } from "../../container";
import "./style.css";
import {useState} from "react"
import { ProductCard } from "../../component";
import {useAuth} from "../../context/auth/index"
import {RiFilter2Line , RiFilter2Fill} from "react-icons/ri"


export default function Store() {
    const {productList , sidebar , setSidebar } = useData();
    const {loading} = useAuth();
    
  return (
    <div className="storeLayout">
      <div className={sidebar ? "sideBar" : "sidebar active"} >
        <SideBar  />
      </div>
      <div className ="filterIcon" onClick = {()=>setSidebar(!sidebar)}>
        {sidebar?<RiFilter2Fill className ="filterIcon-item" />:<RiFilter2Line className ="filterIcon-item" />}
      </div>
      <div className="productsWrapper">
        <div className="productsWrapper__box">
          {!loading && <div className ="wrappedProducts">{
              productList.map((product)=>{
                  return(
                    <ProductCard product = {product} key = {product._id}/>
                  )
              })
          }</div>}
        </div>
      </div>
    </div>
  );
}
