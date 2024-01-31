import React from "react";
import { useDispatch } from "react-redux";
import { cancelMyDonation } from "./myDonationSlice";
import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  CloseIcon,
} from "../../theme/svg-icons";
import { Button } from "../../components";
import ViewDetailsRecurring from "../../../src/pages/User/MyDonations/Common/ViewOnetimeModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { currencyConfig } from "../../utils/constants";

export const RecurringItem = ({
  type,
  mydonation,
  onReload,
  toggleModal,
  handleViewDetails,
  setIdForPayment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(
    type === "INACTIVE_RECURRING" || type === "ONETIME"
      ? mydonation?.donatedAt
      : mydonation?.nextPaymentOn
  );
  const year = date.getFullYear().toString().substr(-4);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const outputDateString = `${day}-${month}-${year}`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    await dispatch(cancelMyDonation(mydonation.id));
    if (onReload) await onReload();
    setLoading(false);
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-5 p-4 border md:flex-row border-neutral-300 rounded-2xl">
      <div className="shrink-0">
        <div className="relative w-full sm:h-[6.75rem] h-[8.625rem] sm:w-[10.125rem] overflow-hidden rounded-xl">
          <img
            src={
              mydonation?.Campaign?.coverImage ||
              "/images/banner/projects/1.jpg"
            }
            alt=""
            className="object-cover w-full h-full"
          />
          {mydonation.isRecurring ? (
            <div className="absolute bottom-0 left-0 flex justify-center w-full py-1 bg-primary-200 text-button-md">
              {mydonation.periodDays === 7
                ? "Weekly"
                : mydonation.periodDays === 30
                ? "Monthly"
                : mydonation.periodDays === 1
                ? "Daily"
                : mydonation.periodDays === 10
                ? "Last 10 days"
                : `Yearly`}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col justify-between grow">
        <div>
          <Link
            to={`/project/${mydonation?.Campaign?.slug}`}
            className="mb-1 text-heading-7 text-neutral-800"
          >
            {mydonation?.Campaign?.name}
          </Link>
          <p className="mb-5 text-sm text-neutral-600 line-clamp-3 sm:line-clamp-2 md:line-clamp-1">
            {" "}
            {mydonation?.Campaign?.description}
          </p>
        </div>
        <div className="flex justify-between gap-4 sm:gap-5">
          <div className="flex gap-2">
            <div className="flex items-center justify-center w-10 h-10 p-2 text-yellow-500 rounded bg-accent-300">
              <DollarSignIcon iconSize={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-neutral-600">Donation Amount</div>
              <div className="font-bold">
                {currencyConfig.label}
                {(
                  parseFloat(mydonation?.total) +
                  parseFloat(mydonation?.processingFee)
                )
                  .toFixed(2)
                  .toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center justify-center w-10 h-10 p-2 text-green-500 bg-green-300 rounded">
              <CalendarIcon iconSize={24} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-neutral-600">
                {mydonation.periodDays && mydonation.status === "ACTIVE"
                  ? `Next Payment On ${
                      mydonation?.Campaign?.isRamadanCampaign
                        ? "After 8 PM"
                        : ""
                    }`
                  : "Payment Date"}
              </div>
              <div className="font-bold">{outputDateString}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-4 mt-6">
          {type !== "ONETIME" && (
                <Button
                  onClick={() => setIdForPayment(mydonation?.id)}
                  label="Payment Details"
                  type="button"
                />
              )}
              {mydonation.periodDays && mydonation.status === "ACTIVE" ? (
                <button
                  className="!py-2 btn btn-outline-secondary flex-grow sm:flex-grow-0"
                  onClick={() => toggleModal(mydonation?.id)}
                  disabled={loading}
                >
                  {" "}
                  Cancel
                </button>
              ) : null}
              <button
                className="!py-2 btn btn-secondary flex-grow sm:flex-grow-0"
                onClick={() => handleViewDetails(mydonation)}
                // onClick={() => setIsOpen(true)}
              >
                {" "}
                <span>View</span> <ArrowRightIcon iconSize={20} />{" "}
              </button>
              {isOpen && (
                <ViewDetailsRecurring
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  mydonation={mydonation}
                />
              )}
        </div>
      </div>
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
              <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-t rounded-bl-none rounded-br-none rounded-tl-3xl rounded-tr-3xl sm:rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-7.5 py-10">
                    <div className="flex-col sm:flex">
                      <div className="flex justify-between">
                        <div className="mb-2 font-bold heading-7">
                          Cancel Donation?
                        </div>
                        <div className="cursor-pointer">
                          <CloseIcon onClick={() => setIsModalOpen(false)} />
                        </div>
                      </div>
                      <div className="mb-7.5 text-neutral-600 sm:mb-10">
                        Are you sure you want to cancel this Donation?
                      </div>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => setIsModalOpen(false)}
                          variant={"neutralFull"}
                          label="No, Keep it"
                        ></Button>
                        <Button
                          onClick={handleCancel}
                          variant={"primaryFull"}
                          label="Yes, Delete"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
