import React from "react";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon2,
} from "../../../theme/svg-icons";
import { useSearchParams } from "react-router-dom";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export const ShareProject = ({ id, title }) => {
	const [searchParams] = useSearchParams();
  const shareUrl = import.meta.env.VITE_APP_URL + "/project/" + id + "?tab=" + (searchParams.get('tab') || 'tab1');
  // const shareUrl = "http://localhost:3000/project/" + id;
  const share = [
    {
      link: "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl,
      icon: <FacebookIcon iconSize={24} />,
      color: "#3B5998",
    },
    {
      link: "https://twitter.com/intent/tweet?url=" + shareUrl,
      icon: <TwitterIcon iconSize={24} />,
      color: "#000000",
    },
    {
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareUrl
      )}`,
      icon: <WhatsappIcon2 iconSize={24} />,
      color: "#53CC60",
    },
    {
      link: "https://www.linkedin.com/shareArticle?url=" + shareUrl,
      icon: <LinkedinIcon iconSize={24} />,
      color: "#1275B1",
    },
  ];

  return (
    <div className="flex items-center gap-3.5 mt-6 mb-10 md:my-10">
      <div className="text-heading-7">Share:</div>
      <div className="flex items-center gap-5">
        {/* {share.map((share) => (
          <Link
            to={share.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[${share.color}]`}
          >
            {share.icon}
          </Link>
        ))} */}
        <div>
          <div className="flex items-center gap-5">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#3B5998]`}
            >
              <FacebookShareButton url={shareUrl} quote={shareUrl}>
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
              <LinkedinShareButton url={shareUrl} title={title} summary={title}>
                <LinkedinIcon iconSize={24} />{" "}
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
