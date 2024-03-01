import { currencyConfig } from "../../utils/constants";
import { formatPrice } from "../../utils/helper";

export const TotalSection = ({
  ricePrice,
  cowPrice,
  goatPrice,
  riceQnty,
  donationItem,
  quantity,
}) => {
  const itemPrices = {
    cow: cowPrice,
    "goat/sheep": goatPrice,
  };

  const donationItemPrice = itemPrices[donationItem] * quantity || 0;
  const subTotal = donationItemPrice + riceQnty * ricePrice;

  return (
    <div>
      <div className="mb-10">
        <div className="h-px mb-5 bg-neutral-300"></div>
        {donationItem ? (
          <div className="grid justify-between grid-cols-5">
            <div className="col-span-3 capitalize ">{donationItem}</div>
            <div className="col-span-1">{quantity} x</div>
            <div className="col-span-1 text-right">
              {currencyConfig.label}
              {formatPrice(donationItemPrice)}
            </div>
          </div>
        ) : (
          ""
        )}
        {riceQnty ? (
          <div className="grid justify-between grid-cols-5 mt-2">
            <div className="col-span-3">Rice</div>
            <div className="col-span-1">{riceQnty}KG x</div>
            <div className="col-span-1 text-right">
              {currencyConfig.label}
              {formatPrice(ricePrice)}
            </div>
          </div>
        ) : (
          ""
        )}
        {subTotal ? (
          <>
            <div className="h-px my-5 bg-neutral-300"></div>
            <div className="flex justify-between text-heading-7">
              <div>Subtotal</div>
              <div>
                {currencyConfig.label}
                {formatPrice(subTotal)}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
