import { useSelector } from "react-redux";
import Button from "../Button";
import { formatPrice } from "../../utils/helper";
import { currencyConfig } from "../../utils/constants";
import { Tooltip } from "react-tooltip";
import { HelpCircleIcon } from "../../theme/svg-icons";

export const BasketTotal = ({ items, handleClick }) => {
  const { settings } = useSelector((state) => state.mapCountries);
  const processingFee = settings?.processingFee / 100 || 0;
  const hasZero = items.some((item) => parseFloat(item.total) === 0);
  let totalPoints = items.reduce(
    (accumulator, { total, quantity = 1, amount, checkoutType }) => {
      const value = amount ?? total;
      if (checkoutType === "ADEEQAH_GENERAL_SACRIFICE") {
        return accumulator + total;
      }
      return accumulator + parseFloat(value * quantity);
    },
    0
  );
  const processingAmount = ((totalPoints * processingFee) / 100).toFixed(2);
  const grossTotal = parseFloat(totalPoints) + parseFloat(processingAmount);

  return (
    <>
      {totalPoints > 0 && (
        <div className="mb-8 sm:mb-10">
          <div className="flex justify-between text-md sm:text-heading-7">
            <div className="font-medium sm:font-bold">Subtotal</div>
            <div className="font-medium sm:font-bold">
              {currencyConfig.label}
              {formatPrice(totalPoints)}
            </div>
          </div>
          <div className="h-px my-3 sm:my-5 bg-neutral-300"></div>
          <div className="flex justify-between text-md sm:text-heading-7">
            <div className="font-medium sm:font-bold flex flex-row items-center">
              Processing Fee (3%){" "}
              <span
                className="cursor-pointer text-neutral-700 hover:text-primary-300 ml-3"
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
                      Processing Fee
                    </h2>
                    <p className="text-xs font-medium text-neutral-600">
                      The processing fee helps us cover all costs associated
                      with the payment, ensuring that 100% of your donation goes
                      to the project.
                      <br />
                      <br />
                      To avoid the processing fee, transfer directly to our bank
                      account. You can find the details on the payment details
                      page or in the footer.
                    </p>
                  </div>
                </Tooltip>
              </span>
            </div>

            <div className="font-medium sm:font-bold">
              {currencyConfig.label}
              {formatPrice(processingAmount)}
            </div>
          </div>
          <div className="h-px my-3 sm:my-5 bg-neutral-300"></div>
          <div className="flex justify-between text-md sm:text-heading-6">
            <div className="font-bold">Total</div>
            <div className="font-bold">
              {currencyConfig.label}
              {formatPrice(grossTotal)}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5 mb-2">
        <Button
          variant="secondaryOutline"
          onClick={handleClick}
          label="View Cart"
          disabled={!items?.length || hasZero}
        />
        <Button
          variant="primaryFull"
          onClick={handleClick}
          label="Checkout"
          disabled={!items?.length || hasZero}
        />
      </div>
    </>
  );
};
