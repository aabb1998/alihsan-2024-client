import React, { useState, useEffect, Fragment } from "react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  CowIcon,
  GoatIcon,
  RiceIcon,
} from "../../theme/svg-icons";
import AccountMenu from "../../pages/Include/UserMenu";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  getBasketItems,
  removeBasketItem,
  addBasket,
  toggleBasket,
  updateBasketItem,
  editBasket,
} from "../../features/basket/basketSlice";
import { Transition } from "@headlessui/react";
import Img from "../../components/Image/index";
import { currencyConfig } from "../../utils/constants";

const HeaderTop = ({
  modalOptions,
  setModalOptions,
  onSearch,
  searchState,
  onSearchEnter,
}) => {
  const [toggle, setToggle] = useState(false);

  const { basketItems, isBasketOpen } = useSelector(
    (state) => state.basketItem
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = localStorage.getItem("loggedIn")
    ? localStorage.getItem("loggedIn")
    : sessionStorage.getItem("loggedIn");

  const handleClick = () => {
    dispatch(toggleBasket());
    navigate("/basket");
  };

  const handleBasket = () => {
    dispatch(toggleBasket());
  };

  const getAllBasketItems = async () => {
    await dispatch(getBasketItems());
  };

  const handleRemoveBasketItems = async (item) => {
    await dispatch(removeBasketItem({ campaignId: item.campaignId }));
    const remainingItems = basketItems?.filter(
      (each, index) => each.campaignId !== item.campaignId
    );
    dispatch(addBasket(remainingItems));
    localStorage.setItem("checkout", JSON.stringify(remainingItems));
  };

  const handleInputChange = (index, event) => {
    const newValues = [...basketItems];

    const input =
      event.target.value === "" || event.target.value === "0"
        ? 1
        : event.target.value.replace(/[^0-9]/g, "");
    const number = parseInt(input) ? input : 1;

    newValues[index] = {
      ...newValues[index],
      amount: number,
      total: number,
    };
    dispatch(addBasket(newValues));
    localStorage.setItem("checkout", JSON.stringify(newValues));
  };

  const handleEdit = (index) => {
    const newValues = [...basketItems]; // Create a new array
    newValues[index] = {
      ...newValues[index],
      isEdit: true,
    };
    dispatch(addBasket(newValues));
    localStorage.setItem("checkout", JSON.stringify(newValues));
  };

  const handleQuantityChange = (index, action) => {
    const newValues = [...basketItems];
    const item = newValues[index];
    const checkoutType = item.checkoutType ?? item?.Campaign?.checkoutType;
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

  const handleItemSave = (item, index) => {
    setToggle(false);
    const newValue = {
      ...item,
      amount: parseInt(item.amount, 10),
      periodDays: parseInt(item.periodDays, 10),
      isRecurring: Boolean(item.isRecurring),
      isEdit: false,
    };

    dispatch(editBasket({ index, newValue }));

    dispatch(updateBasketItem(newValue));
  };
  useEffect(() => {
    getAllBasketItems();
  }, [dispatch]);

  return (
    <div className="border-b border-b-neutral-300">
      <div className="container justify-between hidden !py-2 md:flex">
        <div className="flex items-center gap-2 text-neutral-800">
          <div className="w-4 h-4 overflow-hidden rounded-full">
            <Img
              src={`${process.env.REACT_APP_COUNTRY_URL}AU.svg`}
              className="object-cover w-full h-full"
              alt="US flag"
            />{" "}
          </div>
          Australia
        </div>
        <div className="flex gap-7.5">
          <div
            className={
              "form-group relative" +
              (modalOptions?.type === "search" ? " z-40" : "")
            }
          >
            <label className="relative block w-113 !mb-0">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                <SearchIcon />
              </span>
              <input
                onFocus={() => setModalOptions({ type: "search" })}
                onChange={(e) => onSearch(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && onSearchEnter()}
                value={searchState?.text}
                className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9"
                placeholder="Search"
                type="text"
                name="search"
                autoComplete="off"
              />
            </label>
            <div
              className={
                "hidden absolute mt-2 w-full rounded-lg rounded-tl-none rounded-tr-none bg-white shadow-card " +
                (modalOptions?.type === "search" && searchState?.text.length > 0
                  ? " md:block z-40"
                  : "")
              }
            >
              {searchState?.loading ? (
                <div className="p-2 text-button-md text-neutral-600">
                  Loading...
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col">
                <div className="overflow-auto max-h-80 shadow-card">
                  {searchState?.results.length > 0 ? (
                    <>
                      {searchState.results?.map((result) => (
                        <div
                          className="flex items-center gap-3 p-3 cursor-pointer"
                          key={result.id}
                          onClick={() => {
                            navigate("/project/" + result.slug);
                            setModalOptions(null);
                          }}
                        >
                          <div className="w-12 h-16 overflow-hidden rounded-lg min-w-fit max-w-[4rem] max-h-[3rem]">
                            <Img
                              src={result.coverImage}
                              className="object-cover w-full h-full max-w-[4rem]"
                              alt="campaign"
                            />
                          </div>
                          <div className="">
                            <div className="mb-1 text-button-lg text-primary-300 line-clamp-1">
                              {result.name}
                            </div>
                            <div className="text-sm text-neutral-500 line-clamp-2">
                              {result.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    !searchState?.loading &&
                    searchState?.text.length > 0 && (
                      <div className="p-2 text-button-md text-neutral-600">
                        No Data Found
                      </div>
                    )
                  )}
                </div>
                <div
                  className="w-full p-3 bg-white rounded-lg rounded-tl-none rounded-tr-none"
                  onClick={() => {
                    onSearch("");
                    setModalOptions(null);
                    navigate("/projects");
                  }}
                >
                  <Button
                    label="See All"
                    className={"btn btn-primary w-full"}
                  />
                </div>
              </div>
            </div>
          </div>

          {userData && JSON.parse(userData).isloggedIn === true ? (
            <AccountMenu />
          ) : (
            <Link to="/login" className="flex items-center gap-2">
              <UserIcon iconSize={20} />
              <span className="text-sm text-neutral-800">Login</span>
            </Link>
          )}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBasket}
          >
            <div className="relative">
              {basketItems.length > 0 && (
                <div className="-top-1.5 -right-2 absolute ">
                  <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-300 text-[11px] text-white">
                    {basketItems?.length ? basketItems?.length : ""}
                  </p>
                </div>
              )}
              <ShoppingCartIcon iconSize={20} />
            </div>
            <span className="text-sm text-neutral-800">Basket</span>
          </div>
        </div>
      </div>
      {/* sidebar */}
      <aside
        className={`relative z-10 ${!isBasketOpen && ""}`}
        aria-label="Sidebar"
      >
        <div
          className={`${
            isBasketOpen &&
            "fixed inset-0 h-screen  bg-opacity-30 overflow-hidden bg-neutral-1000"
          } `}
        >
          <div
            className={`${
              isBasketOpen &&
              "fixed inset-0 z-10 h-screen w-screen overflow-hidden bg-neutral-1000/40"
            }`}
          >
            <Transition
              appear={true}
              show={isBasketOpen}
              // enter="transition ease-in-out duration-300 transform"
              // enterFrom="translate-x-full"
              // enterTo="translate-x-0"
              // leave="transition ease-in-out duration-300 transform"
              // leaveFrom="translate-x-0"
              // leaveTo="translate-x-full"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col z-50 min-w-xs max-w-xs justify-between h-screen p-4 sm:p-5 bg-neutral-100 sm:w-[25.875rem] sm:min-w-[25.875rem] fixed right-0">
                {/* title */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b sm:pb-5 border-neutral-300">
                  <span className="font-bold text-md sm:text-heading-7">
                    My Basket
                  </span>
                  <span className="cursor-pointer" onClick={handleBasket}>
                    <CloseIcon iconSize={24} strokeWidth={1.5} />
                  </span>
                </div>
                {/* cart */}
                {basketItems?.length ? (
                  <>
                    <div className="flex flex-col h-full gap-5 overflow-scroll sm:gap-6">
                      {basketItems?.map((item, index) => (
                        <BasketItem
                          key={item?.campaignId}
                          index={index}
                          item={item}
                          handleInputChange={handleInputChange}
                          handleRemoveBasketItems={handleRemoveBasketItems}
                          handleQuantityChange={handleQuantityChange}
                          handleItemSave={handleItemSave}
                          toggle={toggle}
                          setToggle={(e) => setToggle(e)}
                          handleEdit={handleEdit}
                        />
                      ))}
                    </div>
                    <BasketTotal
                      items={basketItems}
                      handleClick={handleClick}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full overflow-hidden">
                    <Img
                      src={"./images/illustration/empty-cart.svg"}
                      alt="empty cart"
                    />
                  </div>
                )}
              </div>
            </Transition>
          </div>
        </div>
      </aside>
    </div>
  );
};

const BasketItem = ({
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
    : parseInt(item?.total);

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
              {item.isRecurring ? (
                <div className="absolute bottom-0 left-0 flex justify-center w-full text-xs bg-primary-200">
                  {parseInt(item.periodDays) === 7
                    ? "Weekly"
                    : parseInt(item.periodDays) === 30
                    ? "Monthly"
                    : `Yearly`}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm text-primary-400 line-clamp-1 sm:text-md">
                {item?.name}
              </div>
              <p className="my-1 text-xs line-clamp-1 text-neutral-600 sm:text-sm sm:my-0">
                {checkoutType === "COMMON" ? "General Campaign" : checkoutType}
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
                <div className="relative flex flex-row w-auto h-10 bg-transparent rounded-lg">
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
                  placeholder={currencyConfig.label + "100"}
                  value={total}
                  min={0}
                  onInput={(event) => handleInputChange(index, event)}
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
                  placeholder={currencyConfig.label + "100"}
                  value={total}
                  readOnly={toggle}
                />
              </div>
            </div>
          )}
          <div className="flex">
            <div className="font-bold text-md sm:text-heading-7">
              {isCommonORZaqat ? (
                currencyConfig.label + total?.toLocaleString()
              ) : isAdeeqah ? (
                <>{currencyConfig.label + total?.toLocaleString()}</>
              ) : (
                <>
                  <span className="font-medium text-md font-Montserrat text-neutral-500">
                    {quantity + " x "}
                  </span>
                  {currencyConfig.label + price?.toLocaleString()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BasketTotal = ({ items, handleClick }) => {
  const { settings } = useSelector((state) => state.mapCountries);
  const processingFee = settings?.processingFee / 100 || 0;

  let totalPoints = items.reduce(
    (accumulator, { total, quantity = 1, amount, checkoutType }) => {
      const value = amount ?? total;

      if (checkoutType === "ADEEQAH_GENERAL_SACRIFICE") {
        return accumulator + total;
      }
      return accumulator + parseInt(value * quantity);
    },
    0
  );

  const processingAmount = ((totalPoints * processingFee) / 100).toFixed(2);

  return (
    <>
      {totalPoints > 0 && (
        <div className="mb-8 sm:mb-10">
          <div className="flex justify-between text-md sm:text-heading-7">
            <div className="font-medium sm:font-bold">Subtotal</div>
            <div className="font-medium sm:font-bold">
              {currencyConfig.label}
              {totalPoints?.toLocaleString()}
            </div>
          </div>
          <div className="h-px my-3 sm:my-5 bg-neutral-300"></div>
          <div className="flex justify-between text-md sm:text-heading-7">
            <div className="font-medium sm:font-bold">Processing Fee</div>
            <div className="font-medium sm:font-bold">
              {currencyConfig.label}
              {processingAmount}
            </div>
          </div>
          <div className="h-px my-3 sm:my-5 bg-neutral-300"></div>
          <div className="flex justify-between text-md sm:text-heading-6">
            <div className="font-bold">Total</div>
            <div className="font-bold">
              {currencyConfig.label}
              {parseFloat(totalPoints) + parseFloat(processingAmount)}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <Button
          variant="secondaryOutline"
          onClick={handleClick}
          label="View Cart"
          disabled={!items?.length}
        />
        <Button
          variant="primaryFull"
          onClick={handleClick}
          label="Checkout"
          disabled={!items?.length}
        />
      </div>
    </>
  );
};

export default HeaderTop;
// HeaderTop.propTypes = {
//   searchState: { text: "" },
// };
