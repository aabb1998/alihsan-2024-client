import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  aboutAs,
  followUs,
  policies,
  privacy,
  brand,
} from "../../utils/constants";
import { SnackMessages } from "../Toast";
import { useFormik } from "formik";
import { addSubscriber } from "../../features/home/homeSlice";
import { FormikValidationError } from "../../features/Common/FormikValidationError";

import * as yup from "yup";

export const Footer = () => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const { pathname } = useLocation();
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
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
      resetForm();
    },
  });
  useEffect(() => {
    formik.resetForm();
  }, [pathname]);

  return (
    <footer className="border-t border-t-neutral-300 pt-7.5 md:pt-20 pb-7.5">
      <div className="container mb-10 md:mb-15">
        <div className="flex flex-col gap-8 md:justify-between md:flex-row md:gap-0">
          <div>
            <h5 className="text-base mb-4.5">About Us</h5>
            <ul className="flex flex-col gap-4.5">
              {aboutAs?.map((e, i) => (
                <li key={i}>
                  {e.to === "/media" ? (
                    <Link to={e.to} state={"videos"}>
                      {e.text}
                    </Link>
                  ) : (
                    <Link to={e.to}>{e.text}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-base mb-4.5">Policies & Procedures</h5>
            <ul className="flex flex-col gap-4.5">
              {policies?.map((e, i) => (
                <li key={i}>
                  <Link to={e.to}>{e.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-base mb-4.5">Follow Us</h5>
            <ul className="flex items-center gap-1 text-[#C0BEB9] mb-6">
              {followUs?.map((e) => (
                <li key={e.url}  className="flex items-center">
                  <Link to={e.url} target="_blank">
                    <span className="sr-only">{e.label}</span>
                    {e.icon}
                  </Link>
                </li>
              ))}
            </ul>
            <h5 className="mb-1 text-base">Subscribe</h5>
            <p className="mb-4.5 text-neutral-600 text-sm">
              Stay connected with our subscription service.
            </p>
            <div className="flex gap-3 form-group">
              <form
                onSubmit={formik.handleSubmit}
                className="flex items-start gap-3"
              >
                <label htmlFor="subscribeEmail" className="sr-only">
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
                <Button
                  variant={"primary"}
                  label={"Subscribe"}
                  className="h-11"
                />
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
              {brand.map((e, i) => (
                <img key={i} src={e.src} alt={e.label} className="w-16 h-16" />
              ))}
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
          {privacy?.map((e, i) => (
            <Link key={i} to={e.to}>
              {e.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
