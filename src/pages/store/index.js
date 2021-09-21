import { useData } from "../../context/data/index";
import { SideBar } from "../../container";
import "./style.css";
import { ProductCard } from "../../component";
import {useAuth} from "../../context/auth/index"

export default function Store() {
    const {productList } = useData();
    const {loading} = useAuth()
  return (
    <div className="storeLayout">
      <div className="sideBar">
        <SideBar />
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
