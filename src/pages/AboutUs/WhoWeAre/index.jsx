import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RefugeesSlider from "../../../components/RefugeesSlider";
import PageHead from "../../../components/PageHead";
import { getOurWorks } from "../../../features/fundraise/Fundraise";

export const WhoWeAreComponent = () => {
  const dispatch = useDispatch();
  const { ourWorks } = useSelector((state) => state.ourWorks);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getOurWorks());
  }, []);
  return (
    <div>
      {/* Updates */}
      <PageHead title={"Who we are"} />
      <div className="md:py-10">
        <section className="" aria-label="Complaints">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <img
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/1.png"
                alt=""
                className="object-cover w-full h-full transition duration-500 sm:hidden hover:scale-110"
              />
              <img
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/1.png"
                alt=""
                className="object-cover w-full h-full transition duration-500 sm:block hover:scale-110"
              />
            </div>
          </div>
          <div className="container mb-10 sm:mb-15">
            <h1 className="mb-3 sm:mb-5 text-heading-6 sm:text-heading-3">
              Who We Are
            </h1>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              Al-Ihsan Foundation International Limited (formed in 2014) is a
              non-profit public relief organisation dedicated to assisting all
              people and families in need. The Arabic word Al-Ihsan means
              “perfection” or “excellence.” Perfecting our deeds and behaviours
              is a matter of inner faith born of religious teachings, and it is
              one of our organization’s distinguishing pillars that hold us up
              and brings us together.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              We aspire to be the best in the business when it comes to
              providing aid and assistance to people, and we do it through a
              variety of services and programmes. We provide the following:
            </p>
            <ul className="ml-6 list-disc sm:ml-4 text-button-md sm:text-heading-7 text-neutral-700">
              <li>International and famine-affected area.</li>
              <li>
                People with disabilities, the elderly, and children receive
                international care.
              </li>
              <li>Services for women experiencing domestic violence.</li>
              <li>
                International community visits to the sick, people with
                disabilities, the elderly, and children.
              </li>
              <li>
                International aid for the homeless (blankets, clothes, and food
                drives) and the youth (establishing and sponsoring youth
                centres).
              </li>
              <li>Awareness programmes through community events.</li>
              <li>
                International emergency relief to individuals and families
                struggling to cope.
              </li>
            </ul>
          </div>
        </section>
        <section className="py-7.5 md:py-10 bg-primary-100">
          <div className="container">
            <div className="grid items-center grid-cols-1 md:grid-cols-2">
              <div className="mb-5 md:mb-0 h-[16.875rem] md:h-[32.5rem]">
                <img
                  src="/images/banner/vision-and-mission.jpg"
                  alt=""
                  className="object-cover w-full h-full rounded-2xl md:rounded-br-none md:rounded-4xl"
                />
              </div>
              <div className="flex flex-col justify-center text-start md:pl-10">
                <h2 className="mb-3 sm:mb-5 text-heading-6 text-neutral-1000 sm:text-heading-3">
                  Our Vision
                </h2>
                <div className="text-sm font-medium text-neutral-800 sm:text-lg">
                  <p>
                    All of the people associated with Al-Ihsan Foundation
                    International have always prioritised humanitarian aid. Our
                    people came together because they had common goals and
                    desires. With the goal of being properly recognised as a
                    non-profit humanitarian relief organisation, and with the
                    drive and persistence to reach and support those who are in
                    need on an international and national level.
                  </p>
                  <p>
                    Al-Ihsan Foundation was founded with the vision of providing
                    humanitarian relief to all individuals and families in need
                    of care and assistance. Our goal is to travel far and wide
                    to reach and aid those even in the most remote regions on
                    earth, in order to eventually rid the world of poverty and
                    despair.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-6 text-start md:pr-10">
                <h2 className="mb-3 sm:mb-5 text-heading-6 text-neutral-1000 sm:text-heading-3">
                  Mission Statement
                </h2>
                <div className="text-sm font-medium text-neutral-800 sm:text-lg">
                  <p>
                    Al-Ihsan Foundation knows the importance of immediate access
                    to food, medical aid, and emergency shelters during times of
                    natural disasters, poverty, and other emergency situations.
                    We thus strive to provide rapid mobilisation and action with
                    the mission to establish and maintain a (global) society
                    that serves and empowers all those in need. We endeavour to
                    fulfil and complete our services through regular contact and
                    visits.
                  </p>
                  <p>
                    The Al-Ihsan Foundation intends to continue assisting and
                    serving communities until our help and services are no
                    longer required.
                  </p>
                  <p>Please check our terms & conditions and privacy policy.</p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 h-[16.875rem] md:h-[32.5rem] overflow-hidden">
                <img
                  src="/images/banner/mission-statement.jpg"
                  className="object-cover w-full h-full rounded-2xl md:rounded-tl-none md:rounded-4xl"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* <section className="py-15">
          <RefugeesSlider ourWorks={ourWorks} />
        </section> */}
      </div>
    </div>
  );
};
