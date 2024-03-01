import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, CloseIcon, SearchIcon } from "../../theme/svg-icons";

import { MenuData } from "../../utils/constants";
import Button from "../Button";
import { Disclosure, Transition } from "@headlessui/react";
import { useQuickDonation } from "../../features/quickDonation";
import Img from "../../components/Image";
import { getCategories } from "../../features/projects/projectSlice";

export const Sidebar = ({ isSidebar, setSidebar }) => {
  const quickDonation = useQuickDonation();
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.projects.categories);
  const handleDonateAction = () => {
    setSidebar(true);
    quickDonation();
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40  h-screen ${isSidebar && ""}`}
      aria-label="Sidebar"
    >
      <div
        className={
          !isSidebar
            ? "fixed inset-0 transition-opacity bg-opacity-30 bg-neutral-1000"
            : ""
        }
      >
        <div
          className={
            !isSidebar
              ? "fixed top-0 left-0 z-40 w-full h-screen max-w-xs transition-transform"
              : ""
          }
        >
          <Transition
            appear={true}
            show={!isSidebar}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="h-screen px-5 py-7.5 overflow-y-auto bg-neutral-100 min-w-[16.875rem]">
              <div className="flex items-center justify-between mb-4">
                <Link to="/" onClick={() => setSidebar(true)}>
                  <Img
                    src={"/images/assets/logo.svg"}
                    className="w-25 h-12"
                    alt="Al-Ihsan Foundation"
                  />
                </Link>
                <div className="cursor-pointer">
                  <CloseIcon iconSize={24} onClick={() => setSidebar(true)} />
                </div>
              </div>
              <div className="my-4 form-group">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                    <SearchIcon />
                  </span>
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        setSidebar(true);
                        navigate("/projects", {
                          state: { search: search },
                        });
                        setSearch("");
                      }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9"
                    placeholder="Search for a campaign"
                    type="text"
                    name="search"
                  />
                  <Button
                    name="search"
                    className="absolute inset-y-0 right-0 flex items-center !p-2 rounded-lg !rounded-tl-none !rounded-bl-none text-primary-300 bg-accent-300"
                    rightIcon={<SearchIcon />}
                    onClick={(e) => {
                      setSidebar(true);
                      navigate("/projects", {
                        state: { search: search },
                      });
                      setSearch("");
                    }}
                  />
                </label>
              </div>
              <div className="flex flex-col gap-7.5">
                <ul className="flex flex-col gap-7.5 font-medium">
                  {MenuData.map((menu, i) =>
                    menu.to ? (
                      <li key={i} className="focus:bg-yellow-200">
                        <Link
                          onClick={() => setSidebar(true)}
                          to={menu.to}
                          className="flex items-center font-bold group"
                        >
                          <span>{menu.label}</span>
                        </Link>
                      </li>
                    ) : (
                      <li key={i}>
                        <Disclosure as="div">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className={"w-full"}>
                                <div className="flex items-center justify-between w-full focus:bg-yellow-200">
                                  <span className="flex items-center justify-between font-bold group">
                                    {menu.label}
                                  </span>
                                  <span
                                    className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                      open ? "rotate-180 transform " : ""
                                    }`}
                                  >
                                    <ChevronDownIcon iconSize={20} />
                                  </span>
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="flex flex-col gap-3 mt-3">
                                {menu.menu === "campaigns"
                                  ? categories.map((item) => (
                                      <Link
                                        to="/projects"
                                        state={{ category: item.id }}
                                        className="p-2 "
                                        key={item.id}
                                        onClick={() => setSidebar(true)}
                                      >
                                        <span className="w-full grow-1">
                                          {item.name}
                                        </span>
                                      </Link>
                                    ))
                                  : menu.subMenu.map((item, i) => (
                                      <Link
                                        to={item.to}
                                        className="p-2"
                                        key={i}
                                        onClick={() => setSidebar(true)}
                                      >
                                        <span className="w-full grow-1">
                                          {item.title}
                                        </span>
                                      </Link>
                                    ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </li>
                    )
                  )}
                  <li>
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className={"w-full"}>
                            <Link
                              to="#"
                              className="flex items-center justify-between w-full focus:bg-yellow-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 overflow-hidden rounded-full">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_COUNTRY_URL
                                    }AU.svg`}
                                    className="object-cover w-full h-full"
                                    alt="US flag"
                                  />
                                </div>
                                <span className="flex items-center justify-between font-medium group">
                                  Australia
                                </span>
                              </div>
                            </Link>
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col gap-3 mt-3">
                            <Link to="" className="p-2">
                              <span className="w-full grow-1">Support 1</span>
                            </Link>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                </ul>
                <Button
                  variant="primaryFull"
                  label="Donate Now"
                  onClick={handleDonateAction}
                />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </aside>
  );
};
