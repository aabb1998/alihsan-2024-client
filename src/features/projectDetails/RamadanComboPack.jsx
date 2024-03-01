import React, { useState } from "react";
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
import { checkAdminPermission, formatPrice } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";
import { MinusIcon, PlusIcon } from "../../theme/svg-icons";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

const paymentTypes = [
  { value: "false", label: "One-time" },
  { value: "true", label: "Recurring" },
];

const pricePerComboPack = 220;
const ramadanRecurring = false;

const RamadanComboPack = ({ campaign, handleClose, isModal }) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  // const [totalFamilies, setTotalFamilies] = useState(1);
  const user = useSelector((state) => state.profile.auth);
  const generalAmounts = useSelector(
    (state) => state.settings.settings?.generalAmounts
  );
  const ramadanFoodPackAmounts = ["1", "2", "3"];
  const dispatch = useDispatch();

  const handleDonation = async (values, { resetForm }) => {
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      amount: parseFloat(values.amount, 10),
      total: parseFloat(values.amount * values.quantity, 10),
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
    const quantity = isNaN(newValues.quantity) ? 1 : newValues.quantity;
    const updatedValues = {
      ...newValues,
      quantity: quantity,
    };
    await dispatch(action(updatedValues));
    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`
    );

    resetForm();
    handleClose();
    dispatch(toggleBasket());
  };
  const handleAmount = (e) => {
    setSelectedAmount(parseInt(e.target.value, 10));
    const selectedValue = e.target.value;
    const quantity = parseInt(selectedValue); // Calculate the quantity based on the selected value

    // formik.setFieldValue("amount", "12"); // Set the amount to the selected value
    formik.setFieldValue("quantity", quantity); // Set the quantity based on the selected value

    formik.setFieldValue("amount", selectedValue === "Other" ? "" : "220");

    formik.setFieldValue(
      "custom",
      selectedValue === "Other" ? !formik.values.custom : false
    );
  };

  const handleChange = (e) => {
    if (
      e.target.name === "isRecurring" &&
      e.target.value === "true" &&
      campaign?.isRamadanCampaign
    ) {
      showErrorMessage("Recurring donations are not available until Ramadan.");
      return;
    }
    if (e.target.name === "isRecurring" && !user && e.target.value === "true") {
      showErrorMessage("Please login to access this feature");
      return;
    }

    formik.setFieldValue([e.target.name], e.target.value);
    if (e.target.name === "amount") {
      formik.setFieldValue("quantity", 1);
    }
  };

  const validationSchema = yup.object({
    amount: yup.string("Add an amount").required("Amount is required"),
  });

  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.id,
      amount: "",
      quantity: 0, // Initialize quantity to 0
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

  const findOption = (option) => {
    let finalOption;
    if (option === "1") {
      finalOption = "1 Combo Pack";
    } else if (option === "2") {
      finalOption = "2 Combo Packs";
    } else if (option === "3") {
      finalOption = "3 Combo Packs";
    } else if (option === "20") {
      finalOption = "Feed 20 Families";
    } else if (option === "Other") {
      finalOption = "Other";
    }
    return finalOption; // Return the variable finalOption, not the string "finalOption"
  };

  const handleQuantityChange = (e, type) => {
    e.preventDefault();
    formik.setFieldValue("amount", "220");
    if (type === "add") {
      setSelectedAmount(selectedAmount + 1);
      formik.setFieldValue("quantity", selectedAmount + 1);
    } else {
      setSelectedAmount(selectedAmount - 1);
      formik.setFieldValue("quantity", selectedAmount - 1);
    }
  };

  return (
    <div
      className={`${
        isModal
          ? "md:rounded-xl border-neutral-300 bg-white"
          : "border rounded-2.5xl md:rounded-xl border-neutral-300 p-4 md:p-7.5 bg-white"
      }`}
    >
      {!isModal && (
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <h5 className="text-button-lg md:text-heading-5">Choose Donation</h5>
        </div>
      )}
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
                : "md:grid flex flex-col justify-between gap-4 md:gap-3.5 md:grid-cols-2"
            }`}
          >
            <legend className="sr-only">Select an amount to donate</legend>
            {[...ramadanFoodPackAmounts, "Other"].map((option) => (
              <div onClick={() => {}} key={option} className="col-span-1">
                <Button
                  type="button"
                  onClick={handleAmount}
                  value={option}
                  label={option === "Other" ? "Other" : findOption(option)}
                  name="amount"
                  variant={"secondaryOutlineFull"}
                  className={
                    (parseInt(option) === formik.values.quantity &&
                      !formik.values.custom) ||
                    (formik.values.custom && option === "Other")
                      ? "button-focus "
                      : ""
                  }
                />
              </div>
            ))}
          </fieldset>
          {formik.values.custom && (
            <div className="flex items-center relative">
              <div className="absolute pl-3 pointer-events-none text-xs">$</div>
              <input
                value={formik.values.amount}
                name="amount"
                type="number"
                placeholder="Please enter an amount"
                className="pl-7 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={handleChange}
              />
            </div>
          )}
          {formik.touched.amount && Boolean(formik.errors.amount) && (
            <FormikValidationError
              formikTouched={formik.touched.amount}
              formikError={formik.errors.amount}
            />
          )}
          <div class="px-4 py-3 text-sm text-neutral-800 rounded-lg bg-neutral-200">
            <p className="font-bold">
              For $220 per combo pack, you will provide the following:
            </p>
            <ul>
              <li>• 1 Food pack for the month.</li>
              <li>• Eid clothes and gifts for children.</li>
              <li>• Hot Meals for 30 people.</li>
            </ul>
          </div>

          {!formik.values.custom && formik.values.quantity > 0 && (
            <div className="my-7.5">
              <div className="flex items-baseline justify-between mb-7.5">
                <div>
                  <h4 className="mb-2 text-sm !font-medium text-neutral-1000">
                    Cost Per Combo Pack
                  </h4>
                  <div className="font-bold text-heading-4">
                    {currencyConfig.label}
                    {pricePerComboPack}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="mb-2 text-sm !font-medium text-neutral-1000">
                    Total Combo Packs
                  </h4>
                  <div>
                    <div className="relative flex flex-row w-auto bg-transparent rounded-lg h-11">
                      <button
                        data-action="decrement"
                        onClick={(e) => handleQuantityChange(e, "sub")}
                        disabled={selectedAmount === 1}
                        className="flex items-center justify-center border border-r-0 rounded-l-lg w-11 h-11 border-neutral-300"
                      >
                        <span className="">
                          <MinusIcon />
                        </span>
                      </button>

                      <input
                        type="number"
                        className="border !rounded-none w-20 h-11 form-control !text-heading-7 !text-neutral-1000 !p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        name="custom-input-number"
                        value={selectedAmount}
                      />
                      <button
                        data-action="increment"
                        onClick={(e) => handleQuantityChange(e, "add")}
                        className="flex items-center justify-center border border-l-0 rounded-r-lg w-11 h-11 border-neutral-300"
                      >
                        <span className="">
                          <PlusIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px mb-5 bg-neutral-300"></div>

              <div className="flex items-baseline justify-between gap-4 my-5">
                <div className="grow">Total Combo Packs</div>
                <div className="flex items-center justify-between gap-5 grow">
                  <div className="grow">{selectedAmount}x</div>
                  <div className="text-right grow">
                    {currencyConfig.label}
                    {formatPrice(selectedAmount * pricePerComboPack)}
                  </div>
                </div>
              </div>
              <>
                <div className="h-px my-5 bg-neutral-300"></div>
                <div className="flex justify-between text-heading-7">
                  <div>Subtotal</div>
                  <div>
                    {currencyConfig.label}
                    {formatPrice(selectedAmount * pricePerComboPack)}
                  </div>
                </div>
              </>
            </div>
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

export default RamadanComboPack;

RamadanComboPack.propTypes = {
  isModal: PropTypes.bool,
};

RamadanComboPack.defaultProps = {
  handleClose: () => null,
  isModal: false,
};