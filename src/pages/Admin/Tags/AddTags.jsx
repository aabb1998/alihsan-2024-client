import React, { useEffect } from "react";
import { CloseIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { SnackMessages } from "../../../components/Toast";
// import { addTag } from "../../../features/adminBlog/adminBlogSlice";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { addOrUpdateTag } from "../../../features/adminTag/adminTagSlice";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const AddTags = ({ onClose, data }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    text: yup.string().required("Text is required"),
    color: yup.string().required("Color is required"),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
      color: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = {
          color: values?.color,
          text: values?.text,
        };
        let response = await dispatch(
          addOrUpdateTag({ data: formData, id: data?.id })
        );
        if (response?.payload?.success) {
          showSuccessMessage(response?.payload?.message);
          onClose();
          resetForm();
        } else {
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
    },
  });
  const handleChange = (e) => {
    formik.setFieldValue("color", e?.target?.value);
  };

  useEffect(() => {
    const fieldsToSet = ["text", "color"];
    fieldsToSet.forEach((field) => {
      formik.setFieldValue(field, data ? data[field] : "");
    });
  }, [data]);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
              <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
                <div className="relative w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                  <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                    <div className="flex flex-col flex-grow w-100">
                      <div className="flex justify-between mb-5 sm:mb-8">
                        <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                          {data ? "Update" : "Add" + " Tag"}
                        </div>
                        <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                          <CloseIcon iconSize={24} onClick={onClose} />
                        </button>
                      </div>
                      <div className="mb-6">
                        <input
                          type="text"
                          name="text"
                          className="w-full bg-white form-control"
                          id="blog-title"
                          placeholder="Text"
                          value={formik.values.text}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.text && Boolean(formik.errors.text) && (
                          <FormikValidationError
                            formikTouched={formik.touched.text}
                            formikError={formik.errors.text}
                          />
                        )}
                      </div>
                      <div className="mb-6">
                        <select
                          className="w-full text-sm !text-neutral-800 form-control"
                          id="color"
                          name="color"
                          onChange={handleChange}
                          value={formik.values?.color}
                        >
                          <option value="">Select</option>
                          <option value="black">Black</option>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="yellow">Yellow</option>
                        </select>
                        {formik.touched.color &&
                          Boolean(formik.errors.color) && (
                            <FormikValidationError
                              formikTouched={formik.touched.color}
                              formikError={formik.errors.color}
                            />
                          )}
                      </div>
                      <div className="flex justify-between gap-4 sm:gap-5">
                        <Button
                          variant={"dark"}
                          className="flex-grow"
                          label={"Cancel"}
                          onClick={onClose}
                        />
                        <Button
                          variant={"primary"}
                          className="flex-grow"
                          label={"Save"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddTags;
