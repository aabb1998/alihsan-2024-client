import React, { useState } from "react";
import Button from "../../../components/Button";
import { HelpCircleIcon } from "../../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { zakatStep, zakatInput } from "../slice";
import AmountInput from "./AmountInput";
import { Tooltip } from "react-tooltip";

export default function Step4() {
  const dispatch = useDispatch();
  const { loan, other } = useSelector((state) => state.zakatCalculator.amounts);
  const [errors, setErrors] = useState({});

  const addError = (name, error) => setErrors((e) => ({ ...e, [name]: error }));
  const onChangeValue = (name, value) => dispatch(zakatInput({ name, value }));
  return (
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="form-group">
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000 ">
            Total Amount Of Awaiting Receivable Loans
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="total-amount-of-awaiting-receivable-loans"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="total-amount-of-awaiting-receivable-loans"
              className="opacity-100 tooltip"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Total Amount of Awaiting Receivable Loans
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  List the total sum of outstanding loans you expect to receive
                  back.
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
            name="loan"
            onChangeValue={onChangeValue}
            onValidationError={addError}
            defaultValue={loan || ""}
            className="w-full form-control"
            id="CashOnHand"
            placeholder="0"
          />
        </div>
        {errors.loan && (
          <div className="mt-1 text-sm text-red-300">{errors.loan}</div>
        )}

        <div className="flex items-center gap-1 mt-5 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000">
            Other Zakatable Wealth
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="other-zakatable-wealth"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="other-zakatable-wealth"
              className="opacity-100 tooltip"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Other Zakatable Wealth
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Input any additional assets subject to Zakat, such as rental
                  income or valuable commodities.
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
            name="other"
            onChangeValue={onChangeValue}
            onValidationError={addError}
            defaultValue={other || ""}
            className="w-full form-control"
            id="CashOnHand"
            placeholder="0.00"
          />
        </div>
        {errors.other && (
          <div className="mt-1 text-sm text-red-300">{errors.other}</div>
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
        />
      </div>
    </div>
  );
}
