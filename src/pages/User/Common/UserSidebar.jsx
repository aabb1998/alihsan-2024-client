import React from "react";
import {
  ChevronDownIcon,
  CreditCardIcon,
  DollarSignIcon,
  UserIcon,
} from "../../../theme/svg-icons";
import { Link, useLocation } from "react-router-dom";

import { Disclosure } from "@headlessui/react";

export const UserSidebar = () => {
  return (
    <div>
      <SidebarAccordionMenu />
    </div>
  );
};

export default function SidebarAccordionMenu() {
  const { pathname } = useLocation();
  const defaultButtonStyle =
      "text-neutral-600 hover:bg-accent-300 focus-within:bg-accent-300 hover:text-primary-300 text-button-md py-[13px]",
    selectedButtonStyle =
      "text-primary-300 bg-accent-300 text-button-md py-[13px]",
    defaultSubButtonStyle =
      "text-neutral-600 hover:text-accent-400 hover:bg-accent-100",
    selectedSubButtonStyle = "text-accent-400 bg-accent-100";
  return (
    <div>
      <div className="">
        <Disclosure
          defaultOpen={
            pathname === "/onetime-donations" ||
            pathname === "/recurring-donations"
          }
        >
          {({ open }) => (
            <>
              <div className="sticky flex flex-col gap-5 top-15">
                <Link
                  to="/profile"
                  className={
                    "btn " +
                    (pathname === "/profile"
                      ? selectedButtonStyle
                      : defaultButtonStyle)
                  }
                >
                  <div className="w-5 h-5">
                    <UserIcon strokeWidth={3} />
                  </div>
                  <span className="w-full grow-1">Profile</span>
                </Link>
                <Disclosure.Button>
                  <a
                    to="#"
                    className={
                      "btn " +
                      (pathname === "/onetime-donations" ||
                      pathname === "/recurring-donations"
                        ? selectedButtonStyle
                        : defaultButtonStyle)
                    }
                  >
                    <div className="w-5 h-5">
                      <DollarSignIcon strokeWidth={2} />
                    </div>
                    <span className="w-full text-left grow-1">
                      My Donations
                    </span>
                    <span
                      className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                        open ? "rotate-180 transform " : ""
                      }`}
                    >
                      <ChevronDownIcon iconSize={20} />
                    </span>
                  </a>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-col">
                  <Link
                    to="/recurring-donations"
                    className={
                      "btn text-button-md py-[13px] " +
                      (pathname === "/recurring-donations"
                        ? selectedSubButtonStyle
                        : defaultSubButtonStyle)
                    }
                  >
                    <div className="w-5 h-5"></div>
                    <span className="w-full grow-1">Recurring</span>
                  </Link>
                  <Link
                    to="/onetime-donations"
                    className={
                      "btn text-button-md py-[13px] " +
                      (pathname === "/onetime-donations"
                        ? selectedSubButtonStyle
                        : defaultSubButtonStyle)
                    }
                  >
                    <div className="w-5 h-5"></div>
                    <span className="w-full grow-1">One time</span>
                  </Link>
                </Disclosure.Panel>

                <Link
                  to="/payment-details"
                  className={
                    "btn " +
                    (pathname === "/payment-details"
                      ? selectedButtonStyle
                      : defaultButtonStyle)
                  }
                  //className="btn text-neutral-600 hover:bg-accent-300 hover:text-primary-300 text-button-md py-[13px]"
                >
                  <div className="w-5 h-5">
                    <CreditCardIcon strokeWidth={2} />
                  </div>
                  <span className="w-full grow-1">Payment Details</span>
                </Link>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
