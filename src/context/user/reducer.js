export const initialUser = {
    username: "",
    email : "",
    wishlist: [],
    cart: [],
    address: [],
    order: [],
    defaultAddress: null,
  };

  export const userReducer = (user, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOAD USER": {
        const {
          data: { username, email , wishlist, cart, address, order },
        } = payload;
        return {
          ...user,
          username: username,
          email  : email,
          wishlist: wishlist,
          cart: cart,
          address: address,
          order: order,
        };
      }
      case "UPDATE WISHLIST": {
        return { ...user, wishlist: payload };
      }
      case "UPDATE CART": {
        return { ...user, cart: payload };
      }
      case "UPDATE ADDRESS": {
        return { ...user, address: payload };
      }
      case "ADD ORDER": {
        return { ...user, order: payload , cart : [] };
      }
      case "REMOVE ORDER": {
        return { ...user, order: payload };
      }
      case "SELECT ADDRESS": {
        return { ...user, defaultAddress: payload };
      }
      default: {
        return user;
      }
    }
  };