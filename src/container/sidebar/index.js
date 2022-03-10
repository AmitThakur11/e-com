import React, { useState } from "react";
import "./style.css";
import { useData } from "../../context/data/index";

export default function SideBar() {
  const { filterDispatch, filterState, originalList } = useData();
  const [range, setRange] = useState(2000);

  const brandsList = originalList?.reduce((acc,el)=>{
    if(!acc?.includes(el.brand)){
      return [...acc,el.brand]
    }
    return acc



  },[])

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
        <p className ="sidebar__subHeader">Price</p>
        <label className ="rangeContainer">
          <input
            className="range"
            type="range"
            min="50"
            max="2000"
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              filterDispatch({ type: "PRICE RANGE", payload: range });
            }}
          />
          {range} Rs
        </label>
        <div>
          <p className ="sidebar__subHeader">Brand </p>
          {
            brandsList.map((brand)=>{
              return (
                <div>
            <input
              name="brand"
              type="radio"

              checked={filterState.brand === brand}
              onChange={() =>
                filterDispatch({ type: "BRAND", payload: brand })
              }
            />
            {brand}
          </div>
              )
            })
          }
          
        </div>
        <button
          className="sortFilter__clearBtn"
          onClick={() => {
            filterDispatch({ type: "CLEAR" });
            setRange(2000);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
