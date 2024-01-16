import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { CloseIcon, SearchIcon } from "../../theme/svg-icons";
import { getTopDonation } from "../quickDonation/quickDonationSlice";
import { useParams } from "react-router-dom";
import { DonationModal } from "./DonationModal";
import { NoDataFound } from "../../components/NoDataFound";
import Img from "../../components/Image";
const initialState = {
  id: "",
  sort: "createdAt",
  order: "desc",
  search: "",
  period: "alltime",
};

export const TopDonations = (props) => {
  const { topDonations } = props;
  const [period, setPeriod] = useState("allTime");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialState);
  const [selectedSort, setSelectedSort] = useState("");
  const donations = useSelector((state) => state.quickDonations);
  const dispatch = useDispatch();
  const { id } = useParams();

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
    setSelectedFilters({ ...selectedFilters, ...selectedFilter, id: id });
    dispatch(getTopDonation({ ...selectedFilters, ...selectedFilter, id: id }));
  };

  const handlePeriod = (e) => {
    setPeriod(e.target.value);
    setSelectedFilters({ ...selectedFilters, period: e.target.value, id: id });
    dispatch(
      getTopDonation({ ...selectedFilters, period: e.target.value, id: id })
    );
  };
  const handleSearch = (e) => {
    setSelectedFilters({ ...selectedFilters, search: e.target.value, id: id });
    dispatch(
      getTopDonation({ ...selectedFilters, search: e.target.value, id: id })
    );
  };
  const getDataPagination = (e) => {
    dispatch(getTopDonation({ ...selectedFilters, page: e }));
  };
  useEffect(() => {
    if (isOpen) dispatch(getTopDonation({ ...initialState, id: id }));
  }, [isOpen]);
  return (
    <div className="border rounded-4xl border-neutral-300 px-4 py-6 md:p-7.5 bg-white">
      <div className="flex items-center justify-between mb-7.5">
        <h5 className="text-button-lg md:text-heading-5">Top Donors</h5>
        <Link
          to="#"
          className="font-bold text-primary-300"
          onClick={() => setIsOpen(true)}
        >
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <div className="p-2 bg-accent-100 rounded-lg gap-2  md:gap-3.5 flex">
          <Button
            value="allTime"
            label="All Time"
            className={"tab-btn text-sm !px-0 capitalize"}
            onClick={(e) => setPeriod(e.target.value)}
            variant={period === "allTime" ? `primaryFull` : `secondaryTextFull`}
          />

          <Button
            value="weekly"
            label="Weekly"
            className={"tab-btn text-sm !px-0"}
            onClick={(e) => setPeriod(e.target.value)}
            variant={period === "weekly" ? `primaryFull` : `secondaryTextFull`}
          />

          <Button
            value="monthly"
            label="Monthly"
            className={"tab-btn text-sm !px-0"}
            onClick={(e) => setPeriod(e.target.value)}
            variant={period === "monthly" ? `primaryFull` : `secondaryTextFull`}
          />
        </div>
        <div className="flex flex-col gap-3">
          {topDonations?.[period]?.length ? (
            topDonations?.[period]?.map((donation) => (
              <div className="flex items-center justify-between my-1 md:my-1.5">
                <div className="flex items-center gap-3">
                  <div>
                    <Img
                      className="object-cover rounded-full w-9 md:w-11 md:h-11"
                      src={"/images/avatar/avatar-2.jpg"}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-button-md md:text-heading-7 line-clamp-1 ">
                      {donation?.firstName} {donation?.lastName}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500">
                      Last Donation:{donation?.displayTime}
                    </div>
                  </div>
                </div>
                <div className="font-bold heading-5">
                  ${donation?.total?.toLocaleString()}
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
          donations={donations?.topDonations}
          initialState={initialState}
          handleFilterChange={handleFilterChange}
          handlePeriod={handlePeriod}
          handleSearch={handleSearch}
          period={period}
          getDataPagination={getDataPagination}
          isPeriod={true}
          selectedFilters={selectedFilters}
          selectedSort={selectedSort}
          heading="Top Donors"
        />
      )}
    </div>
  );
};
