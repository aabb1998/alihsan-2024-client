import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { SnackMessages } from "../../components/Toast";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../theme/svg-icons";
import Button from "../../components/Button";
import { addSubscriber } from "../../../src/features/home/homeSlice";
import { FormikValidationError } from "../../features/Common/FormikValidationError";
import * as yup from "yup";

export const Footer = () => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const { subscriber } = useSelector((state) => state.mapCountries);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Enter a valid email"
      )
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(addSubscriber(formik.values));

        if (response?.payload?.success) {
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.error?.message);
        }
      } catch (error) {}
      resetForm();
    },
  });

  return (
    <footer className="border-t border-t-neutral-300 pt-7.5 md:pt-20 pb-7.5">
      <div className="container mb-10 md:mb-15">
        <div className="flex flex-col gap-8 md:justify-between md:flex-row md:gap-0">
          <div>
            <h5 className="text-base mb-4.5">About Us</h5>
            <ul className="flex flex-col gap-4.5">
              <li>
                <a href="#">Who We Are?</a>
              </li>
              <li>
                <a href="#">Our Vision & Mission</a>
              </li>
              <li>
                <a href="#">Objectives & Strategies</a>
              </li>
              <li>
                <a href="#">Case Studies</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Videos</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-base mb-4.5">Policies & Procedures</h5>
            <ul className="flex flex-col gap-4.5">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Child Protection Policies</a>
              </li>
              <li>
                <a href="#">Data Deletion Policy</a>
              </li>
              <li>
                <a href="#">Safeguarding Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-base mb-4.5">Follow Us</h5>
            <ul className="flex gap-1 text-[#C0BEB9] mb-6">
              <li>
                <a
                  href="https://www.facebook.com/alihsanfoundation"
                  target="_blank"
                >
                  <span className="sr-only">Navigate to facebook</span>
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Alihsan_AU" target="_blank">
                  <span className="sr-only">Navigate to facebook</span>
                  <TwitterIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/alihsanfoundation/about/"
                  target="_blank"
                >
                  <span className="sr-only">Navigate to linkedin</span>
                  <LinkedinIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/alihsan_foundation/"
                  target="_blank"
                >
                  <span className="sr-only">Navigate to instagram</span>
                  <InstagramIcon />
                </a>
              </li>
              {/* <li>
                        <a href="https://www.youtube.com/@AlIhsanFoundationInternational" target="_blank">
                            </a>
                        </li> */}
              <li>
                <a href="" target="_blank">
                  <span className="sr-only">Navigate to whatsapp</span>
                  <WhatsappIcon />
                </a>
              </li>
            </ul>
            <h5 className="mb-1 text-base">Subscribe</h5>
            <p className="mb-4.5 text-neutral-600 text-sm">
              Stay connected with our subscription service.
            </p>
            <div className="flex gap-3 form-group">
              <form onSubmit={formik.handleSubmit} className="flex items-start gap-3">
                <label for="subscribeEmail" className="sr-only">
                  Email Address
                </label>
                <div>
                <input
                  type="email"
                  name="email"
                  className="w-full form-control"
                  id="email"
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


                <Button variant={"primary"} label={"Subscribe"} className="h-11" />
              </form>
            </div>
          </div>
          <div>
            <h5 className="text-base mb-4.5">Donate</h5>
            <p className="mb-4">
              St George Bank
              <br />
              Acc Name: Al-Ihsan Foundation
              <br />
              BSB: 112 879
              <br />
              ACCOUNT NO: 425 989 660
            </p>
            <div className="flex gap-4">
              <img
                src="/images/assets/tax-deductible.png"
                alt="Tax deductible"
                className="w-16 h-16"
              />
              <img
                src="/images/assets/registered-charity.png"
                alt="Registered charity"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container text-sm md:justify-between md:flex">
        <div className="mb-8 md:mb-0">
          {" "}
          &#169; Copyright 2023 Al-Ihsan Foundation | ABN: 53168960361 | CFN:
          23924
        </div>
        <div className="flex justify-between gap-7.5">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
};
