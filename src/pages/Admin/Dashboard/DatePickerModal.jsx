import React, { useState } from "react";
import { CloseIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";

const DatePickerModal = ({ onClose, confirmDate }) => {
  const validationSchema = yup.object({
    startDate: yup
      .date()
      .required("Start Date is required"),

    endDate: yup
      .date()
      .required("End Date is required")
      .min(
        yup.ref("startDate"),
        "End Date must be equal to or later than Start Date"
      ),
  });
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      confirmDate(values);
    },
  });
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
                  <div className="flex flex-col flex-grow gap-5 w-100 sm:gap-8">
                    <div className="flex justify-between grow">
                      <div class="font-bold tracking-tighter text-md sm:text-heading-7">Custom Date</div>
                      <Button
                        variant={"none"}
                        className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800"
                        leftIcon={<CloseIcon iconSize={24} onClick={onClose} />}
                      />
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      id="fundRaise"
                      autoComplete="off"
                    >
                      <div className="mb-7.5 sm:mb-10 flex gap-4 sm:gap-5 ">
                        <div className="flex-grow form-group basis-0">
                          <label htmlFor="Start Date" className="block">Start Date</label>
                          <DatePicker
                            selected={formik.values.startDate}
                            onChange={(date) =>
                              formik.setFieldValue("startDate", date)
                            }
                            className="!w-full form-control"
                            id="startDate"
                            name="startDate"
                            placeholderText="MM/DD/YYYY"
                            autoComplete="off"
                          />
                          {formik.touched.startDate &&
                            Boolean(formik.errors.startDate) && (
                              <FormikValidationError
                                formikTouched={formik.touched.startDate}
                                formikError={formik.errors.startDate}
                              />
                            )}
                        </div>
                        <div className="flex-grow form-group basis-0">
                        <label htmlFor="Start Date" className="block">End Date</label>
                        <DatePicker
                          selected={formik.values.endDate}
                          onChange={(date) =>
                            formik.setFieldValue("endDate", date)
                          }
                          className="!w-full form-control"
                          id="endDate"
                          name="endDate"
                          placeholderText="MM/DD/YYYY"
                          autoComplete="off"
                        />
                        {formik.touched.endDate &&
                          Boolean(formik.errors.endDate) && (
                            <FormikValidationError
                              formikTouched={formik.touched.endDate}
                              formikError={formik.errors.endDate}
                            />
                          )}
                          </div>


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
                          label={"Set Date"}
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
      </div>
    </>
  );
};
export default DatePickerModal;
