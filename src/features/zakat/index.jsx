import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Summary from "./components/Summary";
import Header from "./components/Header";
import Stepper from "./components/Stepper";
import { getMetalPrices, resetZakatInput, zakatStep } from "./slice";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ZakatCalculator() {
  let query = useQuery();
  let cartAmount = parseInt(query.get("nyp"));
  const dispatch = useDispatch();
  const step = useSelector((state) => state.zakatCalculator.step);
  const { state: navState } = useLocation();
  const CurrentStep = [Step1, Step2, Step3, Step4, Step5][step - 1];
  useEffect(() => {
    dispatch(getMetalPrices());
    return () => {
      dispatch(resetZakatInput());
    };
  }, []);

  useEffect(() => {
    console.log(cartAmount);
    if (cartAmount && cartAmount > 0) {
      dispatch(zakatStep(4));
    }
  }, [cartAmount]);

  return (
    <div className="pb-10 sm:py-7.5 md:py-10">
      <section>
        <div className="container !p-0 sm:!px-4">
          <Header />
          <div className="grid gap-6 md:gap-20 md:grid-cols-2">
            <div className="px-4 sm:px-0">
              <Stepper />
              <div>
                {step !== 5 ? (
                  <CurrentStep zakatTotal={cartAmount} />
                ) : (
                  <Step5 zakatTotal={cartAmount} />
                )}
              </div>{" "}
            </div>
            <Summary zakatTotal={cartAmount && cartAmount} />
          </div>
        </div>
      </section>
    </div>
  );
}
