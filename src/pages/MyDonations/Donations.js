import React, { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { UserSidebar } from "../User/Common/UserSidebar";
import { FilterIcon, SearchIcon, SortIcon } from "../../theme/svg-icons";
import { Pagination } from "../../features/projects/Pagination";
import { OneTimeItem } from "../../features/myDonation/OneTimeItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyDonations } from "../../features/myDonation/myDonationSlice";
import { RecurringItem } from "../../features/myDonation/RecurringItem";
import { MyDonationTypes } from "../../utils/constants";
import { ModalLoader, LoaderIcon } from "../../theme/svg-icons";
import { Dropdown } from "../../components/Dropdown";

const sortList = [
  { label: "Date (Last to First)", value: "date-r" },
  { label: "Date (First to Last)", value: "date" },
  { label: "Name (A-Z)", value: "name" },
  { label: "Name (Z-A)", value: "name-r" },
  { label: "Amount (Highest to Lowest)", value: "total-r" },
  { label: "Amount (Lowest to Highest)", value: "total" },
];

export const Donations = ({
  type,
  isOpen,
  toggleModal,
  handleCancel,
  handleViewDetails,
}) => {
  const dispatch = useDispatch();
  const donations = useSelector((state) => {
    return state.myDonations[type];
  });
  const [filters, setFilters] = useState({ search: "", sort: "date-r" });

  const changeFilters = (obj) => setFilters((f) => ({ ...f, ...obj }));
  const loadDonations = async (page) => {
    await dispatch(
      getMyDonations({
        type,
        page,
        search: filters.search,
        sort: filters.sort.split("-")[0],
        order: filters.sort.split("-")[1] === "r" ? "desc" : "asc",
      })
    );
  };

  useEffect(() => {
    loadDonations(1);
  }, [filters]);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-in-out delay-75 duration-300 transform"
      enterFrom="opacity-0 translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in-out duration-300 transform delay-75"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
      <div className="">
        <div className="py-7.5 flex items-center justify-between form-group whitespace-nowrap">
          <div className="items-center hidden gap-4 sm:flex">
            <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
              Sort By:
            </label>
            <Dropdown
              value={filters.sort}
              onChange={(e) => changeFilters({ sort: e.value })}
              options={sortList}
              name={"SortBy"}
            />
            <button
              className="text-sm font-bold !mb-0"
              onClick={() => changeFilters({ sort: "date-r", search: "" })}
            >
              Clear
            </button>
          </div>
          <div className="block">
            <Disclosure>
              {({ open, close }) => (
                <>
                  {/*
                <div className="flex flex-row gap-1 sm:hidden">
                  <p className="font-medium text-md text-neutral-800">
                    Filter
                  </p>
                </div>
                */}
                  <Disclosure.Button className="flex flex-between w-full items-center px-2 py-2 hover:!text-primary-300 gap-1 sm:hidden">
                    <div className="text-neutral-600 hover:text-">
                      <SortIcon iconSize={16} />
                    </div>
                    <span
                      className={
                        (open ? "bg-violet-500 text-white" : "text-gray-900") +
                        " group flex w-full items-center rounded-md text-sm gap-4 text-button-md !text-neutral-600"
                      }
                    >
                      {" "}
                      Sort
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="absolute z-40 flex flex-col p-2 mt-2 origin-top-right transform scale-100 bg-white rounded-md shadow-sm shadow opacity-100 w-fit">
                    {[
                      { text: "Date (Last to First)", value: "date-r" },
                      { text: "Date (First to Last)", value: "date" },
                      { text: "Name (A-Z)", value: "name" },
                      { text: "Name (Z-A)", value: "name-r" },
                      { text: "Amount (Highest to Lowest)", value: "total-r" },
                      { text: "Amount (Lowest to Highest)", value: "total" },
                    ].map((item, index) => (
                      <div
                        className={`group flex w-full items-center bg-white px-3 py-2 text-sm gap-4 text-button text-neutral-600 ${
                          filters.sort === item.value
                            ? /* on link open */ "bg-violet-500 text-primary-300"
                            : /* On link close */ "text-gray-900 hover:!text-primary-300"
                        }`}
                        onClick={() => {
                          close();
                          changeFilters({ sort: item.value });
                        }}
                      >
                        <span className="w-full grow-1">{item.text}</span>
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className="">
            <div className="form-group">
              <label className="relative block !mb-0">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                  <SearchIcon />
                </span>
                <input
                  className="block w-full !py-2.5 !pr-3 bg-white border rounded-md form-control !pl-11 md:w-[200px] lg:w-[300px]"
                  placeholder="Search"
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={(e) => changeFilters({ search: e.target.value })}
                />
              </label>
            </div>
          </div>
        </div>
        {donations?.loading ? (
          <div>Loading...</div>
        ) : donations?.rows?.length ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">
              {donations.rows.map((e) => (
                <RecurringItem
                  type={type}
                  key={e.id}
                  mydonation={e}
                  onReload={() => loadDonations(donations.page)}
                  toggleModal={toggleModal}
                  handleCancel={handleCancel}
                  handleViewDetails={handleViewDetails}
                />
              ))}
            </div>
            <div className="mt-7.5 sm:mt-5">
              <Pagination
                totalPages={donations.count}
                currentPage={donations.page}
                onPageChange={(page) => loadDonations(page)}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 py-10 bg-neutral-200 rounded-xl">
            <div>
              <img src="/images/illustration/no-donations.svg" alt="" />
            </div>
            <div className="max-w-[19rem] text-sm text-center text-neutral-600">
              <h2 className="mb-2 heading-6 text-neutral-1000">
                {filters.search.length
                  ? "Nothing To Show"
                  : type === MyDonationTypes.ACTIVE_RECURRING
                  ? "No Active Subscriptions"
                  : type === MyDonationTypes.INACTIVE_RECURRING
                  ? "No Inactive Subscriptions"
                  : "No Donations"}
              </h2>
              <p>
                {filters.search.length
                  ? "Try checking for spelling errors or try another search term."
                  : type === MyDonationTypes.ACTIVE_RECURRING
                  ? "There are no active subscriptions available."
                  : type === MyDonationTypes.INACTIVE_RECURRING
                  ? "There are no inactive subscriptions available."
                  : "There are no donations available."}
              </p>
            </div>
          </div>
        )}
      </div>
    </Transition>
  );
};
