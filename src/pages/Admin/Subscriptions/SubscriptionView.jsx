import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { getMediaVideo } from "../../../features/adminMedia/adminMediaSlice";
import { Tab } from "@headlessui/react";
import CheckoutDetails from "./CheckoutDetails";
import ItemDetails from "./ItemDetails";
import CustomerDetails from "../Dashboard/DonationView/CustomerDetails";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";

const SubscriptionView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleDownloadInvoice = () => {
    setLoading(true);
  };

  useEffect(() => {
    dispatch(getMediaVideo(id));
  }, []);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <Button
          className="flex items-center text-button-lg gap-x-2"
          label={"Back to Subscription"}
          variant={"none"}
          leftIcon={
            <span>
              <ArrowLeftIcon />{" "}
            </span>
          }
          onClick={() => navigate("/admin/subscriptions")}
        />
        {isLoading ? (
          <PrimaryLoadingButton />
        ) : (
          <Button
            onClick={handleDownloadInvoice}
            label={"Download"}
            disabled={isLoading}
          />
        )}
      </div>
      <div className="w-full mt-7.5">
        <Tab.Group>
          <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
            {["Checkout Details", "Customer Details", "Items Details"].map(
              (i, j) => (
                <Tab as={Fragment} key={j}>
                  {({ selected }) => (
                    <div
                      className={
                        "flex justify-center cursor-pointer flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none " +
                        (selected
                          ? "!border-b-primary-300 !text-primary-300"
                          : "")
                      }
                    >
                      {i}
                    </div>
                  )}
                </Tab>
              )
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <CheckoutDetails data={[]} />{" "}
            </Tab.Panel>
            <Tab.Panel>
              <CustomerDetails data={[]} />
            </Tab.Panel>
            <Tab.Panel>
              <ItemDetails data={[]} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SubscriptionView;
