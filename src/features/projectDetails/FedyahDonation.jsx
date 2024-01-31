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
import { checkAdminPermission, useFedyahPricers } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";

const RadioButtonItems = [
  {
    type: "ramadan",
    title: "Palliative Care/Chronic Illness/Elderly",
    description: {
      title: "Palliative care/Chronic Illness/Elderly:",
      para1:
        "If you are in palliative care, have a chronic illness or are elderly, and fasting is extremely difficult and detrimental to your health, you are exempt from Ramadan fasting. You must offer Fidyah as an expiation, which is to provide one meal to a poor person for each day missed. To calculate the total Fidyah amount, simply multiply the missed days by the cost of one meal, which is {{FEED1}}.",
    },
    calculateAmount: true,
    initialAmount: "feedPrice",
    initialAmountTitle: "Cost for One Day",
    quantity: 1,
    itemTitle: "Total Day Cost",
    counter: true,
    counterTitle: "Missed Fasting Days",
  },
  {
    type: "ramadan",
    title: "Deliberately Breaking Fast In With No Excuse",
    description: {
      title: "Deliberately Breaking Fast in With No Excuse:",
      para1:
        "If you had the intention to fast from the night before and began your fast for the day but broke it without a valid excuse during the day, you are required to make up for that missed day. This is because you initiated the fast, and it becomes likened to a vow that you must fulfill. There is no expiation in this case.",
      para2:
        "The one who breaks his fast with no excuse must repent to Allah, regret what he has done, resolve to never do it again, and do a lot of righteous deeds such as giving in charity, observing nafl fasts and so on.",
    },
    costforOneDay: false,
    costPerPerson: false,
    counter: false,
    amount: true, //[10, 20, 30, 50],
    hasTabs: false,
    generalDonation: false,
  },
  {
    type: "ramadan",
    title: "Intimacy With Spouse During Ramadan",
    description: {
      title: "Intimacy With Spouse During Ramadan:",
      para1:
        "Expiation applies if you break your fast by having intercourse with your spouse during the day, you must make up the day as well as-in this order:",
      list: [
        "Free a slave. If you cannot do so,",
        "Fast two consecutive months. If that is not possible,",
        "Feed sixty poor person at a cost of {{FEED1}} per person.",
      ],
      para2: "This applies to each day it occurs.",
    },
    perPerson: false,
    counter: false,
    hasTabs: true,
    tabs: [
      {
        tabName: "Fasting",
        content1: "Fasting for 2 consecutive months + day broken",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
      {
        tabName: "Feed 60 Needy",
        head: "Disclaimer:",
        content1: "Only select this option if you are unable to fast.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        initialAmountTitle: "Per Person",
        quantity: 60,
        itemTitle: "Feed 60 Poor Person",
        feedType: "FEED60",
      },
    ],
  },
  {
    type: "ramadan",
    title: "Temporary Sickness Or Travel",
    description: {
      title: "Temporary Sickness or Travel:",
      para1:
        "If you couldn't fast during Ramadan due to a valid reason such as illness or travel, you must make up for the number of days you did not fast after Ramadan. No expiation is required.",
    },
    content1:
      "Make up for each day missed after Ramadan at the earliest convenience",
    amount: true, //[10, 20, 30, 50],
    generalDonation: true,
  },
  {
    type: "ramadan",
    title: "Pregnant Woman And Breastfeeding Mothers",
    description: {
      title: "Pregnant Woman and Breastfeeding Mothers:",
      para1:
        "Scholars have different rulings concerning the pregnant woman and breastfeeding mothers if they do not fast Ramadan. These are the various opinions:",
      subTitle1: "Make Up the Fasts : That they must make up the fasts only.",
      para2:
        "This is the view of Imam Abu Haneefah (may Allah have mercy on him). Among the Sahaabah, it was the view of ‘Ali ibn Abi Taalib (may Allah be pleased with him). No expiation - {{fedyahAmounts}} - optional general donation",
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Fasting",
        head: "Make Up the Fasts : That they make up the fasts only.",
        content1:
          "This is the view of Imam Abu Haneefah (may Allah have mercy on him). Among the Sahaabah, it was the view of ‘Ali ibn Abi Taalib (may Allah be pleased with him). No expiation - {{fedyahAmounts}} - optional general donation",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
      {
        tabName: "Feed & Fasting",
        head: "Make Up the Fasts and Feed the Needy :",
        content1:
          "This is the view of Imam Abu Haneefah (may Allah have mercy on him). Among the Sahaabah, it was the view of ‘Ali ibn Abi Taalib (may Allah be pleased with him).",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 1,
        itemTitle: "Cost Per Days",
        initialAmountTitle: "Cost Per Person",
        counter: true,
        feedType: "FEED1",
        counterTitle: "Missed Fasting Days",
      },
      {
        tabName: "Feed Only",
        head: "Feed the Needy Only :",
        content1:
          "That they must feed one poor person per day missed only, and do not have to make up the fasts.",
        content2:
          "Among the Sahaabah, this was the view of ‘Abd-Allah ibn ‘Abbaas (may Allah be pleased with him). Ibn Qudaamah also narrated this in al-Mughni (3/37) from Ibn ‘Umar (may Allah be pleased with him).",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 1,
        itemTitle: "Cost Per Days",
        initialAmountTitle: "Cost Per Person",
        counter: true,
        counterTitle: "Day Count",
        feedType: "FEED1",
      },
    ],
  },
  {
    type: "kaffarah",
    title: "Kaffarah Feed 10 Poor People",
    description: {
      title: "Kaffarah Feed 10 Poor People",
      para1:
        "Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance. These are the three options.",
    },
    calculateAmount: true,
    initialAmount: "feedPrice",
    quantity: 10,
    itemTitle: "Feed 10 Poor Person",
    initialAmountTitle: "Per Person",
    feedType: "FEED10",
  },
  {
    type: "kaffarah",
    title: "Kaffarah Clothe 10 Poor People",
    description: {
      title: "Kaffarah Clothe 10 Poor People",
      para1:
        "Kaffarat al Yamin is a form of expiation for breaking a deliberate oath as mentioned in the Quran. [ Al-Maidah 5:89] Seek guidance from a knowledgeable scholar to ensure proper compliance. These are the three options.",
    },
    calculateAmount: true,
    initialAmount: "clothePrice",
    quantity: 10,
    itemTitle: "Clothe 10 Poor People",
    initialAmountTitle: "Per Person",
    feedType: "CLOTHE10",
  },
  {
    type: "kaffarah",
    title: "Fast 3 Days",
    description: {
      title: "Fast 3 Days:",
      para1:
        "It is not allowed to resort to fasting if you can perform one of the above.",
    },
  },
  {
    type: "vows",
    title: "Vows Made In Desperation/Anger",
    description: {
      title: "Vows Made In Desperation/Anger:",
      para1:
        "This means when someone makes an oath to emphasize, they'll do or not do something, but they don't really intend to make a vow . For example, in anger, someone might say, If I ever do this, I have to go for Hajj, fast for a month, or give a {{currency}}500 in charity. But they didn't mean to do those things; they just wanted to stress they wouldn't do that action. You have two choices:",
      subTitle1: "Fulfill the vow",
      subTitle2: "Offer kaffarat yamin( as the vow was essentially an oath) :",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Fullfill Vow",
        content1: "Fullfill Vow",
        amount: true, //[10, 20, 30, 50],
        generalDonation: true,
        activeTab: true,
      },
      {
        tabName: "Feed",
        content1: "Kaffarah - feed 10 poor people.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
      },
      {
        tabName: "Clothe",
        content1: "Kaffarah - clothe 10 poor.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
  {
    type: "vows",
    title: "Non-Specific Vows",
    description: {
      title: "Non-Specific Vows:",
      para1:
        "In some instances, someone may make a vow without specifying its purpose. For example, they might say, I vow that if Allah grants me this job, without providing any specific details. In such cases, you must offer kaffarat yamin .",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Feed",
        content1: "Kaffarah - feed 10 poor people.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
        activeTab: true,
      },
      {
        tabName: "Clothe",
        content1: "Kaffarah - clothe 10 poor.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
  {
    type: "vows",
    title: "Vows To Istems Without Ownership",
    description: {
      title: "Vows Insvolving Things You Don’t Own:",
      para1:
        "When a person makes a vow related to something they don't possess, they are required to offer kaffarah. For instance, if someone offers a home to stay in that they don’t have access to, or to give a car that you don’t own to someone. They must offer kaffarat yamen",
      list: [
        "Feed ten poor people at a cost of {{feedPrice}} per person",
        "Clothe 10 poor people at a cost of {{clothePrice}} per person",
        "Fast 3 days:  It is not allowed to resort to fasting if you can perform one of the above",
      ],
    },
    hasTabs: true,
    tabs: [
      {
        tabName: "Feed",
        content1: "Kaffarah - feed 10 poor people.",
        calculateAmount: true,
        initialAmount: "feedPrice",
        quantity: 10,
        itemTitle: "Feed 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "FEED10",
        activeTab: true,
      },
      {
        tabName: "Clothe",
        content1: "Kaffarah - clothe 10 poor.",
        calculateAmount: true,
        initialAmount: "clothePrice",
        quantity: 10,
        itemTitle: "Clothe 10 Poor People",
        initialAmountTitle: "Per Person",
        counter: false,
        feedType: "CLOTHE10",
      },
    ],
  },
];

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
    console.log(filteredItem);
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
          : "border rounded-4xl border-neutral-300 px-4 py-6 md:p-7.5 bg-white"
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
                    {(
                      (subItem?.counter ? quantity : subItem?.quantity) *
                      fedyahInitialAmount(subItem?.initialAmount)
                    )?.toLocaleString()}
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
