import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Message from "../components/Message";
import StripeCheckout from "react-stripe-checkout";

import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { baseUrl, imageUrl } from "../util/util";
import axios from "axios";

const key = process.env.REACT_APP_STRIPE;

export default function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.userLogin);

  cart.itemsTotalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  cart.shppingPrice = cart.itemsTotalPrice > 100 ? 100 : 0;

  cart.taxPrice = Number((0.15 * cart.itemsTotalPrice).toFixed(2));

  cart.orderTotal =
    Number(cart.itemsTotalPrice) +
    Number(cart.shppingPrice) +
    Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, error } = orderCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!cart.shippingAddress) {
      history.push("/shipping");
    }
    if (success) {
      history.push("/myorders");
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success, dispatch]);

  const placeOrderHandler = (stripeToken) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: "stripe",
        itemsTotalPrice: cart.itemsTotalPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        orderTotal: cart.orderTotal,
        tokenId: stripeToken,
      })
    );
  };

  const onToken = (token) => {
    placeOrderHandler(token.id);
  };

  return (
    <section className="mt-5">
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping:</h2>
                  <p>
                    <strong>Address:</strong>
                    {cart.shippingAddress?.address}
                    {cart.shippingAddress?.city}{" "}
                    {cart.shippingAddress?.postalCode}
                    {cart.shippingAddress?.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method:</h2>
                  <strong>Method:</strong>
                  Stripe
                  <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message> Your cart is empty </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item>
                          <Row>
                            <Col md={2}>
                              <Image
                                // src={`https://vegshop1.herokuapp.com/${item.image}`}
                                alt={item.name}
                                src={`${imageUrl}${item.image}`}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <p>{item.name}</p>
                            </Col>
                            <Col md={4}>
                              {item.quantity} x ₹{item.price} = ₹
                              {item.quantity * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>₹{cart.itemsTotalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹{cart.shppingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>₹{cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>₹{cart.orderTotal}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <StripeCheckout
                      name="VegShop" // the pop-in header title
                      description="Order fresh vegetables and fruits" // the pop-in header subtitle
                      amount={cart.orderTotal * 100} // cents
                      currency="INR"
                      // stripeKey={key}
                      stripeKey="pk_test_51JQ9mISDluWntsjurQawUiReuX0Nms3zYfjeG7A5riCIjE9Oys0UKCyDmKG4r08zyDalhh30pRyZm4NC1X9jTKuh00RafV4U6n"
                      token={onToken}
                      disabled={cart.cartItems.length === 0}
                    >
                      <Button
                        type="button"
                        className="btn-block"
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </StripeCheckout>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </section>
  );
}
