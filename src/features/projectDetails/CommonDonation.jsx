import React from "react";
import Button from "../../components/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toggleBasket } from "../basket/basketSlice";
import {
  addBasketItem,
  addBasket,
  updateBasketItem,
} from "../basket/basketSlice";

import { FormikValidationError } from "../Common/FormikValidationError";
import { SnackMessages } from "../../components/Toast";
import { ReccuringOptions } from "./ReccuringOptions";
import PropTypes from "prop-types";
import { checkAdminPermission, retrieveUserInfo } from "../../utils/helper";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const paymentTypes = [
  { value: "false", label: "One-time" },
  { value: "true", label: "Recurring" },
];
const donationAmounts = [
  { value: "100", label: "$100" },
  { value: "500", label: "$500" },
  { value: "800", label: "$800" },
  { value: "Other", label: "Other" },
];

export const CommonDonation = ({ campaign, handleClose, isModal }) => {
	const user = localStorage.getItem('loggedIn');
  const dispatch = useDispatch();

  const handleDonation = async (values, { resetForm }) => {
    checkAdminPermission();
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      amount: parseFloat(values.amount, 10),
      total: parseFloat(values.amount, 10),
      periodDays: parseInt(values.periodDays, 10),
      isRecurring: JSON.parse(values.isRecurring),
    };

    const action = isInCheckoutList ? updateBasketItem : addBasketItem;
    const updatedCheckout = isInCheckoutList
      ? [
          ...checkout.slice(
            0,
            checkout.findIndex((obj) => obj.campaignId === values.campaignId)
          ),
          newValues,
          ...checkout.slice(
            checkout.findIndex((obj) => obj.campaignId === values.campaignId) +
              1
          ),
        ]
      : [...checkout, newValues];

    dispatch(addBasket(updatedCheckout));
    localStorage.setItem("checkout", JSON.stringify(updatedCheckout));
    await dispatch(action(newValues));
    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`
    );

    resetForm();
    handleClose();
    dispatch(toggleBasket());
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
        : selectedValue
    );

    formik.setFieldValue(
      "custom",
      selectedValue === "Other" ? !formik.values.custom : false
    );
  };

  const handleChange = (e) => {
		if(e.target.name==='isRecurring' && !user && e.target.value==='true') {
			showErrorMessage('Please login to access this feature')
			return;
		}
    formik.setFieldValue([e.target.name], e.target.value);
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

  return (
    <div
      className={`${
        isModal
          ? "md:rounded-4xl border-neutral-300 bg-white"
          : "border rounded-2.5xl md:rounded-4xl border-neutral-300 p-4 md:p-7.5 bg-white"
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
                label={e.label}
                value={e.value}
                type="button"
                name="isRecurring"
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
            <ReccuringOptions
              handleChange={handleChange}
              periodDays={formik?.values.periodDays}
              isRamadanCampaign={campaign?.isRamadanCampaign}
            />
          )}

          <fieldset
            className={`${
              isModal
                ? "grid justify-between gap-4 md:gap-3.5 grid-cols-2"
                : "grid justify-between gap-4 md:gap-3.5 grid-cols-2 md:grid-cols-4"
            }`}
          >
            <legend className="sr-only">Select an amount to donate</legend>
            {donationAmounts.map((option) => (
              <div key={option.value} className="col-span-1">
                <Button
                  type="button"
                  onClick={handleAmount}
                  value={option.value}
                  label={option.label}
                  name="amount"
                  variant={"secondaryOutlineFull"}
                  className={
                    option.value === formik.values.amount ||
                    (formik.values.custom && option.value === "Other")
                      ? "!bg-primary-300 !text-white "
                      : ""
                  }
                />
              </div>
            ))}
            {formik.values.custom && (
              <input
                value={formik.values.amount}
                name="amount"
                type="number"
                placeholder="Please enter amount"
                className="col-span-2 md:col-span-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={handleChange}
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
              label="Donate"
              type="submit"
              className="btn btn-primary filled"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

CommonDonation.propTypes = {
  isModal: PropTypes.bool,
};

CommonDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
