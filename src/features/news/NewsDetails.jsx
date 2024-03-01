import React, { useEffect, useState } from "react";
import Share from "../../components/Share";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarIcon } from "../../theme/svg-icons";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "./news";
import Loader from "../../components/Loader";
import Img from "../../components/Image";
import PageHead from "../../components/PageHead";
import { BannerImage } from "../../pages/Include/BannerImage";

const NewsDetailsComponent = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const { news, loading, error } = useSelector((state) => state.news);
  const maxTagsToShow = 2;
  const visibleTags = showAll
    ? news?.Tags
    : news?.Tags?.slice(0, maxTagsToShow);
  const remining = news?.Tags?.length - maxTagsToShow;

  const handleShowMore = () => {
    setShowAll(!showAll);
  };
  const getNewsDetailsById = async (slug) => {
    await dispatch(getNews(slug));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    getNewsDetailsById(slug);
  }, [slug]);

  if (error) return navigate("/404");

  return (
    <div>
      <PageHead title={"News details"} />
      {loading ? (
        <div className="my-10">
          <Loader />
        </div>
      ) : (
        <div className="sm:pt-7.5 md:py-15 standard-details-page">
          <div className="banner-container">
            <div className="h-[260px] mb-5 overflow-hidden sm:h-64 md:h-[468px] md:mb-10 rounded-none sm:rounded-xl md:rounded-xl">
              <Img
                src={
                  news?.coverImage?.includes("localhost")
                    ? "/images/banner/placeholder.jpg"
                    : news?.coverImage
                }
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container !px-0">
            <div className="w-full">
              {/* <BannerImage
              bannerImage={
                impactStory?.coverImage ||
                "/images/banner/impact-stories/impact-stories.jpg"
              }
            /> */}
            </div>
          </div>

          <section aria-label="news details">
            <div className="container">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm mb-2 text-neutral-600 font-medium flex gap-1.5 items-center">
                    <CalendarIcon /> {news?.publishedAt}
                  </p>
                  <ul className="flex flex-wrap gap-2 text-sm font-bold leading-3">
                    {visibleTags?.map((tag, i) => (
                      <li
                        key={i}
                        className="p-2 text-white capitalize rounded"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.text}
                      </li>
                    ))}
                    {news?.Tags?.slice(0, visibleTags)?.map((tag) => (
                      <li
                        key={tag?.id}
                        className="p-2 text-white capitalize rounded bg-accent-300"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag?.text}
                      </li>
                    ))}
                    {news?.Tags?.length > maxTagsToShow && (
                      <li
                        className="p-2 text-white bg-red-300 rounded cursor-pointer"
                        onClick={handleShowMore}
                      >
                        {showAll ? "-" + remining : "+" + remining}
                      </li>
                    )}
                    {/* {visibleTags > initialTagsToShow && (<li onClick={showLessTags} style={{ cursor: 'pointer', color: 'white' }} className="p-2 text-white rounded bg-primary-600">-</li>)} */}
                  </ul>
                </div>

                <Button
                  label="Back"
                  className={"!py-2 text-sm"}
                  onClick={() => navigate("/news")}
                />
              </div>

              <h1 className="mb-3 break-words sm:mb-5 md:mb-10 text-heading-6 sm:text-heading-4 md:text-heading-2">
                {news?.title}
              </h1>
              <p
                dangerouslySetInnerHTML={{ __html: news?.content }}
                className="mb-5 text-sm font-medium break-words text-neutral-800"
              ></p>

              <div className="flex flex-col gap-10">
                {news?.BlogMedia?.map((e) => (
                  <BannerImage
                    key={e.id}
                    className="rounded-2.5xl"
                    bannerImage={
                      e.url || "/images/banner/impact-stories/10.jpg"
                    }
                  />
                ))}
              </div>

              <Share />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default NewsDetailsComponent;
