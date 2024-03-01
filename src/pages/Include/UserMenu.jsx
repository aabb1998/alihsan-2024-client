import React, { Fragment, useRef } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CreditCardIcon,
  DollarSignIcon,
  LogoutIcon,
  UserIcon,
} from "../../theme/svg-icons";
import { logOut } from "./logoutApi";
import { SnackMessages } from "../../components/Toast";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { emptyBasket } from "../../features/basket/basketSlice";
import { logout } from "../../features/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AccountMenu() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userData = useSelector(state => state.profile.auth);

  const logoutUser = async (e) => {
    try {
      const response = await logOut();
      if (response.status === 200) {
        localStorage.removeItem("loggedIn");
        sessionStorage.removeItem("loggedIn");
        localStorage.removeItem("checkout");
        showSuccessMessage(response.data);
        dispatch(logout());
        dispatch(emptyBasket());
        navigate("/");
      } else {
        showErrorMessage(response.error);
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center gap-2" ref={buttonRef}>
            <UserIcon iconSize={20} />
            <span className="hidden text-sm text-neutral-800 md:block">
              Account
            </span>
            <div className="hidden md:block">
              <ChevronDownIcon iconSize={16} />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-40 flex flex-col w-56 p-2 mt-4 origin-top-right bg-white rounded-md shadow">
            {({ close }) =>
              userData ? (
                <>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/profile`}
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } ${
                            pathname === "/profile" && "bg-accent-300"
                          } group flex w-full items-center rounded-md p-3 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300 hover:bg-accent-300`}
                        >
                          <UserIcon iconSize={20} strokeWidth={2} />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className="flex flex-between rounded-md w-full items-center p-3 hover:!text-primary-300 hover:bg-accent-300"
                            onClick={close}
                          >
                            <div className="mr-4 text-neutral-600">
                              <DollarSignIcon iconSize={20} strokeWidth={1.5} />
                            </div>
                            <span
                              className={
                                (open
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900") +
                                " group flex w-full items-center rounded-md text-sm gap-4 text-button-md !text-neutral-600"
                              }
                            >
                              {" "}
                              My Donations
                            </span>
                            <div
                              className={
                                (open ? "" : "rotate-180 transform") +
                                " h-5 w-5 text-neutral-600"
                              }
                            >
                              <ChevronUpIcon />
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="">
                            <Link
                              to="/recurring-donations"
                              onClick={() => buttonRef.current.click()}
                              className={`${
                                pathname === "/recurring-donations"
                                  ? "bg-accent-300 bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center mt-2.5 rounded-md py-3 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300 hover:bg-accent-300`}
                            >
                              <span className="w-full px-12 rounded-md grow-1 text-ellipsis">
                                Recurring
                              </span>
                            </Link>
                            <Link
                              to="/onetime-donations"
                              onClick={() => buttonRef.current.click()}
                              className={`${
                                pathname === "/onetime-donations"
                                  ? "bg-accent-300 bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center mt-2.5 rounded-md py-3 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300 hover:bg-accent-300`}
                            >
                              <span className="w-full px-12 rounded-md grow-1 text-ellipsis">
                                One time
                              </span>
                            </Link>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } ${
                            pathname === "/payment-details" && "bg-accent-300"
                          } group flex w-full items-center rounded-md p-3 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300 whitespace-nowrap hover:bg-accent-300`}
                          onClick={() => navigate("/payment-details")}
                        >
                          <CreditCardIcon iconSize={20} strokeWidth={1.5} />
                          Payment Details
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md p-3 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300 hover:bg-accent-300`}
                          onClick={logoutUser}
                        >
                          <LogoutIcon iconSize={20} strokeWidth={1.5} />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </>
              ) : (
                <div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/login`}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-4 text-button-md !text-neutral-600 hover:!text-primary-300`}
                      >
                        <LogoutIcon iconSize={20} strokeWidth={1.5} />
                        Login
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              )
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
