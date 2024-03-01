import React, { useEffect } from "react";
import Header from "../../components/Header";
import { UserSidebar } from "../User/Common/UserSidebar";
import PageHead from "../../components/PageHead";

export const MyDonations = () => {

  return (
    <div>
      <Header />
      <section className="py-7.5 md:py-15">
        <div className="container">
          <div className="flex gap-[60px]">
            <div className="w-[238px] shrink-0 hidden md:block">
              <UserSidebar />
            </div>
            <div className="w-full">
              <div className="md:border border-neutral-300 md:px-10 md:py-7.5 rounded-1.5xl">
                <div className="border-b mb-5 md:mb-7.5 border-b-neutral-300">
                  <h1 className="text-heading-6 md:text-heading-5 pb-3.5">
                    My Donations
                  </h1>
                </div>
                <div className="flex form-group">
                  <div className="w-full sm:w-10/12 md:w-8/12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
