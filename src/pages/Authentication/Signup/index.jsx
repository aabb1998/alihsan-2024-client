import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../../components/Button";
import { SideImage } from "../Common/SideImage";
import { FormikValidationError } from "../Common/FormikValidationError";
import { EyeOffIcon, EyeIcon } from "../../../theme/svg-icons";
import { signUp } from "./signupAPI";
import { PasswordMeter } from "./PasswordMeter";
import { SnackMessages } from "../../../components/Toast";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import PageHead from "../../../components/PageHead";
import NoSSRSuspense from "../../../components/NoSSRSuspense";

const SocialLoginButtons = React.lazy(() =>
  import("../Common/SocialLogin/SocialLoginButtons")
);

const Signup = () => {
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [isVisiblePasswordMeter, setVisiblePasswordMeter] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  let navigate = useNavigate();
  let isLoggedInChecked = false;

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .trim()
      .required("First name is required")
      .max(40, "First name must be at most 40 characters"),
    lastName: yup
      .string("Enter your last name")
      .trim()
      .required("Last name is required")
      .max(40, "Last name must be at most 40 characters"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Enter a valid email"
      )
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .test(
        "password-score",
        "Password must have atleast good strength",
        function (value) {
          // `value` is the value of the field being validated, in this case, the password
          // Check if the `passwordScore` is greater than or equal to 8
          if (passwordScore > 7) {
            return true;
          } else {
            return false;
          }
        }
      )
      .required("Password is required"),
    confirmPassword: yup
      .string("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await signUp(
          formik.values.firstName,
          formik.values.lastName,
          formik.values.email,
          formik.values.password
        );
        if (response.status == 200) {
          showSuccessMessage(response.data);
          navigate("/login");
        } else {
          showErrorMessage(response.error);
        }
        setIsLoading(false);
      } catch (error) {
        showErrorMessage(error.message);
        setIsLoading(false);
      }
    },
  });

  const handleChangeEmail = (e) =>
    formik.setFieldValue("email", e.target.value.trim());
  const handleChangePassword = (e) => {
    if (e.target.value.trim().length > 0) {
      const passwordValue = e.target.value.trim();
      const hasLowercase = /[a-z]/.test(passwordValue);
      const hasUppercase = /[A-Z]/.test(passwordValue);
      // const hasSymbol = /[!@#$%^&*()+{}\[\]:;<>,.?~\\-]/.test(passwordValue);
      const hasSymbol = /[!@#\$%\^&\*\(\)+\{\}\[\]:;<>,.?~\\\-=/`_]/.test(
        passwordValue
      );
      const hasNumber = /\d/.test(passwordValue);

      const trueCount = [
        hasLowercase,
        hasUppercase,
        hasNumber,
        hasSymbol,
      ].filter(Boolean).length;

      if (trueCount > 3) {
        if (passwordValue.length > 9) {
          setPasswordScore(10);
        } else if (passwordValue.length > 7) {
          setPasswordScore(8);
        } else {
          setPasswordScore(6);
        }
      } else if (trueCount > 2) {
        setPasswordScore(6);
      } else if (trueCount > 1) {
        setPasswordScore(4);
      } else {
        setPasswordScore(2);
      }

      setVisiblePasswordMeter(true);
    } else {
      setPasswordScore(2);
    }
    formik.setFieldValue("password", e.target.value.trim());
  };
  const handleChangeConfirmPassword = (e) =>
    formik.setFieldValue("confirmPassword", e.target.value.trim());
  const handlePasswordFocus = () => {
    setVisiblePasswordMeter(true);
  };

  return (
    <div>
      <main className="mx-auto">
        <PageHead title={"Create Your Account"} />
        <div className="flex justify-center min-h-screen gap-4 px-4 py-4 md:px-6 lg:justify-normal">
          <div className="flex items-center justify-center w-full md:w-8/12">
            <div className="w-full sm:w-[30.625rem]">
              <Link href="/">
                <img
                  src="/images/assets/logo.svg"
                  className="mx-auto mb-15"
                  alt="Al-Ihsan Foundation"
                />
              </Link>
              <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">
                Create your account
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                id="SignupForm"
                className="mb-6"
                aria-label="Signup Form"
                autoComplete="off"
              >
                <div className="md:flex md:gap-6">
                  <div className="flex flex-col mb-6 form-group grow">
                    <label htmlFor="FirstName" className="sr-only">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formik.values.firstName}
                      name="firstName"
                      onChange={formik.handleChange}
                      className="w-full form-control"
                      id="FirstName"
                      placeholder="First Name"
                    />
                    {formik.touched.firstName &&
                      Boolean(formik.errors.firstName) && (
                        <FormikValidationError
                          formikTouched={formik.touched.firstName}
                          formikError={formik.errors.firstName}
                        />
                      )}
                  </div>
                  <div className="flex flex-col mb-6 form-group grow">
                    <label htmlFor="LastName" className="sr-only">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formik.values.lastName}
                      name="lastName"
                      onChange={formik.handleChange}
                      className="w-full form-control"
                      id="LastName"
                      placeholder="Last Name"
                    />
                    {formik.touched.lastName &&
                      Boolean(formik.errors.lastName) && (
                        <FormikValidationError
                          formikTouched={formik.touched.lastName}
                          formikError={formik.errors.lastName}
                        />
                      )}
                  </div>
                </div>
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
                <div className="w-full mb-6 form-group">
                  <div className="relative">
                    <label htmlFor="Password" className="sr-only">
                      Password
                    </label>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <p
                        aria-label="View Password"
                        onClick={() => setVisiblePassword(!isVisiblePassword)}
                      >
                        {isVisiblePassword ? (
                          <EyeOffIcon iconSize={20} />
                        ) : (
                          <EyeIcon iconSize={20} />
                        )}
                      </p>
                    </div>
                    <input
                      type={isVisiblePassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={handleChangePassword}
                      onFocus={handlePasswordFocus}
                      name="password"
                      className="w-full form-control"
                      id="Password"
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

                  <PasswordMeter
                    isVisiblePasswordMeter={isVisiblePasswordMeter}
                    passwordScore={passwordScore}
                    passwordValue={formik.values.password}
                  />
                </div>
                <div className="w-full mb-5 form-group">
                  <div className="relative">
                    <label htmlFor="ConfirmPassword" className="sr-only">
                      Confirm Password
                    </label>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                      <p
                        aria-label="View Confirm Password"
                        onClick={() =>
                          setVisibleConfirmPassword(!isVisibleConfirmPassword)
                        }
                      >
                        {isVisibleConfirmPassword ? (
                          <EyeOffIcon iconSize={20} />
                        ) : (
                          <EyeIcon iconSize={20} />
                        )}
                      </p>
                    </div>
                    <input
                      type={isVisibleConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={handleChangeConfirmPassword}
                      name="confirmPassword"
                      className="w-full form-control"
                      id="ConfirmPassword"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword) && (
                      <FormikValidationError
                        formikTouched={formik.touched.confirmPassword}
                        formikError={formik.errors.confirmPassword}
                      />
                    )}
                </div>
                <div className="flex flex-col mb-7.5 form-group">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      value={formik.values.termsAndConditions}
                      onChange={formik.handleChange}
                      name="termsAndConditions"
                      id="termsAndConditions"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium !text-neutral-600 !mb-0"
                    >
                      I agree to the{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-sm underline text-primary-300"
                      >
                        privacy policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/terms-and-conditions"
                        className="text-sm underline text-primary-300"
                      >
                        terms of service
                      </Link>
                      .
                    </label>
                  </div>
                  {formik.touched.termsAndConditions &&
                    Boolean(formik.errors.termsAndConditions) && (
                      <FormikValidationError
                        formikTouched={formik.touched.termsAndConditions}
                        formikError={formik.errors.termsAndConditions}
                      />
                    )}
                </div>

                {/* Primary button - full width */}
                {!isLoading ? (
                  <Button
                    disabled={isLoading || !formik.values.termsAndConditions}
                    variant="primaryFull"
                    type="submit"
                    label="Sign up"
                  />
                ) : (
                  <PrimaryLoadingButton additionalButtonClasses="w-full" />
                )}
              </form>

              <div className="flex items-center justify-center mb-6">
                <div className="w-full h-px bg-neutral-300"></div>
                <div className="mx-3 text-sm font-medium text-neutral-500 whitespace-nowrap">
                  or sign up with
                </div>
                <div className="w-full h-px bg-neutral-300"></div>
              </div>
              <NoSSRSuspense>
                <SocialLoginButtons />
              </NoSSRSuspense>
              <div className="text-center">
                <span className="font-Inter text-neutral-600">
                  Already have an account?{" "}
                </span>
                <Link to="/login" className="font-medium text-primary-300">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <SideImage
            image="/images/banner/authentication/signup.jpg"
            altText="Sign Up"
            heading="On-the Ground"
            content="We are dedicated to being on the front lines, offering direct assistance to people. We prioritize face-to-face interactions over CEOs confined to their offices."
          />
        </div>
      </main>
    </div>
  );
};

export default React.memo(Signup);
