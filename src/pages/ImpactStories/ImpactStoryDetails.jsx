import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BannerImage } from "../Include/BannerImage";
import { getImpactStory } from "../../features/impactStories/impactStories";
import Share from "../../components/Share";
import { Button } from "../../components";
import { Im } from "react-flags-select";
import Img from "../../components/Image";
import PageHead from "../../components/PageHead";
import { NoDataFound } from "../../components/NoDataFound";

const ImpactStoryDetails = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { impactStory, error } = useSelector((state) => state.impactStories);
  useEffect(() => {
    dispatch(getImpactStory(slug));
  }, [slug]);

  if (error) {
    return <NoDataFound title={"No Data Found"} />;
  }
  return (
    <div>
      <PageHead title={"Impact Story Details"} />
      <div className="sm:pt-7.5 md:py-15">
        <div className="container !px-0">
          <div className="w-full">
            <BannerImage
              bannerImage={
                impactStory?.coverImage ||
                "/images/banner/impact-stories/impact-stories.jpg"
              }
            />
          </div>
        </div>
        <section aria-label="Impact Stories">
          <div className="container">
            <div className="flex items-center justify-between gap-5 mb-3 sm:mb-10">
              <h1 className="break-words text-heading-6 sm:text-heading-2 line-clamp-2">
                {impactStory?.title}
              </h1>
              <div className="">
                <Button
                  className={"!py-2 text-sm"}
                  label="Back"
                  onClick={() => navigate("/impact-stories")}
                />
              </div>
            </div>

            <p dangerouslySetInnerHTML={{__html: impactStory?.description}} className="mb-5 text-sm font-medium break-words text-neutral-800"></p>
            <div className="flex flex-col gap-10 sm:flex-row">
              {impactStory?.ImpactStoryMedia.map((e) => (
                <div className="w-full overflow-hidden h-45 sm:h-[18.25rem] flex-grow-1">
                  <Img
                    src={e?.url}
                    className="rounded-2.5xl object-cover w-full h-full"
                    alt="imapasct stories"
                  />
                </div>
              ))}
            </div>

            <Share />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactStoryDetails;
