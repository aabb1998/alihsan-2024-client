import React, { useEffect, useState } from "react";
import {
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
  FilterIcon,
  DownloadIcon,
  MoreVerticalIcon,
  MoreverticalIcon,
  EditIcon,
  Trash2Icon,
} from "../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../projects/Pagination";
import { getPaymentsList } from "./paymentDetailsSlice";
import { Disclosure } from "@headlessui/react";
import { Button } from "../../components";
import { generateInvoice, exportInvoice } from "../myDonation/myDonationSlice";
import { Menu } from "@headlessui/react";
import Loader from "../../components/Loader";
import { adminItemPerPage, currencyConfig } from "../../utils/constants";

const initialState = {
  page: "1",
  fromdate: "monthly",
  limit: adminItemPerPage,
};

const now = new Date();

const filterList = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "today", label: "Today" },
];

export default function PaymentList() {
  const { rows, count, loading } = useSelector(
    (state) => state.paymentDetails.paymentList
  );
  const [filters, setFilters] = useState(initialState);
  const [selectAll, setSelectAll] = useState(false);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };
  const handleAllClick = () => {
    const newCheckboxes = payments.map((payment) => ({
      ...payment,
      checked: !selectAll,
    }));
    setPayments(newCheckboxes);
    setSelectAll(!selectAll);
  };
  const handleSingleChange = (i) => {
    const newCheckboxes = payments.map((payment, index) =>
      index === i ? { ...payment, checked: !payment.checked } : payment
    );
    setPayments(newCheckboxes);
    setSelectAll(false);
  };

  const handleExport = async () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const fromdate =
      filters.fromdate === "today"
        ? today.getTime()
        : filters.fromdate === "monthly"
        ? new Date(
            now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(),
            now.getMonth() === 0 ? 11 : now.getMonth() - 1,
            now.getDate()
          ).getTime()
        : new Date(today.getTime() - 7 * 24 * 3600 * 1000).getTime();

    const checkedIds = payments
      .filter((item) => item.checked) // Filter only items where checked is true
      .map((item) => item.id)
      .join(",");

    const invoice = await dispatch(
      exportInvoice({ fromdate: fromdate, exportId: checkedIds })
    );
  };
  //

  const getFromDate = (option) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    switch (option) {
      case "today":
        return today.getTime();
      case "monthly":
        const lastMonth = new Date(
          now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(),
          now.getMonth() === 0 ? 11 : now.getMonth() - 1,
          now.getDate()
        );
        return lastMonth.getTime();
      default:
        // "weekly" or any other option
        return today.getTime() - 7 * 24 * 3600 * 1000;
    }
  };

  useEffect(() => {
    const fromDate = getFromDate(filters.fromdate);
    dispatch(getPaymentsList({ ...filters, fromdate: fromDate }));
  }, [filters]);

  useEffect(() => {
    setPayments(rows);
  }, [rows]);
  return loading ? (
    <Loader />
  ) : payments.length <= count ? (
    <section aria-label="Payment History">
      <div className="container">
        <div className="border-b mb-5 md:mb-7.5 border-b-neutral-300 flex flex-wrap sm:flex-nowrap  justify-between items-center pb-3.5">
          <h1 className="mb-3 text-heading-6 md:text-heading-5 sm:mb-0">
            Payment History
          </h1>
          <div className="flex items-center justify-between w-full sm:justify-end sm:w-auto">
            <div className="flex sm:hidden">
              <select
                className="text-sm min-w-[107px] !text-neutral-800 form-control"
                id="TableList"
                onChange={(e) => handleFilterChange("fromdate", e.target.value)}
                value={filters.fromdate}
              >
                {filterList.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent-100 rounded-lg  gap-3.5 hidden sm:flex">
                {filterList.map((i) =>
                  i.value === filters.fromdate ? (
                    <button
                      key={i.value}
                      className="px-4 !py-2 btn-tab btn-primary filled text-button-md whitespace-nowrap"
                    >
                      {i.label}
                    </button>
                  ) : (
                    <button
                      key={i.value}
                      onClick={() => handleFilterChange("fromdate", i.value)}
                      className="px-4 !py-2 btn-tab btn-secondary-text filled text-button-md"
                    >
                      {i.label}
                    </button>
                  )
                )}
              </div>
              <button
                className="!px-4 !py-1.5 sm:!px-5 btn btn-dark text-button-lg h-11"
                onClick={handleExport}
              >
                Export <DownloadIcon />
              </button>
            </div>
          </div>
        </div>

        {payments.length > 0 ? (
          <div className="grid">
            <div className="relative overflow-x-auto">
              <table className="w-full mb-5 table-auto">
                <thead className="text-sm text-left bg-neutral-200">
                  <tr>
                    <th className="text-center rounded-l-md">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={selectAll}
                        onChange={handleAllClick}
                      />
                    </th>
                    <th className="p-4 font-medium">Project Name</th>
                    <th className="hidden p-4 font-medium sm:table-cell">
                      Date
                    </th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="hidden p-4 font-medium text-center sm:table-cell">
                      Invoice
                    </th>
                    <th className="p-4 font-medium text-center sm:hidden rounded-r-md">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((i, index) => (
                    <tr key={i.id}>
                      <td className="p-4 text-center border-b border-neutral-300">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={() => handleSingleChange(index)}
                          checked={i.checked}
                        />
                      </td>
                      <td className="p-4 border-b border-neutral-300 ">
                        <div className="max-w-[340px] line-clamp-1">
                          {i.Campaign.name}
                        </div>
                      </td>
                      <td className="hidden p-4 border-b border-neutral-300 sm:table-cell">
                        {i.updatedAt}
                      </td>
                      <td className="p-4 border-b border-neutral-300">
                        {currencyConfig.label}{i.total}
                      </td>
                      <td className="hidden p-4 text-center border-b border-neutral-300 sm:table-cell">
                        <Button
                          variant={"none"}
                          label="Download"
                          className="text-button-md text-primary-300"
                          onClick={() => handleDownload(i.donationId)}
                        />
                      </td>
                      <td className="p-4 text-center border-b border-neutral-300 sm:hidden">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="">
                              <MoreverticalIcon />
                            </Menu.Button>
                          </div>
                          <Menu.Items className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-fit border-neutral-200">
                            <div className="p-2.5">
                              <Menu.Item>
                                <button
                                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat"
                                  onClick={() => handleDownload(i.id)}
                                >
                                  Download
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
            No payment history is currently available
          </div>
        )}
      </div>
      {payments.length < count && (
        <Pagination
          totalPages={Math.ceil(
            count / process.env.REACT_APP_PAGINATION_PER_PAGE
          )}
          currentPage={filters.page}
          onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
        />
      )}
    </section>
  ) : (
    <div className="flex flex-col items-center justify-center gap-5 py-10 bg-neutral-200 rounded-xl">
      <div>
        <img src="/images/illustration/no-payments-new.svg" alt="" />
      </div>
      <div className="max-w-[19rem] text-sm text-center text-neutral-600">
        <h2 className="heading-6 text-neutral-1000">No Payment Yet</h2>
        <p className="mt-2">
          No payment has been made. Please select a project and donate.
        </p>
      </div>
    </div>
  );
}
