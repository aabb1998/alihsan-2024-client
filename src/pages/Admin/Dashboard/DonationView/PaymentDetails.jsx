import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubscriptionPayments } from "../../../../features/adminDonations/adminDonationSlice";
import Loader from "../../../../components/Loader";
import { ChevronsUpIcon, DownloadIcon } from "../../../../theme/svg-icons";
import { generateInvoice } from "../../../../features/myDonation/myDonationSlice";
import { Pagination } from "../../../../components/Pagination";
import { adminItemPerPage, currencyConfig } from "../../../../utils/constants";

const initialState = {
  total: "",
  updatedAt: "",
  order: "",
  page: 1,
};
const PaymentDetails = ({ data }) => {
  const { id } = useParams();
  const [filter, setFilter] = useState(initialState);
  const dispatch = useDispatch();
  const { subscriptionPayments, isLoading } = useSelector(
    (state) => state?.adminDonations
  );

  const handleDownloadInvoice = (item) => {
    dispatch(
      generateInvoice({
        donationId: item?.donationId,
      })
    );
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= subscriptionPayments?.count) {
      setFilter({ ...filter, page: newPage });
    }
  };

  useEffect(() => {
    dispatch(getSubscriptionPayments({ id: id, params: filter }));
  }, [filter]);

  return (
    <div>
      <div className="w-full mt-5 md: mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <thead className="rounded bg-neutral-200">
              <tr className="">
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  Payment ID
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  Campaign  Name
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                  <div className="flex gap-1.5 items-center">
                    Amount
                    <ChevronsUpIcon
                      iconSize={14}
                      onClick={() => {
                        setFilter({
                          ...filter,
                          sort: "total",
                          order: filter.order === "asc" ? "desc" : "asc",
                        });
                      }}
                    />
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                  <div className="flex gap-1.5 items-center">
                    Payment Date
                    <ChevronsUpIcon
                      iconSize={14}
                      onClick={() => {
                        setFilter({
                          ...filter,
                          sort: "updatedAt",
                          order: filter.order === "asc" ? "desc" : "asc",
                        });
                      }}
                    />
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  Download invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader />
              ) : subscriptionPayments?.rows?.length > 0 ? (
                subscriptionPayments?.rows?.map((item, i) => (
                  <tr
                    key={item?.id}
                    className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                  >
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {item?.donationId}
                    </td>
                    <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
                      <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                        {item?.Campaign?.name}{" "}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {currencyConfig.label}{item?.total}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {item?.updatedAt}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      <span className="cursor-pointer">
                      <DownloadIcon
                        onClick={() => handleDownloadInvoice(item)}
                      />
                      </span>

                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                  <td
                    colSpan="7"
                    className="p-4 text-sm font-medium font-Montserrat text-neutral-700"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            totalPages={Math.ceil(
              subscriptionPayments?.count / adminItemPerPage
            )}
            currentPage={filter.page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
