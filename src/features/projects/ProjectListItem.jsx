import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuickDonation from "../quickDonation/QuickDonation";
import Button from "../../components/Button";
import { useQuickDonation } from '../quickDonation'
import Img from "../../components/Image";

export const ProjectListItem = ({ project }) => {
  const quickDonation = useQuickDonation();
  return (
    <div className="transition-all ease-in border rounded-xl bg-neutral-100 border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
      <div className="flex flex-col gap-5 p-5">
        <Link to={`/project/${project?.id}`} className="w-full h-[11.875rem] md:h-44 overflow-hidden">
          <Img
            src={project?.coverImage}
            className="object-cover w-full h-full rounded-xl"
            alt="Project Title 2"
          />
        </Link>
        <div>
          <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">
            <Link to={`/project/${project?.id}`}>{project?.name}</Link>
          </h3>
          <Link to={`/project/${project?.id}`}>
            <p className="text-sm font-normal line-clamp-2">
              {project?.description}
            </p>
          </Link>
        </div>
        <Button
          className="btn btn-primary filled"
          onClick={() => quickDonation(project)}
          label="Donate now"
        />
      </div>
    </div>
  );
};
