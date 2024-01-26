import React from "react";
import { useSelector } from "react-redux";
import { showMoney } from "../utils/money";
import { formatPrice } from "../../../utils/helper";

function showDate(d) {
  return d.toLocaleTimeString() + " " + d.toLocaleDateString();
}

const Summary = () => {
  const { amounts, prices } = useSelector((state) => state.zakatCalculator);

  const unit = amounts.unit;

  const wealth =
    amounts.cash +
    amounts.bank +
    amounts.silver.value +
    amounts.gold.value +
    amounts.investmentProfit +
    amounts.shareResale +
    amounts.merchandise +
    amounts.loan +
    amounts.other;

  const usdToUnit = (amount) =>{
   return  unit === "AUD" ? amount / prices.audToUsd : amount;
  }

  const nisabSilver = 612.36 * prices.silverUsd;
  const nisabGold = 87.48 * prices.goldUsd;

  const zakatableAmount = (nisabSilver, wealth) => {
    return parseFloat(usdToUnit(nisabSilver)) < parseFloat(wealth)
      ? (wealth / 40)
      : 0;
  };
  return (
    <div className="inline-flex flex-col gap-4 p-5 bg-primary-100 rounded-1.5xl w-full">
      <div className="px-5 py-2 flex gap-2.5 bg-primary-200 rounded-lg">
        <span className="text-sm font-medium font-Montserrat text-neutral-1000">
          Zakatable Wealth:
        </span>
        <span className="text-button-lg">
          {unit} {formatPrice(wealth)}
        </span>
      </div>

      <div className="text-heading-7 md:text-heading-6">
        Your estimated Zakat Payment
      </div>
      <div className="text-heading-3 sm:text-heading-1 text-primary-300">
        {unit} {formatPrice(zakatableAmount(nisabSilver, wealth))}
      </div>
      <div className="text-button-md sm:text-button-lg">
        2.5% Zakatable Wealth
      </div>
      <div className="flex flex-col gap-3 p-3 rounded-lg sm:gap-4 sm:p-4 bg-neutral-100">
        <div className="flex flex-col justify-between gap-2 sm:gap-3 sm:flex-row">
          <div className="text-heading-7">Calculation is Based on Gold</div>
          <div className="px-2 py-1 rounded-lg text-button-sm bg-neutral-200">
            Last updated at{" "}
            {prices.updatedAt && showDate(new Date(prices.updatedAt))}
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
