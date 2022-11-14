import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../redux/authCrud";
import * as auth from "../redux/authRedux";

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const { authToken, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authToken) {
      props.history.push("/dashboard");
    }
  }, [authToken, props.history]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,

    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm, setSubmitting, setStatus }) => {
      login(values.email, values.password)
        .then(({ data: { data } }) => {
          props.login(data?.access_token);
        })
        .catch(() => {
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
      resetForm();
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Sign In</h3>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {error && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{error}</div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forget Password
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={loading}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
      <div className="text-center mb-5">
        {/* <h4 className="text-muted font-weight-bold">or</h4> */}
      </div>
      {/* <GoogleLogin
        clientId="29603225172-pfhm883kfm8crm526lgpbpa0e92ljnul.apps.googleusercontent.com"
        buttonText="Sign In with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        className="w-100 justify-content-center"
      /> */}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
