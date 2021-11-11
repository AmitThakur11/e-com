import React, { useState } from "react";
import "./style.css";
import { useData } from "../../context/data/index";
// import { Filter } from "@material-ui/icons";
export default function SideBar() {
  const { filterDispatch, filterState } = useData();
  const [range, setRange] = useState(2000);
  return (
    <div className="sortFilter">
      <div className="sortFilter__sort">
        <div className="sortFilter_title">Sort</div>
        <label>
          <input
            name="sort"
            type="radio"
            value={filterState.sortBy && "High to Low"}
            checked={filterState.sortBy === "HIGH TO LOW"}
            onClick={() =>
              filterDispatch({ type: "SORT", payload: "HIGH TO LOW" })
            }
          />
          High to Low
        </label>
        <label>
          <input
            name="sort"
            type="radio"
            value={filterState.sortBy && "Low to High"}
            checked={filterState.sortBy === "LOW TO HIGH"}
            onClick={() =>
              filterDispatch({ type: "SORT", payload: "LOW TO HIGH" })
            }
          />
          Low to High
        </label>
      </div>

      <div className="sortFilter__filter">
        <div className="sortFilter_title">Filter</div>
        <label>
          <input
            checked={filterState.fastDelivery}
            type="checkbox"
            onChange={() => filterDispatch({ type: "FAST DELEIVERY" })}
          />
          fast deleivery
        </label>

        <label>
          <input
            checked={filterState.outOfStock}
            type="checkbox"
            onChange={() => filterDispatch({ type: "OUT OF STOCK" })}
          />
          Out of stock
        </label>
        <div>Price</div>
        <label>
          <input
            className="range"
            type="range"
            min="50"
            max="2000"
            value={filterState.priceRange}
            onChange={(e) => {
              setRange(e.target.value);
              filterDispatch({ type: "PRICE RANGE", payload: range });
            }}
          />
          {range} Rs
        </label>
        <div>
          brand <br />
          <label>
            <input
              name="brand"
              type="radio"
              checked={filterState.brand === "supervek"}
              onChange={() =>
                filterDispatch({ type: "BRAND", payload: "supervek" })
              }
            />
            supervek
          </label>
          <br />
          <label>
            <input
              name="brand"
              type="radio"
              value={filterState.brand}
              checked={filterState.brand === "urban monkey"}
              onChange={() =>
                filterDispatch({ type: "BRAND", payload: "urban monkey" })
              }
            />
            urban monkey
          </label>
        </div>
        <button
          className="sortFilter__clearBtn"
          onClick={() => {
            filterDispatch({ type: "CLEAR" });
            setRange(filterState.priceRange);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
