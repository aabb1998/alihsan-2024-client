import React, { useEffect } from "react";
import { Button } from "../../components";
import Img from "../../components/Image";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilledIcon } from "../../theme/svg-icons";
import { getBannerImages } from "../../features/home/homeSlice";
import { useQuickDonation } from "../../features/quickDonation";

const HomePageBanner = () => {
  const dispatch = useDispatch();
  const quickDonation = useQuickDonation();
  const { bannerImages } = useSelector((state) => state.settings);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };
  const getAllBannerImages = async () => {
    await dispatch(getBannerImages());
  };

  useEffect(() => {
    getAllBannerImages();
  }, []);

  return (
    <div className="home-banner">
      {" "}
      <Slider {...settings}>
        {bannerImages?.map((bannerImage) => (
          <section
            className=" md:mx-6 lg:mx-0 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0"
            data-taos-offset="300"
            aria-label="Hero Banner"
          >
            <div className="container relative h-[40.25rem] flex items-center justify-center mt-5 rounded-xl md:rounded-xl">
              <Img
                src={bannerImage?.image}
                alt="Banner-image"
                className="absolute inset-0 object-cover w-full h-full max-w-full sm:hidden z-0 rounded-xl md:rounded-xl"
              />
              <div
                className="absolute inset-0 object-cover w-full h-full max-w-full sm:block z-1 rounded-xl md:rounded-xl"
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF00 0%, #06356D 100%)",
                  opacity: 0.7,
                  transition:
                    "background 0.3s, border-radius 0.3s, opacity 0.3s",
                }}
              />
              <Img
                src={bannerImage?.image}
                alt="Banner-images"
                className="absolute inset-0 object-cover w-full h-full max-w-full sm:block z-0 opacity-90 rounded-xl md:rounded-xl"
              />

              <div className="container relative h-[40.25rem] flex items-center justify-center mt-56 z-1">
                <div className="flex flex-col items-center justify-center text-center isolate z-2">
                  <div className="mb-7.5">
                    <h1 className="max-w-[54.75rem] text-primary-100 text-[1.75rem] leading-8 md:leading-[4rem] md:text-[3.5rem] font-bold">
                      {bannerImage?.title}
                    </h1>
                    <p className="max-w-[37.875rem] mx-auto mt-6 text-sm md:text-lg text-primary-100">
                      <span>{bannerImage?.description}</span>
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      label="Donate Now"
                      onClick={() => quickDonation()}
                      leftIcon={
                        <span className="relative flex">
                          {" "}
                          <span className="absolute inline-flex w-full h-full transition-all ease-in-out delay-75 bg-red-300 rounded-full animate-ping bg-sky-400 opacity-90"></span>{" "}
                          <div className="text-red-300 rounded-full ">
                            {" "}
                            <HeartFilledIcon />{" "}
                          </div>{" "}
                        </span>
                      }
                    />
                    {/* <Button variant="secondary" label="Learn More" /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageBanner;
