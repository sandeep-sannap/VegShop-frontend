import React, { useState, useEffect } from "react";
import axios from "axios";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { baseUrl } from "../util/util";

export default function AddProductScreen({ history }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [photo, setPhoto] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.productCreate
  );
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${baseUrl}uploads`, formData, config);

      dispatch(createProduct(name, price, data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      history.push("/admin/productlist");
    }
  }, [dispatch, history, success]);

  return (
    <section className="mt-5">
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Add Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Product Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Product Image</Form.Label>
              <Form.File
                type="file"
                name="image"
                onChange={(e) => {
                  console.log(e.target.files);
                  setPhoto(e.target.files[0]);
                }}
              ></Form.File>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Add Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </section>
  );
}
