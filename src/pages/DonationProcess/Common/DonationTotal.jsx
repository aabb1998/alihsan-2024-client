import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAnonymous } from "../../../features/basket/basketSlice";
import { HelpCircleIcon } from "../../../theme/svg-icons";
import { Tooltip } from "react-tooltip";
import { Button } from "../../../components";
import { formatPrice } from "../../../utils/helper";
import { currencyConfig } from "../../../utils/constants";

export const DonationTotal = ({ onNext, disableAnonymous }) => {
  const user = useSelector(state => state.profile.auth);
  const { settings } = useSelector((state) => state.mapCountries);
  const processingFee = settings?.processingFee / 100 || 0;

  const dispatch = useDispatch();
  const { basketItems, isAnonymous } = useSelector((state) => state.basketItem);
  const totalPoints = basketItems?.reduce((accumulator, currentObject) => {
    return (
      accumulator +
      parseFloat(currentObject.amount ?? currentObject.total) *
        parseFloat(currentObject.quantity ?? 1)
    );
  }, 0);
  const hasZero = basketItems.some((item) => parseFloat(item.total) === 0);

  const processingAmount = ((totalPoints * processingFee) / 100).toFixed(2);
  const isRamadanCampaign = basketItems.some(
    (item) =>
      item?.Campaign?.isRamadanCampaign === true && item?.isRecurring === true
  );

  const ramadanPaymentNote = isRamadanCampaign
    ? "Please note that we now only authorize a temporary charge of 1 AUD on your card during checkout. This authorization hold will be refunded later. The actual amount will only be deducted from your card after 8:00 PM on the payment date. This temporary hold helps ensure a smooth payment process and safeguards the security of your transaction."
    : "";
  return (
    <div className="p-4 border border-neutral-300 rounded-2xl">
      <h6 className="mb-5 text-heading-7 md:text-heading-6 md:mb-7">
        Donation Total
      </h6>
      <div className="flex justify-between mb-5 md:mb-7.5 text:md md:text-lg">
        <div>Subtotal</div>
        <div className="text-right">
          {currencyConfig.label}
          {formatPrice(totalPoints)}
        </div>
      </div>
      <div className="flex justify-between text:md md:text-lg">
        <div className="flex flex-row items-center">
          <div className="mr-2">Processing Fee (3%)</div>

          <div
            className="cursor-pointer text-neutral-700 hover:text-primary-300"
            data-tooltip-id="processing-tooltip"
            data-tooltip-place="bottom-end"
          >
            <HelpCircleIcon iconSize={16} />
            <Tooltip
              id="processing-tooltip"
              className="opacity-100 tooltip"
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              <div>
                <h2 className="mb-2 text-neutral-1000 text-button-md">
                  Procesing Fee
                </h2>
                <p className="text-xs font-medium text-neutral-600">
                  The processing fee helps us cover all costs associated with
                  the payment, ensuring that 100% of your donation goes to the
                  project.
                  <br />
                  <br />
                  To avoid the processing fee, transfer directly to our bank
                  account. You can find the details on the payment details page
                  or in the footer.
                </p>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="text-right">
          {currencyConfig.label}
          {formatPrice(totalPoints ? processingAmount : 0)}
        </div>
      </div>
      <div className="h-px my-5 bg-neutral-300"></div>
      <div className="flex justify-between font-bold heading-6">
        <div>Total</div>
        <div className="text-right">
          {currencyConfig.label}
          {totalPoints
            ? formatPrice(
                parseFloat(totalPoints) + parseFloat(processingAmount)
              )
            : 0}
        </div>
      </div>
      <div className="flex items-center gap-1 justify-start my-7.5 md:my-10">
        <div className="flex gap-2 ">
          <input
            type="checkbox"
            id="Anonymous"
            className={
              "custom-checkbox " +
              (disableAnonymous || !user ? "cursor-default" : "")
            }
            onChange={(e) =>
              user ? dispatch(setIsAnonymous(e.target.checked)) : null
            }
            checked={isAnonymous || !user}
            disabled={disableAnonymous || !user}
          />
          <label
            htmlFor="Anonymous"
            className="font-medium cursor-pointer text-neutral-800"
          >
            Anonymous Checkout
          </label>
        </div>

        <div
          className="cursor-pointer text-neutral-700 hover:text-primary-300"
          data-tooltip-id="my-tooltip"
          data-tooltip-place="bottom-end"
        >
          <HelpCircleIcon iconSize={16} />
          <Tooltip
            id="my-tooltip"
            className="opacity-100 tooltip"
            style={{ backgroundColor: "#fff", padding: "1rem" }}
          >
            <div>
              <h2 className="mb-2 text-neutral-1000 text-button-md">
                Anonymous Checkout
              </h2>
              <p className="text-xs font-medium text-neutral-600">
                Selecting this option allows you to donate anonymously, ensuring
                that your identity and other details remain undisclosed during
                the checkout process. To disable Anonymous checkout, please
                login.
              </p>
            </div>
          </Tooltip>
        </div>
      </div>
      {ramadanPaymentNote ? (
        <div className="p-4 mb-6 rounded-xl bg-primary-100">
          <small className="mb-4 text-red-300">{ramadanPaymentNote}</small>
        </div>
      ) : (
        ""
      )}
      {onNext ? (
        <Button
          onClick={onNext}
          disabled={totalPoints <= 0 || hasZero}
          className="btn btn-primary filled"
          value={isAnonymous}
          label={"Proceed to Checkout"}
        />
      ) : null}
    </div>
  );
};
