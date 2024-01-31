import React from "react";
import Slider from "react-slick";
import Img from "../../components/Image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { currencyConfig, sponsorList } from "../../utils/constants";
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
      <PageHead title={"Become a sponsor"} />
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
              Become a Sponsor and Make a Difference.
            </h1>
            <div className="mb-10 text-sm leading-5 sm:leading-6 md:text-lg text-neutral-800">
              <p>
                Thank you for considering sponsorship with Al-Ihsan Foundation.
                Your support is crucial in building a legacy of impact,
                resilience, and shared humanity. By partnering with us, you join
                a community dedicated to providing humanitarian assistance and
                creating a brighter future for all through compassion and
                support.
              </p>
            </div>
          </div>
          <div className="container">
            <h2 className="mb-3 text-xl sm:mb-5 text-heading-6 sm:text-heading-3">
              Sponsorship Opportunities
            </h2>
            <div className="mb-10 text-sm leading-5 sm:leading-6 md:text-lg text-neutral-800">
              <p>
                Explore various sponsorship levels, each offering unique
                benefits such as brand visibility, recognition, and exclusive
                access to events. Whether you represent a small business,
                corporation, or are an individual, there's a sponsorship package
                aligning with your goals. Benefit from tax-deductible donations
                (above $2) with Al-Ihsan Foundation's Deductible Gift Recipient
                (DGR) status.
              </p>
            </div>
          </div>
          <div className="container">
            <h2 className="mb-3 text-xl sm:mb-5 text-heading-6 sm:text-heading-3">
              Recognition and Visibility
            </h2>
            <div className="mb-10 text-sm leading-5 sm:leading-6 md:text-lg text-neutral-800">
              <p>
                As a sponsor, enjoy prominent recognition on our website, in
                promotional materials, and during events. We promote and support
                the organisations and individuals making our work possible.
              </p>
            </div>
          </div>
          <div className="container">
            <h2 className="mb-3 text-xl sm:mb-5 text-heading-6 sm:text-heading-3">
              Ready to Make a Difference?
            </h2>
            <div className="mb-10 text-sm leading-5 sm:leading-6 md:text-lg text-neutral-800">
              <p>
                Have questions or ready to discuss sponsorship details? Fill out
                the form below, and we'll be in touch. We look forward to
                discussing how your business can make a lasting impact through
                sponsorship with Al-Ihsan Foundation. Your sponsorship can
                directly impact the lives of those we serve. Together, let's
                make a difference.
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
    <div className="flex items-center justify-center h-40 md:h-[16.5rem] md:w-auto border border-neutral-300 carousel-item">
      <Img
        src={Logo}
        alt={Logo}
        className="object-contain w-full h-full transition duration-300 ease-in-out delay-50 hover:scale-110"
      />
    </div>
  );
};

export default React.memo(BecomeASponsor);
