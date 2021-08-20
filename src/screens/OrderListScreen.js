import React, { useEffect, useState } from "react";
import { Table, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";

import Loader from "../components/Loader";
import Message from "../components/Message";

import io from "socket.io-client";
import { updateOrders } from "../actions/orderActions";
import Order from "../components/Order";

export default function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { orders, loading, error } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      history.push("/login");
    }
    dispatch(listOrders());
  }, [userInfo, history]);

  return (
    <section className="mt-5">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDERS</th>
              <th>CUSTOMER</th>
              <th>DATE</th>

              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>STATUS</th>

              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
}
