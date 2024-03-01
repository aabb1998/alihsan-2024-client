import React, { useRef, useState } from "react";
import { Button } from "../../components";

import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { SnackMessages } from "../../components/Toast";
import { addSponsor } from "../../features/becomeASponsor/BecomeASponsor";
import { FormikValidationError } from "../Authentication/Common/FormikValidationError";
import { PhoneField } from "../../components/PhoneField";
import TextArea from "../../components/TextArea";
import { getCountryLengths } from "../../utils/helper";
import { captchaValidation } from "../../features/authentication/authenticationSlice";
import ReCAPTCHA from "react-google-recaptcha";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

export const Form = () => {
  const dispatch = useDispatch();
  const captchaRef = useRef(null);
  const [countryCode, setCountryCode] = useState("");
  const [isDisable, setDisable] = useState(false);

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required("First Name is required")
      .max(50, ({ max }) => `First Name must be at most ${max} characters`),
    lastName: yup
      .string()
      .trim()
      .required("Last Name is required")
      .max(50, ({ max }) => `Last Name must be at most ${max} characters`),
    companyName: yup
      .string()
      .trim()
      .required("Company Name is required")
      .max(50, ({ max }) => `Company Name must be at most ${max} characters`),
    phone: yup.string().required("Phone Number is required"),
    message: yup
      .string()
      .trim()
      .required("Message is required")
      .max(500, ({ max }) => `Message must be at most ${max} characters`),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
      const response = await dispatch(captchaValidation({ token: token }));
      if (!response?.payload?.success) {
        showErrorMessage(response?.payload?.message);
        return;
      }
      const isValid = getCountryLengths(values.phone, countryCode);
      setDisable(true);
      if (!isValid) {
        setErrors({ phone: "Invalid phone number" });
        setDisable(false);
      } else {
        try {
          const response = await dispatch(addSponsor(formik.values));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            resetForm();
            setDisable(false);
          } else {
            showErrorMessage(response?.payload?.message);
            setDisable(false);
          }
        } catch (error) {}
      }
    },
  });

  const handlePhoneChange = (value, data) => {
    setCountryCode(data.countryCode);
    formik.setFieldValue("phone", value);
  };

  return (
    <div className="container">
      <div className="py-7.5 px-4 sm:p-10 my-10 sm:mt-10 sm:mb-20 bg-neutral-200 rounded-2.5xl">
        <h2 className="mb-5 text-heading-4">Enquire Now</h2>
        <form onSubmit={formik.handleSubmit} id="sponsor" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 last:bg-primary-300">
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                First Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="w-full form-control"
                placeholder="First Name"
                autoComplete="off"
              />
              {formik.touched.firstName && Boolean(formik.errors.firstName) && (
                <FormikValidationError
                  formikTouched={formik.touched.firstName}
                  formikError={formik.errors.firstName}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                Last Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="w-full form-control"
                placeholder="Last Name"
                autoComplete="off"
              />
              {formik.touched.lastName && Boolean(formik.errors.lastName) && (
                <FormikValidationError
                  formikTouched={formik.touched.lastName}
                  formikError={formik.errors.lastName}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                Company Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                className="w-full form-control"
                placeholder="Company Name"
                autoComplete="off"
              />
              {formik.touched.companyName &&
                Boolean(formik.errors.companyName) && (
                  <FormikValidationError
                    formikTouched={formik.touched.companyName}
                    formikError={formik.errors.companyName}
                  />
                )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Number">
                Phone Number of Contact<span className="text-red-300">*</span>
              </label>
              <PhoneField
                value={formik.values.phone}
                handleChange={handlePhoneChange}
                name={"phone"}
              />

              {formik.touched.phone && Boolean(formik.errors.phone) && (
                <FormikValidationError
                  formikTouched={formik.touched.phone}
                  formikError={formik.errors.phone}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:col-span-2 sm:mb-6 form-group grow">
              <label htmlFor="Message">
                Message<span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <TextArea
                  value={formik.values.message}
                  name="message"
                  handleChange={formik.handleChange}
                />
                {formik.touched.message && Boolean(formik.errors.message) && (
                  <FormikValidationError
                    formikTouched={formik.touched.message}
                    formikError={formik.errors.message}
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
              />
            </div>
          </div>
          <Button
            variant="primaryFull"
            type="submit"
            label="Submit"
            disabled={formik.isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};
