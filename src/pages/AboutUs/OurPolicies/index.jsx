import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../components/PageHead";
import { ourPolicies } from "../../../utils/constants";


const OurPoliciesComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHead title={"Our policies"} />
      <div className="md:py-10 standard-details-page">
        <section className="mb-8">
          <div className="banner-container">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <img
                src="https://alihsan.s3.ap-southeast-2.amazonaws.com/images/PolicyPage/WhatsApp+Image+2024-02-06+at+16.15.54.jpeg"
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container mb-6 font-Montserrat sm:mb-8">
            <h1 className="mb-3 sm:mb-5 text-heading-6 sm:text-heading-3">
              Our Policies
            </h1>
            <p className="text-md sm:text-lg text-neutral-800">
              Al-Ihsan Foundation International Limited (formed in 2014) is a
              non-profit public relief organisation dedicated to assisting all
              people and families in need. The Arabic word Al-Ihsan means
              “perfection” or “excellence.” Perfecting our deeds and behaviours
              is a matter of inner faith born of religious teachings, and it is
              one of our organization’s distinguishing pillars that hold us up
              and brings us together. We aspire to be the best in the business
              when it comes to providing aid and assistance to people, and we do
              it through a variety of services and programmes. We provide the
              following:
            </p>
          </div>
        </section>

        <section className="py-10 bg-neutral-200">
          <div className="container">
            <div className="">
              <div className="flex flex-wrap items-center justify-center gap-y-8 sm:gap-x-5 sm:gap-y-8 md:px-12">
                {ourPolicies.map((e) => (
                  <PoliciesCard
                    key={e.link}
                    Icon={e.Icon}
                    onClick={() => navigate(`${e.link}`)}
                    Title={e.Title}
                    Description={e.Description}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const PoliciesCard = ({ Icon, Title, Description, onClick }) => {
  return (
    <div className="flex w-full sm:w-[18.75rem]" onClick={onClick}>
      <div className="flex flex-col items-center justify-center flex-grow w-full px-6 py-16 sm:grid-cols-3 bg-neutral-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center mb-4 ease-in-out delay-75 cursor-pointer policy-card">
          {Icon}
          <p className="mt-2 text-center text-heading-7 sm:text-heading-6">
            {Title}
          </p>
        </div>
        <p className="text-sm font-medium text-center sm:text-md text-neutral-600">
          {Description}
        </p>
      </div>
    </div>
  );
};

export default OurPoliciesComponent;
