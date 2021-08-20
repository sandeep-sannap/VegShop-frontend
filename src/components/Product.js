import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function Product({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  return (
    <Card className="my-3 p-3 rounded text-center shadow">
      <Card.Img
        src={`https://vegshop1.herokuapp.com/${product.image}`}
        alt={product.name}
        variant="top"
        className="img-fluid h-45"
      ></Card.Img>

      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="h3">₹{product.price}</Card.Text>
      </Card.Body>
      {/* <Button variant="outline-success" className="p-2">
        Add to cart
      </Button> */}

      <Button
        onClick={addToCartHandler}
        //className="btn-block"
        variant="outline-success"
        type="button"
        // disabled={product.countInStock === 0}
      >
        {!isAdded ? "ADD TO CART" : "✔ ADDED"}
      </Button>
    </Card>
  );
}
