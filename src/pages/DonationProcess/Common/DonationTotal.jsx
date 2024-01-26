import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAnonymous } from "../../../features/basket/basketSlice";
import { HelpCircleIcon } from "../../../theme/svg-icons";
import { Tooltip } from "react-tooltip";
import { Button } from "../../../components";
import { formatPrice } from "../../../utils/helper";

export const DonationTotal = ({ onNext, disableAnonymous }) => {
	const user = localStorage.getItem('loggedIn');
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

  return (
    <div className="p-4 border border-neutral-300 rounded-2xl">
      <h6 className="mb-5 text-heading-7 md:text-heading-6 md:mb-7">
        Donation Total
      </h6>
      <div className="flex justify-between mb-5 md:mb-7.5 text:md md:text-lg">
        <div>Subtotal</div>
        <div className="text-right">${formatPrice(totalPoints)}</div>
      </div>
      <div className="flex justify-between text:md md:text-lg">
        <div>Processing Fee</div>
        <div className="text-right">
          ${formatPrice(totalPoints ? processingAmount : 0)}
        </div>
      </div>
      <div className="h-px my-5 bg-neutral-300"></div>
      <div className="flex justify-between font-bold heading-6">
        <div>Total {user ? 'logegd in' : 'null'}</div>
        <div className="text-right">
          $
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
            className="custom-checkbox"
            onChange={(e) => user ? dispatch(setIsAnonymous(e.target.checked)) : null}
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
            className="tooltip opacity-100"
            style={{ backgroundColor: "#fff", padding: "1rem" }}
          >
            <div>
              <h2 className="mb-2 text-neutral-1000 text-button-md">
                Anonymous Checkout
              </h2>
              <p className="text-xs font-medium text-neutral-600">
                Selecting this option allows you to donate anonymously, ensuring
                that your identity and other details remain undisclosed during
                the checkout process.
              </p>
            </div>
          </Tooltip>
        </div>
      </div>
      {onNext ? (
        <Button
          onClick={onNext}
          disabled={totalPoints <= 0 || hasZero}
          className="btn btn-primary filled"
          value={isAnonymous}
          label={"Process to Checkout"}
        />
      ) : null}
    </div>
  );
};
