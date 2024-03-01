import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DownloadIcon } from "../../../theme/svg-icons";
import { Dropdown } from "../../../components/Dropdown";
import {
  downloadReport,
  getDashboardData,
  getIncomeOverview,
  getOrders,
  getVisitorsOverview,
} from "../../../features/adminDashboard/adminDashboardSlice";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import Loader from "../../../components/Loader";
import IncomeChart from "./IncomeChart";
import { Table } from "./Table";
import { formatPrice, getDateRange } from "../../../utils/helper";
import DatePickerModal from "./DatePickerModal";
import VisitorChart from "./VisitorChart";
import { Button } from "../../../components";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { SnackMessages } from "../../../components/Toast";
import {
  adminItemPerPage,
  currencyConfig,
  dashboardDateList,
} from "../../../utils/constants";
import { NotableTile } from "./NotableTile";

const initialState = {
  limit: adminItemPerPage,
  page: "1",
  sort: "",
  order: "",
  search: "",
  startDate: "",
  endDate: "",
};

const AdminsDashboard = () => {
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const [selected, setSelected] = useState("");
  const [campSelected, setCampSelected] = useState("");
  const {
    orders,
    dashboardData,
    isLoading,
    isOrderLoading,
    totalAmount,
    incomeOverView,
    visitorsOverview,
    isDownloading,
  } = useSelector((state) => state.adminDashboard);
  const { quickdonations } = useSelector((state) => state.quickDonations);
  const [filter, setFilter] = useState(initialState);
  const [selectedOption, setSelectedOption] = useState("this_month");
  const [customDate, setCustomDate] = useState(false);
  const [isOrderPopup, setOrderPopup] = useState(true);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const handleIncomeChange = (e) => {
    setSelected(e.value);
    dispatch(getIncomeOverview({ campaignId: e.value }));
  };

  const handleVisitorCampaignChange = (e) => {
    setCampSelected(e.value);
    dispatch(
      getVisitorsOverview({
        campaignId: e.value,
        startDate: date?.startDate,
        endDate: date?.endDate,
        selectedDate: selectedOption,
      })
    );
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option?.value);
    setOrderPopup(false);
    if (option?.value === "custom_date") {
      setCustomDate(true);
    } else {
      const { startDate, endDate } = getDateRange(option?.value);
      dispatch(
        getVisitorsOverview({
          startDate: startDate,
          endDate: endDate,
          campaignId: campSelected,
          selectedDate: option?.value,
        })
      );
      setDate({
        startDate: startDate,
        endDate: endDate,
      });
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because January is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const confirmDate = (dates) => {
    setFilter({
      ...filter,
      period: "custom_date",
      startDate: formatDate(dates?.startDate),
      endDate: formatDate(dates?.endDate),
    });
    setCustomDate(false);
  };

  const handleDownloadReport = async () => {
    const response = await dispatch(downloadReport({ title: "RecentOrders" }));
    if (response?.payload) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.error?.message);
    }
  };

  const handleFilterChange = (name, value) => {
    const updateFilters = (newFilters) => {
      setFilter({
        ...filter,
        ...newFilters,
        page: 1,
      });
    };

    const filterActions = {
      amount: () => {
        const [startAmount, endAmount] = value.split("-");
        updateFilters({ amount: value, startAmount, endAmount });
      },
      period: () => {
        if (value === "custom_date") {
          setCustomDate(true);
        } else if (value === "") {
          updateFilters({ period: value, startDate: "", endDate: "" });
        } else {
          const { startDate, endDate } = value
            ? getDateRange(value)
            : { startDate: "", endDate: "" };
          updateFilters({ period: value, startDate, endDate });
        }
      },
      search: () => updateFilters({ search: value }),
      status: () => updateFilters({ status: value }),
      userId: () => updateFilters({ userId: value }),
      default: () => setFilter(initialState),
    };

    (filterActions[name] || filterActions.default)();
  };

  useEffect(() => {
    dispatch(getOrders(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getQucikDonation());
    dispatch(getVisitorsOverview());
  }, []);

  useEffect(() => {
    const id = quickdonations[0]?.id;
    dispatch(getIncomeOverview());
  }, [quickdonations]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
            <h5 className="text-heading-7 md:text-heading-5">Dashboard</h5>
            {isDownloading ? (
              <PrimaryLoadingButton additionalButtonClasses="" />
            ) : (
              <Button
                className=" btn btn-primary text-button-md md:text-button-lg"
                type="submit"
                leftIcon={
                  <span className="sm:hidden">
                    <DownloadIcon />
                  </span>
                }
                label={<span className="hidden sm:flex">Download Report</span>}
                onClick={handleDownloadReport}
              />
            )}
          </div>
          {customDate && (
            <DatePickerModal
              onClose={() => setCustomDate(false)}
              confirmDate={confirmDate}
            />
          )}
          {/* card area */}
          <div className="flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap">
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={dashboardData?.visitorsCount}
                percentage={dashboardData?.visitorsPercentage}
                title="Total Page Views"
                value={dashboardData?.visitorsRealCount}
                id={"visitorsCount"}
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={dashboardData?.totalUsers}
                percentage={dashboardData?.totalUsersPercentage}
                title="Total Users"
                value={dashboardData?.totalRealUsers}
                id={"totalUsers"}
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={dashboardData?.totalOrders}
                percentage={dashboardData?.totalOrdersPercentage}
                title="Total Orders"
                value={dashboardData?.totalRealOrders}
                id={"totalOrders"}
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={currencyConfig.label + dashboardData?.totalSales}
                percentage={dashboardData?.totalSalesPercentage}
                title="Total Sale Amounts"
                value={dashboardData?.totalRealSales}
                id={"totalSales"}
              />
            </div>
          </div>
          {/* grapphical area */}
          <div className="flex flex-wrap md:flex-nowrap gap-2 sm:gap-5 md:gap-7.5">
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl flex-grow w-full sm:w-4/6">
              <div className="flex flex-wrap items-center justify-between pb-5 border-b border-neutral-300">
                <h5 className="mb-3 text-button-lg md:text-heading-7 lg:mb-0">
                  Unique Visitors
                </h5>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap md:gap-5">
                  <Dropdown
                    value={campSelected}
                    onChange={handleVisitorCampaignChange}
                    options={[
                      ...[{ label: "All", value: "" }],
                      ...quickdonations?.map((e) => ({
                        label: e.name,
                        value: e.id,
                      })),
                    ]}
                  />
                  <Dropdown
                    name={"date"}
                    value={selectedOption}
                    onChange={handleOptionChange}
                    options={dashboardDateList}
                  />
                </div>
              </div>
              <div className="mt-5">
                <VisitorChart data={visitorsOverview} />{" "}
              </div>
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl flex-grow md:flex-grow-0 w-full sm:w-2/6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b md:flex-nowrap border-neutral-300">
                <div className="mb-3 lg:mb-0">
                  <p className="mb-1 text-xs font-medium font-Montserrat text-neutral-500">
                    Income Overview
                  </p>
                  <h5 className="break-words text-button-lg md:text-heading-7">
                    {currencyConfig.label}
                    {formatPrice(totalAmount)}
                  </h5>
                </div>
                <Dropdown
                  value={selected}
                  onChange={handleIncomeChange}
                  name="selected"
                  options={[
                    ...[{ label: "All", value: "" }],
                    ...quickdonations?.map((e) => ({
                      label: e.name,
                      value: e.id,
                    })),
                  ]}
                />
              </div>
              <div className="mt-5">
                <IncomeChart data={incomeOverView} />
              </div>
            </div>
          </div>

          <Table
            setFilter={setFilter}
            filter={filter}
            isOrderLoading={isOrderLoading}
            orders={orders}
            handleFilterChange={handleFilterChange}
            quickdonations={quickdonations}
          />
        </div>
      )}
    </>
  );
};
export default AdminsDashboard;
