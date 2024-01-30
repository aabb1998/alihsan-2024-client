import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { MinusIcon, PlusIcon } from "../../theme/svg-icons";
import "react-phone-input-2/lib/style.css";
import {
  addBasketItem,
  addBasket,
  updateBasketItem,
  toggleBasket,
} from "../basket/basketSlice";
import { SnackMessages } from "../../components/Toast";
import { useFormik } from "formik";
import { FormikValidationError } from "../Common/FormikValidationError";
import PhoneInput from "react-phone-input-2";
import * as yup from "yup";
import { checkAdminPermission } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";

const { showSuccessMessage } = SnackMessages();

export const AqeeqaDonation = ({ campaign, handleClose, isModal }) => {
  const dispatch = useDispatch();

  const handleDonation = async (values, { resetForm }) => {
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      total: parseInt(values.amount * values.quantity, 10),
      isRecurring: false,
      Campaign: campaign,
    };
    checkAdminPermission(newValues)

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
    dispatch(toggleBasket());
    handleClose();
  };

  const handleChange = (e) => {
    formik.setFieldValue([e.target.name], e.target.value);
  };
  const handlePhoneChange = (value) => {
    formik.setFieldValue("phoneNumber", value);
  };

  const increaseCount = () => {
    formik.setFieldValue("quantity", formik.values.quantity + 1);
  };

  const decreaseCount = () => {
    if (formik.values.quantity > 1) {
      formik.setFieldValue("quantity", formik.values.quantity - 1);
    }
  };
  const validationSchema = yup.object({
    videoRequest: yup
      .string("Select Video Request")
      .required("Video Request is required"),
    phoneNumber: yup
      .string("Select Phone number")
      .required("Phone Number is required"),
    childName: yup
      .string("Select Child Name")
      .required("Child Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.campaign?.id,
      amount: campaign?.prices?.aqeeqahAdahiPrice,
      name: campaign?.campaign?.name,
      coverImage: campaign?.campaign?.coverImage,
      isRecurring: "false",
      periodDays: "Weekly",
      custom: false,
      videoRequest: "",
      phoneNumber: "",
      childName: "",
      quantity: 1,
      checkoutType: "AQEEQAH_ADAHI",
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
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div
          className={`${
            isModal
              ? "flex flex-col gap-0 overflow-auto"
              : "flex flex-col gap-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-5 md:mb-8">
            <div className="font-bold text-heading-5 md:heading-4">
              {currencyConfig.label}{campaign?.prices?.aqeeqahAdahiPrice?.toLocaleString()}
            </div>
            <div className="custom-number-input form-group">
              <label htmlFor="custom-input-number" className="sr-only">
                Counter Input
              </label>
              <div className="relative flex flex-row w-full bg-transparent rounded-lg">
                <button
                  type="button"
                  data-action="decrement"
                  className="flex items-center justify-center w-8 border border-r-0 rounded-l-lg h-11 border-neutral-300"
                >
                  <span className="" onClick={decreaseCount}>
                    <MinusIcon />
                  </span>
                </button>
                <input
                  type="number"
                  className="border !rounded-none w-11 h-11 form-control !text-heading-7 !text-neutral-1000 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  name="quantity"
                  value={formik.values.quantity}
                  readOnly={true}
                ></input>
                <button
                  type="button"
                  data-action="increment"
                  className="flex items-center justify-center w-8 border border-l-0 rounded-r-lg h-11 border-neutral-300"
                >
                  <span className="" onClick={increaseCount}>
                    <PlusIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="mb-6">
              <label htmlFor="VideoRequest">Video Request</label>
              <select
                className="w-full text-sm !text-neutral-800 form-control"
                id="VideoRequest"
                name="videoRequest"
                value={formik.values.videoRequest}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {formik.touched.videoRequest &&
                Boolean(formik.errors.videoRequest) && (
                  <FormikValidationError
                    formikTouched={formik.touched.videoRequest}
                    formikError={formik.errors.videoRequest}
                  />
                )}
            </div>
            <div className="mb-6">
              <label htmlFor="PhoneNumber">Phone Number</label>
              {/* <input
                type="number"
                country={"us"}
                className="w-full form-control"
                id="PhoneNumber"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                placeholder="+38 (000) 000 - 00 - 00"
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                }}
              /> */}

              <PhoneInput
                country={"au"}
                placeholder="+38 (000) 000 - 00 - 00"
                // className="w-full form-control"
                value={formik.values.phoneNumber}
                inputStyle={{
                  width: "100%",
                  maxHeight: "2.75rem",
                  height: "2.75rem",
                  paddingLeft: "3rem",
                }}
                id="PhoneNumber"
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phoneNumber",
                  // inputClass:"w-full form-control",
                  // containerClass:"w-full form-control",
                  // dropdownStyle:{
                  //   padding:'0px'

                  // }
                }}
              />

              {formik.touched.phoneNumber &&
                Boolean(formik.errors.phoneNumber) && (
                  <FormikValidationError
                    formikTouched={formik.touched.phoneNumber}
                    formikError={formik.errors.phoneNumber}
                  />
                )}
            </div>
            <div className="mb-0">
              <label htmlFor="ChildFullName">Child's Full Name</label>
              <input
                type="text"
                className="w-full form-control"
                id="ChildFullName"
                placeholder="Child's Full Name"
                value={formik.values.childName}
                name="childName"
                onChange={handleChange}
              />
              {formik.touched.childName && Boolean(formik.errors.childName) && (
                <FormikValidationError
                  formikTouched={formik.touched.childName}
                  formikError={formik.errors.childName}
                />
              )}
            </div>
          </div>
          <div>
            <div className="mb-5 md:mb-8">
              <div className="h-px my-5 bg-neutral-300"></div>
              <div className="flex justify-between text-sm md:text-md">
                <div>Aqeeqah Adahi</div>
                <div>{formik.values?.quantity}KG x</div>
                <div>
                  {currencyConfig.label}{campaign?.prices?.aqeeqahAdahiPrice?.toLocaleString()}
                </div>
              </div>
              <div className="h-px my-5 bg-neutral-300"></div>
              <div className="flex justify-between text-button-lg md:text-heading-7">
                <div>Subtotal</div>
                <div>
                  {currencyConfig.label}
                  {(
                    campaign?.prices?.aqeeqahAdahiPrice *
                    formik.values?.quantity
                  )?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <Button
              type="submit"
              label="Donate"
              className="btn btn-primary filled"
            />{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

AqeeqaDonation.propTypes = {
  isModal: PropTypes.bool,
};

AqeeqaDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
