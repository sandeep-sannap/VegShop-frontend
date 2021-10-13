import axios from "axios";
import { baseUrl } from "../util/util";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

//User Register Actions

export const userSignup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  try {
    const { data } = await axios.post(`${baseUrl}auth/register`, {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Sign In Action
export const userSignin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  });
  try {
    const { data } = await axios.post(`${baseUrl}auth/login`, {
      email,
      password,
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_SIGNOUT });
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
  // dispatch({ type: USER_LIST_RESET })
  document.location.href = "/login";
};
