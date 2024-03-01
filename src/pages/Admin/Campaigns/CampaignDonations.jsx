import React, { useState, useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import { Button } from "../../../components";
import {
  SearchIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  DownloadIcon,
} from "../../../theme/svg-icons";
import { loadCampaignDonations } from "../../../features/adminCampaigns";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { currencyConfig } from "../../../utils/constants";
import TableSortTitle from "../../../components/TableSort";
import { downloadReport } from "../../../features/adminDashboard/adminDashboardSlice";
import { SnackMessages } from "../../../components/Toast";
import { Filter } from "./Filter";

export default function CampaignDonations() {
  const params = useParams();
  const campaignId = params?.id;
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const list = useSelector(({ adminCampaigns }) => adminCampaigns.donations);
  const campaignDetails = useSelector(
    ({ adminCampaigns }) => adminCampaigns.details.project
  );
  const dispatch = useDispatch();

  const getData = (filters) => {
    if (!filters)
      dispatch(
        loadCampaignDonations({
          id: campaignId,
          filters: {
            search: "",
            page: 1,
            sort: "",
            order: "",
            period: "",
            amount: "",
          },
        })
      );
    else
      dispatch(
        loadCampaignDonations({
          id: campaignId,
          filters: { ...list.filters, ...filters },
        })
      );
  };
  const setFilters = (filters) => getData(filters);
  const order = (field) => {
    setFilters({
      sort: field,
      order: list.filters.order === "desc" ? "asc" : "desc",
    });
  };
  const handleDownloadReport = async () => {
    const response = await dispatch(
      downloadReport({
        title: "RecentOrders",
        filter: {
          campaignIds: campaignId,
        },
      })
    );
    if (response?.payload) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.error?.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mt-5 sm:mt-10">
        {/* dashboard title rea */}
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-button-lg md:text-heading-5">Donations</h5>
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
          {/*

          */}
        </div>
        {/* card area */}
        <div className="flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap">
          <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donations
            </h6>

            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">
                {campaignDetails.totals.totalOrders || 0}
              </h2>
            </div>
          </div>
          <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donors
            </h6>
            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">
                {campaignDetails.totals.totalDonors || 0}
              </h2>
            </div>
          </div>
          <div className="py-5 grow basis-0 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 cursor-pointer">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donation Amount
            </h6>
            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">
                {currencyConfig.label}
                {campaignDetails.totals.totalOrderAmount || 0}
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-10">
          <Filter filters={list.filters} setFilters={setFilters} />

          <div className="overflow-x-auto">
            <table class="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Name
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                    <TableSortTitle
                      value="total"
                      label="Amount"
                      sort={list.filters.sort}
                      order={list.filters.order}
                      setOrder={order}
                    />
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                    <TableSortTitle
                      value="date"
                      label="Date"
                      sort={list.filters.sort}
                      order={list.filters.order}
                      setOrder={order}
                    />
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Email
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.rows.map((donation) => (
                  <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                    <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
                      <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                        {donation.User?.firstName || donation.firstName}{" "}
                        {donation.User?.lastName || donation.lastName}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {currencyConfig.label}
                      {donation.total}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.donatedAt}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.email || donation.User?.email || "-"}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.phone || donation.User?.phone || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 mb-5">
              {list.count === 0 ? (
                <div className="">No Data Found.</div>
              ) : (
                <Pagination
                  totalPages={Math.ceil(
                    list.count / import.meta.env.VITE_APP_PAGINATION_PER_PAGE
                  )}
                  currentPage={list.filters.page}
                  onPageChange={(page) => setFilters({ page })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
