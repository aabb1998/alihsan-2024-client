import Button from "../../components/Button";
import { CalendarIcon, CheckIcon } from "../../theme/svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { SnackMessages } from "../../components/Toast";
import { addFundraiser } from "./Fundraise";
import { useDispatch } from "react-redux";
import { FormikValidationError } from "../Common/FormikValidationError";
import { PhoneField } from "../../components/PhoneField";
import { fundraiseGoTowards } from "../../utils/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCountryLengths } from "../../utils/helper";
import { useState } from "react";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(50, ({ max }) => `Name must be at most ${max} characters`),
  campaignStart: yup
    .date()
    .required("Start Date is required")
    .min(
      new Date().toISOString().split("T")[0],
      "Start Date must be later than or equal to today"
    ),

  campaignEnd: yup
    .date()
    .required("End Date is required")
    .min(
      yup.ref("campaignStart"),
      "End Date must be equal to or later than Start Date"
    ),
  phone: yup.string().required("Phone Number is required"),
  amount: yup
    .string()
    .required("Amount is required")
    .matches(/^\d+$/, "Amount must be a number")
    .max(8, ({ max }) => `Amount must be at most ${max} characters`),
  project: yup.array().min(1, "Select at least one project"),
});

export const ApplyNow = () => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState("");

  const handlePhoneChange = (value, data) => {
    setCountryCode(data.countryCode);
    formik.setFieldValue("phone", value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      phone: "",
      forDeceasedPerson: false,
      campaignStart: "",
      campaignEnd: "",
      project: [],
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm, setErrors }) => {
      //validate phone
      const isValid = getCountryLengths(values.phone, countryCode);
      if (!isValid) {
        setErrors({ phone: "Invalid phone number" });
      } else {
        try {
          const response = await dispatch(addFundraiser(formik.values));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            resetForm();
          } else {
            showErrorMessage(response?.payload?.message);
          }
        } catch (error) {}
      }
    },
  });

  return (
    <div className="container">
      <div className="py-7.5 px-4 sm:p-10 my-10 sm:mt-10 sm:mb-20 bg-neutral-200 rounded-2.5xl">
        <h2 className="mb-5 text-heading-4">Apply Now</h2>
        <form onSubmit={formik.handleSubmit} id="fundRaise" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div className="flex flex-col">
              <label htmlFor="Name" className="mb-4 sm:mb-6 text-button-md">
                Is this on behalf of a deceased person?
              </label>
              <div className="flex items-center gap-6 mb-5 sm:mb-6">
                <div className="flex gap-2">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value={true}
                    name="forDeceasedPerson"
                    className="rounded-full"
                    onChange={formik.handleChange}
                  />
                  <label
                    for="default-radio-1"
                    className="text-button-md text-neutral-800"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value={false}
                    name="forDeceasedPerson"
                    className="rounded-full"
                    onChange={formik.handleChange}
                  />
                  <label
                    for="default-radio-2"
                    className="text-button-md text-neutral-800"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="amount">
                Funding Goal Amount?<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                className="w-full form-control"
                id="amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                placeholder="$100"
              />
              {formik.touched.amount && Boolean(formik.errors.amount) && (
                <FormikValidationError
                  formikTouched={formik.touched.amount}
                  formikError={formik.errors.amount}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                Name of Contact<span className="text-red-300">*</span>
              </label>

              <input
                type="text"
                className="w-full form-control"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Name of Contact"
              />
              {formik.touched.name && Boolean(formik.errors.name) && (
                <FormikValidationError
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                Phone Number of Contact<span className="text-red-300">*</span>
              </label>
              <PhoneField
                name={"phone"}
                value={formik.values.phone}
                handleChange={handlePhoneChange}
              />
              {formik.touched.phone && Boolean(formik.errors.phone) && (
                <FormikValidationError
                  formikTouched={formik.touched.phone}
                  formikError={formik.errors.phone}
                />
              )}
            </div>
            <div className="md:flex md:gap-6">
              <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
                <label htmlFor="campaignStart">
                  Campaign Start Date<span className="text-red-300">*</span>
                </label>
                <DatePicker
                  selected={formik.values.campaignStart}
                  onChange={(date) =>
                    formik.setFieldValue("campaignStart", date)
                  }
                  className="w-full form-control"
                  id="campaignStart"
                  name="campaignStart"
                  placeholderText="MM/DD/YYYY"
                  autoComplete="off"
                />
                {/* <div className="relative w-full ">
                  <input
                    type="date"
                    className="w-full form-control"
                    id="campaignStart"
                    name="campaignStart"
                    value={formik.values.campaignStart}
                    onChange={formik.handleChange}
                    placeholder="MM/DD/YYYY"
                  />

                </div> */}
                {formik.touched.campaignStart &&
                  Boolean(formik.errors.campaignStart) && (
                    <FormikValidationError
                      formikTouched={formik.touched.campaignStart}
                      formikError={formik.errors.campaignStart}
                    />
                  )}
              </div>
            </div>
            <div className="md:flex md:gap-6">
              <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
                <label htmlFor="campaignEnd">
                  Estimated End Date<span className="text-red-300">*</span>
                </label>
                <DatePicker
                  selected={formik.values.campaignEnd}
                  onChange={(date) => formik.setFieldValue("campaignEnd", date)}
                  className="w-full form-control"
                  id="campaignStart"
                  name="campaignStart"
                  placeholderText="MM/DD/YYYY"
                  autoComplete="off"
                />
                {formik.touched.campaignEnd &&
                  Boolean(formik.errors.campaignEnd) && (
                    <FormikValidationError
                      formikTouched={formik.touched.campaignEnd}
                      formikError={formik.errors.campaignEnd}
                    />
                  )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Name" className="mb-4 sm:mb-6 text-button-md">
                Which Al-Ihsan Project would you like the funds to go towards?
                <span className="text-red-300">*</span>
              </label>
              {fundraiseGoTowards?.map((e) => (
                <div key={e} className="flex items-center gap-2 mb-5">
                  <input
                    type="checkbox"
                    id={e}
                    name="project"
                    value={e}
                    checked={formik.values.project.includes(e)}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-bold text-button-md text-neutral-800"
                  >
                    {e}
                  </label>
                </div>
              ))}
              {formik.touched.project && Boolean(formik.errors.project) && (
                <FormikValidationError
                  formikTouched={formik.touched.project}
                  formikError={formik.errors.project}
                />
              )}
            </div>
          </div>
          <Button
            className={"mt-10"}
            variant="primaryFull"
            type="submit"
            label="Submit"
          />
        </form>
      </div>
    </div>
  );
};
