import React, { useState, Fragment } from "react";
import { CloseIcon } from "../../theme/svg-icons";
import { Tab } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  cancelMyDonation,
  getMyDonations,
} from "../../features/myDonation/myDonationSlice";
import { UserSidebar } from "../User/Common/UserSidebar";
import { MyDonationTypes } from "../../utils/constants";
import { Donations } from "./Donations";
import { Button } from "../../components";
import ViewDetailsRecurring from "../../../src/pages/User/MyDonations/Common/ViewOnetimeModal";
import PageHead from "../../components/PageHead";

export const RecurringDonation = () => {
  const [tab, setTab] = useState("active-sub");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [viewDonation, setViewDonation] = useState(null);
  const dispatch = useDispatch();

  const handleCancel = async () => {
    await dispatch(cancelMyDonation(deleteItem));
    await dispatch(
      getMyDonations({
        type: MyDonationTypes.ACTIVE_RECURRING,
        page: 1,
        search: "",
        sort: "date",
        order: "desc",
      })
    );
    setIsModalOpen(false);
  };

  const handleViewDetails = (donation) => {
    setViewDonation(donation);
    setIsOpen(true);
  };

  return (
    <div>
      <PageHead title={"Recurring donations"} />
      <section className="py-7.5 md:py-15">
        <div className="container">
          <div className="flex gap-[60px]">
            <div className="w-[238px] shrink-0 hidden md:block">
              <UserSidebar />
            </div>
            <div className="w-full">
              <div className="md:border border-neutral-300 md:px-10 md:py-7.5 rounded-1.5xl">
                <div className=" mb-5 md:mb-7.5">
                  <h1 className="text-heading-6 text-center md:text-heading-5 pb-3.5">
                    My Donations - Recurring
                  </h1>
                </div>
                <div className="mt-7.5">
                  <Tab.Group>
                    <Tab.List className="flex flex-wrap border-b sm:gap-y-4 border-b-neutral-300">
                      <Tab as={Fragment} onClick={() => setTab("active-sub")}>
                        {({ selected }) => (
                          <button
                            className={
                              "flex transition ease-in-out delay-150 duration-300 justify-center flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                              (selected
                                ? "border-primary-300  text-primary-300 border-b-primary-300"
                                : "")
                            }
                          >
                            Active Subscriptions
                          </button>
                        )}
                      </Tab>
                      <Tab
                        as={Fragment}
                        onClick={() => setTab("in-active-sub")}
                      >
                        {({ selected }) => (
                          <button
                            className={
                              "flex transition ease-in-out delay-150 duration-300 justify-center flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                              (selected
                                ? "border-primary-300  text-primary-300 border-b-primary-300"
                                : "")
                            }
                          >
                            Inactive Subscriptions
                          </button>
                        )}
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <Donations
                          type={MyDonationTypes.ACTIVE_RECURRING}
                          isOpen={tab === "active-sub"}
                          toggleModal={(id) => {
                            setDeleteItem(id);
                            setIsModalOpen(!isModalOpen);
                          }}
                          handleViewDetails={handleViewDetails}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <Donations
                          type={MyDonationTypes.INACTIVE_RECURRING}
                          isOpen={tab === "in-active-sub"}
                          toggleModal={(id) => {
                            setDeleteItem(id);
                            setIsModalOpen(!isModalOpen);
                          }}
                          handleViewDetails={handleViewDetails}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <ViewDetailsRecurring
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            mydonation={viewDonation}
          />
        )}
      </section>
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
