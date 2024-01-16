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

export const NewsDetailsComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const { news, loading } = useSelector((state) => state.news);
  const maxTagsToShow = 2;
  const visibleTags = showAll
    ? news?.Tags
    : news?.Tags?.slice(0, maxTagsToShow);
  const remining = news?.Tags?.length - maxTagsToShow;

  const handleShowMore = () => {
    setShowAll(!showAll);
  };
  const getNewsDetailsById = async (id) => {
    await dispatch(getNews(id));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    getNewsDetailsById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <PageHead title={"News details"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="sm:pt-7.5 md:py-15">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
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
                        className="p-2 rounded text-primary-300"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.text}
                      </li>
                    ))}
                    {news?.Tags?.slice(0, visibleTags)?.map((tag) => (
                      <li
                        key={tag?.id}
                        className="p-2 rounded text-primary-300 bg-accent-300"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag?.text}
                      </li>
                    ))}
                    {news?.Tags?.length > maxTagsToShow && (
                      <li
                        className="p-2 text-white bg-red-300 rounded"
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

              <h1 className="mb-3 sm:mb-5 md:mb-10 text-heading-6 sm:text-heading-4 md:text-heading-2">
                {news?.title}
              </h1>
              <p className="mb-5 text-sm font-medium text-neutral-800">
                {news?.content}
              </p>

              <div className="flex flex-col gap-10">
                {news?.BlogMedia?.map((e) => (
                  <BannerImage
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
