import React, { useState, useEffect } from "react";
import { CloseIcon, SearchIcon } from "../../theme/svg-icons";
import Button from "../../components/Button";
import { Pagination } from "../../components/Pagination/index";
import { NoDataFound } from "../../components/NoDataFound";
import { Dropdown } from "../../components/Dropdown";
import Img from "../../components/Image";

export const DonationModal = ({
  setIsOpen,
  donations,
  handleFilterChange,
  handlePeriod,
  handleSearch,
  period,
  getDataPagination,
  isPeriod,
  selectedFilters,
  selectedSort,
  heading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(donations?.count / 10);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getDataPagination(newPage);
    }
  };
  const sortOptions = [
    { value: "asc", label: "A-Z Order" },
    { value: "desc", label: "Z-A Order" },
    { value: "lowToHigh", label: "Lowest-Highest" },
    { value: "highToLow", label: "Highest-Lowest" },
  ];

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
              <div className="relative grid w-full gap-4 text-left transition-all transform sm:max-w-[528px]">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-6 sm:pb-6 sm:px-6 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col gap-5 grow">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                        {heading}
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={setIsOpen} />
                      </button>
                    </div>
                    <div className="flex justify-between gap-3">
                      <div className="block">
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
                              onChange={handleSearch}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="SortyBy"
                          className="text-sm font-bold hidden sm:flex !mb-0 hide-xs"
                        >
                          Sort:
                        </label>
                        <Dropdown
                          value={selectedSort}
                          onChange={handleFilterChange}
                          options={sortOptions}
                          defaultSelect={"Select"}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      {isPeriod && (
                        <div className="p-2 bg-accent-100 rounded-lg gap-2  md:gap-3.5 flex">
                          <Button
                            value="allTime"
                            label="All Time"
                            className={"tab-btn text-sm !px-0 capitalize"}
                            onClick={handlePeriod}
                            variant={
                              period === "allTime"
                                ? `primaryFull`
                                : `secondaryTextFull`
                            }
                          />
                          <Button
                            value="weekly"
                            label="Weekly"
                            className={"tab-btn text-sm !px-0"}
                            onClick={handlePeriod}
                            variant={
                              period === "weekly"
                                ? `primaryFull`
                                : `secondaryTextFull`
                            }
                          />

                          <Button
                            value="monthly"
                            label="Monthly"
                            className={"tab-btn text-sm !px-0"}
                            onClick={handlePeriod}
                            variant={
                              period === "monthly"
                                ? `primaryFull`
                                : `secondaryTextFull`
                            }
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-3 max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-25rem)] overflow-auto pr-4">
                        {
                          donations?.rows?.length ? (
                            donations?.rows?.map((donation) => (
                              <div className="flex items-center justify-between my-1 md:my-1.5">
                                <div className="flex items-center gap-3">
                                  <div>
                                    <Img
                                      className="object-cover rounded-full w-9 md:w-11 md:h-11"
                                      src={
                                        donation?.profileImage ||
                                        "/images/avatar/avatar-2.jpg"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div className="text-button-md text-primary-600 line-clamp-1 ">
                                      {donation?.firstName} {donation?.lastName}
                                    </div>
                                    <div className="text-sm text-neutral-500">
                                      {heading === "Top Donors"
                                        ? "Last Donation:"
                                        : ""}{" "}
                                      {donation?.displayTime}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-button-lg text-primary-600">
                                  ${donation?.total?.toLocaleString()}
                                </div>
                              </div>
                            ))
                          ) : selectedFilters?.search?.length ? (
                            <NoDataFound
                              title={"Nothing To Show"}
                              desctiption={
                                "Try checking for spelling errors or try another search term."
                              }
                            />
                          ) : (
                            <NoDataFound
                              title={"No Donation Available"}
                              desctiption={
                                "No donations have been made. Be the first."
                              }
                            />
                          )
                          // <div className="text-sm text-center text-neutral-600">
                          //   <p>No donations have been made. Be the first.</p>
                          // </div>
                        }
                      </div>
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      sideNavigate={true}
                    />
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
