import React, { useState } from "react";
import {
  CloseIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon2,
} from "../../theme/svg-icons";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

// import Button from '../Button';

export default function ShareModal({ visible, onClose, slug, title }) {
  const shareUrl =
    import.meta.env.VITE_APP_URL + "/project/" + slug + "?tab=tab2";
  return (
    <>
      <div
        className={"relative z-10 " + (visible ? "" : "hidden")}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col flex-grow w-100">
                    <div className="flex justify-between mb-4">
                      <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                        Share Campaign Updates
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onClose} />
                      </button>
                    </div>
                    <div className="mt-1 sm:mt-2">
                      <p className="font-medium text-neutral-600 text-md">
                        <div className="flex items-center gap-5">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#3B5998]`}
                          >
                            <FacebookShareButton
                              url={shareUrl}
                              quote={shareUrl}
                            >
                              <FacebookIcon iconSize={24} />
                            </FacebookShareButton>
                          </div>
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#000000]`}
                          >
                            <TwitterShareButton url={shareUrl} title={title}>
                              <TwitterIcon iconSize={24} />
                            </TwitterShareButton>
                          </div>
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#53CC60]`}
                          >
                            <WhatsappShareButton url={shareUrl} title={title}>
                              <WhatsappIcon2 iconSize={24} />
                            </WhatsappShareButton>
                          </div>
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#1275B1]`}
                          >
                            <LinkedinShareButton
                              url={shareUrl}
                              title={title}
                              summary={title}
                            >
                              <LinkedinIcon iconSize={24} />{" "}
                            </LinkedinShareButton>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
