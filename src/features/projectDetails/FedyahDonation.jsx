import React, { useEffect, useState } from "react";
import { FormikValidationError } from "../Common/FormikValidationError";
import { Button } from "../../components";
import { useFormik } from "formik";
import { HelpCircleIcon, MinusIcon, PlusIcon } from "../../theme/svg-icons";
import { Tooltip } from "react-tooltip";
import { FedyahTabs } from "./FedyahTabs";
import { useDispatch, useSelector } from "react-redux";
import { SnackMessages } from "../../components/Toast";
import PropTypes from "prop-types";
import {
  addBasket,
  addBasketItem,
  toggleBasket,
  updateBasketItem,
} from "../basket/basketSlice";
import { checkAdminPermission, formatPrice, useFedyahPricers } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";
import { RadioButtonItems } from "../../utils/donationConstants";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

export const FedyahDonation = ({ campaign, handleClose, isModal }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [subItem, setSubItem] = useState({});
  const [selectedTab, setSelectedTab] = useState({});
  const [disabelButton, setDisabelButton] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [fedyahInitialAmount, fedyahAmountText] = useFedyahPricers();

  const prices = useSelector((state) => state.settings.settings);

  const clearSubItem = () => setSubItem({});

  const clearSelectedTab = () => setSelectedTab({});

  const clearFilterData = () => setFilteredData([]);

  const handleChangeCategory = (e) => {
    // clearSubItem()
    clearSelectedTab();
    setSelectedRadio(0);
    const { value } = e.target;
    setCategory(value);
    const filteredItem = RadioButtonItems?.filter(
      (items) => items?.type === value
    );
    setFilteredData(filteredItem);
    setSubItem({});
  };

  const handleRadioButton = (e) => {
    clearSubItem();
    clearSelectedTab();
    setQuantity(1);
    const { value } = e.target;
    const selectedItem = RadioButtonItems?.find(
      (items) => items?.title === value
    );
    const index = filteredData?.indexOf(selectedItem);
    setSelectedRadio(index);
    setSubItem(selectedItem);
    formik.setFieldValue(
      "amount",
      fedyahInitialAmount(selectedItem?.initialAmount)
    );
    formik.setFieldValue("quantity", selectedItem?.quantity);
    selectedItem?.feedType &&
      formik.setFieldValue("type", selectedItem?.feedType);
  };

  const handleAmount = (e) => {
    formik.setFieldValue([e.target.name], Number(e.target.value));
    formik.setFieldValue("quantity", null);
  };

  const handleFedyahDonation = async (values, { resetForm }) => {
    if (!category) {
      return showErrorMessage("Please select a category");
    } else if (Object.keys(subItem).length === 0) {
      return showErrorMessage("Please select an option to continue");
    } else if (subItem?.hasTabs && Object.keys(selectedTab).length === 0) {
      return showErrorMessage("Please select a tab to continue");
    } else if (!values?.amount && !values.quantity) {
      return showErrorMessage("Please select an amount to continue");
    }
    const checkout = JSON.parse(localStorage.getItem("checkout") || "[]");
    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === values.campaignId
    );
    const newValues = {
      ...values,
      total:
        values.quantity > 0
          ? parseInt(values.amount * values.quantity, 10)
          : parseInt(values.amount, 10),
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
    setCategory("");
    clearFilterData();
    clearSubItem();
    clearSelectedTab();
    resetForm();
    handleClose();
    dispatch(toggleBasket());
  };

  const handleChangeTabs = (e) => {
    const { value } = e.target;
    const selectedTabItem = subItem?.tabs?.find((tab) => tab.tabName === value);
    setSelectedTab(selectedTabItem);
    setQuantity(1);
    formik.setFieldValue(
      "amount",
      fedyahInitialAmount(selectedTabItem?.initialAmount)
    );
    formik.setFieldValue("quantity", selectedTabItem?.quantity);
    selectedTabItem?.feedType &&
      formik.setFieldValue("type", selectedTabItem?.feedType);
  };

  const handleQuantityChange = (e, type) => {
    e.preventDefault();
    formik.setFieldValue(
      "amount",
      fedyahInitialAmount(selectedTab?.initialAmount || subItem?.initialAmount)
    );
    if (type === "add") {
      setQuantity(quantity + 1);
      formik.setFieldValue("quantity", quantity + 1);
    } else {
      setQuantity(quantity - 1);
      formik.setFieldValue("quantity", quantity - 1);
    }
  };

  const formik = useFormik({
    initialValues: {
      campaignId: campaign?.id,
      amount: fedyahInitialAmount(
        subItem?.initialAmount || selectedTab?.initialAmount
      ),
      name: campaign?.name,
      coverImage: campaign?.coverImage,
      checkoutType: "FEDYAH",
      quantity:
        quantity === 1 ? subItem?.quantity || selectedTab?.quantity : quantity,
      type: selectedTab?.feedType,
      // category: category
    },
    // enableReinitialize: true,
    onSubmit: handleFedyahDonation,
  });

  useEffect(() => {
    if (filteredData?.length && Object.keys(subItem).length === 0) {
      setSubItem(filteredData[0]);
      formik.setFieldValue(
        "amount",
        fedyahInitialAmount(filteredData[0]?.initialAmount)
      );
      formik.setFieldValue("quantity", filteredData[0]?.quantity);
      filteredData[0]?.feedType &&
        formik.setFieldValue("type", filteredData[0]?.feedType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, subItem]);

  useEffect(() => {
    if (subItem?.tabs?.length) {
      setSelectedTab(subItem?.tabs[0]);
      formik.setFieldValue(
        "amount",
        fedyahInitialAmount(subItem?.tabs[0]?.initialAmount)
      );
      formik.setFieldValue("quantity", subItem?.tabs[0]?.quantity);
      subItem?.tabs[0]?.feedType &&
        formik.setFieldValue("type", subItem?.tabs[0]?.feedType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subItem?.tabs]);

  return (
    <div
      className={
        isModal
          ? "h-full bg-white"
          : "border rounded-xl border-neutral-300 px-4 py-6 md:p-7.5 bg-white"
      }
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-between h-full"
      >
        {!isModal ? (
          <div className="flex items-center justify-between mb-5 md:mb-7.5">
            <h5 className="text-button-lg md:text-heading-5">
              Choose Donation
            </h5>
          </div>
        ) : (
          <></>
        )}
        <div className="mb-5 md:mb-7.5">
          <div className="form-group">
            <label htmlFor="category" className="block">
              Category
            </label>
            <select
              className="w-full text-sm !text-neutral-800 form-control"
              id="category"
              name="category"
              value={category}
              onChange={handleChangeCategory}
            >
              <option value="">Select Option</option>
              <option value="ramadan">Ramadan Expiations</option>
              <option value="kaffarah">
                Kaffarat al Yamin (Break Deliberate Oath)
              </option>
              <option value="vows">Vows (Nadhr)</option>
            </select>
          </div>
          {formik.touched.category && Boolean(formik.errors.category) && (
            <FormikValidationError
              formikTouched={formik.touched.category}
              formikError={formik.errors.category}
            />
          )}
        </div>
        {filteredData.length ? (
          <div className="mb-5 md:mb-7.5">
            {filteredData?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 pr-3 mb-3 sm:pr-1"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={item?.type}
                    checked={index === selectedRadio}
                    value={item?.title}
                    onChange={handleRadioButton}
                  />
                  <p className="text-sm font-medium text-neutral-700">
                    {item?.title}
                  </p>
                </div>
                <div
                  className="cursor-pointer text-neutral-700 hover:text-primary-300"
                  data-tooltip-id={`my-tooltip${index}`}
                  data-tooltip-place="bottom-end"
                >
                  <HelpCircleIcon iconSize={16} />
                  <Tooltip
                    id={`my-tooltip${index}`}
                    className="opacity-100 tooltip"
                    style={{
                      backgroundColor: "#fff",
                      padding: "1rem",
                      zIndex: "999",
                      opacity: "1",
                    }}
                  >
                    <div>
                      <h2 className="mb-2 text-neutral-1000 text-button-md">
                        {item?.description?.title}
                      </h2>
                      <p className="text-xs font-medium text-neutral-600">
                        {item?.description?.para1}
                      </p>
                      {item?.description?.subTitle1 && (
                        <>
                          <h4 className="text-xs font-medium text-neutral-600">
                            1 {item?.description?.subTitle1}
                          </h4>
                        </>
                      )}
                      {item?.description?.subTitle2 && (
                        <>
                          <h4 className="text-xs font-medium text-neutral-600">
                            2 {item?.description?.subTitle2}
                          </h4>
                        </>
                      )}
                      {item?.description?.list && (
                        <ul className="ms-5">
                          {item?.description?.list?.map((list) => (
                            <li className="text-xs font-medium list-disc text-neutral-600">
                              {fedyahAmountText(list)}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item?.description?.para2 && (
                        <p className="text-xs font-medium text-neutral-600">
                          {fedyahAmountText(item?.description?.para2)}
                        </p>
                      )}
                    </div>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        {subItem?.content1 && (
          <p className="px-4 py-3 mb-5 md:mb-7.5 font-bold text-sm text-neutral-800 rounded-lg bg-neutral-200">
            {fedyahAmountText(subItem?.content1)}
          </p>
        )}
        {subItem?.hasTabs && (
          <FedyahTabs
            tabs={subItem?.tabs}
            onChangeTabs={handleChangeTabs}
            selectedTab={selectedTab}
            setDisabelButton={setDisabelButton}
            disabelButton={disabelButton}
            handleQuantityChange={handleQuantityChange}
            quantity={quantity}
            handleAmount={handleAmount}
            formik={formik}
          />
        )}
        {subItem?.calculateAmount && (
          <div className="my-7.5">
            {subItem?.initialAmount ? (
              <div className="flex items-baseline justify-between mb-7.5">
                <div>
                  <h4 className="mb-2 text-sm !font-medium text-neutral-1000">
                    {subItem?.initialAmountTitle}
                  </h4>
                  <div className="font-bold text-heading-4">
                    {currencyConfig.label}
                    {fedyahInitialAmount(subItem?.initialAmount)}
                  </div>
                </div>

                {subItem?.counter && (
                  <div className="flex flex-col">
                    <h4 className="mb-2 text-sm !font-medium text-neutral-1000">
                      {subItem?.counterTitle}
                    </h4>
                    <div>
                      <div className="relative flex flex-row w-auto bg-transparent rounded-lg h-11">
                        <button
                          onClick={(e) => handleQuantityChange(e, "sub")}
                          disabled={quantity === 1}
                          data-action="decrement"
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
                          value={quantity}
                        />
                        <button
                          onClick={(e) => handleQuantityChange(e, "add")}
                          data-action="increment"
                          className="flex items-center justify-center border border-l-0 rounded-r-lg w-11 h-11 border-neutral-300"
                        >
                          <span className="">
                            <PlusIcon />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="h-px mb-5 bg-neutral-300"></div>
            {subItem?.initialAmount ? (
              <div className="flex items-baseline justify-between gap-4 my-5">
                <div className="grow">{subItem?.itemTitle}</div>
                <div className="flex items-center justify-between gap-5 grow">
                  <div className="grow">
                    {subItem?.counter ? quantity : subItem?.quantity}x
                  </div>
                  <div className="text-right grow">
                    {currencyConfig.label}
                    {fedyahInitialAmount(
                      subItem?.initialAmount
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {subItem?.initialAmount ? (
              <>
                <div className="h-px my-5 bg-neutral-300"></div>
                <div className="flex justify-between text-heading-7">
                  <div>Subtotal</div>
                  <div>
                    {currencyConfig.label}
                    {formatPrice(
                      (subItem?.counter ? quantity : subItem?.quantity) *
                      fedyahInitialAmount(subItem?.initialAmount)
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
        {subItem?.generalDonation && (
          <div className="flex flex-row gap-3 mb-2">
            <input
              type="checkbox"
              id="Anonymous"
              className="custom-checkbox"
              onChange={(e) => setDisabelButton(!disabelButton)}
              checked={disabelButton}
              //  disabled={disableAnonymous}
            />
            <label
              htmlFor="Anonymous"
              className="text-sm font-medium cursor-pointer text-neutral-1000"
            >
              General Donation (Optional)
            </label>
          </div>
        )}
        {subItem?.amount && (
          <div className="grid grid-cols-4 gap-4 mb-5 md:mb-7.5">
            {prices.fedyahAmounts?.map((amount, index) => (
              <div key={index} className="">
                <Button
                  type="button"
                  onClick={handleAmount}
                  value={amount}
                  label={`${currencyConfig.label}${amount}`}
                  disabled={subItem?.generalDonation ? !disabelButton : false}
                  name="amount"
                  variant={"secondaryOutlineFull"}
                  className={
                    amount === formik.values.amount + "" ? "button-focus" : ""
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-8">
          <div>
            <Button
              type="submit"
              label="Donate"
              className="btn btn-primary filled"
              disabled={subItem?.title === "Fast 3 Days"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

FedyahDonation.propTypes = {
  isModal: PropTypes.bool,
};

FedyahDonation.defaultProps = {
  handleClose: () => null,
  isModal: false,
};
