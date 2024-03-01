import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "../../theme/svg-icons";
import * as yup from "yup";
import { PhoneField } from "../../components/PhoneField";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { SnackMessages } from "../../components/Toast";
import { submitContactForm } from "./ContactUs";
import { FormikValidationError } from "../../features/Common/FormikValidationError";
import { Link } from "react-router-dom";
import TextArea from "../../components/TextArea";
import PageHead from "../../components/PageHead";
import { getCountryLengths } from "../../utils/helper";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaValidation } from "../../features/authentication/authenticationSlice";

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required("First Name is required").max(25),
  lastName: yup.string().trim().required("Last Name is required").max(25),
  email: yup
    .string("Enter your email")
    .trim()
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
  phone: yup.string().trim().required("Phone Number is required"),
  message: yup.string().required("Message is required").max(500),
});

const GetInTouchComponent = () => {
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [countryCode, setCountryCode] = useState("");
  const [isDisable, setDisable] = useState(false);

  const handlePhoneChange = (value, data) => {
    setCountryCode(data.countryCode);

    formik.setFieldValue("phone", value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
      setDisable(true);
      const isValid = getCountryLengths(values.phone, countryCode);
      if (!isValid) {
        setErrors({ phone: "Invalid phone number" });
        setDisable(false);
      } else {
        try {
          const response = await dispatch(submitContactForm(formik.values));
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

  return (
    <div>
      <PageHead title={"Get in touch"} />
      <div className="py-7.5 md:py-15 standard-details-page">
        <section aria-label="Complaints">
          <div className="container mb-10 md:mb-7.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7.5">
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <ClockIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Operating Hours</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <p className="uppercase text-button-lg text-neutral-800">
                    Mon-Fri 9am - 5pm
                  </p>
                  <p className="uppercase text-button-lg text-neutral-800">
                    Sat 9am - 1pm
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <Link to={"tel:1300998444"}>
                  <div className="flex flex-col col-span-1 gap-10">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="text-primary-300">
                        <PhoneCallIcon iconSize={60} />
                      </div>
                      <p className="text-sm text-neutral-700">Call Now</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4 text-center">
                      <p className="text-button-lg text-neutral-800">
                        1300 998 444
                      </p>
                      <p className="text-xs">
                        Give us a call, and we'll be pleased to help. One of our
                        executives will contact you.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MailIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Email Us</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <Link
                    to="mailto:info@alihsan.org.au"
                    className="text-button-lg text-neutral-800"
                  >
                    info@alihsan.org.au
                  </Link>
                  <p className="text-xs">
                    If you would like our assistance, kindly mail us. You will
                    hear from our executive soon.
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MapPinIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Address</p>
                </div>
                <div className="flex flex-col justify-center gap-2 text-center">
                  <p className="text-button-lg text-neutral-800">
                    176 Waldron Rd, Chester Hill, NSW 2162, AUSTRALIA
                  </p>
                  <Link
                    to={"https://maps.app.goo.gl/VeY7iZg4um1CKXAK9"}
                    target="_blank"
                    className="text-primary-300 text-button-md"
                  >
                    View On Google Map
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-container">
            <div className="grid md:grid-cols-2 gap-7.5">
              <div className="px-4 py-7.5 md:p-10 bg-neutral-200 rounded-2.5xl">
                <h2 className="mb-5 text-heading-6 md:text-heading-3">
                  Get In Touch
                </h2>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="">
                    <div className="flex flex-col mb-6 form-group grow">
                      <label htmlFor="Name">
                        First Name<span className="text-red-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="w-full form-control"
                        id="Name"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName &&
                        Boolean(formik.errors.firstName) && (
                          <FormikValidationError
                            formikTouched={formik.touched.firstName}
                            formikError={formik.errors.firstName}
                          />
                        )}
                    </div>
                    <div className="flex flex-col mb-6 form-group grow">
                      <label htmlFor="Name">
                        Last Name<span className="text-red-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="w-full form-control"
                        id="Name"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName &&
                        Boolean(formik.errors.lastName) && (
                          <FormikValidationError
                            formikTouched={formik.touched.lastName}
                            formikError={formik.errors.lastName}
                          />
                        )}
                    </div>
                    <div className="flex flex-col mb-6 form-group grow">
                      <label htmlFor="Name">
                        Email Address<span className="text-red-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="w-full form-control"
                        id="Name"
                        placeholder="Email Address"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.touched.email && Boolean(formik.errors.email) && (
                        <FormikValidationError
                          formikTouched={formik.touched.email}
                          formikError={formik.errors.email}
                        />
                      )}
                    </div>
                    <div className="flex flex-col mb-6 form-group grow">
                      <label htmlFor="Name">
                        Phone Number<span className="text-red-300">*</span>
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
                    <div className="flex flex-col col-span-2 mb-6 form-group grow">
                      <label htmlFor="Description">
                        Message <span className="text-sm text-red-300">*</span>
                      </label>
                      <TextArea
                        name="message"
                        handleChange={formik.handleChange}
                        value={formik.values.message}
                      />
                      {formik.touched.message &&
                        Boolean(formik.errors.message) && (
                          <FormikValidationError
                            formikTouched={formik.touched.message}
                            formikError={formik.errors.message}
                          />
                        )}
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
              <div className="p-5 bg-neutral-200 rounded-2.5xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26498.989476867733!2d150.97674085881945!3d-33.8800286361958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bdabed2aee19%3A0x5017d681632b100!2sChester%20Hill%20NSW%202162%2C%20Australia!5e0!3m2!1sen!2sin!4v1698943592433!5m2!1sen!2sin"
                  title="map"
                  width="100%"
                  height="100%"
                  allowfullscreen=""
                  className="rounded-2.5xl min-h-[500px]"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetInTouchComponent;
