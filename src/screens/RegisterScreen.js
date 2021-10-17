import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { Form, Button, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { userSignup } from "../actions/userActions";

//validation starts

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name required";
  }

  if (!values.email) {
    errors.email = "Email address required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be atleast 6 characters long.";
  } else if (values.password.length > 15) {
    errors.password = "Password can not be more than 15 characters long.";
  }

  return errors;
};

//validation ends

export default function RegisterScreen({ location, history }) {
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  //validation starts

  const formik = useFormik({
    initialValues: {
      name: "",

      email: "",

      password: "",
    },

    validate,

    onSubmit: (values) => {
      dispatch(userSignup(values.name, values.email, values.password));
    },
  });

  //validation ends

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            id="name"
            name="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          ></Form.Control>
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          ></Form.Control>
        </Form.Group>
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          ></Form.Control>
        </Form.Group>
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}

        <Button type="submit" variant="primary" className="my-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
