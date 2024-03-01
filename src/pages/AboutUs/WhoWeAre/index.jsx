import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RefugeesSlider from "../../../components/RefugeesSlider";
import PageHead from "../../../components/PageHead";
import { getOurWorks } from "../../../features/fundraise/Fundraise";

const WhoWeAreComponent = () => {
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
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/8E5A5569+Large.jpeg"
                alt=""
                className="object-cover w-full h-full transition duration-500 sm:hidden hover:scale-110"
              />
              <img
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/8E5A5569+Large.jpeg"
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
              In 2014, Al-Ihsan Foundation was established by compassionate and
              dedicated individuals, including Abu Ahmad and Ahmed Dannoun,
              along with other caring members of the wider Sydney community. A
              spark of compassion ignited within our hearts, prompted by the
              challenges posed by the Somalia famine and the devastating Syrian
              war at that time.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              As witnesses to the heart-wrenching challenges of the Somalia
              famine and the harrowing Syrian war, we couldn’t remain mere
              spectators; we felt compelled to become part of the solution.
              Driven by an unwavering commitment to make an impactful
              difference, we recognised the urgent need for action, compelling
              us to initiate lasting change. Al-Ihsan Foundation was born from
              our shared belief that we can be change-makers for lasting
              transformation.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              Officially registered as a charity organisation in Australia in
              2015, we chose the name Ihsan, meaning `perfection` or
              `excellence.` Perfecting our deeds and behaviours is rooted in our
              religious teachings and stands as a distinguishing pillar of our
              organisation, uniting us in our mission.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              Our aspiration is to lead in providing aid and assistance to the
              most vulnerable and often forgotten members of our society. We
              hold firmly to our principles of carrying out our work with Ihsan,
              compassion, empathy, and dignity.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              Guided by the wisdom of our beloved Prophet Muhammad (ﷺ) words,
              “The parable of the Believers in their mutual love and mercy is
              like that of a living body: if one part feels pain, the whole body
              suffers in sleeplessness and fever”. (AI-Bukhari and Muslim) we
              recognise the profound unity among humanity.
            </p>
            <p className="mb-3 text-sm font-medium text-neutral-800 sm:text-lg">
              Today, Al Ihsan Foundation stands as a testament of compassion,
              hope, dedication, and unity.
            </p>
          </div>
        </section>
        <section className="py-7.5 md:py-10 bg-primary-100">
          <div className="container">
            <div className="grid items-center grid-cols-1 md:grid-cols-2">
              <div className="mb-5 md:mb-0 h-[16.875rem] md:h-[32.5rem]">
                <img
                  src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/20230522_161639305_iOS+Large.jpeg"
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
                    Our vision is to live in a world free from hunger, poverty,
                    and despair, where individuals and their families facing
                    urgent circumstances receive vital humanitarian relief and
                    essential care. We whole heartedly believe that by ensuring
                    global access to basic human needs, we can all personally
                    contribute to a world where no one is left behind.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-6 text-start md:pr-10">
                <h2 className="mb-3 sm:mb-5 text-heading-6 text-neutral-1000 sm:text-heading-3">
                  Mission Statement
                </h2>
                <div className="text-sm font-medium text-neutral-800 sm:text-lg">
                  <p>
                    Al-Ihsan Foundation is dedicated to alleviating human
                    suffering, particularly in devastating emergencies. Through
                    the mobilisation of our teams and the support of generous
                    donors like you, we provide urgent access to food, water,
                    shelter, healthcare, and education. Committed to fostering
                    an inclusive society, we uphold the dignity and respect of
                    all individuals, helping them reach their full potential.
                    Join us in creating a legacy of impact, resilience, and
                    shared humanity, where compassion changes lives and paves
                    the way to a brighter future for all.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 h-[16.875rem] md:h-[32.5rem] overflow-hidden">
                <img
                  src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/20220224_102522+Large.jpeg"
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

export default WhoWeAreComponent;
