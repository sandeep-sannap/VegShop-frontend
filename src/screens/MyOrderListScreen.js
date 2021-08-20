import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";

export default function MyOrderListScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());
    }
  }, [history, userInfo, dispatch]);
  return (
    <section className="mt-5">
      <h2>My Orders</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length > 0 ? (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center "
        >
          <thead>
            <tr>
              <th>ORDER</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <p>{order._id}</p>
                  <div>
                    {order.orderItems.map((item) => {
                      return (
                        <>
                          <p>
                            {item.name}-{item.quantity} Kg
                          </p>
                        </>
                      );
                    })}
                  </div>
                </td>
                <td>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>

                <td>₹{order.orderTotal}</td>

                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message variant="info">
          You don't ordered yet.
          <Link to="/" style={{ textDecoration: "none", paddingLeft: "5px" }}>
            Order Now
          </Link>
        </Message>
      )}
    </section>
  );
}
