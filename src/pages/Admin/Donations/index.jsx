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
  getDonations,
} from "../../../features/adminDonations/adminDonationSlice";
import { adminItemPerPage, currencyConfig, itemPerPage } from "../../../utils/constants";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import Loader from "../../../components/Loader";
import { formatPrice, getDateRange } from "../../../utils/helper";
import DatePickerModal from "../Dashboard/DatePickerModal";
import { useNavigate } from "react-router-dom";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { generateInvoice } from "../../../features/myDonation/myDonationSlice";
import { InfoTile } from "./InfoTile";
import {
  AmountFilters,
  PeriodFilters,
  StatusFilters,
} from "../../../utils/donationFilters";
import { Button } from "../../../components";
import { downloadReport } from "../../../features/adminDashboard/adminDashboardSlice";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";

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
};

export default function Donations() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [filters, setFilters] = useState(initialState);
  const [customDate, setCustomDate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { donations, isLoading, customersList } = useSelector(
    (state) => state?.adminDonations
  );
  const { isDownloading } = useSelector((state) => state.adminDashboard);

  const { count, rows } = donations?.donationList || { rows: [], count: 0 };

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
      options: PeriodFilters,
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

  const handleGuestUserChange = (e) => {
    setFilters({
      ...filters,
      guest: e.target.checked,
    });
  };
  const handleFilterChange = (name, value) => {
    const updateFilters = (newFilters) => {
      setFilters({
        ...filters,
        ...newFilters,
      });
    };

    const filterActions = {
      amount: () => {
        const [startAmount, endAmount] = value.split("-");
        updateFilters({ amount: value, startAmount, endAmount });
      },
      period: () => {
        if (value === "custom_date") {
          updateFilters({ period: value });
          setCustomDate(true);
        }
        if (value === "") {
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
    const response = await dispatch(getDonations(filters));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
  };

  const confirmDate = (dates) => {
    const endDate = new Date(dates?.endDate).toISOString().split("T")[0];
    const startDate = new Date(dates?.startDate).toISOString().split("T")[0];
    setFilters({
      ...filters,
      startDate,
      endDate,
    });

    setCustomDate(false);
  };

  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };

  const handleDownloadReport = async () => {
    const response = await dispatch(downloadReport(filters));
    if (response?.payload) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.error?.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, [filters]);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {customDate && (
        <DatePickerModal
          onClose={() => setCustomDate(false)}
          confirmDate={confirmDate}
        />
      )}
      <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <h5 className="text-button-lg md:text-heading-5">Donations</h5>
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
          title={"Total Donations"}
          value={donations?.totalOrders || 0}
        />
        <InfoTile title={"Total Donors"} value={donations?.totalDonors || 0} />

        <InfoTile
          title={"Total Donation Amount"}
          value={`${currencyConfig.label}${formatPrice(donations?.totalOrderAmount || 0)}`}
        />
      </div>

      <div className="mt-6 md:mt-10">
        <Filter
          handleFilterChange={handleFilterChange}
          handleFilterReset={() => setFilters(initialState)}
          filters={filters}
          filtersList={filtersList}
          isSearch
        >
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name="guest"
              id="isGuest"
              checked={filters.guest}
              onChange={handleGuestUserChange}
            />
            <label
              htmlFor="isGuest"
              className="font-bold text-button-md text-neutral-800"
            >
              Is Guest
            </label>
          </div>
        </Filter>
        <div className="grid">
          <div className="relative overflow-x-auto">
            {isLoading ? (
              <Loader />
            ) : (
              <table className="w-full table-auto text-start">
                <thead className="rounded bg-neutral-200">
                  <tr className="">
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Order Id
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Name
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                      <div className="flex gap-1.5 items-center">
                        Amount
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "total",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                      <div
                        className="flex gap-1.5 items-center"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            sort: "date",
                            order: filters.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      >
                        Date
                        <ChevronUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "date",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Email
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Status
                    </th>
                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((donation) => (
                    <tr
                      key={donation?.id}
                      className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                    >
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.orderId}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-bold font-Montserrat text-neutral-800">
                        <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                          {donation.User?.firstName || donation.firstName}{" "}
                          {donation.User?.lastName || donation.lastName}
                        </div>
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {currencyConfig.label}{donation.total}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.donatedAt}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.User?.email || donation.email}
                      </td>

                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.User?.status || donation.status || "-"}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        <div className="flex cursor-pointer">
                          <ActionButtonBgWithIcon
                            handleDownload={() => handleDownload(donation.id)}
                            handleView={() =>
                              navigate("/admin/donation/" + donation?.id)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
