import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloseIcon } from "../../theme/svg-icons";
import Button from "../Button";
import Img from "../Image";

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
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 6,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

const StorySliderComponent = ({ ourWorks }) => {
  const [isOpen, setIsOpen] = useState({ open: false, item: null });
  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mb-13">
          <div>
            <h3 className="mb-3 text-heading-5 md:text-heading-3">
              Our Work, Their Voice.
            </h3>
            <p className="text-sm md:text-md text-neutral-700">
              See what they think about us.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-7.5 px-6">
        {ourWorks?.length ? (
          <Slider {...settings}>
            {ourWorks?.map((e) => (
              <StoryCard
                item={e}
                onClick={() => setIsOpen({ ...isOpen, open: true, item: e })}
              />
            ))}
          </Slider>
        ) : (
          <span>No Data Found</span>
        )}
      </div>

      <div
        className={"relative z-10" + (isOpen?.open ? " block" : " hidden")}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
              <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-bl-none rounded-br-none sm:rounded-bl-3xl sm:rounded-br-3xl rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-4 pb-6 sm:p-7.5">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold heading-7">View Story</div>
                      <div className="cursor-pointer">
                        <CloseIcon
                          onClick={() => setIsOpen({ ...isOpen, open: false })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-end gap-4 rounded-2xl bg-primary-100">
                        <div className="overflow-hidden rounded-2xl w-52 h-60">
                          <Img
                            src={isOpen?.item?.image}
                            className="object-cover object-top w-full h-full"
                            alt="person"
                          />
                        </div>
                        <div className="px-2 py-4">
                          <h6 className="mb-1 text-heading-7 sm:text-heading-6 text-primary-300 line-clamp-1">
                           {isOpen?.item?.name}
                          </h6>
                          <p className="text-sm font-medium text-neutral-700 line-clamp-1">
                            {isOpen?.item?.title}
                          </p>
                        </div>
                      </div>
                      <div className="overflow-auto max-h-60">
                        <p className="text-sm font-medium sm:text-md text-neutral-900 line-clamp-4">
                          {isOpen?.item?.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Button
                        className="btn btn-dark filled"
                        label={"Close"}
                        onClick={() => setIsOpen({ ...isOpen, open: false })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*</div>*/}
    </div>
  );
};

const StoryCard = ({ item, onClick }) => {
  return (
    <div className="flex flex-col flex-none gap-5 snap-center carousel-item">
      <div className="overflow-hidden w-55 h-80 rounded-30">
        <Img
          src={item?.image}
          alt={`${item?.name} - ${item?.title}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h4 className="mb-1.5">{item?.name}</h4>
        <p className="font-Inter">{item?.title}</p>
      </div>
      <div>
        <Button
          className="text-xs text-[#2980F5]"
          variant={"none"}
          label="Read Full Story →"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default StorySliderComponent;
