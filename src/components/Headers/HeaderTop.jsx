import React, { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  CloseIcon,
} from "../../theme/svg-icons";
import AccountMenu from "../../pages/Include/UserMenu";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  getBasketItems,
  removeBasketItem,
  addBasket,
  toggleBasket,
  updateBasketItem,
  editBasket,
} from "../../features/basket/basketSlice";
import Img from "../Image/index";
import { getProjectsApi } from "../../features/projects/projectsApi";
import { BasketItem } from "./BasketItem";
import { BasketTotal } from "./BasketTotal";
import { SideDrawer } from "../Drawer";

const HeaderTop = () => {
  const [modalOptions, setModalOptions] = useState(null);
  const [toggle, setToggle] = useState(false);
  const searchTimer = useRef(null);
  const [searchState, setSearchState] = useState({
    loading: false,
    text: "",
    results: [],
  });

  const { basketItems, isBasketOpen } = useSelector(
    (state) => state.basketItem
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.profile.auth);
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
    const updatedBasket = [...basketItems];
    const inputValue = event.target.value.trim();
    const number =
      inputValue === "" || inputValue === "0" ? "" : inputValue || "";

    updatedBasket[index] = {
      ...updatedBasket[index],
      amount: number,
      total: number,
    };

    dispatch(addBasket(updatedBasket));
    localStorage.setItem("checkout", JSON.stringify(updatedBasket));
  };

  const handleEdit = (index) => {
    const newValues = [...basketItems];
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
      amount: parseFloat(item.amount, 10),
      periodDays: parseInt(item.periodDays, 10),
      isRecurring: Boolean(item.isRecurring),
      isEdit: false,
    };

    dispatch(editBasket({ index, newValue }));

    dispatch(updateBasketItem(newValue));
  };

  const onSearch = (text) => {
    setSearchState((s) => ({ ...s, text, loading: true }));
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      searchTimer.current = null;
      const result = await getProjectsApi({ search: text, page: 1, limit: 10 });
      setSearchState((s) => {
        if (s.text !== text) return s;
        else return { text, loading: false, results: result.projects.rows };
      });
    }, 600);
  };

  const onSearchEnter = () => {
    setModalOptions(null);
    clearTimeout(searchTimer.current);
    setSearchState({ text: "", loading: false, results: [] });
    navigate("/projects", { state: { search: searchState.text } });
  };

  useEffect(() => {
    getAllBasketItems();
    //eslint-disable-next-line
  }, []);

  const SideDrawerComponent = () => {
    return (
      <>
        <div className="flex-1" onClick={handleBasket} />
        <div className="flex flex-col z-50 min-w-xs max-w-xs justify-between h-full p-4 sm:p-5 bg-neutral-100 sm:w-[25.875rem] sm:min-w-[25.875rem] fixed right-0">
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
              <BasketTotal items={basketItems} handleClick={handleClick} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full overflow-hidden">
              <img
                src="./images/illustration/empty-cart.svg"
                alt="empty cart"
              />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="border-b border-b-neutral-300">
      <div className="container justify-between hidden !py-2 md:flex">
        <div className="flex items-center gap-2 text-neutral-800">
          <div className="w-4 h-4 overflow-hidden rounded-full">
            <Img
              src={`${import.meta.env.VITE_APP_COUNTRY_URL}AU.svg`}
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
              (modalOptions?.type === "search" ? " z-1" : "")
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
                placeholder="Search for a campaign"
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
                          className="flex gap-3 p-3 cursor-pointer"
                          key={result.id}
                          onClick={() => {
                            navigate("/project/" + result.slug);
                            setModalOptions(null);
                          }}
                        >
                          <div className="w-8 h-16 overflow-hidden rounded-lg min-w-fit">
                            <img
                              src={result.coverImage}
                              className="object-cover w-full h-full"
                              alt="campaign"
                            />
                          </div>
                          <div className="">
                            <div className="mb-1 text-button-lg text-primary-300 line-clamp-1">
                              {result.name}
                            </div>
                            <div className="text-sm text-neutral-500 line-clamp-2">
                              {result.descriptionText || result.description}
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

          {userData && userData.role === "USER" ? (
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

      <SideDrawer
        open={isBasketOpen}
        handleClose={handleBasket}
        children={<SideDrawerComponent />}
      />
    </div>
  );
};

export default HeaderTop;
