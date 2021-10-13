import React from "react";
import { useDispatch } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "../actions/cartActions";

import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { imageUrl } from "../util/util";

export default function CartItem(props) {
  const { _id, price, image, quantity, name } = props.item;

  const dispatch = useDispatch();

  const decrement = (id) => {
    dispatch(decrementItem(id));
  };

  const addItem = (id) => {
    dispatch(incrementItem(id));
  };

  const clear = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <ListGroup.Item>
      <Row className="justify-content-center align-items-center">
        <Col md={2}>
          <Image src={`${imageUrl}${image}`} alt={name} fluid rounded />
        </Col>
        <Col md={2} className="text-center my-2">
          <h5>{name}</h5>
        </Col>
        <Col md={2} className="text-center my-2 ">
          {quantity} x {price} = ₹{quantity * price}
        </Col>
        <Col md={3} className="text-center">
          <div className="add-minus-quantity ">
            <i
              className="fas fa-minus minus"
              onClick={() => decrement(_id)}
            ></i>

            <p>{quantity}</p>

            <i className="fas fa-plus add" onClick={() => addItem(_id)}></i>
          </div>
        </Col>
        <Col md={2} class="justify-content-center">
          <Button type="button" variant="light" onClick={() => clear(_id)}>
            <i className="fas fa-trash remove text-center my-2"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
