import {
  CheckIcon,
  CowIcon,
  DeleteIcon,
  EditIcon,
  GoatIcon,
  MinusIcon,
  PlusIcon,
  RiceIcon,
} from "../../theme/svg-icons";
import { formatPrice } from "../../utils/helper";

export const BasketItem = ({
  item,
  index,
  handleInputChange,
  handleRemoveBasketItems,
  handleQuantityChange,
  handleItemSave,
  toggle,
  handleEdit,
}) => {
  const checkoutType = item?.checkoutType || item?.Campaign?.checkoutType;
  const isCommonORZaqat = [
    "ZAQAT",
    "COMMON",
    "WATER_CAMPAIGN",
    "KURBAN",
    item?.quantity === null ? "FEDYAH" : "",
  ].includes(checkoutType);
  const isAdeeqah = checkoutType === "ADEEQAH_GENERAL_SACRIFICE";
  const quantity = isAdeeqah
    ? parseInt(item?.riceQuantity)
    : parseInt(item?.quantity);

  const price = parseInt(item?.amount ?? item?.ricePrice);
  const total = isAdeeqah
    ? parseInt(item?.ricePrice) * quantity + parseInt(item?.donationItemPrice)
    : item?.total;

  const getRecurringLabel = (periodDays) => {
    switch (parseInt(periodDays)) {
      case 7:
        return "Weekly";
      case 30:
        return "Monthly";
      default:
        return "Yearly";
    }
  };

  return (
    <div className="flex flex-col" key={index}>
      <div className="flex flex-col gap-3">
        <div className="flex w-full gap-2 sm:gap-3">
          <div className="h-10 overflow-hidden rounded-lg w-15 shrink-0">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={item?.coverImage || "/images/banner/projects/1.jpg"}
                alt=""
                className="object-cover w-full h-full rounded-lg"
              />
              {item.isRecurring && (
                <div className="absolute bottom-0 left-0 flex justify-center w-full text-xs bg-primary-200">
                  {getRecurringLabel(item.periodDays)}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm text-primary-400 line-clamp-1 sm:text-md">
                {item?.name}
              </div>
              <p className="my-1 text-xs line-clamp-1 text-neutral-600 sm:text-sm sm:my-0">
                {checkoutType === "COMMON"
                  ? "General Campaign"
                  : `${checkoutType === "FEDYAH" ? "FEDYAH/KAFFARAH" : checkoutType}`}
              </p>
            </div>
            <div className="text-red-300 cursor-pointer">
              <DeleteIcon
                iconSize={24}
                onClick={() => handleRemoveBasketItems(item)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {!isCommonORZaqat ? (
            <div className="flex items-center justify-between">
              {!isAdeeqah && (
                <div className="relative flex flex-row w-auto h-8 bg-transparent rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(index, "sub")}
                    data-action="decrement"
                    className="flex items-center justify-center w-8 h-8 border border-r-0 rounded-l-lg border-neutral-300"
                  >
                    <span className="">
                      <MinusIcon />
                    </span>
                  </button>

                  <input
                    type="number"
                    className="border !rounded-none w-11 h-8 form-control !text-heading-7 !text-neutral-1000 !p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    name="custom-input-number"
                    value={quantity}
                  />
                  <button
                    onClick={() => handleQuantityChange(index, "add")}
                    data-action="increment"
                    className="flex items-center justify-center w-8 h-8 border border-l-0 rounded-r-lg border-neutral-300"
                  >
                    <span className="">
                      <PlusIcon />
                    </span>
                  </button>
                </div>
              )}
              {/* --------- */}

              {isAdeeqah && (
                <div className="flex flex-row flex-wrap gap-2">
                  <div className="bg-primary-100 flex flex-row line-clamp-1 gap-2 items-center text-xs text-primary-300 rounded px-2 py-1.5">
                    {item?.donationItem === "COW" ? <CowIcon /> : <GoatIcon />}
                    <p className="flex gap-1">
                      <span className="hidden sm:flex">
                        {" "}
                        {item?.donationItem === "COW"
                          ? "Cow"
                          : "Goat/Sheep"}{" "}
                      </span>{" "}
                      1 <span></span>
                    </p>
                  </div>
                  <div className="bg-primary-100 line-clamp-1 flex flex-row gap-2 items-center text-xs text-primary-300 rounded px-2 py-1.5">
                    <RiceIcon />
                    <p className="flex gap-1">
                      <span className="hidden sm:flex"> Rice </span> {quantity}
                      KG <span></span>
                    </p>
                  </div>
                </div>
              )}

              {/*  */}
            </div>
          ) : item?.isEdit ? (
            <div>
              <div className="flex">
                <span className="flex cursor-pointer text-neutral-500 items-center h-8 p-1.5 border rounded-md rounded-r-none bg-neutral-200 border-neutral-300">
                  <CheckIcon
                    iconSize={18}
                    onClick={() => handleItemSave(item, index)}
                  />
                </span>
                <input
                  id="amount edit"
                  className="p-0 text-center w-14 min-w-[3.5rem] h-8 rounded-l-none  border-neutral-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="amount"
                  type="text"
                  placeholder="$100"
                  value={total}
                  min={0}
                  onInput={(event) => handleInputChange(index, event)}
                  autoFocus={true}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex">
                <span className="flex cursor-pointer text-neutral-500 items-center h-8 p-1.5 border rounded-md rounded-r-none bg-neutral-200 border-neutral-300">
                  <EditIcon iconSize={18} onClick={() => handleEdit(index)} />
                </span>
                <input
                  id="amount save"
                  className="p-0 text-center w-14 min-w-[3.5rem] h-8 rounded-l-none  border-neutral-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="amount"
                  type="number"
                  placeholder="$100"
                  value={total}
                  readOnly={toggle}
                  disabled
                />
              </div>
            </div>
          )}
          {total == 0 ? (
            <span className="text-red-300">Invalid Amount</span>
          ) : (
            ""
          )}
          <div className="flex">
            <div className="font-bold text-md sm:text-heading-7">
              {isCommonORZaqat ? (
                "$" + formatPrice(total)
              ) : isAdeeqah ? (
                <>{"$" + formatPrice(total)}</>
              ) : (
                <>
                  <span className="font-medium text-md font-Montserrat text-neutral-500">
                    {quantity + " x "}
                  </span>
                  {"$" + formatPrice(price)}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
