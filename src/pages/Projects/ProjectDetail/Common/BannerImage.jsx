import React from "react";
import Img from "../../../../components/Image";

export const BannerImageComponent = ({ bannerImage = "default.jpg" }) => {
  return (
    <div className="h-[300px] mb-5 overflow-hidden sm:h-[330px] md:h-[568px] md:mb-10 rounded-none sm:rounded-xl md:rounded-xl">
      <Img
        src={bannerImage}
        alt=""
        className="object-cover w-full h-full transition duration-500 hover:scale-110"
      />
    </div>
  );
};
