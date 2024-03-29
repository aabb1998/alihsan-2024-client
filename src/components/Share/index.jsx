import React from "react";
import {
  LinkedinIcon,
  WhatsappIcon2,
  TwitterIcon,
  FacebookIcon,
} from "../../theme/svg-icons";

import { Link, useLocation } from "react-router-dom";

const Share = () => {
  const location = useLocation();
  const shareUrl = process.env.REACT_APP_URL + location.pathname;
  const share = [
    {
      link: "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl,
      icon: <FacebookIcon iconSize={24} />,
      color: "#3B5998",
    },
    {
      link: "https://twitter.com/intent/tweet?url=" + shareUrl,
      icon: <TwitterIcon iconSize={20} />,
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
        {share.map((share, index) => (
          <Link
            key={index}
            to={share.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[${share.color}]`}
          >
            {share.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Share;
