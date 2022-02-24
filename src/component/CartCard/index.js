import { useUser } from "../../context/user";
import { useAuth } from "../../context/auth";
import { removeFromCart, moveToWishlist, updateQty } from "../../apiCalls";
import "./style.css";
const CartCard = ({ cart }) => {
  const { productId, qty } = cart;
  const { userDispatch } = useUser();
  const { setLoading } = useAuth();
  return (
    <section className="x-cart-card" key  ={productId._id}>
      <img src={productId.img} alt="women-pink-t-shirt-back" border="0" />
      <div className="x-cart-content">
        <div className="x-cart-title">{productId.name}</div>
        <div className="x-cart-price">
          Rs.{productId.price - productId.discount}{" "}
          <span>(Rs.{productId.price})</span>
        </div>
        <div className="x-cart-qty-section">
          <i
            className="fa fa-minus-circle x-cart-qty-sub"
            onClick={() =>
              updateQty(productId._id, userDispatch, setLoading, {
                type: "decrement",
                qty: qty,
              })
            }
          ></i>
          <div className="x-cart-qty">{qty}</div>
          <i
            className="fa fa-plus-circle x-cart-qty-add"
            onClick={() =>
              updateQty(productId._id, userDispatch, setLoading, {
                type: "increment",
                qty: qty,
              })
            }
          ></i>
        </div>
        <div className="x-cart-btn-section">
          <button
            className="x-cart-btn"
            onClick={() =>
              removeFromCart(productId._id, userDispatch, setLoading)
            }
          >
            Delete
          </button>
          <button
            className="x-cart-btn"
            onClick={() =>
              moveToWishlist(productId._id, userDispatch, setLoading)
            }
          >
            Move to wishist
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
