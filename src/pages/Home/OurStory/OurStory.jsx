import React from "react";
import propTypes from "prop-types";
import {
  ArrowLefCircleIcon,
  ArrowRightCircleIcon,
} from "../../../theme/svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "../../../components/Image";
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

  return (
    <>
      <Slider {...settings}>
        <div className="!flex flex-col gap-10 md:flex-row">
          <div className="w-full md:w-6/12 h-[16.875rem] md:h-[32.5rem] overflow-hidden rounded-4xl">
            <Img
              src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/banner++Large.jpeg"
              className="object-cover w-full h-full aspect-auto"
              alt=""
            />
          </div>

          <div className="flex flex-col justify-center w-full gap-5 md:gap-10 md:w-6/12">
            <div>
              <h4 className="mb-5 text-[1.5rem] md:text-[2rem] leading-6 md:leading-10 font-bold">
                United in Compassion
              </h4>
              <p className="text-sm tracking-tight md:text-lg lg:mr-2">
                Our mission revolves around perfection and excellence, as
                reflected in our chosen name, "Ihsan." This name signifies our
                commitment to perfecting our deeds and behaviours, rooted in our
                religious teachings. Having met families, listened to their
                stories, and witnessed their challenges, I can attest to the
                urgency of our cause.
              </p>
              <br />
              <p className="text-sm tracking-tight md:text-lg lg:mr-2">
                Join us in our initiative dedicated to compassion and excellence
                in charitable pursuits. Our goal is clear: to positively impact
                the lives of those in need, inspired by the transformative power
                of charity.
              </p>
              <br />
              <p className="text-sm tracking-tight md:text-lg lg:mr-2">
                Your presence strengthens our pursuit of making a lasting
                impact, bringing hope, relief, and empowerment to those in need.
                Let's build a future filled with empathy, kindness, and
                boundless generosity together.
              </p>
              <br />
              <p className="text-sm tracking-tight md:text-lg lg:mr-2">
                Thank you for being an integral part of Al-Ihsan Foundation's
                journey.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src="/images/avatar/dannounavatar.png"
                  alt=""
                />
                <div className="font-medium">
                  <div className="font-bold heading-7 text-neutral-1000">
                    Ahmed Dannoun
                  </div>
                  <div className="text-md text-neutral-600">Co-Founder</div>
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
    </>
  );
};

OurStory.propTypes = {
  keyindex: propTypes.number,
};

OurStory.defaultProps = {
  keyindex: 1,
};

// <div className="!flex flex-col gap-10 md:flex-row">
//   <div className="w-full md:w-6/12 h-[16.875rem] md:h-[32.5rem] overflow-hidden rounded-4xl">
//     <Img
//       src="/images/media/2.png"
//       className="object-cover w-full h-full aspect-auto"
//       alt=""
//     />
//   </div>

//   <div className="flex flex-col justify-center w-full gap-5 md:gap-10 md:w-6/12">
//     <div>
//       <h4 className="mb-5 text-[1.5rem] md:text-[2rem] leading-6 md:leading-10 font-bold">
//         We’re on A Mission To Solve all The Problem
//       </h4>
//       <p className="text-sm tracking-tight md:text-lg lg:mr-2">
//         All of the people associated with Al-Ihsan Foundation
//         International have always prioritised humanitarian aid. Our
//         people came together because they had common goals and desires.
//         With the goal of being properly recognised as a non-profit
//         humanitarian relief organisation, and with the drive and
//         persistence to reach and support those who are in need on an
//         international and national level.
//       </p>
//       <p className="text-sm tracking-tight md:text-lg lg:mr-2">
//         Al-Ihsan Foundation was founded with the vision of providing
//         humanitarian relief to all individuals and families in need of
//         care and assistance. Our goal is to travel far and wide to reach
//         and aid those even in the most remote regions on earth, in order
//         to eventually rid the world of poverty and despair.{" "}
//       </p>
//     </div>

//     <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
//       <div className="flex items-center gap-3">
//         <img
//           className="w-10 h-10 rounded-full"
//           src="/images/avatar/avatar-1.jpg"
//           alt=""
//         />
//         <div className="font-medium">
//           <div className="font-bold heading-7 text-neutral-1000">
//             Marvin McKinney
//           </div>
//           <div className="text-md text-neutral-600">CEO of Google</div>
//         </div>
//       </div>
//       {/* <div className="flex justify-between">
//                     <ArrowLefCircleIcon iconSize={50} />
//                     <ArrowRightCircleIcon iconSize={50} />
//                 </div> */}
//     </div>
//   </div>
// </div>;
