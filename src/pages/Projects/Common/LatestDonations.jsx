import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CloseIcon, SearchIcon } from "../../../theme/svg-icons";
import Button from "../../../components/Button";
import { currencyConfig } from "../../../utils/constants";

export const LatestDonations = (props) => {
  const { topDonations } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-4xl border-neutral-300  px-4 py-6 md:p-7.5 bg-white">
      <div className="flex items-center justify-between mb-7.5">
        <h5 className="text-button-lg md:text-heading-5">Live Donations</h5>
        <Link
          to="#"
          className="font-bold text-primary-300"
          onClick={() => setIsOpen(true)}
        >
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {topDonations?.["monthly"]?.map((donation) => (
            <div className="flex items-center justify-between my-1 md:my-1.5">
              <div className="flex items-center gap-3">
                <div>
                  <img
                    className="object-cover rounded-full w-9 md:w-11 md:h-11"
                    src="/images/avatar/avatar-2.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-button-md md:text-heading-7 line-clamp-1">
                    {donation?.name}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500">
                    {donation?.displayTime}
                  </div>
                </div>
              </div>
              <div className="font-bold heading-5">
                {currencyConfig.label}{donation?.total?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <LiveDonationsModal
          setIsOpen={() => setIsOpen(false)}
          topDonations={topDonations}
        />
      )}
    </div>
  );
};

const LiveDonationsModal = ({ setIsOpen, topDonations }) => {
  const [period, setPeriod] = useState("allTime");
  useEffect(() => {}, []);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
            <div className="relative grid w-full max-h-[30rem] min-h-[30rem]  sm:grid-cols-2 gap-4 overflow-hidden text-left transition-all transform sm:max-w-[816px]">
              <div className="flex px-4 pt-4 pb-7.5 sm:pt-6 sm:pb-6 sm:px-6 bg-white rounded-t-3xl sm:rounded-3xl">
                <div className="flex flex-col gap-5 sm:gap-8 grow">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                      Live Donors
                    </div>

                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={setIsOpen} />
                    </button>
                  </div>
                  <div className="hidden md:block">
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
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="SortyBy"
                      className="text-sm font-bold !mb-0 hide-xs"
                    >
                      Sort:
                    </label>
                    <select
                      className="text-sm h-10 !py-0 w-[140px] !text-neutral-800 form-control !rounded-md !pr-8 truncate"
                      id="SortBy"
                      name="order"
                    >
                      <option value="asc">Popular</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                      {topDonations?.[period]?.map((donation) => (
                        <div className="flex items-center justify-between my-1 md:my-1.5">
                          <div className="flex items-center gap-3">
                            <div>
                              <img
                                className="object-cover rounded-full w-9 md:w-11 md:h-11"
                                src="/images/avatar/avatar-2.jpg"
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="text-button-md md:text-heading-7 line-clamp-1 ">
                                {donation?.name}
                              </div>
                              <div className="text-xs md:text-sm text-neutral-500">
                                {donation?.displayTime}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold heading-5">
                            {currencyConfig.label}{donation?.total?.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
