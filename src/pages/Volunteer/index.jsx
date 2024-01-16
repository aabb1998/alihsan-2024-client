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

export const VolunteerWithUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageHead title={'Volunteer with us'}/>
      <div className="pb-7.5 md:py-15">
        <section aria-label="Volunteer With Us">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src={"../images/banner/volunteer-with-us.png"}
                alt="sponsor"
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 sm:mb-5 text-heading-6 sm:text-heading-3">
              Volunteer With Us
            </h1>
            <p className="mb-3 text-sm leading-5 sm:mb-4 sm:leading-6 md:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited (formed in 2014) is a
              non-profit public relief organisation dedicated to assisting all
              people and families in need. The Arabic word Al-Ihsan means
              “perfection” or “excellence.” Perfecting our deeds and behaviours
              is a matter of inner faith born of religious teachings, and it is
              one of our organization’s distinguishing pillars that hold us up
              and brings us together. We aspire to be the best in the business
              when it comes to providing aid and assistance to people, and we do
              it through a variety of services and programmes. We provide the
              following:
            </p>
            <ul className="ml-5 leading-5 list-disc text-button-md md:text-heading-7 sm:leading-6 text-neutral-700">
              <li>International and famine-affected area</li>
              <li>
                People with disabilities, the elderly, and children receive
                international care
              </li>
              <li>Services for women experiencing domestic violence</li>
              <li>
                International community visits to the sick, people with
                disabilities, the elderly, and children
              </li>
              <li>
                International aid for the homeless (blankets, clothes, and food
                drives) and the youth (establishing and sponsoring youth
                centres)
              </li>
              <li>Awareness programmes through community events</li>
              <li>
                International emergency relief to individuals and families
                struggling to cope
              </li>
            </ul>
          </div>
          <Form />

          <div className="container">
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
          </div>
          <div className="container">
            <div className="grid-flow-col-1 grid-flow-col overflow-x-hidden overflow-y-hidden sm:grid-flow-row sm:grid-cols-3 md:grid-cols-4 gap-7.5 hidden md:grid">
              {volunteerList.map((volunteer) => (
                <Volunteer
                  key={volunteer.id}
                  Image={volunteer.image}
                  VolunteerName={volunteer.name}
                />
              ))}
            </div>
          </div>
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
