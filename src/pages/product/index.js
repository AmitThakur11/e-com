
import { useParams } from "react-router-dom";
import "./style.css";

import { SizeList, Features } from "../../component/productDecription/index";
import { useData } from "../../context/data";
const Product = () => {
  const { id } = useParams();
  console.log(id)
  const { productList } = useData();
  return (
    <section className="product-detail-container">
      {productList.map((data) => {
        return (
          <>
            {data._id === id && (
              <div key = {data._id} className="product-detail-card">
                <img src={data.img} alt="/" />

                <div className="product-details">
                  <div className="product-name">{data.name}</div>
                  <div className="product-price">{data.price}₹</div>
                  <SizeList size={data.size} />
                  <button className="wish-btn">Move to wishlist</button>
                  <div className="product-description">{data.description}</div>
                  <Features features={data.features} />
                </div>
              </div>
            )}
          </>
        );
      })}
    </section>
  );
};

export default Product;