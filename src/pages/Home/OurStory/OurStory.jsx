
import React from 'react';
import propTypes from "prop-types";
import { ArrowLefCircleIcon, ArrowRightCircleIcon } from '../../../theme/svg-icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
};
export const OurStory = (props) => {
    const { keyindex } = props;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return <>

        <Slider {...settings}>
            <div className="!flex flex-col gap-10 md:flex-row">
                <div className="w-full md:w-6/12 h-[16.875rem] md:h-[32.5rem] overflow-hidden rounded-4xl">
                    <img src="/images/slider/our-story/1.jpg" className="object-cover w-full h-full aspect-auto" alt="" />
                </div>

                <div className="flex flex-col justify-center w-full gap-5 md:gap-10 md:w-6/12">
                    <div>
                        <h4 className="mb-5 text-[1.5rem] md:text-[2rem] leading-6 md:leading-10 font-bold">We’re on A Mission To Solve all The Problem</h4>
                        <p className="text-sm tracking-tight md:text-lg lg:mr-2">All of the people associated with Al-Ihsan Foundation International have always prioritised humanitarian aid. Our people came together because they had common goals and desires. With the goal of being properly recognised as a non-profit humanitarian relief organisation, and with the drive and persistence to reach and support those who are in need on an international and national level.</p>
                        <p className="text-sm tracking-tight md:text-lg lg:mr-2">Al-Ihsan Foundation was founded with the vision of providing humanitarian relief to all individuals and families in need of care and assistance. Our goal is to travel far and wide to reach and aid those even in the most remote regions on earth, in order to eventually rid the world of poverty and despair. </p>
                    </div>
                    <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
                        <div className="flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full" src="/images/avatar/avatar-1.jpg" alt="" />
                            <div className="font-medium">
                                <div className="font-bold heading-7 text-neutral-1000">Marvin McKinney</div>
                                <div className="text-md text-neutral-600">CEO of Google</div>
                            </div>
                        </div>
                        {/* <div className="flex justify-between">
                            <ArrowLefCircleIcon iconSize={50} />
                            <ArrowRightCircleIcon iconSize={50} />
                        </div> */}
                    </div>

                </div>
            </div>
            <div className="!flex flex-col gap-10 md:flex-row">
            <div className="w-full md:w-6/12 h-[16.875rem] md:h-[32.5rem] overflow-hidden rounded-4xl">
                    <img src="/images/media/2.png" className="object-cover w-full h-full aspect-auto" alt="" />
                </div>

                <div className="flex flex-col justify-center w-full gap-5 md:gap-10 md:w-6/12">
                    <div>
                        <h4 className="mb-5 text-[1.5rem] md:text-[2rem] leading-6 md:leading-10 font-bold">We’re on A Mission To Solve all The Problem</h4>
                        <p className="text-sm tracking-tight md:text-lg lg:mr-2">All of the people associated with Al-Ihsan Foundation International have always prioritised humanitarian aid. Our people came together because they had common goals and desires. With the goal of being properly recognised as a non-profit humanitarian relief organisation, and with the drive and persistence to reach and support those who are in need on an international and national level.</p>
                        <p className="text-sm tracking-tight md:text-lg lg:mr-2">Al-Ihsan Foundation was founded with the vision of providing humanitarian relief to all individuals and families in need of care and assistance. Our goal is to travel far and wide to reach and aid those even in the most remote regions on earth, in order to eventually rid the world of poverty and despair. </p>
                    </div>

                    <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
                        <div className="flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full" src="/images/avatar/avatar-1.jpg" alt="" />
                            <div className="font-medium">
                                <div className="font-bold heading-7 text-neutral-1000">Marvin McKinney</div>
                                <div className="text-md text-neutral-600">CEO of Google</div>
                            </div>
                        </div>
                        {/* <div className="flex justify-between">
                            <ArrowLefCircleIcon iconSize={50} />
                            <ArrowRightCircleIcon iconSize={50} />
                        </div> */}
                    </div>

                </div>
            </div>
        </Slider>
    </>;

};

OurStory.propTypes = {
    keyindex: propTypes.number
}

OurStory.defaultProps = {
    keyindex: 1
}