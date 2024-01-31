import React, { Fragment, useEffect, useState } from "react";
import { CloseIcon } from "../../theme/svg-icons";
import { CommonDonation } from "../projectDetails/CommonDonation";
import { AqeeqaDonation } from "../projectDetails/AqeeqaDonation";
import { AdeeqahDonation } from "../projectDetails/AdeeqahDonation";
import { ZaqatDonation } from "../projectDetails/ZaqatDonation";
import { useSelector, useDispatch } from "react-redux";
import {
  getQucikDonation,
  getQucikDonationProject,
} from "../quickDonation/quickDonationSlice";
import { ModalLoader } from "../../theme/svg-icons";
import { Transitions } from "../../utils/constants";
import { Transition, Dialog } from "@headlessui/react";

import Select from "react-select";
import { FedyahDonation } from "../projectDetails/FedyahDonation";
import { QurbanDonation } from "../projectDetails/QurbanDonation";
import { WaterDonation } from "../projectDetails/WaterDonation";

const QuickDonation = ({ isOpen, onClose, project }) => {
  const dispatch = useDispatch();
  const { quickdonations, qucikDonationProject, loading } = useSelector(
    (state) => state.quickDonations
  );
  const checkout = qucikDonationProject?.campaign?.checkoutType;
  const [isActualOpen, setIsActualOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);
  const handleChange = (e) => {
    dispatch(getQucikDonationProject(e.slug));
  };

  const getQuickDonation = async () => {
    setLoading(true);
    const quickDonationCampaigns = await dispatch(getQucikDonation());
    const firstCampaign = quickDonationCampaigns?.payload[0];
    console.log(quickDonationCampaigns?.payload[0]);
    if (project) {
      await dispatch(getQucikDonationProject(project?.slug));
      setLoading(false);
    } else {
      await dispatch(getQucikDonationProject(firstCampaign?.slug));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    getQuickDonation();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setIsActualOpen(true);
    else setIsOpaque(false);
  }, [isOpen]);

  useEffect(() => {
    if (isActualOpen) setTimeout(() => setIsOpaque(true), 50);
  }, [isActualOpen]);

  useEffect(() => {
    if (!isOpaque)
      setTimeout(
        () => setIsActualOpen(false),
        Transitions.QUICK_DONATION_DURATION
      );
  }, [isOpaque]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className={"relative z-10" + (isActualOpen ? " block" : " hidden")}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 transition-opacity bg-grey-600">
            {/* <div className={`fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/60 transition-opacity duration-${Transitions.QUICK_DONATION_DURATION} ${isOpaque?'opacity-100':'opacity-0'}`}> */}
            <div
              className={`fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40 transition-opacity duration-75`}
            >
              <Transition.Child
                as={Fragment}
                show={isOpen}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 scale-100 "
                leaveTo="opacity-0 scale-75"
              >
                <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
                  <div className="relative grid max-h-[35rem] min-h-[35rem] w-full  sm:grid-cols-2 gap-4 overflow-hidden text-left transition-all transform sm:max-w-[816px]">
                    <div className="hidden overflow-hidden bg-white sm:block rounded-t-3xl sm:rounded-3xl">
                      {isLoading ? (
                        <ModalLoader />
                      ) : (
                        <div className="flex flex-col">
                          <div className="h-[232px] overflow-hidden">
                            <img
                              src={
                                qucikDonationProject?.campaign?.coverImage ||
                                "/images/banner/placeholder.jpg"
                              }
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-6">
                            <h2 className="mb-2 text-heading-6">
                              {qucikDonationProject?.campaign?.name ||
                                `Sample Header Goes Here`}
                            </h2>
                            {qucikDonationProject?.campaign?.descriptionText ||
                            qucikDonationProject?.campaign?.description ? (
                              <p
                                className="text-lg font-medium text-neutral-600 line-clamp-6"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    qucikDonationProject?.campaign
                                      .descriptionText ||
                                    qucikDonationProject?.campaign.description,
                                }}
                              />
                            ) : (
                              <p className="text-lg font-medium text-neutral-600 line-clamp-6">
                                {` Al-Ihsan Foundation International Limited (formed in
										2014) is a non-profit public relief organisation
										dedicated to assisting all people and families in need.
										The Arabic word Al-Ihsan means “perfection” or
										“excellence.”`}{" "}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex px-4 pt-4 pb-7.5 sm:pt-6 sm:pb-6 sm:px-6 bg-white rounded-t-3xl sm:rounded-3xl">
                      <div className="flex flex-col gap-5 sm:gap-8 grow">
                        <div className="flex justify-between">
                          <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                            Choose Donation
                          </div>
                          <button
                            className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800"
                            onClick={onClose}
                          >
                            <CloseIcon iconSize={24} />
                          </button>
                        </div>
                        <div className="flex flex-col h-full overflow-y-auto max-h-[28rem] pr-2">
                          <div className="mb-4 sm:mb-5">
                            <label
                              htmlFor="SelectProject"
                              className="block mb-2 text-sm"
                            >
                              Project Name
                            </label>
                            <Select
                              className="w-full text-sm !text-neutral-800 form-control h-11"
                              id="SelectProject"
                              value={
                                quickdonations
                                  ?.map((e) => ({
                                    label: e.name,
                                    value: e.id,
                                    slug: e.slug,
                                  }))
                                  .filter(
                                    (option) =>
                                      parseInt(option.value) ===
                                      parseInt(
                                        qucikDonationProject?.campaign?.id
                                      )
                                  )[0]
                              }
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  "--tw-ring-shadow": "0 0 #000 !important", // This line removes the ring shadow
                                  ring: "0 !important",
                                  "ring-offset": "none !important",
                                  outline: "none",
                                  ":focus": "none !important",
                                  "box-shadow": "none !important",
                                }),
                              }}
                              onChange={handleChange}
                              options={quickdonations?.map((e) => ({
                                label: e.name,
                                value: e.id,
                                slug: e.slug,
                              }))}
                            />
                          </div>

                          <GetDonation
                            project={qucikDonationProject}
                            onClose={onClose}
                            checkout={checkout}
                          />
                          {}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.memo(QuickDonation);

const GetDonation = ({ project, onClose, checkout }) => {
  switch (checkout) {
    case "COMMON":
      return (
        <CommonDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "FEDYAH":
      return (
        <FedyahDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "KURBAN":
      return (
        <QurbanDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "WATER_CAMPAIGN":
      return (
        <WaterDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "AQEEQAH_ADAHI":
      return (
        <AqeeqaDonation
          campaign={project}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "ADEEQAH_GENERAL_SACRIFICE":
      return (
        <AdeeqahDonation
          handleClose={onClose}
          isModal={true}
          campaign={project}
        />
      );
    case "ZAQAT":
      return (
        <ZaqatDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    default:
      return (
        <CommonDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
  }
};
