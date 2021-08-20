import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import thunk from "redux-thunk";

import {
  userRegisterReducer,
  userSigninReducer,
} from "../reducers/userReducer";

import { cartReducer } from "../reducers/cartReducer";

import {
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
} from "../reducers/productReducer";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  statusUpadateReducer,
  orderListReducer,
} from "../reducers/orderReducer";

const reducer = combineReducers({
  userLogin: userSigninReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  cart: cartReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  statusUpdate: statusUpadateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
