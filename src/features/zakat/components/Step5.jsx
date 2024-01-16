import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Img from "../../../components/Image";
import { useSelector } from "react-redux";
import { showMoney } from "../utils/money";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addBasket,
  addBasketItem,
  getAnyZakatCampaign,
  toggleBasket,
} from "../../basket/basketSlice";
import { useDispatch } from "react-redux";
import { SnackMessages } from "../../../components/Toast";
import { formatPrice } from "../../../utils/helper";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { zakatResetInput } from "../slice";

const initialValues = {
  campaignId: "",
  amount: "",
  name: "",
  coverImage: "",
  isRecurring: "false",
  periodDays: null,
  custom: false,
  checkoutType: "ZAQAT",
};

export default function Step5() {
  const LOCAL_STORAGE_KEY = "checkout";
  const { state: navState } = useLocation();
  const [campaign, setCampaign] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showSuccessMessage } = SnackMessages();
  const { zakatItem, loading } = useSelector((state) => state.basketItem);

  const { amounts, prices } = useSelector((state) => state.zakatCalculator);
  const {
    unit,
    cash,
    bank,
    silver,
    gold,
    investmentProfit,
    shareResale,
    merchandise,
    loan,
    other,
  } = amounts;
  const wealth =
    cash +
    bank +
    silver.value +
    gold.value +
    investmentProfit +
    shareResale +
    merchandise +
    loan +
    other;
  const nisabSilver = 612.36 * prices.silverUsd;

  const usdToUnit = (amount) =>
    unit === "AUD" ? amount / prices.audToUsd : amount;

  const zakatableAmount = (nisabSilver, wealth) => {
    return parseFloat(usdToUnit(nisabSilver)) < parseFloat(wealth)
      ? wealth / 40
      : 0;
  };

  const handleDonation = async () => {
    const checkout = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    const zakatCampaign = campaign ? campaign : zakatItem;

    const isInCheckoutList = checkout.find(
      (obj) => obj.campaignId === zakatCampaign?.id
    );

    const newValues = {
      ...initialValues,
      campaignId: zakatCampaign?.id,
      name: zakatCampaign?.name,
      coverImage: zakatCampaign?.coverImage,
      amount: parseFloat(zakatableAmount(nisabSilver, wealth)),
      total: parseFloat(zakatableAmount(nisabSilver, wealth)),
      isRecurring: JSON.parse(false),
    };

    const updatedCheckout = isInCheckoutList
      ? [
          ...checkout.slice(
            0,
            checkout.findIndex((obj) => obj.campaignId === campaign?.id)
          ),
          newValues,
          ...checkout.slice(
            checkout.findIndex((obj) => obj.campaignId === campaign?.id) + 1
          ),
        ]
      : [...checkout, newValues];

    dispatch(addBasket(updatedCheckout));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCheckout));
    await dispatch(addBasketItem(newValues));

    showSuccessMessage(
      `Item ${isInCheckoutList ? "updated" : "added"} successfully`
    );
    dispatch(zakatResetInput());
    dispatch(toggleBasket());
    navigate("/");
  };

  useEffect(() => {
    if (navState) {
      setCampaign(navState);
    } else {
      dispatch(getAnyZakatCampaign());
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow px-4 sm:px-0 h-100">
      <div className="py-12 h-100 relative flex-grow px-8 sm:p-15 bg-primary-300 !pt-25 rounded-1.5xl flex flex-col justify-center gap-5 sm:gap-11  text-white">
        <h1 className="text-heading-4 sm:text-heading-2">
          Ready to give your Zakat?
        </h1>
        <p className="font-medium text-md font-Montserrat text-neutral-100">
          Assets that are included in the Zakat calculation are cash, shares,
          gold and silver, business goods and income from investment property.{" "}
        </p>
        <div>
          {loading ? (
            <PrimaryLoadingButton additionalButtonClasses="" />
          ) : (
            <Button
              variant={"primary"}
              onClick={handleDonation}
              label={`Donate ${unit} ${formatPrice(
                zakatableAmount(nisabSilver, wealth)
              )}`}
              disabled={zakatableAmount(nisabSilver, wealth) <= 0}
            />
          )}
        </div>
        <Img
          src="/images/illustration/coin-only.svg"
          className="absolute w-1/2 -right-4 -bottom-10 sm:-bottom-15"
          alt="zakat calculator"
        />
      </div>
    </div>
  );
}
