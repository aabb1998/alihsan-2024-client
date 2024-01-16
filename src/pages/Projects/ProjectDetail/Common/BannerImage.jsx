import React from 'react';
import Img from '../../../../components/Image';

export const BannerImageComponent =({ bannerImage = "default.jpg" }) =>{ return(
    <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
        <Img src={bannerImage} alt="" className="object-cover w-full h-full transition duration-500 hover:scale-110" />
    </div>
) }

