import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../theme/svg-icons";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "./authenticationSlice";
import { FormikValidationError } from "../Common/FormikValidationError";
import { SnackMessages } from "../../components/Toast";
import { PrimaryLoadingButton } from "../../components/LoadingButtons";

import { useFormik } from "formik";
import * as yup from "yup";

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
  displayName: yup
    .string("Enter your Username")
    .trim()
    .required("Username is required")
    .max(40, "Username must be at most 40 characters"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
});

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const ProfileSection = () => {
  const userProfile = useSelector((state) => state.profile.user);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (userProfile) formik.setValues(userProfile);
  }, [userProfile]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} id="SignupForm" autoComplete="off">
        {" "}
        {/* profile edit start */}
        <div className="mb-5 md:mb-6">
          <input
            type="text"
            className="w-full form-control"
            id="FirstName"
            placeholder="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.touched.firstName && Boolean(formik.errors.firstName) && (
            <FormikValidationError
              formikTouched={formik.touched.firstName}
              formikError={formik.errors.firstName}
            />
          )}
        </div>
        <div className="mb-5 md:mb-6">
          <input
            type="text"
            className="w-full form-control"
            id="FirstName"
            placeholder="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.touched.lastName && Boolean(formik.errors.lastName) && (
            <FormikValidationError
              formikTouched={formik.touched.lastName}
              formikError={formik.errors.lastName}
            />
          )}
        </div>
        <div className="mb-5 md:mb-6">
          <input
            type="text"
            className="w-full form-control"
            id="Username"
            placeholder="Username"
            name="displayName"
            value={formik.values.displayName}
            onChange={formik.handleChange}
          />
          {formik.touched.displayName && Boolean(formik.errors.displayName) && (
            <FormikValidationError
              formikTouched={formik.touched.displayName}
              formikError={formik.errors.displayName}
            />
          )}
          <p className="pt-2.5 text-xs text-neutral-700">
            This will be how your name will be displayed in the account section
            and in donation
          </p>
        </div>
        <div className="mb-6 md:mb-7.5">
          <input
            type="text"
            className="w-full form-control"
            id="emailAddress"
            placeholder="Email Address"
            value={formik.values.email}
            name="email"
            readOnly={true}
            onChange={formik.handleChange}
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <FormikValidationError
              formikTouched={formik.touched.email}
              formikError={formik.errors.email}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-between gap-6 mt-6 mb-7.5 md:flex-row md:gap-4 md:my-8 sm:flex-row">
          <div className="flex flex-col-reverse w-full gap-6 sm:flex-row sm:w-auto">
            <Button
              className=""
              onClick={() => navigate("/")}
              label="Cancel"
              variant={"secondaryOutline"}
            />
            {isLoading ? (
              <PrimaryLoadingButton additionalButtonClasses="w-full" />
            ) : (
              <Button
                variant="primary"
                className={"filled"}
                type="submit"
                label="Save"
              />
            )}
          </div>
          <div className="text-center sm:text-left">
            <Button
              type="button"
              className="mx-auto font-bold text-red-300 md:mx-0"
              onClick={() => setDeleteModal(true)}
              label={"Delete Account"}
              variant={"none"}
              disabled={formik.isSubmitting}
            />
          </div>
        </div>
      </form>
      {/* Modal */}
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

export default ProfileSection;
