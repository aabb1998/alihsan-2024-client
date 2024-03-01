import React, { useEffect } from "react";
import { Button } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRightIcon } from "../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getMediaDetails } from "../../features/media/mediaSlice";
import Loader from "../../components/Loader";
import PageHead from "../../components/PageHead";
import { NoDataFound } from "../../components/NoDataFound";

const MediaDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mediaPost, relatedPost, loading, error } = useSelector(
    (state) => state.medias
  );

  const getMediaPostCampaignDetails = async (slug) => {
    await dispatch(getMediaDetails(slug));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getMediaPostCampaignDetails(slug);
  }, [slug]);
  if (error) return navigate("/404");

  return (
    <div>
      <PageHead title={"Media details"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:pt-7.5 md:py-15">
          <section aria-label="Impact Stories">
            <div className="banner-container">
              <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
                <img
                  src={
                    mediaPost?.url?.includes("localhost")
                      ? "/images/banner/placeholder.jpg"
                      : mediaPost?.url
                  }
                  alt="sponsor"
                  className="object-cover w-full h-full transition duration-500 hover:scale-110"
                />
              </div>
            </div>
            <div className="container">
              <div className="flex items-center justify-between gap-5 mb-3 sm:mb-5">
                <div>
                  <p className="text-sm font-medium text-neutral-600">
                    {mediaPost?.createdDate}
                  </p>
                  <h1 className="break-words text-heading-6 sm:text-heading-2 line-clamp-2">
                    {mediaPost?.title}
                  </h1>
                </div>
                <div className="">
                  <Button
                    onClick={() => navigate("/media")}
                    className={"!py-2 text-sm"}
                    label="Back"
                  />
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: mediaPost?.description }}
                className="mb-5 text-sm font-medium break-words text-neutral-800"
              ></p>
              <div className="mt-5 sm:mt-14">
                <div className="flex items-center justify-between gap-2 mb-10 sm:mb-6">
                  <h4 className="text-heading-6 text-neutral-1000 line-clamp-1">
                    Related Post Campaign Updates
                  </h4>
                  <Link
                    to={"/media"}
                    className="!px-5 !py-3 !text-button-lg text-primary-300 gap-2 w-fit hidden sm:flex"
                  >
                    See All <ArrowRightIcon />{" "}
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-y-10 sm:gap-y-5 gap-x-5 sm:grid-cols-2 md:grid-cols-4">
                  {relatedPost?.map((post) => (
                    <div
                      key={post?.id}
                      className="col-span-1 p-3 border border-neutral-300 rounded-2xl"
                    >
                      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg sm:h-45">
                        <img
                          src={post?.url || "../images/media/1.png"}
                          alt="media"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="mb-2 text-heading-7 text-neutral-800 line-clamp-1 text-start">
                        {post?.title}
                      </p>
                      <p className="mb-4 text-sm text-neutral-600">
                        {post?.createdDate}
                      </p>
                      <Link
                        to={`/media/details/${post?.slug}`}
                        className="!px-5 !py-2 !text-button-lg btn btn-secondary w-fit"
                      >
                        Read More <ArrowRightIcon />{" "}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mx-auto mt-10 text-center">
                  <Link className="!px-5 !py-3 !text-button-lg text-primary-300 gap-2 justify-center flex w-fit sm:hidden">
                    See All <ArrowRightIcon />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default MediaDetails;
