import React from "react";

export const BannerImage = ({ bannerImage = "default.jpg" }) => {
  return (
    <div className="banner-container">
      <div className="h-[260px] mb-5 overflow-hidden sm:h-64 md:h-[468px] md:mb-10 rounded-none sm:rounded-xl md:rounded-xl">
        <img
          src={`${bannerImage}`}
          alt=""
          className="object-cover w-full h-full transition duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};
