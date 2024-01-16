import React, { useEffect } from "react";
import { CloseIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import TextArea from "../../../components/TextArea";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SnackMessages } from "../../../components/Toast";
import { updateFormStatus } from "../../../features/adminForms/adminFormSlice";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { useLocation } from "react-router-dom";

const UpdateForm = ({ onClose, confirmDelete, id }) => {
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const { isLoading } = useSelector((state) => state.adminForm);
  const { pathname } = useLocation();

  const validationSchema = yup.object({
    adminReason: yup.string().required("Admin Reason is required"),
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      adminReason: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let url;
      if ("/admin/complaints" === pathname) {
        url = "/complaints/";
      } else {
        url = "form/technical-support/";
      }
      try {
        const response = await dispatch(
          updateFormStatus({ data: formik.values, url: url })
        );
        if (response?.payload) {
          resetForm();
          showSuccessMessage(response?.payload?.message);
          onClose();
        } else {
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {
        showErrorMessage(error.message);
      }
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
    formik.setFieldValue("id", id);
  }, []);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col flex-grow w-100">
                    <div className="flex justify-between mb-4">
                      <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                        Update
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onClose} />
                      </button>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-5 sm:mb-7.5 form-group">
                        <label htmlFor="Solution" className="block"> Solution</label>
                        <p className="font-medium text-neutral-600 text-md">
                          <TextArea
                            handleChange={handleInputChange}
                            name="adminReason"
                            value={formik.values.adminReason}
                          />
                          {formik.touched.adminReason &&
                            Boolean(formik.errors.adminReason) && (
                              <FormikValidationError
                                formikTouched={formik.touched.adminReason}
                                formikError={formik.errors.adminReason}
                              />
                            )}
                        </p>
                      </div>
                      <div className="flex justify-between gap-4 sm:gap-5">
                        <Button
                          variant={"dark"}
                          className="flex-grow"
                          label={"Cancel"}
                          onClick={onClose}
                          type="button"
                        />
                        {isLoading ? (
                          <PrimaryLoadingButton additionalButtonClasses=""  loadingText={"Confirm"}/>
                        ) : (
                          <Button
                            variant={"primary"}
                            className="flex-grow"
                            label={"Confirm"}
                            type="submit"
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateForm;
