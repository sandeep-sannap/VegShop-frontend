import React from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Message from "../components/Message";

import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";

export default function CartScreen({ history }) {
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row className="mt-5 ">
      <Col lg={8} className="justify-content-center align-center ">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <Link to="/" style={{ textDecoration: "none", color: "red" }}>
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush" className="shadow">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="my-5">
        <Card>
          <ListGroup variant="flush" className="shadow">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
