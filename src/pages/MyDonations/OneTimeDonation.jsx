import React, { useEffect, useState } from "react";
import { UserSidebar } from "../User/Common/UserSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getMyDonations } from "../../features/myDonation/myDonationSlice";
import { MyDonationTypes } from "../../utils/constants";
import { Donations } from "./Donations";
import ProjectDetailsModal from "./ProjectDetailsModal";
import PageHead from "../../components/PageHead";

const OneTimeDonations = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDonation, setViewDonation] = useState(null);

  const [filters, setFilters] = useState({ search: "", sort: "date-r" });

  const handleViewDetails = (donation) => {
    setViewDonation(donation);
    setIsOpen(true);
  };

  useEffect(() => {
    loadDonations(1);
  }, []);
  const loadDonations = (page) => {
    dispatch(
      getMyDonations({
        type: MyDonationTypes.ONETIME,
        page,
        search: filters.search,
        sort: filters.sort.split("-")[0],
        order: filters.sort.split("-")[1] === "r" ? "desc" : "asc",
      })
    );
  };

  useEffect(() => {
    loadDonations(1);
  }, [filters]);
  return (
    <div>
      <PageHead title={"Onetime donations"} />
      <section className="py-7.5 md:py-15">
        <div className="container">
          <div className="flex gap-[60px]">
            <div className="w-[238px] shrink-0 hidden md:block">
              <UserSidebar />
            </div>
            <div className="w-full">
              <div className="md:border border-neutral-300 md:px-10 md:py-7.5 rounded-1.5xl">
                <div className=" mb-5 md:mb-7.5 ">
                  <h1 className="text-heading-6 text-center md:text-heading-5 pb-3.5">
                    My Donations - One Time
                  </h1>
                </div>
                <Donations
                  type={MyDonationTypes.ONETIME}
                  handleViewDetails={handleViewDetails}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <ProjectDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mydonation={viewDonation}
        />
      )}
    </div>
  );
};

export default OneTimeDonations;
