import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
  CART_DECREMENT_ITEM,
  CART_INCREMENT_ITEM,
} from "../constants/cartConstants";

export const addToCart = (product) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (_id) => async (dispatch, getState) => {
  console.log("remove cart");
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: _id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const decrementItem = (_id) => (dispatch, getState) => {
  console.log("decrement");
  dispatch({
    type: CART_DECREMENT_ITEM,
    payload: _id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const incrementItem = (_id) => (dispatch, getState) => {
  dispatch({
    type: CART_INCREMENT_ITEM,
    payload: _id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  console.log("clear cart");
  dispatch({
    type: CART_CLEAR_ITEMS,
  });
  localStorage.removeItem("cartItems");
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
