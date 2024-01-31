import React, { useState } from "react";
import Button from "../../../components/Button";
import {
  HelpCircleIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
} from "../../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { zakatStep, zakatInput, zakatMetalInput } from "../slice";
import { showMoney } from "../utils/money";
import AmountInput from "./AmountInput";
import MetalModal from "./MetalModal";
import Img from "../../../components/Image";
import { Tooltip } from "react-tooltip";

export default function Step2() {
  const dispatch = useDispatch();
  const { unit, cash, bank, silver, gold } = useSelector(
    (state) => state.zakatCalculator.amounts
  );
  const amounts = useSelector((state) => state.zakatCalculator.amounts);
  const [modalMetal, setModalMetal] = useState(null);
  const [errors, setErrors] = useState({});
  const addError = (name, error) => setErrors((e) => ({ ...e, [name]: error }));
  const onChangeValue = (name, value) => dispatch(zakatInput({ name, value }));
  return (
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="form-group">
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000">
            Cash On Hand:
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="cash-on-hand"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="cash-on-hand"
              className="opacity-100 tooltip"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Cash on Hand
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Enter the total amount of physical cash you currently possess.
                </p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div className="flex gap-3 mb-5">
          <div className="w-23">
            <label htmlFor="Currency" className="sr-only">
              Currency
            </label>
            <select
              className="w-full text-sm !text-neutral-800 form-control"
              id="Currency"
              name="unit"
              defaultValue={unit}
              onChange={(e) => onChangeValue("unit", e.target.value)}
            >
              <option value="AUD">AUD</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="grow">
            <label htmlFor="CashOnHand" className="sr-only">
              Cash on hand
            </label>
            <AmountInput
              type="text"
              name="cash"
              defaultValue={cash ? cash + "" : ""}
              className="w-full form-control"
              id="CashOnHand"
              placeholder="Cash on hand"
              onChangeValue={onChangeValue}
              onValidationError={addError}
            />
            {errors.cash && (
              <div className="mt-1 text-sm text-red-300">{errors.cash}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000">
            Balance Held In Bank Accounts:
          </div>{" "}
          <span
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="balance-held-in-bank-accounts"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
            <Tooltip
              id="balance-held-in-bank-accounts"
              className="opacity-100 tooltip"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Balance Held in Bank Accounts
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  Input the total sum in your bank accounts, including savings
                  and checking.
                </p>
              </div>
            </Tooltip>
          </span>
        </div>
        <div className="flex gap-3">
          <div className="grow">
            <label htmlFor="CashOnHand" className="sr-only">
              Cash on hand
            </label>
            <AmountInput
              type="text"
              name="bank"
              defaultValue={bank ? bank + "" : ""}
              className="w-full form-control"
              id="CashOnHand"
              placeholder="Balance Held In Bank Accounts"
              onChangeValue={onChangeValue}
              onValidationError={addError}
            />
            {errors.bank && (
              <div className="mt-1 text-sm text-red-300">{errors.bank}</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        {/* {silver.value ? null : ( */}
        <Button
          variant={"secondaryFull"}
          leftIcon={<PlusIcon />}
          label={"Add Zakatable Silver"}
          onClick={() => setModalMetal({ type: "silver", key: 0 })}
        />
        {/* )} */}
        {/* {gold.value ? null : ( */}
        <Button
          variant={"secondaryFull"}
          leftIcon={<PlusIcon />}
          label={"Add Zakatable Gold"}
          onClick={() => setModalMetal({ type: "gold", key: 0 })}
        />
        {/* )} */}
      </div>
      <div>
        {silver?.map((each, i) => (
          <MetalDisplay
            value={each.value}
            unit={unit}
            type="silver"
            onEdit={() => setModalMetal({ type: "silver", key: each?.key })}
            onDelete={() =>
              dispatch(
                zakatMetalInput({
                  unit: each?.unit,
                  karat: each?.karat,
                  value: 0,
                  weight: 0,
                  name: each?.name,
                  key: each?.key,
                })
              )
            }
          />
        ))}
        {gold?.map((each, i) => (
          <MetalDisplay
            value={each.value}
            unit={unit}
            type="gold"
            onEdit={() => setModalMetal({ type: "gold", key: each?.key })}
            onDelete={() =>
              dispatch(
                zakatMetalInput({
                  unit: each.unit,
                  karat: each.karat,
                  value: 0,
                  weight: 0,
                  name: each.name,
                  key: each?.key,
                })
              )
            }
          />
        ))}
      </div>
      <div className="flex gap-5">
        <Button
          variant={"secondary"}
          label={"Back"}
          onClick={() => dispatch(zakatStep(-1))}
        />
        <Button
          variant={"primary"}
          label={"Next"}
          onClick={() => dispatch(zakatStep(1))}
          disabled={errors.cash || errors.bank}
        />
      </div>
      <MetalModal
        metal={modalMetal}
        visible={modalMetal ? true : false}
        onRequestClose={() => setModalMetal(false)}
      />
    </div>
  );
}

const MetalDisplay = ({ value, unit, type, onEdit, onDelete }) => {
  const { prices } = useSelector((state) => state.zakatCalculator);

  const usdToUnit = (amount) => {
    return unit === "AUD" ? amount / prices.audToUsd : amount;
  };
  return (
    value > 0 && (
      <div
        className={
          "relative flex justify-between py-3 pr-3 mb-3 overflow-hidden border rounded-lg sm:py-4 pl-13 sm:pl-20 sm:pr-4 " +
          (type === "silver"
            ? "border-primary-300 bg-neutral-200"
            : "border-accent-300 bg-accent-100")
        }
      >
        <Img
          src={`/images/illustration/zakat-${type}.svg`}
          className="absolute top-0 left-0 w-11 h-11 sm:w-auto sm:h-auto"
          alt="zakat silver"
        />
        <div className="text-button-md sm:text-heading-7">
          Zakatable {type === "silver" ? "Silver" : "Gold"}:{" "}
          {showMoney(usdToUnit(value))} {unit}
        </div>
        <div className="flex gap-3">
          <div className="cursor-pointer">
            <EditIcon onClick={onEdit} />
          </div>
          <div className="cursor-pointer">
            <TrashIcon onClick={onDelete} />
          </div>
        </div>
      </div>
    )
  );
};
