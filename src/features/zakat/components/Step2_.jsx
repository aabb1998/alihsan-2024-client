import React from "react";
import Button from "../../../components/Button";
import {
  EditIcon,
  HelpCircleIcon,
  PlusIcon,
  TrashIcon,
} from "../../../theme/svg-icons";
import Img from "../../../components/Image";
export default function Step3() {
  return (
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="form-group">
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000 ">
            Cash On Hand:
          </div>{" "}
          <span className="text-neutral-500">
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
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
            >
              <option value="">AUD</option>
            </select>
          </div>
          <div className="grow">
            <label htmlFor="CashOnHand" className="sr-only">
              Cash on hand
            </label>
            <input
              type="text"
              name="email"
              className="w-full form-control"
              id="CashOnHand"
              placeholder="Cash on hand"
              value=""
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-3 sm:gap-3">
          <div className="!mb-0 text-sm font-medium text-neutral-1000">
            Balance Held In Bank Accounts:
          </div>{" "}
          <span className="text-neutral-500">
            <HelpCircleIcon iconSize={16} strokeWidth={2} />
          </span>
        </div>
        <div className="flex gap-3">
          <div className="grow">
            <label htmlFor="CashOnHand" className="sr-only">
              Cash on hand
            </label>
            <input
              type="text"
              name="email"
              className="w-full form-control"
              id="CashOnHand"
              placeholder="Balance held in bank accounts"
              value=""
            ></input>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          variant={"secondaryFull"}
          leftIcon={<PlusIcon />}
          label={"Add Zakatable Gold"}
        />
        <Button
          variant={"secondaryFull"}
          leftIcon={<PlusIcon />}
          label={"Add Zakatable Gold"}
        />
      </div>
      <div>
        <div className="relative flex justify-between py-3 pr-3 mb-3 overflow-hidden border rounded-lg sm:py-4 pl-13 sm:pl-20 sm:pr-4 border-primary-300 bg-neutral-200">
          <img
            src="/images/illustration/zakat-silver.svg"
            className="absolute top-0 left-0 w-11 h-11 sm:w-auto sm:h-auto"
            alt="zakat silver"
          />
          <div className="text-button-md sm:text-heading-7">
            Zakatable Silver: 142:56 AUD
          </div>
          <div className="flex gap-3">
            <div className="cursor-pointer">
              <EditIcon />
            </div>
            <div className="cursor-pointer">
              <TrashIcon />
            </div>

          </div>
        </div>
        <div className="relative flex justify-between py-3 pr-3 mb-3 overflow-hidden border rounded-lg sm:py-4 pl-13 sm:pl-20 sm:pr-4 border-accent-300 bg-accent-100">
          <Img
            src={"/images/illustration/zakat-gold.svg"}
            className="absolute top-0 left-0 w-11 h-11 sm:w-auto sm:h-auto"
            alt="zakat gold"
          />
          <div className="text-button-md sm:text-heading-7">
            Zakatable Gold: 142:56 AUD
          </div>
          <div className="flex gap-3">
          <div className="cursor-pointer">
              <EditIcon />
            </div>
            <div className="cursor-pointer">
              <TrashIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant={"secondary"} label={"Back"} />
        <Button variant={"primary"} label={"Next"} />
      </div>
    </div>
  );
};
