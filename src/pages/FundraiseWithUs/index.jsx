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
      <PageHead title={"Fundraise with us"} />
      <div className="pt-0 sm:pt-7.5 pb-7.5 md:py-15">
        <section aria-label="Fundraise with us">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <Img
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/inbound339445999271926748+Large.jpeg"
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
                Amplify the impact of your generosity by joining as a fundraiser
                for Al Ihsan Foundation. Your choice to fundraise is more than
                just an act of generosity; it's a commitment to positive change
                or leaving a legacy for loved ones, and making a lasting impact
                on those in need and sharing in the ongoing rewards for a loved
                one who has passed. Together, we believe in the transformative
                power of compassion and generosity. Through your support, we can
                uplift communities, empower individuals, and establish lasting,
                sustainable change.
              </p>
              <br />
              <p>
                Ready to make a difference? Create your fundraising page now and
                be part of the movement towards positive change. Your efforts
                will not only make a lasting impact on those in need but can
                also serve as a continuous source of reward for your departed
                loved ones.
              </p>
            </div>
          </div>
          <ApplyNow />
          {/* <RefugeesSlider ourWorks={ourWorks} /> */}
        </section>
      </div>
    </div>
  );
};

export default React.memo(FundraiseWithUs);
