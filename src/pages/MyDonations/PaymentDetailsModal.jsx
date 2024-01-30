import React, { useState, useEffect } from "react";
import {
  ChevronsUpIcon,
  CloseIcon,
  DownloadIcon,
  SearchIcon,
} from "../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionPayments } from "../../features/adminDonations/adminDonationSlice";
import { generateInvoice } from "../../features/myDonation/myDonationSlice";
import Loader from "../../components/Loader";
import { Button } from "../../components";
import { Pagination } from "../../components/Pagination";
import { adminItemPerPage, currencyConfig } from "../../utils/constants";
const initialState = { userType: "customer", page: "1", sort: "", order: "" };

export default function PaymentDetailsModal({ setIsOpen, idForPayment }) {
  const { subscriptionPayments, isLoading } = useSelector(
    (state) => state?.adminDonations
  );
  const [filters, setFilters] = useState(initialState);

  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getSubscriptionPayments({
        id: idForPayment,
        params: filters,
      })
    );
  }, [idForPayment, filters]);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative grid w-full gap-4 text-left transition-all transform sm:max-w-[728px]">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-6 sm:pb-6 sm:px-6 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col gap-5 grow">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                        Payment Details
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={setIsOpen} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-3 max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-25rem)] overflow-auto pr-4">
                        {isLoading ? (
                          <Loader />
                        ) : subscriptionPayments?.count > 0 ? (
                          <div className="grid">
                            <div className="relative overflow-x-auto">
                              <table className="w-full mb-5 table-auto">
                                <thead className="text-sm text-left bg-neutral-200">
                                  <tr>
                                    <th className="p-4 font-medium">
                                      Project Name
                                    </th>
                                    <th className="hidden p-4 font-medium sm:table-cell">
                                      <div className="flex gap-1.5 items-center">
                                        Date
                                        <span className="cursor-pointer">
                                          <ChevronsUpIcon
                                            iconSize={14}
                                            onClick={() => {
                                              setFilters({
                                                ...filters,
                                                sort: "date",
                                                order:
                                                  filters.order === "asc"
                                                    ? "desc"
                                                    : "asc",
                                              });
                                            }}
                                          />
                                        </span>
                                      </div>
                                    </th>
                                    <th className="p-4 font-medium">Amount</th>
                                    <th className="p-4 font-medium">
                                      Invoice
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {subscriptionPayments?.rows.map(
                                    (i, index) => (
                                      <tr key={i.id}>
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
                                        <td className="p-4 border-b border-neutral-300">
                                          <Button
                                            variant={"none"}
                                            label="Download"
                                            className="text-button-md text-primary-300"
                                            onClick={() =>
                                              handleDownload(i.donationId)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <Pagination
                                totalPages={Math.ceil(
                                  subscriptionPayments?.count / adminItemPerPage
                                )}
                                currentPage={filters.page}
                                onPageChange={(page) =>
                                  setFilters((f) => ({ ...f, page }))
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
                            No payment history is currently available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
