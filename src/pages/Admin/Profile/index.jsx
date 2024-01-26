import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { CloseIcon, EyeOffIcon } from "../../../theme/svg-icons";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import * as yup from "yup";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "../../../features/authentication/authenticationSlice";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import ChangePassword from "../../../features/authentication/ChangePassword";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .required("First name is required")
    .max(40, "First name must be at most 40 characters"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required")
    .max(40, "Last name must be at most 40 characters"),
  displayName: yup
    .string("Enter your Username")
    .required("Username is required")
    .max(40, "Username must be at most 40 characters"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
});
export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const profile = useSelector((state) => state.profile);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      termsAndConditions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await dispatch(updateProfile(formik.values));
        if (response?.payload?.success) {
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.payload?.message);
        }
        setIsLoading(false);
      } catch (error) {
        showErrorMessage(error.message);
        setIsLoading(false);
      }
    },
  });
  const handleDeleteAccount = () => {
    setDeleteModal(true);
    dispatch(deleteProfile());
  };
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) formik.setValues(profile);
  }, [profile]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <form onSubmit={formik.handleSubmit} id="SignupForm" autoComplete="off">
          <div className="flex flex-wrap gap-4 items-center justify-between w-full pb-3.5">
            <h5 className="text-heading-7 md:text-heading-5">Profile</h5>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <Button
                className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
                variant="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                label={"Cancel"}
              />
              <Button
                className="flex-grow btn btn-danger text-button-md md:text-button-lg"
                variant="flex-grow btn btn-danger text-button-md md:text-button-lg"
                type="button"
                onClick={() => setDeleteModal(true)}
                label={"Delete Account"}
              />
              <Button
                className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                variant=""
                type="submit"
                label={"Save Changes"}
              />
            </div>
          </div>
          <div className="mt-5 md:mt-7.5 flex flex-col gap-5 sm:gap-7.5">
            <div className="w-full flex flex-col gap-5 sm:max-w-[37.5rem]">
              <div className="form-group">
                <input
                  type="text"
                  className="w-full bg-white form-control"
                  id="fname"
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName &&
                  Boolean(formik.errors.firstName) && (
                    <FormikValidationError
                      formikTouched={formik.touched.firstName}
                      formikError={formik.errors.firstName}
                    />
                  )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className="w-full bg-white form-control"
                  id="lname"
                  placeholder="Last Name"
                />
                {formik.touched.lastName && Boolean(formik.errors.lastName) && (
                  <FormikValidationError
                    formikTouched={formik.touched.lastName}
                    formikError={formik.errors.lastName}
                  />
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="displayName"
                  value={formik.values.displayName}
                  onChange={formik.handleChange}
                  className="w-full bg-white form-control"
                  id="name"
                  placeholder="User Name"
                />
                {formik.touched.displayName &&
                  Boolean(formik.errors.displayName) && (
                    <FormikValidationError
                      formikTouched={formik.touched.displayName}
                      formikError={formik.errors.displayName}
                    />
                  )}
                <p className="mt-2 text-xs font-medium text-neutral-700">
                  This will be how your name will be displayed in the account
                  section and in donation
                </p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={formik.values.email}
                  name="email"
                  readOnly={true}
                  onChange={formik.handleChange}
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
            </div>
          </div>
        </form>
        <div className="mt-5 md:mt-7.5 flex flex-col gap-5 sm:gap-7.5">
          <div className="flex flex-col">
            <div className="w-full flex flex-col gap-5 sm:max-w-[37.5rem]">
              <ChangePassword/>
            </div>
            {/* <div className="flex flex-row gap-6 mt-8">
              <Button
                className={"grow sm:flex-grow-0"}
                variant={"secondaryOutline"}
                label={"Cancel"}
              />
              <Button
                className={"grow sm:flex-grow-0"}
                variant={"primary"}
                label={"Update Password"}
              />
                </div>*/}
          </div>
        </div>
      </div>
      {deleteModal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
              <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-t rounded-bl-none rounded-br-none rounded-tl-3xl rounded-tr-3xl sm:rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-7.5 py-10">
                    <div className="flex-col sm:flex">
                      <div className="flex justify-between">
                        <div className="mb-2 font-bold heading-7">
                          Delete Account?
                        </div>
                        <div className="cursor-pointer">
                          <CloseIcon onClick={() => setDeleteModal(false)} />
                        </div>
                      </div>
                      <div className="mb-7.5 text-neutral-600 sm:mb-10">
                        Are you sure you want to delete this account?
                      </div>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => setDeleteModal(false)}
                          variant={"neutralFull"}
                          label="No, Keep it"
                        ></Button>
                        <Button
                          onClick={handleDeleteAccount}
                          variant={"primaryFull"}
                          label="Yes, Delete"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
