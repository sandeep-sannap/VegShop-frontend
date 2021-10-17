import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function AddProductScreen({ history }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.productCreate
  );

  const postDetail = () => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "shopveg");
    console.log("data ", data);
    fetch("https://api.cloudinary.com/v1_1/shree50/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        dispatch(createProduct(name, price, data.secure_url));
      })
      .catch((err) => console.log(err));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    postDetail();
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
                name="file"
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
