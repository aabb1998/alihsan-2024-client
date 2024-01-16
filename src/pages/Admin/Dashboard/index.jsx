import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableActionbtn from "../../Admin/Dashboard/Common/TableActionbtn";
import { Pagination } from "../../../components/Pagination";
import {
  DownloadIcon,
  ChevronUpIcon,
  ChevronsUpIcon,
  ChevronDownIcon,
} from "../../../theme/svg-icons";
import { Dropdown } from "../../../components/Dropdown";
import Img from "../../../components/Image";
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
import { getDateRange } from "../../../utils/helper";
import DatePickerModal from "./DatePickerModal";
import VisitorChart from "./VisitorChart";
import { Button } from "../../../components";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { SnackMessages } from "../../../components/Toast";

const options = [{ label: "Campaign 1", value: "a" }];
export const itemPerPage = 10;
const initialState = {
  limit: itemPerPage,
  page: "1",
  sort: "",
  order: "",
  search: "",
};
const dateList = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "past_two_weeks", label: "Past Two Weeks" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
  { value: "custom_date", label: "Custom Date" },
];

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
  const [selectedOption, setSelectedOption] = useState("today");
  const [customDate, setCustomDate] = useState(false);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const handleIncomeChange = (e) => {
    setSelected(e.value);
    dispatch(getIncomeOverview({ campaignId: e.value }));
  };

  const handleVisitorChange = (e) => {
    setCampSelected(e.value);
    dispatch(
      getVisitorsOverview({
        campaignId: e.value,
        startDate: date?.startDate,
        endDate: date?.endDate,
      })
    );
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option?.value);
    if (option?.value === "custom_date") {
      setCustomDate(true);
    } else {
      const { startDate, endDate } = getDateRange(option?.value);
      dispatch(
        getVisitorsOverview({
          startDate: startDate,
          endDate: endDate,
          campaignId: campSelected,
        })
      );
      setDate({ startDate: startDate, endDate: endDate });
      console.log({ startDate: startDate, endDate: endDate });
    }
  };

  const confirmDate = (dates) => {
    const endDate = new Date(dates?.endDate).toISOString().split("T")[0];
    const startDate = new Date(dates?.startDate).toISOString().split("T")[0];
    dispatch(
      getVisitorsOverview({
        campaignId: campSelected,
        startDate: startDate,
        endDate: endDate,
      })
    );
    setCustomDate(false);
  };

  const handleDownloadReport = async () => {
    const response = await dispatch(downloadReport());
    if (response?.payload) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.error?.message);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    dispatch(getOrders(filter));
  }, [filter]);

  useEffect(() => {
    // setSelected(
    //   selected
    //     ? selected
    //     : quickdonations?.map((e) => ({ label: e.name, value: e.id }))[0]?.value
    // );
  }, [quickdonations]);

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getQucikDonation());
    dispatch(getVisitorsOverview());
  }, []);

  useEffect(() => {
    const id = quickdonations[0]?.id;
    // setSelected(id);
    // setCampSelected(id);
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
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={dashboardData?.totalUsers}
                percentage={dashboardData?.totalUsersPercentage}
                title="Total Users"
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={dashboardData?.totalOrders}
                percentage={dashboardData?.totalOrdersPercentage}
                title="Total Orders"
              />
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-primary-200 cursor-pointer">
              <NotableTile
                total={"$" + dashboardData?.totalSales}
                percentage={dashboardData?.totalSalesPercentage}
                title="Total Sale Amounts"
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
                    onChange={handleVisitorChange}
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
                    options={dateList}
                  />
                </div>
              </div>
              <div className="mt-5">
                <VisitorChart data={visitorsOverview} />{" "}
                {/* <Img
                  className="w-fit md:w-full"
                  src={"../images/line-area-graph.png"}
                  alt="line area chart"
                /> */}
              </div>
            </div>
            <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl flex-grow md:flex-grow-0 w-full sm:w-2/6">
              <div className="flex flex-wrap items-center justify-between pb-5 border-b border-neutral-300">
                <div className="mb-3 lg:mb-0">
                  <p className="mb-1 text-xs font-medium font-Montserrat text-neutral-500">
                    Income Overview
                  </p>
                  <h5 className="text-button-lg md:text-heading-7">
                    ${totalAmount ?? 0}
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
                {/* <Img
                  className="w-fit md:w-full"
                  src={"../images/bar-chart.png"}
                  alt="line area chart"
                /> */}
              </div>
            </div>
          </div>
          {/* TABLE AREA */}

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

function NotableTile({ total, percentage, title }) {
  return (
    <>
      <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
        {" "}
        {title}
      </h6>
      <div className="flex items-center justify-between gap-2">
        <h2 className="uppercase text-heading-5 md:text-heading-2">{total}</h2>
        <h6
          className={`flex items-center ${
            parseInt(percentage) > 0 ? "text-green-300" : "text-red-300"
          } gap-x-1 text-base !font-medium md:text-lg font-Montserrat`}
        >
          {" "}
          {parseInt(percentage) > 0 ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {Math.abs(parseFloat(percentage))}%
        </h6>
      </div>
    </>
  );
}
