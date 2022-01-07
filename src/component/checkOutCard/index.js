import "./style.css";
import { useNavigate } from "react-router-dom";
export default function CheckOutCard({ cart }) {
  const navigate = useNavigate();
  const total =
    cart &&
    cart.reduce((acc, item) => {
      const {
        productId: { price, discount },
        qty,
      } = item;

      return (price - discount) * qty + acc;
    }, 0);
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
        <div className="checkoutTotal">{total} Rs</div>
        <button onClick={() => navigate("/address")}>Checkout</button>
      </div>
    </div>
  );
}
