import React, { useEffect, useState } from "react";
import { ShareProject } from "../../pages/Projects/Common/Share";
import { TopDonations } from "./TopDonations";
import { LiveDonations } from "./LiveDonations";
import { useParams, useSearchParams } from "react-router-dom";
import { StoryTab } from "../../pages/Projects/ProjectDetail/Common/Story";
import { ProjectDetailsText } from "./ProjectDetailsText";
import { CommonDonation } from "./CommonDonation";
import { AqeeqaDonation } from "./AqeeqaDonation";
import { AdeeqahDonation } from "./AdeeqahDonation";
import { ZaqatDonation } from "./ZaqatDonation";
import { BannerImageComponent } from "../../pages/Projects/ProjectDetail/Common/BannerImage";
import { getProject, getQurbanGroups } from "./projectDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { UpdateTab } from "./UpdateTab";
import { OrganiserComponent } from "./OrganiserComponent";
import Loader from "../../components/Loader";
import { FedyahDonation } from "./FedyahDonation";
import { QurbanDonation } from "./QurbanDonation";
import { WaterDonation } from "./WaterDonation";
import PageHead from "../../components/PageHead";
import { useNavigate } from "react-router-dom";
import { ProjectListItem } from "../projects/ProjectListItem";
// import { Helmet } from 'react-helmet-async';
import RamadanFoodPackDonation from "./RamadanFoodPackDonation";
import RamadanHotMeals from "./RamadanHotMeals";
import RamadanZakatAlFitr from "./RamadanZakatAlFitr";
import RamadanEidGifts from "./RamadanEidGifts";
import RamadanComboPack from "./RamadanComboPack";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { project, loading, error } = useSelector((state) => state.project);
  const props = project;
  const dispatch = useDispatch();
  // const shareUrl = import.meta.env.VITE_APP_URL + "/project/";
  const navigate = useNavigate();
  const shareUrl = "/project/";
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "tab1";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    dispatch(getProject(slug));
  }, [slug]);

  const handleClick = (e) => {
    setSearchParams({ tab: e });
  };

  useEffect(() => {
    dispatch(getQurbanGroups());
  }, [dispatch]);
  if (error) return navigate("/404");

  return (
    <div>
      <main
        className={`pb-7.5 sm:py-7.5 md:py-15 ${
          project?.campaign?.isRamadanCampaign
            ? "ramadan-details-page"
            : "standard-details-page"
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
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_FOOD_PACK" && (
                      <RamadanFoodPackDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_HOT_MEALS" && (
                      <RamadanHotMeals campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_ZAKAT_AL_FITR" && (
                      <RamadanZakatAlFitr campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_EID_GIFTS" && (
                      <RamadanEidGifts campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_COMBO_PACK" && (
                      <RamadanComboPack campaign={project?.campaign} />
                    )}
                  </div>
                  <StoryTab
                    handleClick={handleClick}
                    activeTab={activeTab}
                    count={project?.campaign?.Posts?.length}
                  />
                  {/* Updates Tab */}
                  {activeTab === "tab1" && (
                    <ProjectDetailsText
                      project={project}
                      details={project?.campaign}
                    />
                  )}
                  {activeTab === "tab2" && (
                    <UpdateTab
                      slug={slug}
                      title={project?.campaign?.name}
                      posts={project?.campaign?.Posts}
                    />
                  )}

                  <ShareProject id={slug} title={project?.campaign?.name} />
                  {/* Updates Tab */}
                  {project?.campaign?.organizerName && (
                    <OrganiserComponent
                      organizerName={project.campaign.organizerName}
                      organizerEmail={project.campaign.organizerEmail}
                      organizerDescription={
                        project.campaign.organizerDescription
                      }
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
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_FOOD_PACK" && (
                      <RamadanFoodPackDonation campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_HOT_MEALS" && (
                      <RamadanHotMeals campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_ZAKAT_AL_FITR" && (
                      <RamadanZakatAlFitr campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_EID_GIFTS" && (
                      <RamadanEidGifts campaign={project?.campaign} />
                    )}
                    {project?.campaign?.checkoutType ===
                      "RAMADAN_COMBO_PACK" && (
                      <RamadanComboPack campaign={project?.campaign} />
                    )}
                  </div>
                  {project?.campaign?.checkoutType === "ZAQAT" ||
                  project?.campaign?.checkoutType === "FEDYAH" ||
                  project?.campaign?.checkoutType ===
                    "RAMADAN_ZAKAT_AL_FITR" ? null : (
                    <>
                      <div className="col-span-12 sm:col-span-6">
                        <LiveDonations {...props} />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <TopDonations {...props} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <section aria-label="Updates" className="mt-10">
                <div className="container">
                  <h2 className="mb-4">Related Campaigns</h2>

                  <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
                    {project?.campaignsRelated?.length ? (
                      <>
                        {project?.campaignsRelated?.map((campaign) => (
                          <ProjectListItem
                            project={campaign}
                            key={campaign.id}
                          />
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default React.memo(ProjectDetail);
