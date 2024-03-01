import React, { useState } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { SnackMessages } from "../../components/Toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormikValidationError } from "../Common/FormikValidationError";
import { useNavigate } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  updateBasket,
  addBasketItem,
  addBasket,
  updateBasketItem,
  toggleBasket,
} from "../basket/basketSlice";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { checkAdminPermission } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const paymentTypes = [
  { value: "false", label: "One-time" },
  { value: "true", label: "Recurring" },
];
// const donationAmounts = [
//   { value: "100", label: "$100" },
//   { value: "200", label: "$500" },
//   { value: "800", label: "$800" },
//   { value: "Other", label: "Other" },
// ];

const recurringPeriods = [
  { value: "7", label: "Weekly" },
  { value: "30", label: "Monthly" },
  { value: "365", label: "Yearly" },
];

export const ZaqatDonation = ({ campaign, handleClose, isModal }) => {
  const user = useSelector((state) => state.profile.auth);
  const generalDonations = useSelector(
    (state) => state.settings.settings.generalAmounts,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDonation = async (values, { resetForm }) => {
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId,
    );

    const newValues = {
      ...values,
      amount: parseFloat(values.amount, 10),
      total: parseFloat(values.amount, 10),
      periodDays: parseInt(values.periodDays, 10),
      isRecurring: JSON.parse(values.isRecurring),
      Campaign: campaign,
    };
    checkAdminPermission(newValues);

    const action = isInCheckoutList ? updateBasketItem : addBasketItem;
    const updatedCheckout = isInCheckoutList
      ? [
          ...checkout.slice(
            0,
            checkout.findIndex((obj) => obj.campaignId === values.campaignId),
          ),
          newValues,
          ...checkout.slice(
            checkout.findIndex((obj) => obj.campaignId === values.campaignId) +
              1,
          ),
        ]
      : [...checkout, newValues];

    dispatch(addBasket(updatedCheckout));
    localStorage.setItem("checkout", JSON.stringify(updatedCheckout));
    await dispatch(action(newValues));
    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`,
    );

    resetForm();
    dispatch(toggleBasket());
    handleClose();
  };

  const handleChange = (e) => {
    if (e.target.name === "isRecurring" && !user && e.target.value === "true") {
      showErrorMessage("Please login to access this feature");
      return;
    }
    formik.setFieldValue([e.target.name], e.target.value);
  };
  const handleAmount = (e) => {
    const selectedValue = e.target.value;
    const currentAmount = formik.values.amount;

    formik.setFieldValue(
      "amount",
      selectedValue === currentAmount
        ? null
        : selectedValue === "Other"
          ? ""
          : selectedValue,
    );

    formik.setFieldValue(
      "custom",
      selectedValue === "Other" ? !formik.values.custom : false,
    );
  };

  const validationSchema = yup.object({
    amount: yup.string("Add an amount").required("Amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.id,
      amount: "",
      name: campaign?.name,
      coverImage: campaign?.coverImage,
      isRecurring: "false",
      periodDays: "7",
      custom: false,
      checkoutType: campaign?.checkoutType,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleDonation,
  });
  const handleClick = () => {
    handleClose();
    navigate("/zakat-calculator", { state: campaign });
  };
  return (
    <div
      className={`${
        isModal
          ? "md:rounded-xl border-neutral-300 bg-white"
          : "border rounded-xl md:rounded-xl border-neutral-300 p-4 md:p-7.5 bg-white"
      }`}
    >
      {!isModal && (
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <h5 className="text-button-lg md:text-heading-5">Choose Donation</h5>
        </div>
      )}{" "}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="p-2 bg-accent-100 rounded-lg gap-3.5 flex">
            {paymentTypes?.map((e) => (
              <Button
                key={e.label}
                value={e.value}
                label={e.label}
                name="isRecurring"
                type="button"
                onClick={handleChange}
                variant={
                  formik?.values.isRecurring === e.value
                    ? `primaryFull`
                    : `secondaryTextFull`
                }
                className={"tab-btn"}
              />
            ))}
          </div>
          {formik?.values.isRecurring === "true" && (
            <>
              <fieldset className="grid justify-between gap-4 md:gap-3.5 grid-cols-3">
                <legend className="sr-only">Select a recurring period</legend>
                {recurringPeriods.map((option) => (
                  <div key={option.value} className="col-span-1">
                    <Button
                      type="button"
                      id={option.value}
                      label={option.label}
                      variant={"secondaryOutlineFull"}
                      name="periodDays"
                      className={
                        option.value === formik?.values.periodDays
                          ? "button-focus"
                          : ""
                      }
                      value={option.value}
                      onClick={handleChange}
                    />
                  </div>
                ))}
              </fieldset>
              <div className="h-px bg-neutral-300"></div>
            </>
          )}

          <fieldset
            className={`${
              isModal
                ? "grid justify-between gap-4 md:gap-3.5 grid-cols-2"
                : "grid justify-between gap-4 md:gap-3.5 grid-cols-2 md:grid-cols-4"
            }`}
          >
            <legend className="sr-only">Select an amount to donate</legend>
            {[...generalDonations, "Other"].map((option) => (
              <div key={option} className="col-span-1">
                <Button
                  type="button"
                  onClick={handleAmount}
                  value={option}
                  label={
                    option === "Other" ? option : currencyConfig.label + option
                  }
                  name="amount"
                  variant={"secondaryOutlineFull"}
                  className={
                    option === formik.values.amount ||
                    (formik.values.custom && option === "Other")
                      ? "button-focus"
                      : ""
                  }
                />
              </div>
            ))}
            {formik.values.custom && (
              <input
                value={formik.values.amount}
                type="number"
                name="amount"
                placeholder="Please enter amount"
                onChange={handleChange}
                className="col-span-2 md:col-span-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            )}
          </fieldset>
          {formik.touched.amount && Boolean(formik.errors.amount) && (
            <FormikValidationError
              formikTouched={formik.touched.amount}
              formikError={formik.errors.amount}
            />
          )}
          <div>
            <Button
              onClick={handleClick}
              className={`${"block mb-4 btn btn-zakat-calculator filled"}`}
              label={"Calculate Your Zakat"}
              type="button"
              variant={"dark"}
              leftIcon={<CalculateIcon />}
            />

            <div>
              <Button
                type="submit"
                label="Donate"
                className="btn btn-primary filled"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

ZaqatDonation.propTypes = {
  isModal: PropTypes.bool,
};

ZaqatDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
