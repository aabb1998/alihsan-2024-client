import React, { useEffect, useState } from "react";
import { ShareProject } from "../../pages/Projects/Common/Share";
import { TopDonations } from "../projectDetails/TopDonations";
import { LiveDonations } from "./LiveDonations";
import { useParams } from "react-router-dom";
import { StoryTab } from "../../pages/Projects/ProjectDetail/Common/Story";
import { ProjectDetailsText } from "./ProjectDetailsText";
import { CommonDonation } from "./CommonDonation";
import { AqeeqaDonation } from "./AqeeqaDonation";
import { AdeeqahDonation } from "./AdeeqahDonation";
import { ZaqatDonation } from "./ZaqatDonation";
import { BannerImageComponent } from "../../pages/Projects/ProjectDetail/Common/BannerImage";
import {
  getProject,
  getQurbanGroups,
} from "../../features/projectDetails/projectDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { UpdateTab } from "./UpdateTab";
import { OrganiserComponent } from "./OrganiserComponent";
import Loader from "../../components/Loader";
import { FedyahDonation } from "./FedyahDonation";
import { QurbanDonation } from "./QurbanDonation";
import { WaterDonation } from "./WaterDonation";
import PageHead from "../../components/PageHead";
import { NoDataFound } from "../../components/NoDataFound";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { project, loading,error } = useSelector((state) => state.project);
  const props = project;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    dispatch(getProject(slug));
  }, [slug]);

  const handleClick = (e) => {
    setActiveTab(e);
  };

  useEffect(() => {
    dispatch(getQurbanGroups());
  }, [dispatch]);
  if (error) return <NoDataFound title={"No Data Found"} />;

  return (
    <div>
      {/* Project Details */}
      <PageHead title={"Project Details"} />

      <main
        className={`pb-7.5 sm:py-7.5 md:py-15 ${
          project?.campaign?.isRamadanCampaign ? "ramadan-details-page" : ""
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <section>
            <div className="banner-container">
              <BannerImageComponent
                bannerImage={project?.campaign?.coverImage}
              />
            </div>
            <div className="container">
              <div className="grid-cols-12 gap-10 md:grid">
                <div className="col-span-7">
                  <h1 className="mb-6 md:mb-10 text-heading-6 md:text-heading-2">
                    {project?.campaign?.name}
                  </h1>
                  <div className="block mb-6 md:hidden">
                    {/* <ChooseDonationFedyah /> */}
                    {project?.campaign?.checkoutType === "COMMON" && (
                      <CommonDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "FEDYAH" && (
                      <FedyahDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "KURBAN" && (
                      <QurbanDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "WATER_CAMPAIGN" && (
                      <WaterDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "AQEEQAH_ADAHI" && (
                      <AqeeqaDonation campaign={project} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "ADEEQAH_GENERAL_SACRIFICE" && (
                      <AdeeqahDonation campaign={project} />
                    )}
                    {project?.campaign?.checkoutType === "ZAQAT" && (
                      <ZaqatDonation campaign={project?.campaign} />
                    )}
                  </div>
                  <StoryTab
                    handleClick={handleClick}
                    activeTab={activeTab}
                    count={project?.campaign?.Posts?.length}
                  />
                  {/* Updates Tab */}
                  {activeTab === "tab1" && (
                    <ProjectDetailsText details={project?.campaign} />
                  )}
                  {activeTab === "tab2" && (
                    <UpdateTab posts={project?.campaign?.Posts} />
                  )}

                  <ShareProject id={slug} />
                  {/* Updates Tab */}
                  {project?.campaign?.Organizer && (
                    <OrganiserComponent
                      organizer={project?.campaign?.Organizer}
                    />
                  )}
                </div>
                <div className="grid grid-cols-12 col-span-12 gap-5 gap-y-10 sm:gap-6 md:gap-10 md:flex md:flex-col md:col-span-5">
                  <div className="hidden col-span-12 sm:col-span-12 md:block">
                    {project?.campaign?.checkoutType === "COMMON" && (
                      <CommonDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "FEDYAH" && (
                      <FedyahDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "KURBAN" && (
                      <QurbanDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "WATER_CAMPAIGN" && (
                      <WaterDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType === "AQEEQAH_ADAHI" && (
                      <AqeeqaDonation campaign={project} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "ADEEQAH_GENERAL_SACRIFICE" && (
                      <AdeeqahDonation campaign={project} />
                    )}
                    {project?.campaign?.checkoutType === "ZAQAT" && (
                      <ZaqatDonation campaign={project?.campaign} />
                    )}
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <TopDonations {...props} />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <LiveDonations {...props} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default React.memo(ProjectDetail);
