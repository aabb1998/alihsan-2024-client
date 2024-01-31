import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../../../../theme/svg-icons";
import { Button } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import CheckoutDetails from "./CheckoutDetails";
import ItemDetails from "./ItemDetails";
import CustomerDetails from "./CustomerDetails";
import { getDonation } from "../../../../features/adminDonations/adminDonationSlice";
import PaymentDetails from "./PaymentDetails";

const DonationView = () => {
  const { id } = useParams();
  const { state, pathname } = useLocation();
  const { donation } = useSelector((state) => state?.adminDonations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDonationDetails = async () => {
    await dispatch(getDonation(id));
  };

  useEffect(() => {
    getDonationDetails();
  }, []);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <Button
          className="flex items-center text-button-lg gap-x-2"
          label={
            state?.search
              ? "Back to Dashboard"
              : pathname.includes("admin/donation/")
              ? "Back to Donations"
              : "Back to Subscription"
          }
          variant={"none"}
          leftIcon={
            <span>
              <ArrowLeftIcon />{" "}
            </span>
          }
          onClick={() =>
            navigate(
              state?.search
                ? "/admin/dashboard"
                : pathname.includes("admin/donation/")
                ? "/admin/donations"
                : "/admin/subscriptions"
            )
          }
        />
      </div>
      <div className="w-full mt-7.5">
        <Tab.Group>
          <Tab.List className="flex flex-wrap gap-3 border-b border-b-neutral-300">
            {[
              "Checkout Details",
              "Customer Details",
              "Items Details",
              donation?.isRecurring ? "Payment Details" : "",
            ].map((i, j) => (
              <Tab as={Fragment} key={j}>
                {({ selected }) => (
                  <div
                    className={
                      "flex justify-center cursor-pointer flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg  hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none " +
                      (selected
                        ? "!border-b-primary-300 !text-primary-300"
                        : "")
                    }
                  >
                    {i}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <CheckoutDetails data={donation} />{" "}
            </Tab.Panel>
            <Tab.Panel>
              <CustomerDetails data={donation} />
            </Tab.Panel>
            <Tab.Panel>
              <ItemDetails data={donation} />
            </Tab.Panel>
            {donation?.isRecurring ? (
              <Tab.Panel>
                <PaymentDetails data={donation} />
              </Tab.Panel>
            ) : (
              ""
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default DonationView;
