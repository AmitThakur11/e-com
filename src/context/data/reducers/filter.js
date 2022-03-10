export const initialState = {
  showAll: true,
  sortBy: null,
  fastDeleivery: false,
  outOfStock: false,
  priceRange: 2000,
  brand: null,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT": {
      return { ...state, sortBy: action.payload };
    }
    case "CLEAR": {
      return initialState;
    }
    case "FAST DELEIVERY":
      return { ...state, fastDeleivery: !state.fastDeleivery };
    case "OUT OF STOCK":
      return { ...state, outOfStock: !state.outOfStock };
    case "PRICE RANGE":
      return { ...state, priceRange: action.payload };
    case "BRAND":
      return { ...state, brand: action.payload };
    default:
      return state;
  }
};

export const sortData = (product, state) => {
  const { sortBy } = state;
  if (sortBy && sortBy === "HIGH TO LOW") {
    return product.sort((item1, item2) => item2.price - item1.price);
  }
  if (sortBy && sortBy === "LOW TO HIGH") {
    return product.sort((item1, item2) => item1.price - item2.price);
  }
  return product;
};
export const filteredData = (product, state) => {
  const { fastDeleivery, outOfStock, priceRange, brand } = state;
  
  return product.filter((item) => (fastDeleivery ? item.fastDeleivery === true :  true))
    .filter((item) => (outOfStock ? item.stock === 0 : true))
    .filter((item) => (priceRange ? item.price < priceRange : true))
    .filter((item) => (brand ? item.brand === brand : true));
};
