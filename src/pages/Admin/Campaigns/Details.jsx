import React, { Fragment, useEffect } from "react";
import { ArrowLeftIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { Tab } from "@headlessui/react";
import CampaignDonations from "./CampaignDonations";
import CampaignForm from "./CampaignForm";
import CampaignUpdates from "./CampaignUpdates";
import { loadCampaignDetails } from "../../../features/adminCampaigns";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const campaignId = params?.id;
  const dispatch = useDispatch();

  const campaignDetails = useSelector(
    ({ adminCampaigns }) => adminCampaigns.details,
  );

  useEffect(() => {
    if (campaignId != campaignDetails.id) {
      dispatch(loadCampaignDetails(campaignId));
    } else if(!campaignDetails.loading && campaignDetails.error && campaignDetails.error==='NotFound')
      navigate('/admin/campaigns')
  }, [campaignId, campaignDetails]);

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {/* dashboard title rea */}
      <div className="flex flex-wrap items-center justify-between w-full gap-4">
        <button className="flex items-center text-button-lg gap-x-2" onClick={() => navigate('/admin/campaigns')}>
          <span>
            <ArrowLeftIcon />{" "}
          </span>
          Back to Campaigns
        </button>
        {/*
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <Button
            className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
            variant=""
            type="submit"
            label={"Delete"}
          />
          <Button
            className="flex-grow btn btn-dark text-button-md md:text-button-lg"
            variant=""
            type="submit"
            label={"Save as Draft"}
          />
          <Button
            className="flex-grow btn btn-primary text-button-md md:text-button-lg"
            variant=""
            type="submit"
            label={"Publish"}
          />
        </div>
        */}
      </div>
      <div className="mt-7.5">
        <Tab.Group>
          <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
            {["Edit Campaign", "Updates", "Donations"].map((i,j) => (
              <Tab as={Fragment} key={j}>
                {({selected}) => (
                  <div className={"flex justify-center cursor-pointer flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none "+(selected?"!border-b-primary-300 !text-primary-300":"")}>{i}</div>
                )}
              </Tab>
            ))}
            {/*
            <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">
              Updates
            </Tab>
            <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">
              Donations
            </Tab>*/}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <CampaignForm />
            </Tab.Panel>
            <Tab.Panel>
              <CampaignUpdates />
            </Tab.Panel>
            <Tab.Panel>
              <CampaignDonations />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default CampaignDetails;
