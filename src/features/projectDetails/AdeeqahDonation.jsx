import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { PlusIcon, MinusIcon } from "../../../src/theme/svg-icons";
import { SnackMessages } from "../../components/Toast";
import { FormikValidationError } from "../Common/FormikValidationError";
import {
  addBasketItem,
  addBasket,
  updateBasketItem,
  toggleBasket,
} from "../basket/basketSlice";
import { ReccuringOptions } from "./ReccuringOptions";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { checkAdminPermission } from "../../utils/helper";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const paymentTypes = [
  { value: "false", label: "One-time" },
  { value: "true", label: "Recurring" },
];

export const AdeeqahDonation = ({ campaign, handleClose, isModal }) => {
	const user = localStorage.getItem('loggedIn');
  const dispatch = useDispatch();
  const { ricePrice, cowPrice, goatPrice } = campaign?.prices;


  const validationSchema = yup.object({
    behalfOf: yup.string("Add Behalf Of").required("On Behalf Of is required"),
    specialRequest: yup
      .string("Select Special Request")
      .required("Special Request is required"),
    donationItem: yup
      .string("Select Donation Item")
      .required("Donation Item is required"),
  });

  const handleDonation = async (values, { resetForm }) => {
    checkAdminPermission()
    const itemPrices = {
      cow: cowPrice,
      "goat/sheep": goatPrice,
    };
    const donationItemPrice = itemPrices[formik.values.donationItem] || 0;
    const subTotal = donationItemPrice + formik.values.riceQuantity * ricePrice;

    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");

    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const action = isInCheckoutList ? updateBasketItem : addBasketItem;
    const updatedValues = {
      ...values,
      amount: parseInt(ricePrice),
      total: subTotal,
      riceQuantity: parseInt(values.riceQuantity),
      isRecurring: JSON.parse(values.isRecurring),
      periodDays: values.periodDays,
      donationItem: values.donationItem === "cow" ? "COW" : "GOAT",
      checkoutType: "ADEEQAH_GENERAL_SACRIFICE",
      donationItemPrice: donationItemPrice,
      ricePrice: ricePrice,
    };
    const updatedCheckout = isInCheckoutList
      ? [
          ...checkout.slice(
            0,
            checkout.findIndex((obj) => obj.campaignId === values.campaignId)
          ),
          updatedValues,
          ...checkout.slice(
            checkout.findIndex((obj) => obj.campaignId === values.campaignId) +
              1
          ),
        ]
      : [...checkout, updatedValues];
    dispatch(addBasket(updatedCheckout));
    localStorage.setItem("checkout", JSON.stringify(updatedCheckout));
    await dispatch(action(updatedValues));
    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`
    );
    resetForm();
    dispatch(toggleBasket());
    handleClose();
  };

  const handleChange = (e) => {
		if(e.target.name==='isRecurring' && !user && e.target.value==='true') {
			showErrorMessage('Please login to access this feature')
			return;
		}
    formik.setFieldValue(
      [e.target.name],
      e.target.value === "Add More" ? 1 : e.target.value
    );
    formik.setFieldValue("custom", true);
  };

  const handleRiceChange = (e) => {
    const selectedValue = e.target.value;
    const currentAmount = formik.values.riceQuantity;

    // If the same option is selected again, deselect it
    if (selectedValue === currentAmount) {
      formik.setFieldValue("riceQuantity", ""); // You can also use an empty string ''
    } else {
      formik.setFieldValue(
        "riceQuantity",
        selectedValue === "Add More" ? 1 : selectedValue
      );
      formik.setFieldValue("custom", true);
    }
  };
  const increaseCount = () => {
    formik.setFieldValue(
      "riceQuantity",
      parseInt(formik.values.riceQuantity) + 1
    );
  };
  const decreaseCount = () => {
    if (formik.values.riceQuantity > 1) {
      formik.setFieldValue(
        "riceQuantity",
        parseInt(formik.values.riceQuantity) - 1
      );
    }
  };
  const handleCustomRice = () => {
    formik.setFieldValue("riceQuantity", 1);
    formik.setFieldValue("custom", false);
  };
  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.campaign?.id,
      amount: "",
      name: campaign?.campaign?.name,
      coverImage: campaign?.campaign?.coverImage,
      isRecurring: "false",
      periodDays: 7,
      donationItem: "",
      specialRequest: "",
      behalfOf: "",
      quantity: 1,
      riceQuantity: "",
      custom: true,
      checkoutType: "ADEEQAH_GENERAL_SACRIFICE",
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
        <div
          className={`${
            isModal
              ? "flex flex-col gap-8 overflow-auto"
              : "flex flex-col gap-8"
          }`}
        >
          <div className="p-2 bg-accent-100 rounded-lg  gap-3.5 flex">
            {paymentTypes?.map((e) => (
              <Button
                type="button"
                label={e.label}
                value={e.value}
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
          {/* on behalf */}
          <div className="form-group">
            <div className="mb-5">
              <label htmlFor="behalfOf">On Behalf Of</label>
              <input
                type="text"
                className="w-full form-control"
                id="behalfOf"
                value={formik.values.behalfOf}
                name="behalfOf"
                onChange={handleChange}
                placeholder="Full Name"
              />
              {formik.touched.behalfOf && Boolean(formik.errors.behalfOf) && (
                <FormikValidationError
                  formikTouched={formik.touched.behalfOf}
                  formikError={formik.errors.behalfOf}
                />
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="VideoRequest">Special Requests</label>
              <select
                className="w-full text-sm !text-neutral-800 form-control"
                id="VideoRequest"
                name="specialRequest"
                onChange={handleChange}
                value={formik.values?.specialRequest}
              >
                <option value="">Select Option</option>
                <option value="supplication">Supplication</option>
                <option value="dua">Dua</option>
                <option value="specialDua">Special Dua</option>
              </select>
              {formik.touched.specialRequest &&
                Boolean(formik.errors.specialRequest) && (
                  <FormikValidationError
                    formikTouched={formik.touched.specialRequest}
                    formikError={formik.errors.specialRequest}
                  />
                )}
            </div>
            <div className="mb-5">
              <label htmlFor="VideoRequest">Donation Item</label>
              <select
                className="w-full text-sm !text-neutral-800 form-control"
                id="VideoRequest"
                onChange={handleChange}
                name="donationItem"
                value={formik.values.donationItem}
              >
                <option value="">Select Donation Item</option>
                <option value="cow">Cow</option>
                <option value="goat/sheep">Goat/Sheep</option>
              </select>
              {formik.touched.donationItem &&
                Boolean(formik.errors.donationItem) && (
                  <FormikValidationError
                    formikTouched={formik.touched.donationItem}
                    formikError={formik.errors.donationItem}
                  />
                )}
            </div>

            <div className="mb-8">
              <label htmlFor="riceQuantity">Extra Rice</label>
              <fieldset className="grid justify-between items-center gap-4 md:gap-3.5 grid-cols-6 md:grid-cols-6">
                <legend className="sr-only">Select an amount to donate</legend>
                <div className="col-span-3 sm:col-span-2">
                  <Button
                    type="button"
                    id="100"
                    name="riceQuantity"
                    value="25"
                    label="25Kg Rice"
                    onClick={handleRiceChange}
                    variant={"secondaryOutlineFull"}
                    className={
                      formik?.values.riceQuantity === "25"
                        ? "bg-primary-300 !text-white"
                        : ""
                    }
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <Button
                    type="button"
                    id="200"
                    label="50Kg Rice"
                    name="riceQuantity"
                    value="50"
                    variant={"secondaryOutlineFull"}
                    className={
                      formik?.values.riceQuantity === "50"
                        ? "bg-primary-300 !text-white"
                        : ""
                    }
                    onClick={handleRiceChange}
                  />
                </div>

                {formik.values.custom ? (
                  <div className="col-span-6 sm:col-span-2">
                    <Button
                      type="button"
                      id="Other"
                      label="Other"
                      name="riceQuantity"
                      value="Add More"
                      variant={"secondaryOutlineFull"}
                      className={
                        formik?.values.riceQuantity !== "50" &&
                        formik?.values.riceQuantity !== "25" &&
                        formik?.values.riceQuantity !== ""
                          ? "bg-primary-300 !text-white"
                          : ""
                      }
                      onClick={handleCustomRice}
                    />
                  </div>
                ) : (
                  <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                    <button
                      type="button"
                      data-action="decrement"
                      className="flex items-center justify-center w-8 px-2 border border-r-0 rounded-l-lg border-neutral-300"
                    >
                      <span className="" onClick={decreaseCount}>
                        <MinusIcon />
                      </span>
                    </button>
                    <input
                      type="number"
                      className="border !rounded-none w-11 !p-0 text-center !text-heading-7 !text-neutral-1000 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      name="riceQuantity"
                      onChange={handleChange}
                      value={formik.values.riceQuantity}
                      readOnly={true}
                    />
                    <button
                      type="button"
                      data-action="increment"
                      className="flex items-center justify-center w-8 px-2 border border-l-0 rounded-r-lg border-neutral-300"
                    >
                      <span className="" onClick={increaseCount}>
                        <PlusIcon />
                      </span>
                    </button>
                  </div>
                )}
              </fieldset>
            </div>
          </div>
          <TotalSection
            ricePrice={ricePrice}
            cowPrice={cowPrice}
            goatPrice={goatPrice}
            riceQnty={formik.values.riceQuantity}
            donationItem={formik.values.donationItem}
          />
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <Button
              type="submit"
              label="Donate"
              className="btn btn-primary filled"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const TotalSection = ({
  ricePrice,
  cowPrice,
  goatPrice,
  riceQnty,
  donationItem,
}) => {
  const itemPrices = {
    cow: cowPrice,
    "goat/sheep": goatPrice,
  };

  const donationItemPrice = itemPrices[donationItem] || 0;
  const subTotal = donationItemPrice + riceQnty * ricePrice;

  return (
    <div>
      <div className="mb-10">
        <div className="h-px mb-5 bg-neutral-300"></div>
        {donationItem ? (
          <div className="grid justify-between grid-cols-5">
            <div className="col-span-3 capitalize ">{donationItem}</div>
            <div className="col-span-1">1 x</div>
            <div className="col-span-1 text-right">
              ${donationItemPrice?.toLocaleString()}
            </div>
          </div>
        ) : (
          ""
        )}
        {riceQnty ? (
          <div className="grid justify-between grid-cols-5 mt-2">
            <div className="col-span-3">Rice</div>
            <div className="col-span-1">{riceQnty}KG x</div>
            <div className="col-span-1 text-right">
              ${ricePrice?.toLocaleString()}
            </div>
          </div>
        ) : (
          ""
        )}
        {subTotal ? (
          <>
            <div className="h-px my-5 bg-neutral-300"></div>
            <div className="flex justify-between text-heading-7">
              <div>Subtotal</div>
              <div>${subTotal?.toLocaleString()}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

AdeeqahDonation.propTypes = {
  isModal: PropTypes.bool,
};
AdeeqahDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
