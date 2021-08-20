import React from "react";
import { Formik } from "formik";

import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import FormContainer from "../components/FormContainer";
import { passReset } from "../services/controllers";
toast.configure();

export default function PasswordResetScreen(props) {
  const resetToken = props.match.params.resetToken;
  console.log("reset | ", resetToken);
  const history = useHistory();

  return (
    <FormContainer>
      <h4 className="mt-5">Password reset</h4>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            let password = values.password;

            passReset(resetToken, password)
              .then((res) => {
                console.log(res);

                toast.success("Password updated successfully.");
                history.push("/");
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
          password: Yup.string()
            .required("Password required.")
            .min(
              8,
              "Password is too short - should be minimum 8 characters long."
            )
            .max(
              12,
              "Password is too long - should be maximum 12 characters long"
            )
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
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
                <label htmlFor="email">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  // className={errors.password && touched.password && "error"}
                />
                {errors.password && touched.password && (
                  <div className="invalid">{errors.password}</div>
                )}{" "}
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}
              >
                Login
              </button>
              <div className="row mt-2"></div>
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  );
}
