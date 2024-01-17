import React, { useEffect, useState } from "react";
import { CloseIcon, PdfIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { useLocation } from "react-router-dom";
import { Dropdown } from "../../../components/Dropdown";
import {
  addConstitution,
  addFinancialReports,
  updateConstitution,
  updateFinancialReports,
} from "../../../features/adminFinacialReport/adminFinacialReportSlice";
import { financialYearList } from "../../../utils/constants";

const UpdateModal = ({ onClose, confirmDelete, item }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.adminForm);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [imagePreviews, setImagePreviews] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const { pathname } = useLocation();

  const validationSchema = yup.object({
    year: yup.string().required("Year is required"),
    document: yup.string().required("Document is required"),
  });
  const formik = useFormik({
    initialValues: {
      id: item?.id,
      year: item?.year,
      document: item?.document,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("year", values?.year);
      formData.append("document", values?.document);
      let action;
      if (formik.values.id) {
        action =
          "/admin/financial-reports" === pathname
            ? updateFinancialReports
            : updateConstitution;
      } else {
        action =
          "/admin/financial-reports" === pathname
            ? addFinancialReports
            : addConstitution;
      }

      try {
        const response = await dispatch(
          action({ data: formData, id: formik.values?.id })
        );
        console.log(response, "response");
        if (response?.payload) {
          resetForm();
          showSuccessMessage(response?.payload?.message);
          onClose();
        } else {
          showErrorMessage(response?.error?.message);
        }
      } catch (error) {
        showErrorMessage(error.message);
      }
    },
  });

  const handleFilterChange = (e) => {
    const { value } = e;
    formik.setFieldValue("year", value);
  };
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImagePreviews = reader.result;
          setIsvisible(true);
          setImagePreviews(newImagePreviews);
          formik.setFieldValue("document", file);
        };
        reader.readAsDataURL(file);
      } else {
        showErrorMessage("Invalid File format");
      }
    }
  };

  const handleRemove = () => {
    setIsvisible(false);
    formik.setFieldValue("document", "");
  };

  useEffect(() => {
    if (item?.document) {
      setIsvisible(true);
      setImagePreviews(item?.document);
    }
    formik.setFieldValue(item);
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
                  <div className="flex flex-col flex-grow w-full gap-4 sm:gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                        {formik.values.id ? "Edit " : "Add New"}{" "}
                        {"/admin/financial-reports" === pathname
                          ? "Financial Report"
                          : "Constitution"}
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onClose} />
                      </button>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-6 form-group">
                        <label htmlFor="company name" className="block">
                          Year
                        </label>
                        <Dropdown
                          className={"!w-full"}
                          value={formik?.values?.year}
                          onChange={(e) => handleFilterChange(e)}
                          options={financialYearList}
                          name={"year"}
                          defaultSelect={"Select"}
                        />{" "}
                        {formik.touched.year && Boolean(formik.errors.year) && (
                          <FormikValidationError
                            formikTouched={formik.touched.year}
                            formikError={formik.errors.year}
                          />
                        )}
                      </div>
                      <div className="mb-6 form-group">
                        <label htmlFor="document" className="block">
                          Document
                        </label>
                        {isVisible ? (
                          <div className="flex items-center justify-between w-full  gap-2 py-1.5 px-3 rounded bg-accent-300 mt-2 mb-6 ">
                            <div className="flex items-center gap-2">
                              <div>
                                <PdfIcon iconSize={20} />
                              </div>
                              <div className="text-xs font-semibold capitalize break-words line-clamp-1 font-Montserrat text-neutral-1000 ">
                                <TruncatedText text={imagePreviews} maxLength={50} />
                              </div>
                            </div>

                            <div className="flex flex-row-reverse flex-auto">
                              <div className="cursor-pointer">
                                <CloseIcon
                                  iconSize={"14"}
                                  onClick={() => handleRemove(false)}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <p className="font-medium text-neutral-600 text-md">
                          <div className="flex flex-col items-center justify-center col-span-1 gap-2 border border-dashed rounded-lg border-neutral-500 grow lg:flex-grow-0">
                            <label
                              htmlFor={`document`}
                              className="relative cursor-pointer !flex flex-col items-center grow justify-center gap-2 w-51 h-36 overflow-hidden"
                            >
                              <>
                                <PlusIcon strokeWidth={1.5} />
                                <span className="text-neutral-600 text-button-md">
                                  Add Document
                                </span>
                              </>

                              <input
                                className="absolute invisible w-full h-full"
                                id={`document`}
                                type="file"
                                name={`document`}
                                accept=".doc, .docx, .pdf"
                                onChange={(event) => handleImageChange(event)}
                              />
                            </label>
                          </div>
                          {formik.touched.document &&
                            Boolean(formik.errors.document) && (
                              <FormikValidationError
                                formikTouched={formik.touched.document}
                                formikError={formik.errors.document}
                              />
                            )}
                        </p>
                      </div>
                      <div className="flex justify-between mt-5 sm:mt-7.5 gap-4 sm:ga-5">
                        <Button
                          variant={"dark"}
                          className="flex-grow"
                          label={"Cancel"}
                          onClick={onClose}
                          type="button"
                        />
                        {isLoading ? (
                          <PrimaryLoadingButton additionalButtonClasses="" />
                        ) : (
                          <Button
                            variant={"primary"}
                            className="flex-grow"
                            label={"Save"}
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
export default UpdateModal;

const TruncatedText = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <div className="truncated-text">{truncatedText}</div>;
};
