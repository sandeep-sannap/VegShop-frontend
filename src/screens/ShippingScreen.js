import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address);

  const [city, setCity] = useState(shippingAddress?.city);

  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);

  const [country, setCountry] = useState(shippingAddress?.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/placeorder");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  return (
    <section className="mt-5">
      <FormContainer>
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="adress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address..."
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="adress">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City..."
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="adress">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code..."
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="adress">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country..."
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label as="legend">Payment Method</Form.Label>
            <Col>
              <Form.Check
                checked="true"
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </section>
  );
}
