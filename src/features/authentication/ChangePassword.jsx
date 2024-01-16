import React, { useState } from "react";
import { Button } from "../../components";
import { FormikValidationError } from "../Common/FormikValidationError";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { EyeIcon, EyeOffIcon } from "../../theme/svg-icons";
import { changePassword } from "./authenticationSlice";
import { SnackMessages } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { PrimaryLoadingButton } from "../../components/LoadingButtons";
import { PasswordMeter } from "../../pages/Authentication/Signup/PasswordMeter";

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const { showSuccessMessage, showErrorMessage } = SnackMessages();

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  const [isLoading, setIsLoading] = useState(false);
  const [togglePassword, setPassword] = useState(false);
  const [toggleNewPassword, setNewPassword] = useState(false);
  const [toggleConfirmPassword, setConfirmPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isVisiblePasswordMeter, setVisiblePasswordMeter] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await dispatch(changePassword(formik.values));
        if (response?.payload?.success) {
          resetForm();
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.payload?.message);
        }
        setIsLoading(false);
      } catch (error) {}
    },
  });
  const handleChangePassword = (e) => {
    if (e.target.value.trim().length > 0) {
      const passwordValue = e.target.value.trim();
      const hasLowercase = /[a-z]/.test(passwordValue);
      const hasUppercase = /[A-Z]/.test(passwordValue);
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
    formik.setFieldValue("newPassword", e.target.value.trim());
  };

  return (
    <div>
      {profile?.authType === "email" && (
        <form onSubmit={formik.handleSubmit} id="ChangePasswordsForm" autoComplete="off">
          <div className="mb-4">
            <h2 className="text-heading-7 md:text-heading-6">
              Change Password
            </h2>
          </div>
          <div className="w-full mb-5 form-group">
            <div className="relative">
              <PasswordVisibility
                onclick={() => setPassword(!togglePassword)}
                isVisible={togglePassword}
              />
              <input
                type={togglePassword ? "text" : "password"}
                className="w-full form-control"
                id="Password"
                placeholder="Current Password"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
            {formik.touched.oldPassword &&
              Boolean(formik.errors.oldPassword) && (
                <FormikValidationError
                  formikTouched={formik.touched.oldPassword}
                  formikError={formik.errors.oldPassword}
                />
              )}
          </div>
          <div className="w-full mb-5 form-group">
            <div className="relative">
              <PasswordVisibility
                onclick={() => setNewPassword(!toggleNewPassword)}
                isVisible={toggleNewPassword}
              />
              <input
                type={toggleNewPassword ? "text" : "password"}
                className="w-full form-control"
                id="NewPassword"
                placeholder="New Password"
                name="newPassword"
                onPaste={(e)=>e.preventDefault()}
                value={formik.values.newPassword}
                onChange={handleChangePassword}
              />
            </div>
            {formik.touched.newPassword &&
              Boolean(formik.errors.newPassword) && (
                <FormikValidationError
                  formikTouched={formik.touched.newPassword}
                  formikError={formik.errors.newPassword}
                />
              )}
            <PasswordMeter
              isVisiblePasswordMeter={isVisiblePasswordMeter}
              passwordScore={passwordScore}
              passwordValue={formik.values.newPassword}
            />
          </div>
          <div className="relative w-full mb-0 form-group">
            <div className="relative">
              <PasswordVisibility
                onclick={() => setConfirmPassword(!toggleConfirmPassword)}
                isVisible={toggleConfirmPassword}
              />
              <input
                type={toggleConfirmPassword ? "text" : "password"}
                className="w-full form-control"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onPaste={(e)=>e.preventDefault()}
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
          <div className="flex flex-col-reverse gap-6 my-6 md:gap-6 md:my-8 sm:flex-row">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            {/* <button type="submit" className="btn btn-primary">
            Save
          </button> */}
            {isLoading ? (
              <PrimaryLoadingButton additionalButtonClasses="" />
            ) : (
              <Button variant="primary" type="submit" label="Save" />
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;

const PasswordVisibility = ({ onclick, isVisible }) => {
  return (
    <div
      className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-neutral-500"
      onClick={onclick}
    >
      {isVisible ? <EyeOffIcon iconSize={20} /> : <EyeIcon iconSize={20} />}
    </div>
  );
};
