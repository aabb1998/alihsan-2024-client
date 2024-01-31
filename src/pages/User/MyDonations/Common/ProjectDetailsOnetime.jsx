import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { generateInvoice } from "../../../../features/myDonation/myDonationSlice";
import {
  CalendarIcon,
  DollarSignIcon,
  RepeatIcon,
} from "../../../../theme/svg-icons";
import { SnackMessages } from "../../../../components/Toast";
import { Transition } from "@headlessui/react";
import Img from "../../../../components/Image";
import { currencyConfig } from "../../../../utils/constants";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

const ProjectDetailsOnetime = ({ mydonation, isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const dispatch = useDispatch();
  const isInvoiceExist = parseInt(mydonation?.totalPayments) > 0;

  const convertDateString = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString().substr(-4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const startDownload = (url) => {
    const a = document.createElement("a");
    a.style.display = "none";
    const evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.href = url;
    a.file = "invoice.pdf";
    a.target = "blank";
    a.dispatchEvent(evt);
    setTimeout(() => a.remove(), 100);
  };
  const downloadInvoice = async () => {
    setLoading(true);
    if (mydonation.invoice) startDownload(mydonation.invoice);
    else if (invoice) startDownload(invoice);
    else {
      const action = await dispatch(
        generateInvoice({
          donationId: mydonation.id,
          type: mydonation.isRecurring
            ? mydonation.status === "ACTIVE"
              ? "activeRecurring"
              : "inactiveRecurring"
            : "onetime",
        })
      );
      setInvoice(action.payload);
      if (!action.payload) showErrorMessage("Unable to download invoice");
      else startDownload(action.payload);
    }
    setLoading(false);
  };
  return (
    <>
      <Transition
        appear={true}
        show={true}
        enter="transition ease-in-out delay-75 duration-300 transform"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-300 transform delay-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-16rem)] overflow-auto">
            <div className="mt-5 md:mt-7.5">
              <Img
                src={
                  mydonation?.Campaign?.coverImage ||
                  "/images/banner/projects/1.jpg"
                }
                alt=""
                className="object-cover h-full max-h-[140px] sm:max-h-[208px] w-full rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="mb-4 text-heading-6 sm:text-heading-7 text-neutral-800">
                  {mydonation?.Campaign?.name}
                </h3>
                <p className="text-sm font-medium text-neutral-800 line-clamp-3">
                  {mydonation?.Campaign?.description}
                </p>
              </div>
              <div className="flex flex-wrap justify-start p-2 rounded-lg gap-y-4 gap-x-4 sm:gap-6 bg-neutral-200">
                <div className="flex gap-2 grow basis-0">
                  <div className="flex items-center justify-center w-10 h-10 p-2 text-yellow-500 rounded bg-accent-300">
                    <DollarSignIcon iconSize={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1 grow basis-0">
                    <div className="text-xs text-neutral-600">
                      Donation Amount
                    </div>
                    <div className="font-bold text-neutral-800 text-button-lg">
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
                <div className="flex gap-2 grow basis-0">
                  <div className="flex items-center justify-center w-10 h-10 p-2 text-green-500 bg-green-300 rounded">
                    <CalendarIcon iconSize={24} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-neutral-600">Date</div>
                    <div className="font-bold text-neutral-800 text-button-lg">
                      {convertDateString(mydonation?.donatedAt)}
                    </div>
                  </div>
                </div>
                {mydonation?.nextPaymentOn && (
                  <div className="flex gap-2 grow basis-0">
                    <div className="flex items-center justify-center w-10 h-10 p-2 text-green-500 bg-green-300 rounded">
                      <CalendarIcon iconSize={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-neutral-600">
                        Next Payment Date
                      </div>
                      <div className="font-bold text-neutral-800 text-button-lg">
                        {convertDateString(mydonation?.nextPaymentOn)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="flex-grow btn btn-dark" label="">
              Get Certificate
            </button>
            <button
              className="flex-grow btn btn-primary "
              label="Get Invoice"
              onClick={() => downloadInvoice()}
              disabled={loading || !isInvoiceExist}
            >
              Get Invoice
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
};
export default ProjectDetailsOnetime;
