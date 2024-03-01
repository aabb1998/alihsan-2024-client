import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMoney } from "../../../utils/money";
import { formatPrice } from "../../../utils/helper";
import { Button } from "../../../components";
import { EditIcon } from "../../../theme/svg-icons";
import { zakatStep } from "../slice";
function showDate(d) {
  return d.toLocaleTimeString() + " " + d.toLocaleDateString();
}

const Summary = ({ zakatTotal }) => {
  const { amounts, prices, step } = useSelector(
    (state) => state.zakatCalculator
  );
  const dispatch = useDispatch();

  const calculateSteps = (stepToGoTo) => {
    let currentStep = step;
    const stepsToGo = stepToGoTo - currentStep;
    dispatch(zakatStep(stepsToGo));
  };

  const unit = amounts.unit;
  const total = (arrayData) =>
    arrayData.reduce((sum, { value }) => sum + value, 0);

  const wealth =
    amounts.cash +
    amounts.bank +
    total(amounts.silver) +
    total(amounts.gold) +
    amounts.investmentProfit +
    amounts.shareResale +
    amounts.merchandise +
    amounts.loan +
    amounts.other;

  const usdToUnit = (amount) => {
    return unit === "AUD" ? amount / prices.audToUsd : amount;
    // return amount;
  };

  const nisabSilver = 612.36 * prices.silverUsd;
  const nisabGold = 87.48 * prices.goldUsd;

  const zakatableAmount = (nisabSilver, wealth) => {
    return parseFloat(usdToUnit(nisabSilver)) < parseFloat(wealth)
      ? wealth / 40
      : 0;
  };

  useEffect(() => {
    console.log(zakatTotal);
  }, [zakatTotal]);

  return (
    <div className="inline-flex flex-col gap-4 p-5 bg-primary-100 rounded-1.5xl w-full">
      <div className="px-5 py-2 flex gap-2.5 bg-primary-200 rounded-lg">
        <span className="text-sm font-medium font-Montserrat text-neutral-1000">
          Zakatable Wealth:
        </span>
        <span className="text-button-lg">
          {/* {unit} {formatPrice(usdToUnit(wealth))} */}
          {unit} {formatPrice(wealth)}
        </span>
      </div>

      <div className="text-heading-7 md:text-heading-6">
        Your estimated Zakat Payment
      </div>
      <div className="text-heading-3 sm:text-heading-1 text-primary-300">
        {/* {unit} {formatPrice(usdToUnit(zakatableAmount(nisabSilver, wealth)))} */}
        {unit}{" "}
        {zakatTotal > 0 && wealth === 0
          ? formatPrice(zakatTotal)
          : formatPrice(zakatableAmount(nisabSilver, wealth))}
      </div>
      <div className="text-button-md sm:text-button-lg">
        2.5% of Zakatable Wealth
      </div>
      {/* Divider */}
      {wealth > 0 && <hr className="my-1 border-neutral-300" />}
      <div className="text-button-md flex flex-wrap gap-3">
        {amounts?.cash || amounts?.bank ? (
          <Button
            onClick={() => calculateSteps(2)}
            variant={"secondaryOutline"}
            leftIcon={<EditIcon />}
            label={`Cash: $${(amounts.cash + amounts.bank).toLocaleString()}`}
          />
        ) : null}
        {amounts?.investmentProfit ||
        amounts?.shareResale ||
        amounts.merchandise ? (
          <Button
            onClick={() => calculateSteps(3)}
            variant={"secondaryOutline"}
            leftIcon={<EditIcon />}
            label={`Investments: $${(
              amounts.investmentProfit +
              amounts.shareResale +
              amounts.merchandise
            ).toLocaleString()}`}
          />
        ) : null}
        {amounts?.loan ? (
          <Button
            onClick={() => calculateSteps(4)}
            variant={"secondaryOutline"}
            leftIcon={<EditIcon />}
            label={`Loans: $${amounts.loan.toLocaleString()}`}
          />
        ) : null}
        {amounts?.other ? (
          <Button
            onClick={() => calculateSteps(4)}
            variant={"secondaryOutline"}
            leftIcon={<EditIcon />}
            label={`Other wealth: $${amounts.other.toLocaleString()}`}
          />
        ) : null}
        {total(amounts?.gold) > 0 ? (
          <Button
            onClick={() => calculateSteps(2)}
            variant={"dark"}
            leftIcon={<EditIcon />}
            label={`Zakatable Gold: $${total(amounts.gold)
              .toFixed(2)
              .toLocaleString()}`}
          />
        ) : null}
        {total(amounts?.silver) > 0 ? (
          <Button
            onClick={() => calculateSteps(2)}
            variant={"dark"}
            leftIcon={<EditIcon />}
            label={`Zakatable Silver: $${total(amounts.silver).toFixed(2)}`}
          />
        ) : null}
      </div>
      {wealth > 0 && <hr className="my-1 border-neutral-300" />}

      <div className="flex flex-col gap-3 p-3 rounded-lg sm:gap-4 sm:p-4 bg-neutral-100">
        <div className="flex flex-col justify-between gap-2 sm:gap-3 sm:flex-row">
          <div className="text-heading-7">
            Calculation is Based on Silver Nisab
          </div>
        </div>
        <div>
          <ul className="text-xs font-medium md:text-md">
            <li className="mb-1">
              Current price of gold per gram (24K):{" "}
              {showMoney(usdToUnit(prices.goldUsd), 6)} {unit}
            </li>
            <li>
              Current price of silver per gram (Fine):{" "}
              {showMoney(usdToUnit(prices.silverUsd), 6)} {unit}
            </li>
          </ul>
        </div>
        <div className="flex gap-3">
          <div className="flex-grow px-2 py-1 text-xs font-bold rounded-lg sm:flex-grow-0 sm:px-4 bg-accent-100 sm:text-button-md text-accent-500">
            Gold Nisab: {showMoney(usdToUnit(nisabGold))} {unit}
          </div>
          <div className="flex-grow px-4 py-1 text-xs font-bold rounded-lg sm:flex-grow-0 bg-neutral-200 sm:text-button-md text-neutral-800">
            Silver Nisab: {showMoney(usdToUnit(nisabSilver))} {unit}
          </div>
        </div>
        <div className="px-2 py-1 rounded-lg text-white text-button-sm bg-primary-300">
          Prices were last updated at{" "}
          {prices.updatedAt && showDate(new Date(prices.updatedAt))}
        </div>
      </div>
      {/* {step === 5 && (
        <Button
          variant={"primary"}
          label={"Back"}
          className={'w-fit'}
          onClick={() => dispatch(zakatStep(-1))}
        />
      )} */}
    </div>
  );
};

export default Summary;
