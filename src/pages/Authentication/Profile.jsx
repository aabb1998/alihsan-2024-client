import React, { useEffect } from "react";
import ChangePassword from "../../features/authentication/ChangePassword";
import ProfileSection from "../../features/authentication/ProfileSection";
import { CloseIcon } from "../../theme/svg-icons";
import { UserSidebar } from "../User/Common/UserSidebar";

export const Profile = () => {
  useEffect(() => {
    document.title = "Al-Ihsan Foundation - Profile";
  }, []);
  return (
    <div>
      {/* Updates */}
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
                    Profile
                  </h1>
                </div>
                <div className="flex form-group">
                  <div className="w-full sm:w-10/12 md:w-8/12">
                    <ProfileSection />
                    {/* profile edit end */}
                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}

      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-7.5 py-10">
                <div className="sm:flex flex-col gap-7.5">
                  <div className="flex justify-between">
                    <div className="font-bold heading-7">Quick Donation</div>
                    <div className="">
                      <CloseIcon />
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="SelectProject"
                      className="block mb-2 text-sm"
                    >
                      Project Name
                    </label>
                    <div className="mb-4 form-group">
                      <select
                        className="w-full text-sm !text-neutral-800 form-control"
                        id="SelectProject"
                      >
                        <option value="1">Project names goes here</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="p-2 bg-accent-100 rounded-lg  gap-3.5 flex">
                        <button className="btn btn-primary filled">
                          One-time
                        </button>
                        <button className="btn btn-text filled">Monthly</button>
                      </div>
                      <fieldset className="grid justify-between gap-5 md:gap-3.5 grid-cols-2 md:grid-cols-4">
                        <legend className="sr-only">
                          Select an amount to donate
                        </legend>
                        <div className="col-span-1">
                          <input
                            type="radio"
                            id="100"
                            name="DonateAmount"
                            value="100"
                            className="hidden peer"
                          />
                          <label
                            htmlFor="100"
                            className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2"
                          >
                            $100
                          </label>
                        </div>
                        <div className="col-span-1">
                          <input
                            type="radio"
                            id="200"
                            name="DonateAmount"
                            value="200"
                            className="hidden peer"
                          />
                          <label
                            htmlFor="200"
                            className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2"
                          >
                            $500
                          </label>
                        </div>
                        <div className="col-span-1">
                          <input
                            type="radio"
                            id="800"
                            name="DonateAmount"
                            value="800"
                            className="hidden peer"
                          />
                          <label
                            htmlFor="800"
                            className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2"
                          >
                            $800
                          </label>
                        </div>
                        <div className="col-span-1">
                          <input
                            type="radio"
                            id="Other"
                            name="DonateAmount"
                            value="Other"
                            className="hidden peer"
                          />
                          <label
                            htmlFor="Other"
                            className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2"
                          >
                            Other
                          </label>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary filled">Donate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
