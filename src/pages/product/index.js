import { useParams } from "react-router-dom";
import "./style.css";

import { SizeList, Features } from "../../component/productDecription/index";
import { useData } from "../../context/data";
import { useUser } from "../../context/user/index";
import { addToWishlist, removeFromWishlist } from "../../apiCalls";
import { useAuth } from "../../context/auth";

const Product = () => {
  const { id } = useParams();
  const {
    userDispatch,
    user: { wishlist },
    setModal,
  } = useUser();
  const { productList } = useData();
  const { setLoading, isLogin  ,loading } = useAuth();
  const likedOrNot = wishlist.find((item) => item._id === id);

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
                  <div className="product-price">{data.price}₹</div>
                  <SizeList size={data.size} />
                  <button
                    className="wish-btn"
                    onClick={() => {
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
                    }}
                  >
                    {!likedOrNot ? "Move to wishlist" : "Remove from wishlist"}
                  </button>
                  <div className="product-description">{data.description}</div>
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
