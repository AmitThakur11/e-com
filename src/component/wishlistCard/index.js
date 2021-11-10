import { useUser } from "../../context/user/index";
import {moveToCart , removeFromWishlist} from "../../apiCalls"
import {useAuth} from "../../context/auth"


const WishlistCard = ({ wishlist }) => {
  const {userDispatch} = useUser();
  const {setLoading} = useAuth();

  return (
    <section className="x-horizontal-card">
      <div className="x-horizontal-card-content">
        <img src={wishlist.img} alt="female-tshirt-2" border="0" />
        <div className="x-hcontent">
          <div className="x-htitle">{wishlist.name}</div>
          <div className="x-hcard-price">
            {wishlist.price - wishlist.discount}
            <span>({wishlist.price})`</span>
          </div>
        </div>
      </div>
      <i
        className="fa fa-trash-o x-hcard-icon"
        onClick={() => removeFromWishlist(wishlist._id , userDispatch, setLoading)  }
      ></i>
      <button
        onClick={() =>moveToCart(wishlist._id , userDispatch, setLoading) }
        className="x-hcard-btn"
      >
        ADD TO CART
      </button>
    </section>
  );
};

export default WishlistCard;