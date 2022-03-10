import { useParams } from "react-router-dom";
import "./style.css";

import { SizeList, Features } from "../../component/productDecription/index";
import { useData } from "../../context/data";
import { useUser } from "../../context/user/index";
import { addToWishlist, removeFromWishlist , addToCart,removeFromCart } from "../../apiCalls";
import { useAuth } from "../../context/auth";
import {useNavigate} from "react-router-dom"

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const {
    userDispatch,
    user: { wishlist ,cart },
    setModal,
  } = useUser();
  const { productList } = useData();
  const { setLoading, isLogin  ,loading } = useAuth();
  const likedOrNot = wishlist.find((item) => item._id === id);
  const inCartOrNot = cart.find((item) => item.productId._id === id);
  

  const wishlistAction = (data)=>{

      if (!isLogin) {
        return setModal(true);
      }

      !likedOrNot
        ? addToWishlist(data._id, userDispatch, setLoading)
        : removeFromWishlist(
            data._id,
            userDispatch,
            setLoading
          );
    
  }

  const cartAction = (product)=>{
    console.log(product)
    console.log(inCartOrNot)
    if (!isLogin) {
      return setModal(true);
    }
    inCartOrNot? removeFromCart(product._id, userDispatch, setLoading):addToCart(product._id, userDispatch, setLoading)
          
  }

  return (
    <section className="product-detail-container">
      <>{
        loading && <h1>loading</h1>
      }
      {!loading &&  productList.map((data) => {
        return (
          <div key ={data._id}>
            {data._id === id && (
              <div key={data._id} className="product-detail-card">
                <img src={data.img} alt="/" />

                <div className="product-details">
                  <div className="product-name">{data.name}</div>
                  <div className="product-price">{data.price} Rs</div>
                  <SizeList size={data.size} />
                  <div className ="btn-container">
                  <button
                    className="wish-btn"
                    onClick={() => wishlistAction(data)}
                  >
                    {!likedOrNot ? "Add to wishlist" : "Remove from wishlist"}
                  </button>
                  <button className="cart-btn" onClick={() => cartAction(data)}>
        {inCartOrNot ?
         "Remove from cart":"Add to cart"}
      </button>

                  </div>
                  <div className="product-description">{data.description}</div>
                  <button className="sellerBtn" onClick = {()=>navigate(`/profile/${data.seller}`)}>
                    Seller
                  </button>
                  <Features features={data.features} />
                </div>
              </div>
            )}
          </div>
        );
      })}
      </>
    </section>
    
  );
};

export default Product;
