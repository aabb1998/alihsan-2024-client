import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "../../components";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { submitComplaintsForm } from "./ContactUs";
import { SnackMessages } from "../../components/Toast";
import { FormikValidationError } from "../../features/Common/FormikValidationError";
import { PhoneField } from "../../components/PhoneField";
import TextArea from "../../components/TextArea";
import { CloseIcon } from "../../theme/svg-icons";
import { getCountryLengths } from "../../utils/helper";
import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required").max(25),
  lastName: yup.string().required("Last Name is required").max(25),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required").max(500),
});

export const Form = () => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [disableButton, setDisableButton] = useState(false);
  const [referenceNo, setReferenceNo] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const dispatch = useDispatch();
  const [isDisable, setDisable] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prevChecked) => ({ ...prevChecked, [name]: checked }));
  };

  const [isChecked, setChecked] = useState({
    accurate: false,
    information: false,
  });

  const handleRecaptchaChange = (value) => {
    // Store the ReCAPTCHA value in the state or use it for validation
    setRecaptchaValue(value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      category: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setDisableButton(true);
      const isValid = getCountryLengths(values.phone, countryCode);
      if (!isValid) {
        setErrors({ phone: "Invalid phone number" });
      } else {
        try {
          if (!(isChecked?.accurate && isChecked?.information)) {
            setDisableButton(true);
            return showErrorMessage(
              "Please read and accept the terms and conditions to proceed"
            );
          }
          const response = await dispatch(submitComplaintsForm(formik.values));
          if (response?.payload?.success) {
            setIsOpen(true);
            showSuccessMessage(response?.payload?.message);
            const reference = response?.payload?.payload?.referenceNumber;
            setReferenceNo(reference);
            resetForm();
            setChecked({ information: false, accurate: false });
            setDisableButton(false);
          } else {
            showErrorMessage(response?.payload?.message);
            setDisableButton(false);
          }
        } catch (error) {}
      }
    },
  });
  const handlePhoneChange = (value, data) => {
    setCountryCode(data.countryCode);

    formik.setFieldValue("phone", value);
  };

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText("#" + text);
  };
  useEffect(() => {
    formik.setFieldValue("referenceNumber", "REF101");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (disableButton) {
  //     setTimeout(() => {
  //       setDisableButton(false);
  //     }, 2500);
  //   }
  // }, [disableButton]);
  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
          <div className="flex flex-col col-span-2 mb-6 md:col-span-1 form-group grow">
            <div className="my-4"></div>
            <label htmlFor="Name" className="required">
              First Name<span className="text-sm text-red-300">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full form-control"
              id="Name"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              autoComplete="off"
            />
            {formik.touched.firstName && Boolean(formik.errors.firstName) && (
              <FormikValidationError
                formikTouched={formik.touched.firstName}
                formikError={formik.errors.firstName}
              />
            )}
          </div>
          <div className="flex flex-col col-span-2 mb-6 md:col-span-1 form-group grow">
            <label htmlFor="Name">
              Last Name<span className="text-sm text-red-300">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full form-control"
              id="Name"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              autoComplete="off"
            />
            {formik.touched.lastName && Boolean(formik.errors.lastName) && (
              <FormikValidationError
                formikTouched={formik.touched.lastName}
                formikError={formik.errors.lastName}
              />
            )}
          </div>
          <div className="flex flex-col col-span-2 mb-6 md:col-span-1 form-group grow">
            <label htmlFor="Name">
              Contact Number<span className="text-sm text-red-300">*</span>
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
          <div className="flex flex-col col-span-2 mb-6 md:col-span-1 form-group grow">
            <label htmlFor="Name" className="required">
              Email Address<span className="text-sm text-red-300">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="w-full form-control"
              id="Name"
              placeholder="Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="off"
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <FormikValidationError
                formikTouched={formik.touched.email}
                formikError={formik.errors.email}
              />
            )}
          </div>

          <div className="flex flex-col col-span-2 mb-6 md:col-span-1 form-group grow">
            <label htmlFor="ComplaintsCategories" className="required">
              Complaints Categories{""}
              <span className="text-sm text-red-300">*</span>
            </label>
            <select
              className="w-full text-sm !text-neutral-800 form-control"
              onChange={formik.handleChange}
              value={formik.values.category}
              name="category"
              id="ComplaintsCategories"
            >
              <option value="">Select Option</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
            {formik.touched.category && Boolean(formik.errors.category) && (
              <FormikValidationError
                formikTouched={formik.touched.category}
                formikError={formik.errors.category}
              />
            )}
          </div>
          <div className="flex flex-col col-span-2 form-group grow">
            <label htmlFor="Description">
              Description of Your Complaint{""}
              <span className="text-sm text-red-300">*</span>
            </label>
            <TextArea
              name="description"
              handleChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.touched.description &&
              Boolean(formik.errors.description) && (
                <FormikValidationError
                  formikTouched={formik.touched.description}
                  formikError={formik.errors.description}
                />
              )}
          </div>
        </div>
        <div className="flex flex-col gap-4 my-10">
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isChecked?.information}
              id="Information"
              name="information"
              value=""
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="Information"
              className="text-sm font-medium cursor-pointer text-neutral-800 md:text-md"
            >
              I agree for Al-Ihsan Foundation to use or disclose the information
              I provide, including partners and third parties where necessary to
              work with you to handle your complaint.
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isChecked?.accurate}
              id="Accurate"
              name="accurate"
              value=""
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="Accurate"
              className="text-sm font-medium cursor-pointer text-neutral-800 md:text-md"
            >
              I hereby verify that the information provided in this complaint is
              accurate and true.
            </label>
          </div>
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
        />

        <Button
          variant="primaryFull"
          type="submit"
          disabled={disableButton}
          label="Submit"
        />
      </form>
      <div
        className={"relative z-10" + (isOpen ? " block" : " hidden")}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
              <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-bl-none rounded-br-none sm:rounded-bl-3xl sm:rounded-br-3xl rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-4 pb-6 sm:p-7.5">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold heading-7"></div>
                      <div className="cursor-pointer">
                        <CloseIcon onClick={() => setIsOpen(false)} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-end">
                        <div className="font-bold text-md">
                          Ref no: #{referenceNo}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button
                        className="btn btn-dark filled"
                        label={"Copy"}
                        onClick={() => {
                          handleCopyClick(referenceNo);
                          setIsOpen(false);
                        }}
                      />
                    </div>
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
