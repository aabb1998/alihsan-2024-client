import React, { useRef, useState } from "react";
import { Button } from "../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { SnackMessages } from "../../components/Toast";
import { FormikValidationError } from "../Authentication/Common/FormikValidationError";
import { addVolunteer } from "../../features/volunteerWithUs/volunteerWithUs";
import { PhoneField } from "../../components/PhoneField";
import { TextArea } from "../../components/TextArea";
import { getCountryLengths } from "../../utils/helper";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaValidation } from "../../features/authentication/authenticationSlice";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

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
  phone: yup.string().trim().required("Phone Number is required"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .max(500, ({ max }) => `Message must be at most ${max} characters`),
});

export const Form = () => {
  const dispatch = useDispatch();
  const captchaRef = useRef(null);

  const [countryCode, setCountryCode] = useState("");
  const [isDisable, setDisable] = useState(false);

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
          const response = await dispatch(addVolunteer(formik.values));
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
        <h2 className="mb-5 text-heading-4">Become a Volunteer</h2>
        <form onSubmit={formik.handleSubmit} id="fundRaise" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 last:bg-primary-300">
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Name">
                First Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                className="w-full form-control"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                placeholder="First Name"
                onChange={formik.handleChange}
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
                className="w-full form-control"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Last Name"
              />
              {formik.touched.lastName && Boolean(formik.errors.lastName) && (
                <FormikValidationError
                  formikTouched={formik.touched.lastName}
                  formikError={formik.errors.lastName}
                />
              )}
            </div>
            <div className="flex flex-col mb-5 sm:mb-6 form-group grow">
              <label htmlFor="Number">
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
            <div className="flex flex-col mb-5 sm:col-span-2 sm:mb-6 form-group grow">
              <label htmlFor="Message">
                Message<span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <TextArea
                  name="message"
                  value={formik.values.message}
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
