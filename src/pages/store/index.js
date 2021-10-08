import { useData } from "../../context/data/index";
import { SideBar } from "../../container";
import "./style.css";
import {useState} from "react"
import { ProductCard } from "../../component";
import {useAuth} from "../../context/auth/index"
import {RiFilter2Line , RiFilter2Fill} from "react-icons/ri"


export default function Store() {
    const {productList } = useData();
    const {loading} = useAuth();
    const [filter, setFilter] = useState(false)
  return (
    <div className="storeLayout">
      <div className="sideBar">
        <SideBar />
      </div>
      <div onClick = {()=>setFilter(!filter)}>
        {filter?<RiFilter2Fill/>:<RiFilter2Line/>}
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
