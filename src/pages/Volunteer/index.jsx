import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { volunteerList } from "../../utils/constants";
import Img from "../../components/Image";
import { Form } from "./Form";
import PageHead from "../../components/PageHead";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  /*
  slidesToShow: 4,
  slidesToScroll: 4,
  */
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    /*
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },*/
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

const VolunteerWithUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageHead title={"Volunteer with us"} />
      <div className="pb-7.5 md:py-15 standard-details-page">
        <section aria-label="Volunteer With Us">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src={
                  "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/WhatsApp+Image+2024-02-06+at+16.16.13.jpeg"
                }
                alt="sponsor"
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 sm:mb-5 text-heading-6 sm:text-heading-3">
              Are you ready to be a force for positive change?
            </h1>
            <p className="mb-3 text-sm leading-5 sm:mb-4 sm:leading-6 md:text-lg text-neutral-800">
              Al-Ihsan Foundation invites you to become a volunteer and to play
              a role in making a positive impact on vulnerable communities.
            </p>
            <br />
            <p className="mb-3 text-sm leading-5 sm:mb-4 sm:leading-6 md:text-lg text-neutral-800">
              As a volunteer, you’ll contribute to meaningful change, benefit
              from diverse opportunities, build connections, experience personal
              growth, and enjoy flexible commitments.
            </p>
            <br />
            <p className="mb-3 text-sm leading-5 sm:mb-4 sm:leading-6 md:text-lg text-neutral-800">
              If you’re ready to commence on this meaningful journey with us,
              complete the form below and be part of impactful change.
            </p>
          </div>
          <Form />

          {/* <div className="container">
            <h3 className="mb-5 text-heading-6 sm:text-heading-4">
              Meet Our Volunteers
            </h3>
            <div className="block md:hidden">
              <Slider {...settings}>
                {volunteerList.map((volunteer) => (
                  <Volunteer
                    key={volunteer.id}
                    Image={volunteer.image}
                    VolunteerName={volunteer.name}
                  />
                ))}
              </Slider>
            </div>
          </div> */}
          {/* <div className="container">
            <div className="grid-flow-col-1 grid-flow-col overflow-x-hidden overflow-y-hidden sm:grid-flow-row sm:grid-cols-3 md:grid-cols-4 gap-7.5 hidden md:grid">
              {volunteerList.map((volunteer) => (
                <Volunteer
                  key={volunteer.id}
                  Image={volunteer.image}
                  VolunteerName={volunteer.name}
                />
              ))}
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export const Volunteer = ({ Image, VolunteerName }) => {
  return (
    <div className="flex flex-col gap-5 carousel-item">
      <div className="overflow-hidden rounded-30 w-full lg:w-[19.25rem] sm:w-full h-[23.75rem]">
        <Img
          src={`/images/volunteers/${Image}`}
          alt={VolunteerName}
          className="object-cover w-full h-full transition duration-500 hover:scale-110"
        />
      </div>
      <p className="text-heading-6 sm:text-heading-5">{VolunteerName}</p>
    </div>
  );
};

export default VolunteerWithUs;
