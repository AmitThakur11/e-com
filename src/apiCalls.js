import { toast } from "react-toastify";
import axios from "axios";

export const loadProducts = async (setLoading, setProductList) => {
  try {
    setLoading(true);
    const response = await axios.get("/product");
    setProductList(response.data.product);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    toast.error(err.message);
  }
};

export const loadUser = async (setLoading, setLogin, userDispatch) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/user_data/userinfo");

    if (data.success) {
      setLoading(false);
      userDispatch({ type: "LOAD USER", payload: data });
      return;
    }
  } catch (err) {
    localStorage.getItem("login") && toast.info("session expired");
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    setLogin(false);
    setLoading(false);
  }
};

export const getLogin = async (
  userInput,
  setLoading,
  setLogin,
  navigate,
  userDispatch
) => {
  try {
    const { email, password } = userInput;
    if (!email) {
      return toast.error("Empty email");
    }
    if (!password) {
      return toast.error("Empty password ");
    }
    setLoading(true);
    const { data } = await axios.post("/user/login", {
      email: email,
      password: password,
    });
    if (data.success) {
      setLogin(true);
      setLoading(false);
      navigate("/store");
      toast.success(data.msg);
      localStorage.setItem("token", data.token);
      localStorage.setItem("login", true);
      axios.defaults.headers.common["Authorization"] = data.token;
      userDispatch({ type: "LOAD USER", payload: { data: data.user[0] } });
      return data;
    }
  } catch (err) {
    setLoading(false);
    toast.error(err.response?.data?.msg);
  }
};

export const register = async (userInput, setLoading, navigate) => {
  const { username, email, password, cpassword } = userInput;
  try {
    if (username && email && password && cpassword) {
      setLoading(true);

      const { data } = await axios.post("/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      setLoading(false);
      if (data.success) {
        navigate("/login");
        return toast.success(data.msg);
      }
    }
    setLoading(false);
    toast.error("Input field empty");
  } catch (err) {
    setLoading(false);
    toast.error(err.response.data.msg);
  }
};

export const addToWishlist = async (product_id, userDispatch, setLoading) => {
  try {
    const {
      data: { msg, success, data },
    } = await axios.post(`user_data/wishlist/${product_id}`);

    if (success) {
      toast.success(msg);
      return userDispatch({
        type: "UPDATE WISHLIST",
        payload: data.wishlist,
      });
    }
  } catch (err) {
    toast.error("something went wrong");
  }
};

export const removeFromWishlist = async (
  product_id,
  userDispatch,
  setLoading
) => {
  try {
    const {
      data: { msg, success, data },
    } = await axios.delete(`user_data/wishlist/${product_id}`);
    if (success) {
      toast.success(msg);
      userDispatch({ type: "UPDATE WISHLIST", payload: data.wishlist });
    }
  } catch (err) {
    toast.error(err.message);
  }
};

export const addToCart = async (product_id, userDispatch, setLoading) => {
  try {
    const cartResponse = await axios.post(`/user_data/cart/${product_id}`);

    if (cartResponse.data.success) {
      userDispatch({
        type: "UPDATE CART",
        payload: cartResponse.data.data.cart,
      });

      toast.success("Cart  updated");
      return cartResponse;
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const moveToCart = async (product_id, userDispatch, setLoading) => {
  try {
    const cartResponse = await axios.post(`/user_data/cart/${product_id}`);
    if (cartResponse.data.success) {
      userDispatch({
        type: "UPDATE CART",
        payload: cartResponse.data.data.cart,
      });
      toast.success("cart updated");
      const wishlistResponse = await axios.delete(
        `user_data/wishlist/${product_id}`
      );
      if (wishlistResponse.data.success) {
        userDispatch({
          type: "UPDATE WISHLIST",
          payload: wishlistResponse.data.data.wishlist,
        });
      }
    }
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};

export const removeFromCart = async (product_id, userDispatch, setLoading) => {
  try {
    const { data } = await axios.delete(`/user_data/cart/${product_id}`);
    if (data.success) {
      toast.success(data.msg);
      userDispatch({ type: "UPDATE CART", payload: data.data.cart });
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const updateQty = async (
  product_id,
  userDispatch,
  setLoading,
  action
) => {
  const { type, qty } = action;

  try {
    if (qty === 1 && type === "decrement") {
      return await removeFromCart(product_id, userDispatch, setLoading);
    }

    const { data } = await axios.post(
      `/user_data/cart/${product_id}/update_qty`,
      {
        payload: type,
      }
    );

    if (data.success) {
      toast(data.msg);

      userDispatch({ type: "UPDATE CART", payload: data.data });
    }
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.msg);
  }
};

export const moveToWishlist = async (product_id, userDispatch, setLoading) => {
  try {
    const wishlistResponse = await axios.post(
      `/user_data/wishlist/${product_id}`
    );
    if (wishlistResponse.data.success) {
      userDispatch({
        type: "UPDATE WISHLIST",
        payload: wishlistResponse.data.data.wishlist,
      });
      const { data } = await axios.delete(`/user_data/cart/${product_id}`);
      if (data.success) {
        toast.success("Cart updated");
        userDispatch({ type: "UPDATE CART", payload: data.data.cart });
      }
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const addAddress = async (address_data, userDispatch, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.post("/user_data/address", {
      address: address_data,
    });
    setLoading(false);
    if (data.success) {
      userDispatch({ type: "UPDATE ADDRESS", payload: data.data });
      return toast.success(data.msg);
    }
  } catch (error) {
    setLoading(false);
    toast(error.response.data.msg);
  }
};

export const addDefaultAddress = async (
  address_id,
  userDispatch,
  setLoading
) => {
  try {
    setLoading(true);
    const { data } = await axios.post(
      `/user_data/address/${address_id}/default`
    );
    setLoading(false);
    if (data.success) {
      userDispatch({ type: "UPDATE ADDRESS", payload: data.data });
      return toast.success(data.msg);
    }
  } catch (error) {
    setLoading(false);
    toast(error.response.data.msg);
  }
};

export const removeAddress = async (address_id, userDispatch, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.delete(`/user_data/address/${address_id}`);
    setLoading(false);
    if (data.success) {
      userDispatch({ type: "UPDATE ADDRESS", payload: data.data });
      return toast.success(data.msg);
    }
  } catch (error) {
    setLoading(false);
    toast(error.response.data.msg);
  }
};

export const updateAddress = async (
  address_id,
  userDispatch,
  setLoading,
  address
) => {
  try {
    const { data } = await axios.post(`user_data/address/${address_id}`, {
      newAddress: address,
    });
    if (data.success) {
      userDispatch({ type: "UPDATE ADDRESS", payload: data.data.address });
      return toast.success(data.msg);
    }
    toast.error(data.msg);
  } catch (error) {
    toast(error.response.data.msg);
  }
};

export const addOrder = async (
  navigate,
  userDispatch,
  setLoading,
  paymentData
) => {
  try {
    setLoading(true);
    const { data } = await axios.post("user_data/order/add", {
      paymentData: paymentData,
    });
    setLoading(false);
    if (data.success) {
      userDispatch({
        type: "ADD ORDER",
        payload: data.data,
      });
      navigate("/order");
      return toast.success("Order Placed");
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};

export const cancelOrder = async (orderId, userDispatch, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.delete(`user_data/order/${orderId}/cancel`);
    setLoading(false);
    if (data.success) {
      userDispatch({ type: "REMOVE ORDER", payload: data.data.order });
      return toast.success(data.msg);
    }
  } catch (err) {
    setLoading(false);
    toast.error(err.response);
  }
};

export const addProduct = async (setLoading, payload) => {
  try {
    setLoading(true);
    const { data } = await axios.post("/product/add", payload);
    setLoading(false);
    console.log(data)
    if (data.success) {
      toast.success("product added to store");
    }
  } catch (err) {
    toast.error(err.response);
  }
};
