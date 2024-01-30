import React, { useState, useEffect, Fragment } from "react";
import { Footer } from "../Include/footer";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Transition } from "@headlessui/react";
import { FinancialReport } from "../../features/financialReports/FinancialReport";
import { Constitution } from "../../features/financialReports/Constitutions";
import { getFinantialReports } from "../../features/financialReports/financialReports";
import PageHead from "../../components/PageHead";

const FinancialReports = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("financial");

  useEffect(() => {
    dispatch(getFinantialReports());
  }, []);
  return (
    <div>
      <PageHead title={"Financial reports"} />
      <section>
        <div className="container py-7.5 md:py-15">
          <h1 className="mb-2 text-center sm:mb-5 text-heading-6 sm:text-heading-3">
            Financial Reports & Constitution
          </h1>
          <p className="text-sm font-medium text-center sm:text-lg text-neutral-600">
            Annual Reports can be downloaded as PDF files from the below links
          </p>
          <div className="mt-6 md:mt-7.5">
            <Tab.Group>
              <Tab.List className="flex flex-wrap border-b sm:gap-y-4 border-b-neutral-300">
                <Tab as={Fragment} onClick={() => setTab("financial")}>
                  {({ selected }) => (
                    <button
                      className={
                        "flex transition ease-in-out delay-150 duration-300 justify-center flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                        (selected
                          ? "border-primary-300  text-primary-300 border-b-primary-300"
                          : "")
                      }
                    >
                      Financial Reports
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment} onClick={() => setTab("constitution")}>
                  {({ selected }) => (
                    <button
                      className={
                        "flex justify-center ease-in-out delay-150 duration-300 flex-grow w-auto px-4 md:px-8 py-3 font-bold border-b-2  border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg text-neutral-600 focus:outline-none focus-within:outline-none " +
                        (selected
                          ? "border-primary-300 text-primary-300 border-b-primary-300"
                          : "")
                      }
                    >
                      Constitution
                    </button>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <FinancialReport isOpen={tab === "financial"} />
                </Tab.Panel>
                <Tab.Panel>
                  <Constitution isOpen={tab === "constitution"} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
    </div>
  );
};


export default FinancialReports