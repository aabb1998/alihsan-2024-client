import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../../theme/svg-icons";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import { SnackMessages } from "../../../components/Toast";
import {
  addStory,
  updateStory,
} from "../../../features/adminStories/adminStoriesSlice";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { addNewsletterSubscriber } from "../../../features/adminNewsletterSubscribers/adminNewsletterSubscribersSlice";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const AddSubscriber = ({ onClose, item }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(addNewsletterSubscriber(formik.values));
        if (response?.payload?.success) {
          resetForm();
          showSuccessMessage(response?.payload?.message);
          onClose()
        } else {
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
    },
  });

  return (
    <>
      <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
            <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
              <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                      Add Newsletter Subscriber
                    </div>
                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={onClose} />
                    </button>
                  </div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col items-start gap-4 sm:gap-7.5"
                  >

                      <div className="flex w-full flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">

                          <div className="form-group">
                            <label htmlFor="title" className="block">
                              Email<span className="text-red-300">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full form-control"
                              placeholder="Email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.email &&
                              Boolean(formik.errors.email) && (
                                <FormikValidationError
                                  formikTouched={formik.touched.email}
                                  formikError={formik.errors.email}
                                />
                              )}
                          </div>

                      </div>

                      <div className="flex justify-between w-full gap-4 sm:ga-5">
                        <Button
                          variant={"secondaryOutline"}
                          className="flex-grow basis-0"
                          label={"Cancel"}
                          onClick={onClose}
                        />
                        <Button
                          variant={"primary"}
                          className="flex-grow basis-0"
                          label={`Submit`}
                          type="submit"
                        />
                      </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSubscriber;
