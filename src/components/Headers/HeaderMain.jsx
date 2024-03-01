import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  MenuIcon,
  HeartFilledIcon,
} from "../../theme/svg-icons";
import { toggleBasket } from "../../features/basket/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "../../pages/Include/UserMenu";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { getSettings } from "../../features/home/homeSlice";
import { MenuData } from "../../utils/constants";
import { useQuickDonation } from "../../features/quickDonation";
import { HeaderModal } from "../HeaderModal";
import ModalItems from "./ModalItems";
import { Tooltip } from "react-tooltip";

const HeaderMain = ({ isSidebar, setSidebar }) => {
  const navigate = useNavigate();
  const quickDonation = useQuickDonation();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { basketItems } = useSelector((state) => state.basketItem);

  const [headerModal, setHeaderModal] = useState({
    isOpen: false,
    children: null,
  });

  const dispatch = useDispatch();

  const handleBasket = () => dispatch(toggleBasket());

  const handleClick = () => {
    setHeaderModal({
      ...headerModal,
      isOpen: false,
    });
  };

  const handleToggle = (index) => {
    const selectedItem = MenuData[index] || {};

    setSelectedIndex(!headerModal?.isOpen ? index : -1);
    if (selectedItem?.subMenu?.length || selectedItem?.menu === "campaigns") {
      setHeaderModal({
        ...headerModal,
        // isOpen: !headerModal?.isOpen,
        isOpen: true,
        children: (
          <ModalItems selectedItem={selectedItem} handleClick={handleClick} />
        ),
      });
    } else {
      setHeaderModal({
        ...headerModal,
        isOpen: false,
        children: null,
      });
      navigate(selectedItem?.to);
    }
  };

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <div className=" bg-neutral-200">
      <div
        className={`hidden${
          headerModal?.isOpen ? " md:block" : ""
        } absolute top-0 bottom-0 left-0 right-0 z-0 `}
        onClick={() =>
          setHeaderModal({
            ...headerModal,
            isOpen: false,
          })
        }
      ></div>
      <div
        onMouseLeave={() => {
          setHeaderModal({
            ...headerModal,
            isOpen: false,
          });
        }}
      >
        <HeaderModal
          children={headerModal?.children}
          show={headerModal?.isOpen}
        />
      </div>
      <div className="container flex items-center justify-between !py-6 md:!py-3 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center md:hidden">
            <button
              data-drawer-target="separator-sidebar"
              data-drawer-toggle="separator-sidebar"
              aria-controls="separator-sidebar"
              type="button"
              className=""
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon iconSize={24} onClick={() => setSidebar(!isSidebar)} />
            </button>
          </div>
          <div>
            <Link to="/">
              <img
                src="/images/assets/logo.svg"
                className="w-auto h-12"
                alt="Al-Ihsan Foundation"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center md:gap-3 lg:gap-10 ">
          <nav className="hidden text-sm font-bold md:block">
            <ul className="flex gap-5 lg:gap-10">
              {MenuData.map((item, index) => (
                <li
                  key={index}
                  onMouseOver={(e) => {
                    e.preventDefault();
                    if (item.menu) {
                      handleToggle(index);
                    } else {
                      setHeaderModal({
                        ...headerModal,
                        isOpen: false,
                        children: null,
                      });
                    }
                  }}
                >
                  <Link
                    to={item.to || `/`}
                    data-tooltip-id={"megamenu-tooltip"}
                    className={
                      item.menu ? "flex items-center gap-1 lg:gap-1.5 " : ""
                    }
                  >
                    {item.label}
                    {/* {item.menu ? <span className={index === selectedIndex ? "rotate-180" : ""}><ChevronDownIcon iconSize={16} /> </span> : ""} */}
                    {item.menu ? (
                      <span className={""}>
                        <ChevronDownIcon iconSize={16} />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <div className="flex justify-between gap-5 md:hidden">
              <div className="relative">
                {basketItems.length > 0 && (
                  <div className="-top-1.5 -right-2 absolute cursor-default" onClick={handleBasket}>
                    <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-300 text-[11px] text-white">
                      {basketItems?.length ? basketItems?.length : ""}
                    </p>
                  </div>
                )}
                <ShoppingCartIcon onClick={handleBasket} />
              </div>
              <AccountMenu />
            </div>
            <div className="hidden md:block">
              <Button
                label="Donate Now"
                className={"text-sm"}
                onClick={() => quickDonation()}
                leftIcon={
                  <span className="relative flex">
                    {" "}
                    <span className="absolute inline-flex w-full h-full transition-all ease-in-out delay-75 bg-red-300 rounded-full animate-ping bg-sky-400 opacity-90"></span>{" "}
                    <div className="text-red-300 rounded-full ">
                      {" "}
                      <HeartFilledIcon />{" "}
                    </div>{" "}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
