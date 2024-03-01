import React, { useState, useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import {
  ChevronUpIcon,
  ChevronsUpIcon,
  DownloadIcon,
} from "../../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomers,
  getInfoTileData,
  getSubscriptions,
} from "../../../features/adminDonations/adminDonationSlice";
import {
  DonationPeriodFilters,
  adminItemPerPage,
  currencyConfig,
  itemPerPage,
} from "../../../utils/constants";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import Loader from "../../../components/Loader";
import { formatPrice, getDateRange } from "../../../utils/helper";
import DatePickerModal from "../Dashboard/DatePickerModal";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { generateInvoice } from "../../../features/myDonation/myDonationSlice";
import { Button } from "../../../components";
import { downloadReport } from "../../../features/adminDashboard/adminDashboardSlice";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { Tooltip } from "react-tooltip";
import { InfoTile } from "./InfoTile";
import Table from "./Table";

const AmountFilters = [
  { label: "All", value: "" },
  {
    label: `${currencyConfig.label}0 - ${currencyConfig.label}50`,
    value: "0-50",
  },
  {
    label: `${currencyConfig.label}50 - ${currencyConfig.label}100`,
    value: "50-100",
  },
  {
    label: `${currencyConfig.label}100 - ${currencyConfig.label}200`,
    value: "100-200",
  },
  { label: `> ${currencyConfig.label}200`, value: "200-" },
];

const StatusFilters = [
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
];

const initialState = {
  search: "",
  page: 1,
  limit: adminItemPerPage,
  sort: "",
  period: "",
  amount: "",
  order: "",
  startDate: "",
  endDate: "",
  status: "",
  guest: false,
  source: "subscriptions",
};

export default function Subscriptions() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [filters, setFilters] = useState(initialState);
  const [customDate, setCustomDate] = useState(false);

  const { donations, isLoading, infoTileData, customersList } = useSelector(
    (state) => state?.adminDonations
  );

  const { isDownloading } = useSelector((state) => state.adminDashboard);
  const filtersList = [
    {
      label: "Amount",
      name: "amount",
      value: "amount",
      defaultSelect: "All amount",
      options: AmountFilters,
    },
    {
      label: "Period",
      name: "period",
      value: "period",
      defaultSelect: "All periods",
      options: DonationPeriodFilters,
    },
    {
      label: "Status",
      name: "status",
      value: "status",
      defaultSelect: "All status",
      options: StatusFilters,
    },
    {
      label: "Customer",
      name: "userId",
      value: "userId",
      defaultSelect: "All Customers",

      options:
        customersList?.map((i) => ({
          value: i.id,
          label: i.firstName + " " + i.lastName,
        })) || [],
    },
  ];
  const dispatch = useDispatch();

  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };

  const { count, rows } = donations?.subscriptionList || { rows: [], count: 0 };

  const handleFilterChange = (name, value) => {
    const updateFilters = (newFilters) => {
      setFilters({
        ...filters,
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
      default: () => setFilters(initialState),
    };

    (filterActions[name] || filterActions.default)();
  };

  const getData = async () => {
    const response = await dispatch(getSubscriptions(filters));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
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
    setFilters({
      ...filters,
      period: "custom_date",
      startDate: formatDate(dates?.startDate),
      endDate: formatDate(dates?.endDate),
    });
    setCustomDate(false);
  };

  const handleDownloadReport = async () => {
    const response = await dispatch(
      downloadReport({ filter: filters, title: "Subscriptions" })
    );
    if (response?.payload) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.error?.message);
    }
  };

  useEffect(() => {
    getData(filters);
    dispatch(getInfoTileData(filters));
    dispatch(getCustomers());
  }, [filters]);

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {customDate && (
        <DatePickerModal
          onClose={() => setCustomDate(false)}
          confirmDate={confirmDate}
        />
      )}
      <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <h5 className="text-button-lg md:text-heading-5">Subscriptions</h5>
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
      <div className="flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap">
        <InfoTile
          title={"Total Subscriptions"}
          value={infoTileData?.totalSubscriptions || 0}
          realCount={infoTileData?.totalSubscriptionsRealCount || 0}
        />
        <InfoTile
          title={"Total Donors"}
          value={infoTileData?.totalDonors || 0}
          realCount={infoTileData?.totalDonorsRealCount || 0}
        />

        <InfoTile
          title={"Total Subscription Amount"}
          value={"$" + infoTileData?.totalSubscriptionAmount || 0}
          realCount={infoTileData?.subscriptionAmountRealCount || 0}
        />
      </div>

      <div className="mt-6 md:mt-10">
        <Filter
          handleFilterChange={handleFilterChange}
          handleFilterReset={() => setFilters(initialState)}
          filters={filters}
          filtersList={filtersList}
          isSearch
        />

        <div className="grid">
          <div className="relative overflow-x-auto">
            {isLoading ? (
              <Loader />
            ) : (
              <Table
                setFilters={(filter) => {
                  setFilters(filter);
                }}
                filters={filters}
                rows={rows}
                handleDownload={(id) => handleDownload(id)}

              />
            )}
            <div className="mt-5">
              {count === 0 ? (
                <div className="">No Data Found.</div>
              ) : (
                <Pagination
                  totalPages={Math.ceil(count / itemPerPage)}
                  currentPage={filters.page}
                  onPageChange={(page) => setFilters({ ...filters, page })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
