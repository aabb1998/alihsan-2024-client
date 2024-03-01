import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { EyeIcon, EyeOffIcon } from "../../../theme/svg-icons";
import Button from "../../../components/Button";
import { SideImage } from "../Common/SideImage";
import { FormikValidationError } from "../Common/FormikValidationError";
import { SnackMessages } from "../../../components/Toast";
import { logIn } from "./loginAPI";
import { useNavigate } from "react-router-dom";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import {
  getBasketItems,
  bulkAddDonation,
} from "../../../features/basket/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/authentication/authenticationSlice";
import PageHead from "../../../components/PageHead";
import NoSSRSuspense from "../../../components/NoSSRSuspense";


const SocialLoginButtons = React.lazy(() => import("../Common/SocialLogin/SocialLoginButtons"));

const Login = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.profile);
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  let navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .trim()
      .email("Enter a valid email")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Enter a valid email"
      )
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .trim()
      .required("Password is required"),
    rememberMe: yup.boolean(),
  });
  const updateSelectedItems = async () => {
    const checkouts = JSON.parse(localStorage.getItem("checkout") || "[]");
    await dispatch(bulkAddDonation(checkouts));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(getBasketItems());
      try {
        // const response = await logIn(
        // formik.values.email,
        // formik.values.password
        // );
        
        const response = await dispatch(
          loginUser({body: {
            email: formik.values.email,
            password: formik.values.password,
            isAdmin: false,
          }, keepSession: true})
        );
        if (response?.payload?.success) {
          const payload = response?.payload?.payload;
          if (payload?.role === "USER") {
            showSuccessMessage(response?.payload?.message);
            await updateSelectedItems();
            navigate("/");
          }else{
            showErrorMessage('Invalid Credentials');

          }
        } else {
          showErrorMessage(response?.error?.message);
        }
      } catch (e) {
        showErrorMessage(e.message);
      }
    },
  });

  const handleChangeEmail = (e) =>
    formik.setFieldValue("email", e.target.value.trim());
  const handleChangePassword = (e) =>
    formik.setFieldValue("password", e.target.value.trim());

	const {auth: userAuth, isReady} = useSelector(state => state.profile)

  useEffect(() => {
    if (isReady && userAuth && userAuth.role === "USER") {
			navigate("/");
		}
  }, [userAuth, isReady]);

	if(!isReady)
		return <div>Loading...</div>

  return (
    <div>
      <PageHead title={"Login"} />
      <main className="mx-auto">
        <div className="flex justify-center min-h-screen gap-4 px-4 py-4 md:px-6 lg:justify-normal">
          <div className="flex items-center justify-center w-full md:w-8/12">
            <div className="w-full sm:w-[30.625rem]">
              <a href="/">
                <img
                  src="/images/assets/logo.svg"
                  className="mx-auto mb-15"
                  alt="Al-Ihsan Foundation"
                />
              </a>
              <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">
                Login to your account
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                id="LoginForm"
                className="mb-6"
                aria-label="Login Form"
              >
                <div className="flex flex-col mb-6 form-group">
                  <label htmlFor="emailAddress" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={formik.values.email}
                    name="email"
                    onChange={handleChangeEmail}
                    className="w-full form-control"
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
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-neutral-500">
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
                    <input
                      type={isVisiblePassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={handleChangePassword}
                      name="password"
                      className="w-full form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  {formik.touched.password &&
                    Boolean(formik.errors.password) && (
                      <FormikValidationError
                        formikTouched={formik.touched.password}
                        formikError={formik.errors.password}
                      />
                    )}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 mb-7.5">
                    <input
                      type="checkbox"
                      value={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      name="rememberMe"
                      id="rememberMe"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/reset-password"
                    className="text-sm font-medium text-primary-300"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Primary button - full width */}
                {!loading ? (
                  <Button variant="primaryFull" type="submit" label="Login" />
                ) : (
                  <PrimaryLoadingButton additionalButtonClasses="w-full" />
                )}
              </form>
              <div className="flex items-center justify-center mb-6">
                <div className="w-full h-px bg-neutral-300"></div>
                <div className="mx-3 text-sm font-medium text-neutral-500 whitespace-nowrap">
                  or login with
                </div>
                <div className="w-full h-px bg-neutral-300"></div>
              </div>
							<NoSSRSuspense fallback={<div />}>
              	<SocialLoginButtons />
							</NoSSRSuspense>
              <div className="text-center">
                <span className="font-Inter text-neutral-600">
                  Don't have an account yet?{" "}
                </span>
                <a
                  href="/create-your-account"
                  className="font-medium text-primary-300"
                >
                  Sign up here
                </a>
              </div>
            </div>
          </div>

          <SideImage
            image="/images/banner/authentication/login.jpg"
            altText="Login"
            heading="On-the Ground"
            content="We are dedicated to being on the front lines, offering direct assistance to people. We prioritize face-to-face interactions over CEOs confined to their offices."
          />
        </div>
      </main>
    </div>
  );
};

export default Login;
