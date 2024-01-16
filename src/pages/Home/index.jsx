import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, HeartFilledIcon } from "../../theme/svg-icons";
import Button from "../../components/Button";
import { SnackMessages } from "../../components/Toast";
import Img from "../../components/Image";
import WorldMap from "../../components/WorldMap";
import { Carousal } from "../../components";
import { OurStory } from "./OurStory/OurStory";
import { ProjectListItem } from "../../features/projects/ProjectListItem";
import { useQuickDonation } from "../../features/quickDonation";
import { homeData } from "./homeAPI";

const counts = [
  {
    number: "1854",
    name: "Completed Projects",
  },
  {
    number: "35+",
    name: "Completed Projects",
  },
  {
    number: "29M",
    name: "People With Build Masjid",
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

  useEffect(() => {
    document.title = "Al-Ihsan Foundation - Home";
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
  }, []);

  return (
    <div>
      <button
        className="fixed left-[-58px] z-10 text-sm transform -rotate-90 -translate-y-1/2 !rounded-t-none btn-primary btn top-1/2"
        onClick={() => quickDonation()}
      >
        {/* <div className="text-red-300 opacity-75 animate-pulse">
          <HeartFilledIcon />
        </div> */}
        <span className="relative flex">
          <span className="animate-ping h-full w-full bg-sky-400 absolute delay-75 transition-all ease-in-out inline-flex rounded-full bg-red-300 opacity-90"></span>
          <div className="text-red-300 rounded-full ">
            <HeartFilledIcon />
          </div>
        </span>
        Donate Now
      </button>
      <section
        className="mt-7.5 md:mt-15 mx-4 md:mx-6 lg:mx-0 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0"
        data-taos-offset="300"
        aria-label="Hero Banner"
      >
        <div className="container relative rounded-2.5xl md:rounded-4xl h-[31.25rem] flex items-center justify-center">
          <Img
            src="/images/banner/hero-small.jpg"
            alt="Banner-image"
            className="absolute inset-0 object-cover w-full h-full max-w-full sm:hidden z--10 rounded-2.5xl md:rounded-4xl"
          />
          <Img
            src="/images/banner/hero.jpg"
            alt="Banner-images"
            className="absolute inset-0 hidden object-cover w-full h-full max-w-full sm:block z--10 rounded-2.5xl md:rounded-4xl"
          />
          <div className="flex flex-col items-center justify-center text-center isolate">
            <div className="mb-7.5">
              <h1 className="max-w-[54.75rem] text-primary-100 text-[1.75rem] leading-8 md:leading-[4rem] md:text-[3.5rem] font-bold">
                Take action in our mission to change and rescue lives.
              </h1>
              <p className="max-w-[37.875rem] mx-auto mt-6 text-sm md:text-lg text-primary-100">
                <span>
                  We're a worldwide Islamic organisation, dedicated to saving
                  lives and we achieve it by always being on the ground.
                </span>
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button label="Donate now" onClick={() => quickDonation()} />
              <Button variant="secondary" label="Learn more" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Donation */}

      <section aria-label="Updates" className="mt-10">
        <div className="container">
          <div className="grid gap-x-5 gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
            {homeDataState.projects.length > 0 &&
              homeDataState.projects.map((project) => (
                <ProjectListItem project={project} key={project.id} />
              ))}
          </div>
          <button
            className="mx-auto mt-5 sm:mt-10 btn btn-secondary-text"
            onClick={() => navigate("/projects")}
          >
            See All <ArrowRightIcon />{" "}
          </button>
        </div>
      </section>
      {/* Global Impact */}
      <section aria-label="Our Global Impact">
        <div className="container">
          <div className="py-20">
            <h2 className="text-center text-heading-2">Our Global Impact</h2>
            <div className="relative w-full overflow-x-auto mt-13">
              {/* <MapSection /> */}
              <WorldMap />
            </div>
            <div className="flex flex-col md:flex-row gap-7.5 md:gap-[9.375rem] justify-center items-center">
              {counts.map((e, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between h-[87px] text-center md:col-span-1"
                >
                  <div className="mx-6 font-Tajawal text-[5rem] font-bold tracking-tighter text-primary-300 leading-none">
                    {e.number}
                  </div>
                  <div>{e.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        className="py-10 md:py-20 bg-primary-100 bg-[url(images/background/pattern-small.svg)] sm:bg-[url(images/background/pattern.svg)] bg-no-repeat bg-right-top"
        aria-label="Our Story"
      >
        <div className="container">
          <h3 className="mb-10 text-center md:mb-15 heading-3">Our Story</h3>
          <OurStory />
        </div>
      </section>

      {/* Get started */}
      <section className="py-10 md:py-[88px] " aria-label="How to Get started">
        <div className="container flex flex-col gap-15">
          <h2 className="text-center text-[1.75rem] md:text-[2rem] font-bold leading-10">
            How to Get started
          </h2>
          <div className="flex flex-col justify-center md:justify-start gap-10 sm:gap-20 md:flex-row mx-auto md:max-w-[1156px]">
            <div className="flex flex-col gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/create-account.png"
                className="mx-auto max-h-[143px] max-w-[208px] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">Create an account</h3>
                <p className="text-sm text-center text-neutral-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/select-project.png"
                className="mx-auto max-h-[143px] max-w-[208px] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">Select a project</h3>
                <p className="text-sm text-center text-neutral-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-5 mx-auto sm:w-1/3">
              <Img
                src="/images/illustration/donate-amount.png"
                className="mx-auto max-h-[143px] max-w-[208px] aspect-auto"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-center heading-6">Donate your amount</h3>
                <p className="text-sm text-center text-neutral-600">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {homeDataState.blogs.length > 0 && (
        homeDataState.blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))
      )} */}

      <Carousal data={homeDataState.blogs} />

      {/* Volunteer */}
      <section
        className="my-10 md:my-[5.5rem] mx-4 md:mx-6 lg:mx-0"
        aria-label="Become a volunteer"
      >
        <div className="max-w-[1110px] mx-auto relative rounded-4xl md:h-[25.5rem] h-[220px] flex items-center justify-center">
          <Img
            src="/images/banner/volunteer.jpg"
            alt=""
            className="absolute inset-0 w-full h-full md:object-cover z--10 rounded-4xl aspect-auto "
          />
          <div className="flex flex-col items-center justify-center isolate">
            <div className=" md:mb-7.5">
              <h4 className="max-w-[54.8rem] text-primary-100 text-center  text-[1.25rem] md:text-[2rem] m-5 md:m-4 leading-6 md:max-w-[495px] md:leading-10 !mb-0">
                Ready to Change Lives? Become a Volunteer With Us!
              </h4>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() =>
                  navigate("/volunteer-with-us", { scroll: { top: 0 } })
                }
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
