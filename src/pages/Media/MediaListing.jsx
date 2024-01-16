import React, { Fragment, useState, useEffect } from "react";
import { ArrowRightIcon } from "../../theme/svg-icons";
import { Tab } from "@headlessui/react";
import { PostUpdates } from "./PostUpdates";
import { GroundVideos } from "./GroundVideos";
import { useLocation } from "react-router-dom";
import Img from "../../components/Image";

export const MediaListing = () => {
  const [tab, setTab] = useState("campaign");
  const { state } = useLocation();

  useEffect(() => {
    if (state) setTab("videos");
  }, []);

  return (
    <section className="mb-8">
      <div className="container">
        <h1 className="mb-6 sm:mb-7.5 text-center text-heading-6 sm:text-heading-3">
          Media
        </h1>

        <div className="mb-6 sm:mb-7.5 text-sm font-medium text-center border-b text-neutral-800 border-neutral-300">
          <Tab.Group defaultIndex={state ? 1 : 0}>
            <Tab.List className="flex flex-wrap border-b sm:gap-y-4 border-b-neutral-300">
              <Tab as={Fragment} onClick={() => setTab("campaign")}>
                {({ selected }) => (
                  <button
                    className={
                      "flex transition ease-in-out delay-150 duration-300 justify-center flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                      (selected
                        ? "border-primary-300  text-primary-300 border-b-primary-300"
                        : "")
                    }
                  >
                    Post Campaign Updates
                  </button>
                )}
              </Tab>
              <Tab as={Fragment} onClick={() => setTab("videos")}>
                {({ selected }) => (
                  <button
                    className={
                      "flex transition ease-in-out delay-150 duration-300 justify-center flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                      (selected
                        ? "border-primary-300  text-primary-300 border-b-primary-300"
                        : "")
                    }
                  >
                    On Ground Videos
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <PostUpdates isOpen={tab === "campaign"} />
              </Tab.Panel>
              <Tab.Panel>
                <GroundVideos isOpen={tab === "videos"} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export const MediaCard = ({ Title, Date, Image }) => {
  return (
    <div className="col-span-1 p-3 border border-neutral-300 rounded-2xl">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg sm:h-45">
        <Img src={`/images/banner/projects/${Image}`} alt={`${Title}`} className="object-cover w-full h-full" />
      </div>
      <p className="mb-2 text-heading-7 text-neutral-800 line-clamp-1 text-start">
        {Title}
      </p>
      <p className="mb-4 text-sm text-neutral-600">{Date}</p>
      <a
        href="#"
        className="!px-5 !py-2 !text-button-lg btn btn-secondary w-fit"
      >
        Read More <ArrowRightIcon />{" "}
      </a>
    </div>
  );
};
