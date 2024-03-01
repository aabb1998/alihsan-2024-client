import React, { useEffect } from "react";
import { addBasket } from "../../features/projectDetails/projectDetailSlice";
import {
  PlusIcon,
  TrashIcon,
  MinusIcon,
  CowIcon,
  RiceIcon,
  GoatIcon,
} from "../../theme/svg-icons";
import { DonationTotal } from "../../pages/DonationProcess/Common/DonationTotal";
import { IntrestedProjects } from "../../features/basket/InterestedProjects";
import { StepperBasket } from "../../pages/DonationProcess/Common/Stepper/StepperBasket";
import {
  removeBasketItem,
  updateBasketItem,
} from "../../features/basket/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NoDataFound } from "../../components/NoDataFound";
import { formatPrice } from "../../utils/helper";
import PageHead from "../../components/PageHead";
import { currencyConfig } from "../../utils/constants";

const Basket = () => {
  const { basketItems } = useSelector((state) => state.basketItem);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleRemoveBasketItems = async (item) => {
    await dispatch(removeBasketItem({ campaignId: item.campaignId }));
    // const remainingItems = project?.checkout.filter(
    const remainingItems = basketItems?.filter(
      (each, index) =>
        each.campaignId !== item.campaignId ?? item?.Campaign?.campaignId
    );
    dispatch(addBasket(remainingItems));
    localStorage.setItem("checkout", JSON.stringify(remainingItems));
  };

  const handleInputChange = (index, event) => {
    const newValues = [...basketItems];
    const inputValue = event.target.value.trim();
    const number = parseInt(inputValue, 10) || 0;
    newValues[index] = {
      ...newValues[index],
      amount: number,
      total: number,
    };

    dispatch(addBasket(newValues));
    dispatch(updateBasketItem(newValues[index]));
    localStorage.setItem("checkout", JSON.stringify(newValues));
  };

  const handleQuantityChange = (index, action) => {
    const newValues = [...basketItems];
    const item = newValues[index];
    const checkoutType = item?.checkoutType || item?.Campaign?.checkoutType;

    if (checkoutType === "ADEEQAH_GENERAL_SACRIFICE") {
      const riceQuantity =
        item.riceQuantity +
        (action === "add"
          ? 1
          : action === "sub" && item.riceQuantity > 1
          ? -1
          : 0);
      const total =
        parseInt(item.ricePrice) * riceQuantity +
        parseInt(item.donationItemPrice);

      newValues[index] = {
        ...item,
        riceQuantity,
        total,
      };
    } else {
      const quantity =
        item.quantity +
        (action === "add" ? 1 : action === "sub" && item.quantity > 1 ? -1 : 0);
      const total = item.amount * quantity;

      newValues[index] = {
        ...item,
        quantity,
        total,
      };
    }

    dispatch(addBasket(newValues));
    dispatch(updateBasketItem(newValues[index]));
    localStorage.setItem("checkout", JSON.stringify(newValues));
  };

  const rows = basketItems?.length ? (
    basketItems?.map((item, index) => {
      const checkoutType = item?.checkoutType || item?.Campaign?.checkoutType;
      const isAdeeqah = checkoutType === "ADEEQAH_GENERAL_SACRIFICE";
      const isCommonORZaqat = [
        "ZAQAT",
        "COMMON",
        "WATER_CAMPAIGN",
        "KURBAN",

        item?.quantity === null ? "FEDYAH" : "",
      ].includes(checkoutType);
      let total = item?.total;
      const constantPrices = ["FEED1", "FEED10", "CLOTHE10", "FEED60"];
      const isFieldEditable = constantPrices.includes(item?.type);
      const quanity = isAdeeqah
        ? parseInt(item?.riceQuantity)
        : parseInt(item?.quantity);
      if (isAdeeqah) {
        total =
          parseInt(item?.ricePrice) * quanity +
          parseInt(item?.donationItemPrice);
      }
      return (
        <tr key={index}>
          <td className="px-2 py-4 border-b md:px-4 md:py-6 border-neutral-300">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-5 shrink-0 text-neutral-600">
                <button onClick={() => handleRemoveBasketItems(item)}>
                  <TrashIcon />
                </button>
              </div>
              <div className="flex items-center w-full gap-3 md:w-auto">
                <div className="w-[66px] h-[55px] sm:w-[90px] sm:h-[72px] overflow-hidden rounded-lg shrink-0">
                  <div className="relative w-[66px] h-[55px] sm:w-[90px] sm:h-[72px] overflow-hidden rounded-lg shrink-0 rounded-lg">
                    <img
                      src={item?.coverImage || "/images/banner/projects/1.jpg"}
                      alt=""
                      className="object-cover w-full h-full rounded-lg"
                    />
                    {item.isRecurring ? (
                      <div className="absolute bottom-0 left-0 flex justify-center w-full text-xs bg-primary-200">
                        {parseInt(item.periodDays) === 7
                          ? "Weekly"
                          : parseInt(item.periodDays) === 30
                          ? "Monthly"
                          : parseInt(item.periodDays) === 1
                          ? "Daily"
                          : parseInt(item.periodDays) === 10
                          ? "10 Days"
                          : parseInt(item.periodDays) === 365
                          ? "Yearly"
                          : ``}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full gap-3 md:w-auto">
                  <div className="max-w-[250px] line-clamp-1 text-sm md:text-lg">
                    {item?.name}
                  </div>
                  {/* // */}

                  <div className="flex justify-between w-full md:w-auto">
                    {isAdeeqah && (
                      <div className="flex flex-row flex-wrap gap-2">
                        <div className="bg-primary-100 flex flex-row line-clamp-1 gap-2 items-center text-xs text-primary-300 rounded px-2 py-1.5">
                          {item?.donationItem === "COW" ? (
                            <CowIcon />
                          ) : (
                            <GoatIcon />
                          )}
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
                            <span className="hidden sm:flex"> Rice </span>{" "}
                            {quanity}KG <span></span>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="text-xs font-bold md:font-medium md:hidden">
                      {currencyConfig.label + total?.toLocaleString()}
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </td>
          <td className="px-2 py-4 text-center border-b  md:p-4 border-neutral-300">
            {isCommonORZaqat ? (
              <>
                <input
                  className="w-4/6 p-0 text-center h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  value={total}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <div>
                  {total == 0 ? (
                    <span className="text-red-300">Invalid Amount</span>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              currencyConfig.label + total?.toLocaleString()
            )}
            {/* ${(item?.amount ?? item?.total)?.toLocaleString()} */}
          </td>
          <td className="hidden px-2 py-4 border-b md:table-cell md:p-4 border-neutral-300">
            <div className="custom-number-input form-group">
              <label for="custom-input-number" className="sr-only">
                Counter Input
              </label>
              {/* <div className="relative flex flex-row w-full bg-transparent rounded-lg"> */}
              {!isFieldEditable
                ? !isCommonORZaqat && (
                    <div className="flex justify-center">
                      {!isAdeeqah ? (
                        <>
                          <button
                            data-action="decrement"
                            className="flex items-center justify-center w-8 h-8 border border-r-0 rounded-l-lg border-neutral-300"
                            onClick={() => handleQuantityChange(index, "sub")}
                          >
                            <span className="">
                              <MinusIcon />
                            </span>
                          </button>
                          <input
                            type="number"
                            className="border !rounded-none w-11 h-8 form-control !text-heading-7 !text-neutral-1000 !p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            name="custom-input-number"
                            value={quanity}
                          />
                          <button
                            data-action="increment"
                            className="flex items-center justify-center w-8 h-8 border border-l-0 rounded-r-lg border-neutral-300"
                            onClick={() => handleQuantityChange(index, "add")}
                          >
                            <span className="">
                              <PlusIcon />
                            </span>
                          </button>
                        </>
                      ) : (
                        quanity
                      )}
                    </div>
                  )
                : ""}
            </div>
          </td>
          <td className="hidden px-2 py-4 text-center border-b md:p-4 md:table-cell border-neutral-300 text-button-lg">
            {currencyConfig.label + formatPrice(total)}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={"4"}>
        <NoDataFound
          title={"No Data Found"}
          desctiption={"No items available in the basket"}
        />
      </td>
    </tr>
  );

  return (
    <div>
      <PageHead title={"Basket"} />

      <div className="py-7.5 md:py-15">
        <section aria-label="Basket">
          <div className="container">
            <div className="mb-5 md:mb-15">
              <StepperBasket />
            </div>
            <div className="grid-cols-1 gap-10 md:grid md:grid-cols-12 mb-7.5 sm:mb-[90px]">
              <div className="md:col-span-8 rounded-xl">
                <div className="px-4 py-7.5 sm:p-7.5 border border-neutral-300 rounded-2xl overflow-auto">
                  <table className="w-full table-auto">
                    <thead className="text-sm text-left bg-neutral-200 text-neutral-600">
                      <tr>
                        <th className="p-4 font-medium text-center rounded-l-md">
                          Donation Type
                        </th>
                        <th className="p-4 font-medium text-center ">Amount</th>
                        <th className="hidden p-4 font-medium text-center md:table-cell rounded-r-md md:rounded-none">
                          Quantity
                        </th>
                        <th className="hidden p-4 font-medium text-center md:table-cell md:rounded-r-md">
                          Subtotal
                        </th>
                      </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                  </table>
                </div>
              </div>
              <div className="mt-10 md:col-span-4 md:mt-0">
                <DonationTotal onNext={() => navigate("/checkout")} />
              </div>
            </div>
          </div>
        </section>
        <IntrestedProjects />
      </div>
    </div>
  );
};

export default React.memo(Basket);
