import { v4 as uuidv4 } from "uuid";
import "./style.css";
export const SizeList = ({ size }) => {
  return (
    <div className="size-list">
      {size.map((data) => {
        return (
          <div key={uuidv4()} className="size">
            <span>{data}</span>
          </div>
        );
      })}
    </div>
  );
};

export const Features = ({ features }) => {
  return (
    <ul className="product-features">
      <span>Features</span>
      {features.map((feature) => {
        return (
          <li key={uuidv4()} className="feature">
            {feature}
          </li>
        );
      })}
    </ul>
  );
};
