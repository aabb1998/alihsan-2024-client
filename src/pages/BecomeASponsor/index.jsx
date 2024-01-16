import React from "react";
import Slider from "react-slick";
import Img from "../../components/Image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { sponsorList } from "../../utils/constants";
import { Form } from "./Form";
import PageHead from "../../components/PageHead";

const Arrow = ({ className, style, onClick, background }) => (
  <div
    className={className}
    style={{ ...style, display: "block", background }}
    onClick={onClick}
  />
);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  nextArrow: <Arrow background="red" />,
  prevArrow: <Arrow background="green" />,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const BecomeASponsor = () => {
  return (
    <div>
      <PageHead title={'Become a sponsor'} />
      <div className="pb-7.5 md:py-15">
        <section aria-label="Become a Sponsor">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src="../images/banner/become-a-sponsor.png"
                alt="sponsor"
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 sm:mb-5 text-heading-6 sm:text-heading-3">
              Become a Sponsor
            </h1>
            <div className="mb-10 text-sm leading-5 sm:leading-6 md:text-lg text-neutral-800">
              <p>
                Al-Ihsan works in partnership with people who are disadvantaged
                and their communities to create a meaningful and lasting change
                around the world. Help become a Sponsor of Al-Ihsan Foundation
                and provide your business with an opportunity to have access to
                a unique mix of consumers. It will also give your business an
                opportunity to increase brand loyalty, create awareness and
                visibility amongst your target market, and demonstrate to the
                community that you align corporate social responsibility with
                your business. Your business will be advertised at our events,
                on our website, and in pamphlets, ensuring a mix of consumers
                are reached. Al-Ihsan endeavors to focus on being professional
                and providing the best service for its sponsor. Your business
                will receive a positive return on its investment as sponsoring
                Al-Ihsan Foundation is an easy and affordable way to promote the
                range of products and services you have to offer, raise your
                business’s profile and image, as well as promote your unique
                brands and products. Al-Ihsan Foundation holds a DGR (deductible
                gift recipient), meaning that all donations above $2 are tax
                deductible. By financially supporting us, your business will
                receive a tax statement showing your donation, allowing you to
                claim a tax deduction when it is time for tax return.
              </p>
            </div>
          </div>
          <Form />{" "}
          <div className="container">
            <h3 className="mb-5 text-heading-3">Featured Sponsor</h3>
            <div className="hidden grid-flow-row grid-cols-1 overflow-x-auto overflow-y-hidden md:grid md:grid-cols-5">
              {sponsorList.map((sponsor) => (
                <SponsorLogo key={sponsor.id} Logo={sponsor.logo} />
              ))}
            </div>
            <div className="block md:hidden">
              <Slider {...settings}>
                {sponsorList.map((sponsor) => (
                  <SponsorLogo key={sponsor.id} Logo={sponsor.logo} />
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const SponsorLogo = ({ Logo }) => {
  return (
    <div className="flex items-center justify-center p-3 md:p-14 w-full h-40 md:h-[16.5rem] md:w-auto border border-neutral-300 carousel-item">
      <Img
        src={`/images/sponsors/${Logo}`}
        alt={Logo}
        className="object-contain w-full h-full transition duration-300 ease-in-out delay-50 hover:scale-110"
      />
    </div>
  );
};

export default React.memo(BecomeASponsor);
