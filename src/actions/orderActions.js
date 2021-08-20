import axios from "axios";
import { baseUrl } from "../util/util";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  UPDATE_ORDER_LIST,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { userInfo } = getState().userLogin;

    const { data } = await axios.post(`${baseUrl}order/add-order`, order, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  console.log("LIST ORDERS:::::::");
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`${baseUrl}order`, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderStatus =
  (_id, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_UPDATE_STATUS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${baseUrl}order/${_id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      console.log("status upadate", data);
      dispatch({
        type: ORDER_UPDATE_STATUS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ORDER_UPDATE_STATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateOrders = (data) => async (dispatch, getState) => {
  const { orders } = getState().orderList;
  orders.unshift(data);

  dispatch({
    type: UPDATE_ORDER_LIST,
    payload: orders,
  });
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/order/myorders`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${baseUrl}order/${id}`,

      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
