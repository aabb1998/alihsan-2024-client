import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  HeartFilledIcon,
  InfoIcon,
} from "../../theme/svg-icons";
import Button from "../../components/Button";
import { SnackMessages } from "../../components/Toast";
import Img from "../../components/Image";
import WorldMap from "../../components/WorldMap";
import { Carousal } from "../../components";
import { OurStory } from "./OurStory/OurStory";
import { ProjectListItem } from "../../features/projects/ProjectListItem";
import { useQuickDonation } from "../../features/quickDonation";
import { homeData } from "./homeAPI";
import HomePageBanner from "./HomePageBanner";
import CookieConsent from "react-cookie-consent";
import ReactGA from "react-ga";
import Loader from "../../components/Loader";

const counts = [
  {
    number: "90",
    name: "Completed Campaigns",
  },
  {
    number: "12+ million",
    name: "Lives Impacted",
  },
  {
    number: "23",
    name: "Countries Reached",
  },
];

const HomeComponent = () => {
  const { showErrorMessage } = SnackMessages();
  const navigate = useNavigate();
  let getHomeDataCalled = false;
  const quickDonation = useQuickDonation();
  const [homeDataState, sethomeDataState] = useState({
    projects: [],
    blogs: [],
  });

  async function getHomeData() {
    try {
      const response = await homeData();
      if (response.status === 200) {
        sethomeDataState({
          ...homeDataState,
          projects: response.data.payload.projects,
          blogs: response.data.payload.blogs,
        });
      } else {
        showErrorMessage(response.error);
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
  }

  function acceptCookies() {
    ReactGA.event({
      category: "home page action",
      action: "click",
      label: "test-action",
      value: "test-action",
    });

    import("react-facebook-pixel").then((module) => {
      const ReactPixel = module.default;
      ReactPixel.grantConsent();
    });
  }

  useEffect(() => {
    if (!getHomeDataCalled) {
      getHomeData();
      getHomeDataCalled = true;
    }
  }, [getHomeDataCalled]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    import("react-facebook-pixel")
      .then((module) => {
        const ReactPixel = module.default;
        ReactPixel.init(import.meta.env.VITE_APP_FACEBOOK_PIXEL);
        ReactPixel.pageView();
      })
      .catch((error) => console.error("Error loading Facebook Pixel", error));
  }, []);

  return (
    <div className="bg-[url(images/background/ramadan-bg.svg)] bg-top sm:bg-[url(images/background/ramadan-bg.svg)] bg-no-repeat">
      <React.Suspense fallback={<Loader />}>
        <CookieConsent
          location="bottom"
          buttonText="accept"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
          onAccept={() => acceptCookies()}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </React.Suspense>
      <button
        className="fixed right-[-58px] z-10 text-sm transform rotate-90 -translate-y-1/2 !rounded-t-none btn-primary btn bottom-28"
        onClick={() => quickDonation()}
      >
        {/* <div className="text-red-300 opacity-75 animate-pulse">
          <HeartFilledIcon />
        </div> */}
        <span className="relative flex">
          <span className="absolute inline-flex w-full h-full transition-all ease-in-out delay-75 bg-red-300 rounded-full animate-ping bg-sky-400 opacity-90"></span>
          <div className="text-red-300 rounded-full ">
            <HeartFilledIcon />
          </div>
        </span>
        Donate Now
      </button>
      <section
        className="md:mx-4 md:mx-6 lg:mx-0 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0"
        data-taos-offset="300"
        aria-label="Hero Banner"
      >
        <div className="cursor-pointer container relative h-[40.25rem] flex items-center justify-center md:mt-10 rounded-1.5xl md:rounded-xl">
          <Img
            src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Banners/Ramadan+phone+banner.png"
            alt="Banner-image"
            className="absolute inset-0 z-0 object-cover w-full h-full max-w-full sm:hidden md:rounded-xl"
          />
          {/* <div
            className="absolute inset-0 object-cover w-full h-full max-w-full sm:block z-1 rounded-1.5xl md:rounded-xl"
            style={{
              background: "linear-gradient(180deg, #FFFFFF00 0%, #06356D 100%)",
              opacity: 0.7,
              transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
            }}
          /> */}
          <Img
            src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Banners/AF_WebsiteSlider+(3).png"
            alt="Banner-images"
            className="absolute inset-0 object-cover w-full h-full hidden max-w-full sm:block z-0 opacity-90 rounded-1.5xl md:rounded-xl"
          />
          <div className="container relative h-[40.25rem] flex flex-col items-center justify-end z-1 mb-10">
            <div className="flex flex-row items-center justify-center gap-2 text-center isolate z-2">
              {/* <div className="mb-7.5">
                <h1 className="max-w-[54.75rem] text-primary-100 text-[1.75rem] leading-8 md:leading-[4rem] md:text-[3.5rem] font-bold">
                  Empower Change: Join in our mission to transform lives.
                </h1>
              </div> */}
              <div className="flex justify-center gap-4">
                <Button
                  variant={"secondary"}
                  label="Learn More"
                  onClick={() => navigate("/project/ramadan-combo-pack")}
                  leftIcon={
                    <span className="relative flex">
                      <InfoIcon />
                    </span>
                  }
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant={"primary"}
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <HomePageBanner /> */}

      {/* Quick Donation */}
      <section aria-label="Updates" className="mt-10 sm:mt-20">
        <div className="container">
          <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
            {homeDataState.projects.length > 0 &&
              homeDataState.projects.map((project) => (
                <ProjectListItem project={project} key={project.id} />
              ))}
          </div>
          <Button
            onClick={() => navigate("/projects")}
            className={"mx-auto mt-5 sm:mt-10 btn btn-secondary-text"}
            variant={"secondary"}
            label={"View All Campaigns"}
            rightIcon={<ArrowRightIcon />}
          />
        </div>
      </section>
      {/* Global Impact */}
      <section aria-label="Our Global Impact">
        <div className="container-fluid">
          <div className="py-20">
            <h2 className="text-center text-heading-2">Our Global Impact</h2>
            <div className="w-full overflow-x-auto mt-13">
              {/* <MapSection /> */}
              <WorldMap />
            </div>
            <div className="flex mt-10 sm:mt-13 gap-7.5 md:gap-[9.375rem] justify-center items-baseline px-4">
              {counts.map((e, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between flex-grow gap-1 text-center basis-0 sm:gap-3 md:col-span-1"
                >
                  <div className="font-Tajawal text-heading-2 break-words text-[2rem] sm:text-[3.5rem] font-bold tracking-tighter text-primary-300 leading-none">
                    {e.number}
                  </div>
                  <div className="text-sm font-medium break-words sm:text-md text-neutral-900">
                    {e.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        className="py-10 md:py-20 bg-primary-100 bg-[url(images/background/pattern-small.svg)] sm:bg-[url(images/background/pattern.svg)] bg-no-repeat bg-right-top "
        aria-label="Our Story"
      >
        <div className="container our-story">
          <h3 className="mb-10 text-center md:mb-15 heading-3">Our Story</h3>
          <React.Suspense fallback={<Loader />}>
            <OurStory />
          </React.Suspense>
        </div>
      </section>

      {/* Get started */}
      <section className="py-10 md:py-[88px] " aria-label="How to Get started">
        <div className="container flex flex-col gap-15">
          <h2 className="text-center text-[1.75rem] md:text-[2rem] font-bold leading-10">
            How to Get started
          </h2>
          <div className="flex flex-col justify-center md:justify-start gap-10 sm:gap-20 sm:flex-row mx-auto md:max-w-[1156px]">
            <div className="flex flex-col gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/create-account.png"
                className="mx-auto h-20 md:h-36 max-w-[13rem] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">
                  Donate as a guest or login to donate.
                </h3>
                <p className="text-sm text-center text-neutral-600">
                  Sign up with your details and login to your account. You can
                  now start donating to your favorite projects.
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/select-project.png"
                className="mx-auto h-20 md:h-36 max-w-[13rem] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">
                  Select a project or learn more about our campaigns.
                </h3>
                <p className="text-sm text-center text-neutral-600">
                  Choose a project that interests you, or view more details
                  about all the different campaigns we run throughout the year
                  in multiple countries.
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/donate-amount.png"
                className="mx-auto h-20 md:h-36 max-w-[13rem] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">
                  Donate your amount as a one time payment or a subscription.
                </h3>
                <p className="text-sm text-center text-neutral-600">
                  Choose an amount you would like to donate, and select if you
                  would like to donate once or subscribe to a monthly, yearly or
                  weekly donation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <React.Suspense fallback={<Loader />}>
        <Carousal data={homeDataState.blogs} />
      </React.Suspense>
      {/* Volunteer */}
      <section className="" aria-label="Become a volunteer">
        <div className="w-full mx-auto relative sm:h-[45.5rem] h-[40.75rem] flex items-center justify-center">
          <Img
            src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/8E5A0294+Large.jpeg"
            alt=""
            className="absolute inset-0 object-cover w-full h-full z--10 aspect-auto "
          />
          <div className="flex flex-col items-center justify-center isolate">
            <div className="mb-5 sm:mb-8 md:mb-12">
              <h4 className="max-w-[18.875rem] m-auto text-primary-100 text-center lea  text-[1.25rem] sm:text-[2rem] leading-6 sm:max-w-[31rem] sm:leading-10 !mb-0">
                Ready to Change Lives? Become a Volunteer With Us!
              </h4>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/volunteer", { scroll: { top: 0 } })}
                className="btn btn-primary"
                label="Become a volunteer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(HomeComponent);
