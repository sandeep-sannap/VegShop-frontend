import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import serverUrl from "../services/service";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import FormContainer from "../components/FormContainer";
import { forgotPassword } from "../services/controllers";
toast.configure();

export default function ForgotPasswordScreen() {
  const [message, setMessage] = useState(null);

  return (
    <FormContainer>
      <div className="login_form">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              let email = values.email;

              forgotPassword(email)
                .then((res) => {
                  setMessage(res.data.message);
                  console.log(res);

                  toast.success(res.data.message);
                })
                .catch((error) => {
                  console.log(error);
                  const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message;
                  toast.error(message);
                });

              setSubmitting(false);
              resetForm();
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Enter valid email address.")
              .required("Email address required."),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={errors.email && touched.email && "error"}
                  />

                  {errors.email && touched.email && (
                    <div className="invalid">{errors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <div className="row mt-2"></div>
              </form>
            );
          }}
        </Formik>
      </div>
    </FormContainer>
  );
}
