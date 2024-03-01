import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterestedItems } from "./basketSlice";
import { ProjectListItem } from "../projects/ProjectListItem";

export const IntrestedProjects = () => {
  const dispatch = useDispatch();
  const { interestedItems } = useSelector((state) => state.basketItem);
  useEffect(() => {
    dispatch(getInterestedItems());
  }, []);
  return (
    <section className="pb-0" aria-label="Similar Projects">
      <div className="container">
        <h2 className="text-heading-5 sm:text-heading-2 mb-7.5">
          You may be interested in...
        </h2>
        <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
          {interestedItems?.map((project, i) =>
            i ? <ProjectListItem project={project} /> : "",
          )}
        </div>
        {/* Slider control goes here */}
      </div>
    </section>
  );
};
