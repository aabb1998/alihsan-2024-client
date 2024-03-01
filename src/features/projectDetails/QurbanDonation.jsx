import React, { useEffect, useReducer, useState } from "react";
import { FormikValidationError } from "../Common/FormikValidationError";
import { useFormik } from "formik";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  addBasketItem,
  toggleBasket,
  updateBasketItem,
} from "../basket/basketSlice";
import { SnackMessages } from "../../components/Toast";
import PropTypes from "prop-types";
import * as yup from "yup";
import { countriesList } from "../../utils/countries";
import Img from "../../components/Image";
import { getQurbanGroups } from "./projectDetailSlice";
import { checkAdminPermission } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";

const validationSchema = yup.object().shape({
  group: yup.string().required("Group is required"),
});

export const QurbanDonation = ({ campaign, handleClose, isModal }) => {
  const dispatch = useDispatch();
  const { qurbanGroup } = useSelector((state) => state.project);
  const { showSuccessMessage } = SnackMessages();

  const [selectedGroup, setSelectedGroup] = useState();
  const [countryState, setCountryState] = useReducer(
    (state, action) => {
      if (action.type === "change")
        return { value: action.value, touched: true, error: "" };
      else if (action.type === "error")
        return { ...state, error: action.error, touched: true };
      else if (action.type === "reset")
        return { value: "", error: "", touched: false };
      else return state;
    },
    { value: "", error: "", touched: false }
  );

  const getfullCountryName = (code) => {
    return countriesList?.find(
      (country) => country.code === code?.toUpperCase()
    );
  };

  const handleQurbanDonation = async (values, { resetForm }) => {
    if (selectedGroup.country?.length && !countryState.value) {
      setCountryState({ type: "error", error: "Country is required." });
      return;
    }
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      total: parseInt(values.amount, 10),
      isRecurring: false,
      country: countryState.value,
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
    await dispatch(action(newValues));

    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`
    );
    setSelectedGroup({ country: [] });
    resetForm();
    setCountryState({ type: "reset" });
    handleClose();
    dispatch(toggleBasket());
  };

  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    const group = qurbanGroup?.find((item) => item?.id === Number(value));
    formik.setFieldValue("amount", parseFloat(group?.amount));
    formik.setFieldValue("donationItem", group?.group);
    if (name === "group") {
      formik.setFieldValue(name, value);
    }
    setCountryState({ type: "reset" });
    setSelectedGroup(group);
  };

  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.id,
      amount: 0,
      name: campaign?.name,
      coverImage: campaign?.coverImage,
      checkoutType: "KURBAN",
      donationItem: "",
      group: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleQurbanDonation,
  });

  useEffect(() => {
    if (isModal) {
      dispatch(getQurbanGroups());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal]);

  useEffect(() => {
    const selectedGroup = qurbanGroup.find((e) => e.id === 7) || qurbanGroup[0];
    formik.setFieldValue("group", selectedGroup?.id);
    setSelectedGroup(selectedGroup);
    
    const group = selectedGroup || qurbanGroup[0];
    formik.setFieldValue("amount", parseFloat(group?.amount));
  }, [qurbanGroup]);

  return (
    <div
      className={
        isModal
          ? "md:rounded-xl border-neutral-300 bg-white"
          : "border rounded-xl border-neutral-300 px-4 py-6 md:p-7.5 bg-white"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        {!isModal ? (
          <div className="flex items-center justify-between mb-5 md:mb-8">
            <h5 className="text-button-lg md:text-heading-5">
              Choose Donation
            </h5>
          </div>
        ) : (
          <></>
        )}

        <div className="mb-5 md:mb-7.5 form-group">
          <label htmlFor="Group" className="block">
            Group
          </label>
          <select
            className="w-full text-sm !text-neutral-800 form-control"
            id="group"
            name="group"
            value={formik.values.group}
            onChange={handleChangeCategory}
          >
            <option value="">Select Group</option>
            {qurbanGroup &&
              qurbanGroup?.map((items, index) => (
                <option key={index} value={items?.id}>
                  {items?.group}
                </option>
              ))}
          </select>
          {formik.touched.group && Boolean(formik.errors.group) && (
            <FormikValidationError
              formikTouched={formik.touched.group}
              formikError={formik.errors.group}
            />
          )}
        </div>
        {selectedGroup?.group && (
          <div className="rounded-lg bg-neutral-200 flex flex-col px-4 py-3 gap-2 my-5 md:my-7.5">
            <h4 className=" text-heading-6 text-neutral-800">
              {selectedGroup?.group || ""}
            </h4>
            <div className="flex flex-col gap-2">
              {selectedGroup?.country?.length ? (
                <div className="text-xs font-medium text-neutral-800">
                  Select a Country :
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedGroup?.country?.map((country) => (
                  <div className="flex flex-row flex-wrap gap-2">
                    {/* <div onClick={() => setCountryState({type: 'change', value: country})} className={'flex flex-row items-center w-auto gap-2 p-1 font-medium bg-white rounded '+(countryState.value===country?'border-2':'')}> */}
                    <div className="flex flex-row items-center w-auto gap-2 p-1 font-medium bg-white rounded">
                      <input
                        name="country"
                        onChange={(e) =>
                          setCountryState({
                            type: "change",
                            value: e.target.value,
                          })
                        }
                        id="radio1"
                        aria-describedby="radio-text"
                        type="radio"
                        value={country}
                        className="w-4 h-4"
                        checked={countryState.value === country}
                      />
                      <Img
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.toUpperCase()}.svg`}
                        alt="flag"
                        className={"w-6 h-4 object-cover"}
                      />
                      <p className="text-sm font-medium text-neutral-800">
                        {getfullCountryName(country)?.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedGroup?.country?.length ? (
                <div className="text-red-300">
                  {countryState.touched && countryState.error}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="h-px mb-5 bg-neutral-300"></div>
        <div className="flex justify-between mb-3">
          <div>Cost</div>
          <div>
            {currencyConfig.label}
            {selectedGroup?.amount || 0}
          </div>
        </div>
        <div className="h-px mb-5 bg-neutral-300"></div>
        <div className="flex justify-between mb-3 text-heading-7">
          <div>Subtotal</div>
          <div>
            {currencyConfig.label}
            {selectedGroup?.amount || 0}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <Button
              type="submit"
              label={"Pay Your Qurban"}
              className="btn btn-primary filled"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

QurbanDonation.propTypes = {
  isModal: PropTypes.bool,
};

QurbanDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
