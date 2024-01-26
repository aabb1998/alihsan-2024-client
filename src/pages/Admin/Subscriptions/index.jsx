import React, { useState, useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import {
  ChevronUpIcon,
  ChevronsUpIcon,
  EyeIcon,
} from "../../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getInfoTileData,
  getSubscriptions,
} from "../../../features/adminDonations/adminDonationSlice";
import { adminItemPerPage, itemPerPage } from "../../../utils/constants";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import Loader from "../../../components/Loader";
import { formatPrice, getDateRange } from "../../../utils/helper";
import ViewModal from "./ViewModal";
import DatePickerModal from "../Dashboard/DatePickerModal";
import { useNavigate } from "react-router-dom";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { generateInvoice } from "../../../features/myDonation/myDonationSlice";

const AmountFilters = [
  { label: "All", value: "" },
  { label: "$0 - $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "> $200", value: "200-" },
];
const PeriodFilters = [
  { label: "All", value: "" },
  { label: "Today", value: "today" },
  { label: "Last Day", value: "yesterday" },
  { label: "This Week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
  { label: "Custom Date", value: "custom_date" },
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
  status: "COMPLETED",
  guest: false,
};

export default function Subscriptions() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [filters, setFilters] = useState(initialState);
  const [customDate, setCustomDate] = useState(false);

  const { donations, isLoading, infoTileData, customersList } = useSelector(
    (state) => state?.adminDonations
  );
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
  const dispatch = useDispatch();

  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };


  const { count, rows } = donations?.subscriptionList || { rows: [], count: 0 };
  const navigate = useNavigate();

  const handleFilterChange = (name, value) => {
    const updateFilters = (newFilters) => {
      setFilters({
        ...filters,
        ...newFilters,
      });
    };
    if (name === "amount") {
      const [startAmount, endAmount] = value.split("-");
      updateFilters({
        amount: value,
        startAmount,
        endAmount,
      });
    } else if (name === "period") {
      if (value === "custom_date") {
        updateFilters({
          period: value,
        });
        setCustomDate(true);
      } else if (value === "") {
        updateFilters({
          period: value,
          startDate: "",
          endDate: "",
        });
      } else {
        const { startDate, endDate } = value
          ? getDateRange(value)
          : { startDate: "", endDate: "" };
        updateFilters({
          period: value,
          startDate,
          endDate,
        });
      }
    } else if (name === "search") {
      updateFilters({
        search: value,
      });
    } else if (name === "status") {
      updateFilters({
        status: value,
      });
    } else {
      setFilters(initialState);
    }
  };

  const getData = async () => {
    const response = await dispatch(getSubscriptions(filters));
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
  const handleGuestUserChange = (e) => {
    setFilters({
      ...filters,
      guest: e.target.checked,
    });
  };

  useEffect(() => {
    getData(filters);
  }, [filters]);

  useEffect(() => {
    dispatch(getInfoTileData());
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
        <h5 className="text-button-lg md:text-heading-5">Subscriptions</h5>
      </div>
      <div className="flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap">
        <InfoTile
          title={"Total Subscriptions"}
          value={infoTileData?.totalSubscriptions || 0}
        />
        <InfoTile
          title={"Total Donors"}
          value={infoTileData?.totalDonors || 0}
        />

        <InfoTile
          title={"Total Subscription Amount"}
          value={`$${formatPrice(infoTileData?.totalSubscriptionAmount || 0)}`}
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
              <table className="table-auto w-full text-start">
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
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        {donation?.orderId}
                      </td>
                      <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
                        <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                          {/*
                        <Img
                          src={"/images/avatar/Courtney-Henry.png"}
                          alt="Courtney Henry"
                          className="rounded-full min-w-[2.25rem] min-h-[2.25rem]"
                        />
                        */}
                          {donation.User?.firstName || donation.firstName}{" "}
                          {donation.User?.lastName || donation.lastName}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        ${donation.total}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.donatedAt}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.User?.email || donation.email}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        {donation.User?.status || donation.status || "-"}
                      </td>

                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        <div className="flex gap-2 sm:gap-4">
                          <ActionButtonBgWithIcon
                            handleDownload={() => handleDownload(donation.id)}
                            handleView={() =>
                              navigate("/admin/subscription/" + donation?.id)
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

function InfoTile({ value, title }) {
  return (
    <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
      <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
        {" "}
        {title}
      </h6>
      <div className="flex items-center justify-between">
        <h2 className="text-heading-5 md:text-heading-2">{value}</h2>
      </div>
    </div>
  );
}
