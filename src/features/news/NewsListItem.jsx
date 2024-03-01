import React, { useState } from "react";
import { ArrowRightIcon, CalendarIcon } from "../../theme/svg-icons";
import { Link } from "react-router-dom";
import Img from "../../components/Image";

export const NewsListItem = ({ item }) => {
  const maxTagsToShow = 2;
  const [showAll, setShowAll] = useState(false);

  const visibleTags = showAll ? item.Tags : item.Tags.slice(0, maxTagsToShow);
  const remining = item?.Tags?.length - maxTagsToShow;

  const handleShowMore = () => {
    setShowAll(!showAll);
  };
  return (
    <Link to={`/news/details/${item.slug}`}>
      <div className="col-span-1 duration-700 ease-in-out rounded-xl shadow-card hover:scale-95">
        <div className="relative w-full overflow-hidden transition-all ease-in rounded-xl bg-neutral-100">
          <div className="absolute left-2.5 top-2.5 z-1 font-Tajawal text-sm font-bold leading-[0.813rem]">
            <ul className="flex flex-wrap gap-2">
              {visibleTags?.map((tag, i) => (
                <li
                  key={i}
                  className="p-2 text-white capitalize rounded text-center w-auto items-center justify-center flex-shrink-0 flex flex-col "
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.text}
                </li>
              ))}
              {item?.Tags?.length > maxTagsToShow && (
                <li
                  className="p-2 text-white bg-red-300 rounded"
                  onClick={handleShowMore}
                >
                  {showAll ? "-" + remining : "+" + remining}
                </li>
              )}
            </ul>
          </div>
          <div className="h-[12.5rem] overflow-hidden">
            <Img
              src={
                item.coverImage?.includes("localhost")
                  ? "../images/banner/placeholder.jpg"
                  : item.coverImage
              }
              className="object-cover w-full h-full rounded-t-lag"
              alt="111"
            />
          </div>
          <div className="px-5 pt-4.5 pb-5">
            <div className="flex items-center gap-2 mb-3 text-neutral-600">
              <CalendarIcon iconSize={16} />{" "}
              <span className="text-sm font-medium">{item.publishedAt}</span>
            </div>
            <h4 className="mb-4 text-heading-7 text-neutral-800 sm:text-heading-6 line-clamp-1">
              {item.title}
            </h4>
            <p className="mb-5 text-sm line-clamp-3 text-neutral-600 break-words sm:min-h-[3.75rem]">
              {item.contentText || item.content}
            </p>
            <div
              className="font-bold text-button-lg text-primary-300"
              onClick={() => history.push(`/news/details/${item.slug}`)}
            >
              Read More
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
