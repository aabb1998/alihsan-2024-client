import React, { useMemo, useState } from "react";
import { Button } from "../../components";
import { Tooltip } from "react-tooltip";
import { HelpCircleIcon } from "../../theme/svg-icons";
import PropTypes from "prop-types";
import * as yup from "yup";
import { SnackMessages } from "../../components/Toast";
import {
  addBasket,
  addBasketItem,
  toggleBasket,
  updateBasketItem,
} from "../basket/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import TextArea from "../../components/TextArea";
import { FormikValidationError } from "../Common/FormikValidationError";
import { checkAdminPermission, formatPrice } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";
import { countriesList } from "../../utils/countries";
import { listItems } from "../../utils/donationConstants";

const validationSchema = yup.object().shape({
  waterCampaignType: yup.string().required("Water campaign type is required"),
  country: yup.string().required("Country is required"),
  namePlaque: yup.string().required("Name of plaque is required"),
  notes: yup.string().required("Notes is required"),
});

const { showSuccessMessage } = SnackMessages();

export const WaterDonation = ({ campaign, handleClose, isModal }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({});
  const [select, setSelect] = useState("");
  const prices = useSelector((state) => state.settings.settings);
  const countries = useMemo(() => {
    if (!selectedItem?.countries || !prices) return [];
    const contr = prices[selectedItem.countries].split(",");
    const ret = [];
    for (let i of contr) {
      ret.push(countriesList.find((j) => j.code === i));
    }
    return ret;
  }, [selectedItem, prices]);

  const onSelect = (code) => {
    setSelect(code);
    formik.setFieldValue("country", code);
  };

  const handleRadioButton = (e) => {
    const { value } = e.target;
    const item = listItems?.find((item) => item?.type === value);
    setSelectedItem(item);
    formik.setFieldValue("amount", prices[item?.cost]);
    formik.setFieldValue("waterCampaignType", item?.type);
    if (prices[item.countries].split(",").length === 1)
      onSelect(prices[item.countries]);
    else onSelect("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleWaterDonation = async (values, { resetForm }) => {
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      total: parseInt(values.amount, 10),
      isRecurring: false,
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
    setSelectedItem({});
    setSelect("");
    resetForm();
    handleClose();
    dispatch(toggleBasket());
  };

  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.id,
      amount: 0, //selectedItem?.cost,
      name: campaign?.name,
      coverImage: campaign?.coverImage,
      checkoutType: "WATER_CAMPAIGN",
      waterCampaignType: selectedItem?.title,
      country: select,
      namePlaque: "",
      notes: "",
    },
    // enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleWaterDonation,
  });

  return (
    <div
      className={
        isModal
          ? "md:rounded-4xl border-neutral-300 bg-white"
          : "border rounded-4xl border-neutral-300 px-4 py-6 md:p-7.5 bg-white"
      }
    >
      <form onSubmit={formik.handleSubmit}>
        {!isModal ? (
          <div className="flex items-center justify-between mb-5 md:mb-7.5">
            <h5 className="text-button-lg md:text-heading-5">
              Choose Donation
            </h5>
          </div>
        ) : (
          <></>
        )}
        {listItems?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 pr-3 mb-3 sm:pr-1"
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="waterCampaignType"
                checked={selectedItem?.type === item?.type}
                value={item?.type}
                onChange={handleRadioButton}
              />
              <div className="text-sm font-medium text-neutral-700">
                {item?.title}
              </div>
            </div>
            <div
              className="cursor-pointer text-neutral-700 hover:text-primary-300"
              data-tooltip-id={`my-tooltip-${index}`}
              data-tooltip-place="bottom-end"
            >
              <HelpCircleIcon iconSize={16} />
              <Tooltip
                id={`my-tooltip-${index}`}
                className="opacity-100 tooltip"
                style={{
                  backgroundColor: "#fff",
                  padding: "1rem",
                  opacity: "1",
                  zIndex: "999",
                }}
              >
                <div>
                  <h2 className="mb-2 text-neutral-1000 text-button-md">
                    {item?.tooltip?.head}
                  </h2>
                  <p className="text-xs font-medium text-neutral-600">
                    {item?.tooltip?.content}
                  </p>
                  <div className="px-4 py-3 mt-2 rounded-lg bg-neutral-200">
                    <span className="mb-1 text-xs font-bold text-neutral-800">
                      Specifications :
                    </span>
                    <ul>
                      {item?.tooltip?.specifications?.map((list) => (
                        <li
                          className="text-xs font-medium list-disc text-neutral-1000 ms-5"
                          key={index}
                        >
                          {list}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2 mt-2 text-xs font-bold text-neutral-1000">
                      <div className="flex justify-between">
                        <div>Depth</div>
                        <div>{item?.tooltip?.depth} M</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Life Span</div>
                        <div>{item?.tooltip?.lifeSpan}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
        {formik.touched.waterCampaignType &&
          Boolean(formik.errors.waterCampaignType) && (
            <FormikValidationError
              formikTouched={formik.touched.waterCampaignType}
              formikError={formik.errors.waterCampaignType}
            />
          )}
        {selectedItem?.cost ? (
          <div>
            <div className="mt-5 mb-5 md:mt-6 md:mb-6 form-group">
              <label htmlFor="Country" className="block">
                Country
              </label>
              <select
                name="country"
                disabled={countries.length < 2}
                value={select}
                onChange={(e) => onSelect(e.target.value)}
                className="w-full text-sm !text-neutral-800 form-control"
              >
                <option value="">Select a country</option>
                {countries.map((i) => (
                  <option value={i.code}>{i.name}</option>
                ))}
              </select>
              {formik.touched.country && Boolean(formik.errors.country) && (
                <FormikValidationError
                  formikTouched={formik.touched.country}
                  formikError={formik.errors.country}
                />
              )}
            </div>
            <div className="mb-5 md:mb-6 form-group">
              <label htmlFor="plaque name" className="block">
                Name Of Plaque
              </label>
              <input
                type="text"
                className="w-full text-sm !text-neutral-800 form-control"
                name="namePlaque"
                value={formik.values.namePlaque}
                onChange={handleInputChange}
                placeholder="The New Well"
              />
              {formik.touched.namePlaque &&
                Boolean(formik.errors.namePlaque) && (
                  <FormikValidationError
                    formikTouched={formik.touched.namePlaque}
                    formikError={formik.errors.namePlaque}
                  />
                )}
            </div>
            <div className="mb-5 md:mb-7.5 form-group">
              <div className="flex justify-between pr-3 sm:pr-1">
                <label htmlFor="notes">Special Notes</label>
                <div
                  className="cursor-pointer text-neutral-700 hover:text-primary-300"
                  data-tooltip-id={`my-tooltip-special-note`}
                  data-tooltip-place="bottom-end"
                >
                  <HelpCircleIcon iconSize={16} />
                  <Tooltip
                    id={`my-tooltip-special-note`}
                    className="opacity-100 tooltip"
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      opacity: "1",
                      zIndex: "999",
                    }}
                  >
                    <div>
                      <h2 className="mb-2 text-neutral-1000 text-button-md">
                        Special Notes:
                      </h2>
                      <p className="text-xs font-medium text-neutral-600">
                        Make a special request, such as offering a Dua for
                        someone who has passed away.
                      </p>
                    </div>
                  </Tooltip>
                </div>
              </div>
              {/* <textarea name="notes" id="" className="w-full text-sm !text-neutral-800 form-control" onChange={handleInputChange} rows="10"></textarea> */}
              <TextArea
                handleChange={handleInputChange}
                name="notes"
                value={formik.values.notes}
              />
              {formik.touched.notes && Boolean(formik.errors.notes) && (
                <FormikValidationError
                  formikTouched={formik.touched.notes}
                  formikError={formik.errors.notes}
                />
              )}
            </div>
            <div className="flex justify-between text-heading-6 mb-5 md:mb-7.5">
              <div>Cost</div>
              <div>
                {currencyConfig.label}
                {formatPrice(formik.values.amount || 0)}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-8 mt-5 md:mt-7.5">
          <div>
            <Button
              type="submit"
              label={"Donate"}
              className="btn btn-primary filled"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

WaterDonation.propTypes = {
  isModal: PropTypes.bool,
};

WaterDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
