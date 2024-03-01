import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import Img from "../../components/Image";
import { HeartFilledIcon } from "../../theme/svg-icons";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useQuickDonation } from "../../features/quickDonation";
export const ProjectDetailsText = ({ details, project }) => {
  const [fullScreen, setFullScreen] = useState(true);
  const navigate = useNavigate();
  const quickDonation = useQuickDonation();
  return (
    <>
      <div>
        <p
          dangerouslySetInnerHTML={{ __html: details?.description }}
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
        <div className="flex flex-row gap-4 mb-4">
          {/* <Button
            label="Donate Now"
            variant={"primaryFull"}
            className={"text-sm"}
            onClick={() => quickDonation()}
            leftIcon={
              <span className="relative flex">
                <span className="absolute inline-flex w-full h-full transition-all ease-in-out delay-75 bg-red-300 rounded-full animate-ping bg-sky-400 opacity-90"></span>
                <div className="text-red-300 rounded-full ">
                  <HeartFilledIcon />
                </div>
              </span>
            }
          /> */}
          {project?.campaign?.CampaignCategory?.name === "Zakaat" && (
            <>
              <Button
                className="btn btn-dark filled"
                onClick={() => navigate("/zakat-calculator")}
                label="Calculate your Zakat"
                leftIcon={<CalculateIcon />}
              />
            </>
          )}
        </div>
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
