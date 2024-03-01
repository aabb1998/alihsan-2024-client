import React, { useState } from "react";
import Button from "../../../components/Button";
import { HelpCircleIcon } from "../../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { zakatStep, zakatInput } from "../slice";
import AmountInput from "./AmountInput";
import { Tooltip } from "react-tooltip";

export default function Step3() {
  const dispatch = useDispatch();
  const { investmentProfit, shareResale, merchandise } = useSelector(
    (state) => state.zakatCalculator.amounts,
  );
  const [errors, setErrors] = useState({});

  const addError = (name, error) => setErrors((e) => ({ ...e, [name]: error }));
  const onChangeValue = (name, value) => dispatch(zakatInput({ name, value }));
  return (
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="form-group">
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000 ">
            Annual Profit Of Investment Held:
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="annual-profit"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="annual-profit"
              className="tooltip opacity-100"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Annual Profit of Investment Held
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Record the yearly earnings from investments, including stocks,
                  bonds, or business ventures.
                </p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div className="flex gap-3">
          <label htmlFor="CashOnHand" className="sr-only">
            Cash On Hand
          </label>
          <AmountInput
            type="text"
            onChangeValue={onChangeValue}
            onValidationError={addError}
            defaultValue={investmentProfit || ""}
            name="investmentProfit"
            className="w-full form-control"
            id="CashOnHand"
            placeholder="0"
          />
        </div>
        {errors.investmentProfit && (
          <div className="mt-1 text-sm text-red-300">
            {errors.investmentProfit}
          </div>
        )}

        <div className="flex items-center gap-1 mt-5 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000 ">
            Resale Value Of Share
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="resale-value"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="resale-value"
              className="tooltip opacity-100"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Resale Value of Share
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Enter the current market value of any shares you own.
                </p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div className="flex gap-3">
          <label htmlFor="CashOnHand" className="sr-only">
            Cash On Hand
          </label>
          <AmountInput
            type="text"
            onChangeValue={onChangeValue}
            onValidationError={addError}
            defaultValue={shareResale || ""}
            name="shareResale"
            className="w-full form-control"
            id="CashOnHand"
            placeholder="0.00"
          />
        </div>
        {errors.shareResale && (
          <div className="mt-1 text-sm text-red-300">{errors.shareResale}</div>
        )}

        <div className="flex items-center gap-1 mt-5 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000 ">
            Merchandise & Profits
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="merchandise-profits"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="merchandise-profits"
              className="tooltip opacity-100"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Merchandise & Profits{" "}
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Include the value of business inventory plus any profits not
                  yet reinvested.
                </p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div className="flex gap-3">
          <label htmlFor="CashOnHand" className="sr-only">
            Cash On Hand
          </label>
          <AmountInput
            type="text"
            onChangeValue={onChangeValue}
            onValidationError={addError}
            defaultValue={merchandise || ""}
            name="merchandise"
            className="w-full form-control"
            id="CashOnHand"
            placeholder="0"
          />
        </div>
        {errors.merchandise && (
          <div className="mt-1 text-sm text-red-300">{errors.merchandise}</div>
        )}
      </div>
      <div className="flex gap-3">
        <Button
          variant={"secondary"}
          label={"Back"}
          onClick={() => dispatch(zakatStep(-1))}
        />
        <Button
          variant={"primary"}
          label={"Next"}
          onClick={() => dispatch(zakatStep(1))}
          disabled={
            errors.investmentProfit || errors.shareResale || errors.merchandise
          }
        />
      </div>
    </div>
  );
}
