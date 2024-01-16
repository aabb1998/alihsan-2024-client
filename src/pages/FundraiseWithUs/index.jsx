import React, { useEffect } from "react";
import RefugeesSlider from "../../components/RefugeesSlider";
import { useSelector, useDispatch } from "react-redux";
import { ApplyNow } from "../../features/fundraise/ApplyNow";
import Img from "../../components/Image";
import { getOurWorks } from "../../features/fundraise/Fundraise";
import PageHead from "../../components/PageHead";

const FundraiseWithUs = () => {
  const dispatch = useDispatch();
  const { ourWorks } = useSelector((state) => state.ourWorks);
  useEffect(() => {
    dispatch(getOurWorks());
  }, []);

  return (
    <div>
      <PageHead title={'Fundraise with us'}/>
      <div className="pt-0 sm:pt-7.5 pb-7.5 md:py-15">
        <section aria-label="Fundraise with us">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src="../images/banner/fundraise-with-us.jpg"
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container">
            <h1 className="mb-3 md:mb-5 text-heading-6 md:text-heading-3">
              Fundraise With Us
            </h1>
            <div className='className="text-sm md:text-lg mb-3 md:mb-3.5"'>
              <p>
                Al-Ihsan Foundation International Limited (formed in 2014) is a
                non-profit public relief organisation dedicated to assisting all
                people and families in need. The Arabic word Al-Ihsan means
                “perfection” or “excellence.” Perfecting our deeds and
                behaviours is a matter of inner faith born of religious
                teachings, and it is one of our organization’s distinguishing
                pillars that hold us up and brings us together.
              </p>
              <p>
                We aspire to be the best in the business when it comes to
                providing aid and assistance to people, and we do it through a
                variety of services and programmes. We provide the following:
              </p>
            </div>

            <ul className="ml-0 list-disc list-inside md:ml-5 text-button-md md:text-heading-7 text-neutral-700 marker:mx-0">
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
          <ApplyNow />
          <RefugeesSlider ourWorks={ourWorks} />
        </section>
      </div>
    </div>
  );
};

export default React.memo(FundraiseWithUs);
