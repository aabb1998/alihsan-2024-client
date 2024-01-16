import React from "react";
import { ArrowRightIcon } from "../../theme/svg-icons";
import { Link } from "react-router-dom";
import Img from "../../components/Image";

export const ImpactStoryListItem = ({ item }) => {
  return (
    <div className="col-span-1 p-3 border border-neutral-300 rounded-2xl">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
        <Img
          src={`${item?.coverImage || "/images/banner/impact-stories/2.jpg"}`} className="object-cover w-full h-full"
          alt={`${item?.title}`}
        />
      </div>
      <p className="mb-3 text-heading-7 sm:text-heading-6 text-neutral-800 line-clamp-2">
        {item?.title}
      </p>
      <p className="mb-5 text-sm text-neutral-600 line-clamp-2">
        {item?.description}
      </p>
      <Link
        to={`/impact-story/${item?.id}`}
        className="btn btn-secondary !text-button-lg w-fit !px-5 !py-1.5"
      >
        View <ArrowRightIcon />{" "}
      </Link>
    </div>
  );
};
