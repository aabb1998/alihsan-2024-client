import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getMediaVideo } from "../../../../features/adminMedia/adminMediaSlice";
import { getRecurringLabel } from "../../../../utils/helper";

const CheckoutDetails = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMediaVideo(id));
  }, []);
  const { pathname } = useLocation();
  const isDonationPage = pathname.includes("admin/donation/");

  const generateRowsData = (data, isDonationPage) => [
    {
      label: "Campaign Name",
      value: data?.Campaign?.name,
      isSubscription: true,
    },
    { label: "Order Number", value: data?.orderId },
    { label: "Campaign Checkout Type", value: data?.Campaign?.checkoutType },
    { label: "Campaign Description", value: data?.Campaign?.descriptionText || data?.Campaign?.description },
    { label: "Donation Amount", value: data?.total },
    { label: "Donation Start Date", value: data?.donatedAt },

    {
      label: "Latest Payment Date",
      value: data?.isRecurring ? data?.lastPaymentDate : data?.donatedAt,
    },
    ...(data?.isRecurring
      ? [
          {
            label: "Donation Frequency",
            value: getRecurringLabel(data?.periodDays),
          },
          { label: "Upcoming payment Date", value: data?.nextPaymentDate },
        ]
      : []),
    { label: "Is Anonymous", value: data?.isAnonymous ? "Yes" : "No" },
    { label: "Payment Method", value: data?.paymentGateway },
    { label: "Donation Status", value: data?.status },
  ];

  return (
    <div>
      <div className="w-full mt-5 md: mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {generateRowsData(data, isDonationPage).map((row, index) => (
                <tr
                  key={index}
                  className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                >
                  <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                    <label htmlFor="title" className="">
                      {row.label}
                    </label>
                  </td>
                  <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
