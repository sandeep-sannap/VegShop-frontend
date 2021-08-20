import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
  CART_DECREMENT_ITEM,
  CART_INCREMENT_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case CART_DECREMENT_ITEM:
      const decrementedCart = state.cartItems
        .map((curElem) => {
          if (curElem._id === action.payload) {
            return { ...curElem, quantity: curElem.quantity - 1 };
          }
          return curElem;
        })
        .filter((curElem) => curElem.quantity !== 0);

      return { ...state, cartItems: decrementedCart };

    case CART_INCREMENT_ITEM:
      const incrementedCart = state.cartItems.map((curElem) => {
        if (curElem._id === action.payload) {
          return { ...curElem, quantity: curElem.quantity + 1 };
        }
        return curElem;
      });

      return { ...state, cartItems: incrementedCart };

    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      let newItems = null;

      if (existItem) {
        const items = state.cartItems.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        newItems = [...items];
      } else {
        newItems = [...state.cartItems, action.payload];
      }

      return {
        ...state,
        cartItems: newItems,
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalItem: 0,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
