import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopDonation } from "../quickDonation/quickDonationSlice";
import { DonationModal } from "./DonationModal";
import { NoDataFound } from "../../components/NoDataFound";
import { currencyConfig } from "../../utils/constants";
import Img from "../../components/Image";

const initialState = {
  sort: "createdAt",
  order: "desc",
  search: "",
  period: "alltime",
};

export const LiveDonations = (props) => {
  const dispatch = useDispatch();
  const { liveDonations, topDonations, campaign } = props;
  const id = campaign?.id;
  const [period, setPeriod] = useState("allTime");
  const [isOpen, setIsOpen] = useState(false);
  const donations = useSelector((state) => state.quickDonations);
  const [selectedFilters, setSelectedFilters] = useState(initialState);
  const [selectedSort, setSelectedSort] = useState("");

  const handleFilterChange = (e) => {
    const { value } = e;
    setSelectedSort(value);

    const filterMapping = {
      asc: { order: "asc", sort: "name" },
      desc: { order: "desc", sort: "name" },
      lowToHigh: { order: "asc", sort: "total" },
      highToLow: { order: "desc", sort: "total" },
    };
    const selectedFilter = filterMapping[value] || {};
    setSelectedFilters({
      ...selectedFilters,
      ...selectedFilter,
      live: true,
      id: id,
    });
    dispatch(
      getTopDonation({
        ...selectedFilters,
        ...selectedFilter,
        live: true,
        id: id,
      }),
    );
  };
  const handlePeriod = (e) => {
    setPeriod(e.target.value);
    setSelectedFilters({
      ...selectedFilters,
      period: e.target.value,
      id: id,
      live: true,
    });
    dispatch(
      getTopDonation({
        ...selectedFilters,
        period: e.target.value,
        id: id,
        live: true,
      }),
    );
  };
  const handleSearch = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      search: e.target.value,
      id: id,
      live: true,
    });
    dispatch(
      getTopDonation({
        ...selectedFilters,
        search: e.target.value,
        id: id,
        live: true,
      }),
    );
  };
  const getDataPagination = (e) => {
    dispatch(
      getTopDonation({ ...selectedFilters, page: e, id: id, live: true }),
    );
  };
  useEffect(() => {
    if (isOpen)
      dispatch(getTopDonation({ ...initialState, id: id, live: true }));
  }, [isOpen]);
  return (
    <div className="border rounded-xl border-neutral-300  px-4 py-6 md:p-7.5 bg-white">
      <div className="flex items-center justify-between mb-7.5">
        <h5 className="text-button-lg md:text-heading-5">Live Donations </h5>
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
          {liveDonations?.length ? (
            liveDonations?.map((donation) => (
              <div className="flex items-center justify-between my-1 md:my-1.5">
                <div className="flex items-center gap-3">
                  <div>
                    <Img
                      className="object-cover w-6 md:w-6 md:h-6"
                      src={"/images/avatar/charity.png"}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-button-md md:text-button-md line-clamp-1 ">
                      {donation?.firstName ? (
                        <>
                          {donation?.firstName} {donation?.lastName}
                        </>
                      ) : (
                        <>Anonymous</>
                      )}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500">
                      {donation?.displayTime}
                    </div>
                  </div>
                </div>
                <div className="font-bold heading-7">
                  {currencyConfig.label}
                  {donation?.total?.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <NoDataFound
              title={"No Donation Available"}
              desctiption={"No donations have been made. Be the first"}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <DonationModal
          setIsOpen={() => setIsOpen(false)}
          topDonations={topDonations}
          donations={donations?.topDonations}
          initialState={initialState}
          handleFilterChange={handleFilterChange}
          handlePeriod={handlePeriod}
          handleSearch={handleSearch}
          period={period}
          getDataPagination={getDataPagination}
          isPeriod={false}
          selectedFilters={selectedFilters}
          heading="Live Donations"
          selectedSort={selectedSort}
        />
      )}
    </div>
  );
};
