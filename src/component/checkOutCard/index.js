import "./style.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
export default function CheckOutCard() {
  const navigate = useNavigate();
  const {
    user: { cart },orderValue
  } = useUser();
 
  return (
    <div className="checkoutBlock">
      <div className="checkoutProduct">
        {cart.map((product) => {
          return (
            <div className="checkout" key={product.productId._id}>
              <div>
                <strong>{product.productId.name} *</strong>
                <span style={{ color: "red" }}>{product.qty} </span> :{" "}
                {(product.productId.price - product.productId.discount) *
                  product.qty}{" "}
                Rs
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkoutBtn">
        <div className="checkoutTotal">{orderValue(cart)} Rs</div>
        <button onClick={() => navigate("/address")}>Checkout</button>
      </div>
    </div>
  );
}
