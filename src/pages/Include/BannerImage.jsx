import React from 'react';

export const BannerImage =({ bannerImage = "default.jpg" }) =>{ return(
    <div className="banner-container">
        <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
            <img src={`${bannerImage}`} alt="" className="object-cover w-full h-full transition duration-500 hover:scale-110" />
        </div>
    </div>
) }

