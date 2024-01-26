import React, { useEffect } from "react";
import { useState } from "react";
import { Edit3Icon } from "../../../theme/svg-icons";
import BannerEdit from "./BannerEdit";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "../../../features/home/homeSlice";
import UpdateFeatureCampaign from "./UpdateFeatureCampaign";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setOpenUpdate] = useState(false);
  const { settings } = useSelector((state) => state.settings);

  const getAllSettings = async () => {
    await dispatch(getSettings());
  };

  useEffect(() => {
    getAllSettings();
  }, [isOpenUpdate]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        {/* dashboard title rea */}
        <div className="w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Homepage CMS</h5>
        </div>
        {/* card area */}
        <div className="mt-5 md:mt-7.5 flex flex-col gap-5 sm:gap-7.5">
          <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border hover:shadow-card hover:border-primary-300 sm:items-center rounded-2xl border-neutral-300">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h5 className="text-heading-6 text-neutral-1000">
                Homepage Banner (AU)
              </h5>
              <p className="text-sm font-medium text-neutral-600">
                Homepage Banner (AU)
              </p>
            </div>
            <button
              className="btn bg-primary-100 !p-2 me-6"
              onClick={() => setIsOpen(true)}
            >
              <Edit3Icon />
            </button>
            {isOpenUpdate && (
              <UpdateFeatureCampaign
                onClose={() => setOpenUpdate(false)}
                data={settings}
              />
            )}
            {isOpen && (
              <BannerEdit
                getAllSettings={getAllSettings}
                onClose={() => setIsOpen(false)}
                data={settings?.bannerImage}
              />
            )}
          </div>
          <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border hover:shadow-card hover:border-primary-300 sm:items-center rounded-2xl border-neutral-300">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h5 className="text-heading-6 text-neutral-1000">
                Homepage Banner (USA)
              </h5>
              <p className="text-sm font-medium text-neutral-600">
                Homepage Banner (USA)
              </p>
            </div>
            <button className="btn bg-primary-100 !p-2 me-6">
              <Edit3Icon />
            </button>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border hover:shadow-card hover:border-primary-300 sm:items-center rounded-2xl border-neutral-300">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h5 className="text-heading-6 text-neutral-1000">
                Feature Campaigns
              </h5>
              <p className="text-sm font-medium text-neutral-600">
                Feature Campaigns
              </p>
            </div>
            <button className="btn bg-primary-100 !p-2 me-6">
              <Edit3Icon onClick={() => setOpenUpdate(true)} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
