import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../../../../theme/svg-icons";
import { Button } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../features/authentication/authenticationSlice";
import { SnackMessages } from "../../../../components/Toast";
import { FormikValidationError } from "../../../Authentication/Common/FormikValidationError";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
  rememberMe: yup.boolean(),
});
export const AdminloginComponent = () => {
  const dispatch = useDispatch();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  let navigate = useNavigate();

  const handleChangeEmail = (e) =>
    formik.setFieldValue("email", e.target.value.trim());

  const handleChangePassword = (e) =>
    formik.setFieldValue("password", e.target.value.trim());
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // const response = await logIn(
        // formik.values.email,
        // formik.values.password
        // );
        const response = await dispatch(
          loginUser({
            email: formik.values.email,
            password: formik.values.password,
            isAdmin: true,
          })
        );
        if (response?.payload?.success) {
          showSuccessMessage(response?.payload?.message);
          const payload = response?.payload?.payload;
          if (formik.values.rememberMe == true) {
            localStorage.setItem(
              "loggedIn",
              JSON.stringify({
                token: payload?.token,
                role: payload?.role,
                isloggedIn: true,
              })
            );
          } else {
            localStorage.setItem(
              "loggedIn",
              JSON.stringify({
                token: response?.payload?.payload?.token,
                role: response?.payload?.payload?.role,
                firstName: response?.payload?.payload?.firstName,
                lastName: response?.payload?.payload?.lastName,
                id: response?.payload?.payload?.id,
                isloggedIn: true,
              })
            );
            sessionStorage.setItem(
              "loggedIn",
              JSON.stringify({
                token: response?.payload?.payload?.token,
                role: response?.payload?.payload?.role,
                isloggedIn: true,
              })
            );
          }
          navigate("/admin/dashboard");
        } else {
          showErrorMessage(response?.error?.message);
        }
      } catch (e) {
        showErrorMessage(e.message);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-3 m-auto sm:px-0 max-w-25">
      <a href="/">
        <img
          src="/images/assets/logo.svg"
          className="mx-auto mb-15"
          alt="Al-Ihsan Foundation"
        />
      </a>
      <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">
        Login To Your Account
      </h1>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="emailAddress" className="sr-only">
            Email Address
          </label>
          <input
            type="text"
            value={formik.values.email}
            onChange={handleChangeEmail}
            name="email"
            className="w-full bg-white form-control"
            id="emailAddress"
            placeholder="Email Address"
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <FormikValidationError
              formikTouched={formik.touched.email}
              formikError={formik.errors.email}
            />
          )}
        </div>
        <div className="w-full mb-5 form-group">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type={isVisiblePassword ? "text" : "password"}
              value={formik.values.password}
              onChange={handleChangePassword}
              name="password"
              className="w-full bg-white form-control"
              id="password"
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-neutral-500">
              <Link to="#" aria-label="View Password" />
              {/* <EyeOffIcon /> */}
              <div
                aria-label="View Password"
                onClick={() => setVisiblePassword(!isVisiblePassword)}
              >
                {isVisiblePassword ? (
                  <EyeOffIcon iconSize={20} />
                ) : (
                  <EyeIcon iconSize={20} />
                )}
              </div>
            </div>
          </div>

          {formik.touched.password && Boolean(formik.errors.password) && (
            <FormikValidationError
              formikTouched={formik.touched.password}
              formikError={formik.errors.password}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-7.5">
            <input type="checkbox" id="rememberMe" value="" />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium text-neutral-600"
            >
              Remember Me
            </label>
          </div>
          {/* <a href="/reset-password" className="text-sm font-medium text-primary-300">Forgot password?</a> */}
        </div>
        <Button
          className="w-full btn btn-primary"
          variant=""
          type="submit"
          label={"Login"}
        />
      </form>
    </div>
  );
};
