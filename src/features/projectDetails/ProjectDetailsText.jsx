import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import Img from "../../components/Image";

export const ProjectDetailsText = ({ details }) => {
  const [fullScreen, setFullScreen] = useState(true);
  return (
    <>
      <div>
        <p
					dangerouslySetInnerHTML={{__html: details?.description}}
          className={`mb-2 md:mb-5 text-neutral-800 ${
            fullScreen && "line-clamp-5 sm:line-clamp-none"
          }`}
        ></p>
        {/* <p className="hidden mb-5 text-neutral-800 md:block">
          {details?.description}
        </p> */}
        {fullScreen ? (
          <Button
            variant={"btn btn-text w-full"}
            className=" text-[#2980F5] mb-6 font-medium text-md block sm:hidden"
            label={"Read More"}
            onClick={() => setFullScreen(false)}
          />
        ) : (
          <Button
            variant={"btn btn-text w-full"}
            className="block mb-6 font-medium text-md  text-[#2980F5] sm:hidden"
            label={"Read Less"}
            onClick={() => setFullScreen(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-5 md:gap-10">
        {details?.CampaignMedia?.map((e) => (
          <div className="rounded-2.5xl overflow-hidden">
            <Img
              src={e?.url}
              alt={e?.url}
              className="rounded-2.5xl object-cover min-h-45 w-full h-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};
