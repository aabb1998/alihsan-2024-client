import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import PhoneInput from "react-phone-input-2";
import { DonationTotal } from "../Common/DonationTotal";
import Stepper from "../Common/Stepper";
import {
  getProfile,
  updateProfile,
} from "../../../features/authentication/authenticationSlice";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { SnackMessages } from "../../../components/Toast";
import { countriesList } from "../../../utils/countries";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateCheckoutProfile } from "../../../features/paymentDetails/paymentDetailsSlice";
const { showErrorMessage } = SnackMessages();

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  createAccount: "",
  basketItems: [],
  status: true,
};
const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .trim()
    .required("First name is required")
    .max(40, "First name must be at most 40 characters"),
  lastName: yup
    .string("Enter your last name")
    .trim()
    .required("Last name is required")
    .max(40, "Last name must be at most 40 characters"),
  company: yup
    .string("Enter your Company Name")
    .trim()
    .max(40, "Company name must be at most 40 characters"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required"),
  phone: yup.string("Enter your phone number").when("status", {
    is: true,
    then: () => yup.string().required("Phone Number is required"),
  }),
  address: yup
    .string("Enter your address")
    .when("status", {
      is: true,
      then: () => yup.string().required("Address is required"),
    })
    .max(100, "Street address should be at most 100 characters"),
  country: yup
    .string("Select your country")
    .when("status", {
      is: true,
      then: () => yup.string().required("Country is required"),
    })
    .max(2, "Country should only be 2 characters"),
  state: yup
    .string("Enter your state")
    .trim()
    .when("status", {
      is: true,
      then: () => yup.string().required("State is required"),
    })
    .max(40, "State name should be at most 40 characters"),
  city: yup
    .string("Enter your city")
    .trim()
    .when("status", {
      is: true,
      then: () => yup.string().required("City is required"),
    })
    .max(40, "City name should be at most 40 characters"),

  zip: yup
    .number()
    .typeError("Enter a valid zip code")
    .when("status", {
      is: true,
      then: () => yup.number().required("Zip code is required"),
    })
    .integer("Zip code should be an integer")
    .positive("Zip code should be a positive number")
    .max(10000000000000000000, "Zip code should be at most 20 characters"),
});

const CheckoutComponent = () => {
  const userProfile = useSelector((state) => state.profile.user);
  const { basketItems } = useSelector((state) => state.basketItem);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.profile.auth);
	const role = userData?.role

  const handlePhoneChange = (value) => {
    formik.setFieldValue("phone", value);
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const updatedValues = {
          ...values,
          basketItems: basketItems,
        };
        let response;
        if (!userProfile?.email || userProfile.role === "ADMIN") {
          response = await dispatch(
            updateCheckoutProfile({
              ...updatedValues,
              paymentGateway: "stripe",
              isAnonymous: true,
            })
          );
          handleResponse(response, () => {
            const payload = response?.payload?.payload;
            const clientSecret = payload?.clientSecret;
            localStorage.setItem(
              "personalInfo",
              JSON.stringify({
                ...updatedValues,
                paymentIntentId: payload?.paymentIntentId,
                donationIds: payload?.donationIds,
              })
            );
            const checkoutDetails = {
              ...updatedValues,
              clientSecret: clientSecret,
            };
            navigate("/confirm", { state: checkoutDetails });
          });
        } else {
          response = await dispatch(updateProfile(updatedValues));
          handleResponse(response, () => {
            navigate("/confirm");
          });
        }

        setIsLoading(false);
      } catch (error) {
        showErrorMessage(error.message);
        setIsLoading(false);
      }
    },
  });

  const handleResponse = (response, successCallback) => {
    if (response?.payload?.success) {
      successCallback();
    } else {
      showErrorMessage(response?.payload?.message);
    }
  };

  const getProfileDetails = async () => {
    // if (!profile.isFetching && !profile.isError && !profile.email) {
    const personalInfo = JSON.parse(
      localStorage.getItem("personalInfo") || null
    );
    if (role === "USER") {
      try {
        // check user is login or not
        // const
        const action = await dispatch(getProfile());
        if (action.payload) {
          formik.setValues(action.payload);
          formik.setFieldValue("status", true);
        } else {
          if (personalInfo) {
            formik.setValues(personalInfo);
          }
          formik.setFieldValue("status", false);
        }
      } catch (error) {
        showErrorMessage(error.message);
      }
    } else {
      formik.setFieldValue("status", false);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div>
      {/* Updates */}
      <div className="py-7.5 md:py-15">
        <section>
          <div className="container">
            <div className="mb-5 md:mb-15">
              <Stepper />
            </div>
            <div className="grid-cols-1 gap-10 md:grid md:grid-cols-12">
              <div className="md:col-span-8 ">
                <div className="p-4 sm:p-10 form-group bg-neutral-200 rounded-2.5xl mb-5 sm:mb-10">
                  <div className="flex items-center justify-between">
                    <h1 className="text-heading-6 sm:text-heading-4">
                      Personal Information
                    </h1>
                  </div>
                  <form
                    id="SignupForm"
                    className="mt-5"
                    aria-label="Signup Form"
                    onSubmit={formik.handleSubmit}
                    autocomplete="off"
                  >
                    <div className="md:flex md:gap-6">
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="FirstName" className="">
                          First Name<span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="FirstName"
                          placeholder="First Name"
                          name="firstName"
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
                        <label htmlFor="LastName" className="">
                          Last Name<span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="LastName"
                          placeholder="Last Name"
                          name="lastName"
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
                    </div>
                    <div className="flex flex-col mb-6">
                      <label htmlFor="emailAddress">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full form-control"
                        id="emailAddress"
                        placeholder="Company Name (Optional)"
                        name="company"
                        onChange={formik.handleChange}
                        value={formik.values.company}
                      />
                      {formik.touched.company &&
                        Boolean(formik.errors.company) && (
                          <FormikValidationError
                            formikTouched={formik.touched.company}
                            formikError={formik.errors.company}
                          />
                        )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="emailAddress">
                        Country / Region
                        {formik.values.status && (
                          <span className="text-red-300">*</span>
                        )}
                      </label>
                      <select
                        className="w-full text-sm !text-neutral-800 form-control"
                        id="SelectProject"
                        onChange={formik.handleChange}
                        name="country"
                        value={formik.values.country}
                      >
                        <option value="">Select Country / Region</option>
                        {countriesList.map(({ name, code }) => (
                          <option value={code} key={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.country &&
                        Boolean(formik.errors.country) && (
                          <FormikValidationError
                            formikTouched={formik.touched.country}
                            formikError={formik.errors.country}
                          />
                        )}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="streetAddress" className="">
                        Street Address
                        {formik.values.status && (
                          <span className="text-red-300">*</span>
                        )}
                      </label>
                      <input
                        type="text"
                        className="w-full form-control"
                        id="streetAddress"
                        placeholder="Street Address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                      />
                      {formik.touched.address &&
                        Boolean(formik.errors.address) && (
                          <FormikValidationError
                            formikTouched={formik.touched.address}
                            formikError={formik.errors.address}
                          />
                        )}
                    </div>

                    <div className="md:flex md:gap-6">
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="city" className="">
                          Town / City{" "}
                          {formik.values.status && (
                            <span className="text-red-300">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="city"
                          name="city"
                          placeholder="Town / City"
                          onChange={formik.handleChange}
                          value={formik.values.city}
                        />
                        {formik.touched.city && Boolean(formik.errors.city) && (
                          <FormikValidationError
                            formikTouched={formik.touched.city}
                            formikError={formik.errors.city}
                          />
                        )}
                        {/*
                        <select className="w-full text-sm !text-neutral-800 form-control" id="SelectProject">
                          <option value="">Select Town / City</option>
                        </select>
                        */}
                      </div>
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="LastName" className="">
                          State{" "}
                          {formik.values.status && (
                            <span className="text-red-300">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="state"
                          placeholder="State"
                          name="state"
                          onChange={formik.handleChange}
                          value={formik.values.state}
                        />
                        {formik.touched.state &&
                          Boolean(formik.errors.state) && (
                            <FormikValidationError
                              formikTouched={formik.touched.state}
                              formikError={formik.errors.state}
                            />
                          )}
                        {/*
                        <select className="w-full text-sm !text-neutral-800 form-control" id="SelectProject">
                          <option value="">Select State</option>
                        </select> 
                        */}
                      </div>
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="LastName">
                          Post Code{" "}
                          {formik.values.status && (
                            <span className="text-red-300">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="zip"
                          name="zip"
                          placeholder="Post Code"
                          onChange={formik.handleChange}
                          value={formik.values.zip}
                        />
                        {formik.touched.zip && Boolean(formik.errors.zip) && (
                          <FormikValidationError
                            formikTouched={formik.touched.zip}
                            formikError={formik.errors.zip}
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:flex md:gap-6">
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="email" className="">
                          Email Address
                          <span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="email"
                          placeholder="Email Address"
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
                      <div className="flex flex-col mb-6 form-group grow">
                        <label htmlFor="LastName" className="">
                          Phone Number{" "}
                          {formik.values.status && (
                            <span className="text-red-300">*</span>
                          )}
                        </label>
                        <PhoneInput
                          country={"au"}
                          inputStyle={{
                            width: "100%",
                            maxHeight: "2.75rem",
                            height: "2.75rem",
                            paddingLeft: "3rem",
                          }}
                          inputProps={{
                            name: "phone",
                          }}
                          name="phone"
                          type="text"
                          id="phone"
                          placeholder="+38 (000) 000 - 00 - 00"
                          value={formik.values.phone}
                          onChange={handlePhoneChange}
                        />

                        {formik.touched.phone &&
                          Boolean(formik.errors.phone) && (
                            <FormikValidationError
                              formikTouched={formik.touched.phone}
                              formikError={formik.errors.phone}
                            />
                          )}
                      </div>
                    </div>
                    {/* For non-authenticated donation only */}
                    {/*
                    <div className="flex">
                      <div className="flex gap-2 mb-7.5 items-center">
                        <input type="checkbox" id="rememberMe" value="" />
                        <label htmlFor="rememberMe" className="!mb-0 text-neutral-800 !text-md cursor-pointer">Create an Account</label>
                      </div>
                    </div>
                    */}
                    <Button
                      variant="primaryFull"
                      label="Continue"
                      disabled={
                        // profile.isFetching || profile.isError || isLoading
                        isLoading
                      }
                    />
                  </form>
                </div>
                <div className="px-4 py-5 mb-7.5 sm:mb-0 sm:p-10 bg-neutral-200 rounded-2xl">
                  <h2 className="text-heading-6 sm:text-heading-5 text-neutral-800">
                    Payment Details
                  </h2>
                </div>
              </div>
              <div className="mt-10 md:col-span-4 md:mt-0">
                <DonationTotal />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(CheckoutComponent);
