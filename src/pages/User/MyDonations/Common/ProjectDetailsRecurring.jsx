import React from "react";
import { CalendarIcon, DollarSignIcon, RepeatIcon } from "../../../../theme/svg-icons";
import { Transition } from "@headlessui/react";
import Img from "../../../../components/Image";
const ProjectDetailsRecurring = ({ isOpen }) => {
    return (
        <>
            <Transition
                appear={true}
                show={isOpen}
                enter="transition ease-in-out delay-75 duration-300 transform"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-300 transform delay-75"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
            >
                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-16rem)] overflow-auto">
                        <div className="mt-4 sm:mt-6">
                            <Img src={"/images/banner/projects/1.jpg"} alt="" className="object-cover h-full max-h-[140px] sm:max-h-[208px] w-full rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-4 sm:gap-5">
                            <div>
                                <h3 className="mb-4 text-heading-6 sm:text-heading-7 text-neutral-800">Project name</h3>
                                <p className="text-sm font-medium text-neutral-800 line-clamp-3"> "Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor "Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor</p>
                            </div>
                            <div className="flex flex-wrap justify-between gap-4 p-2 rounded-lg sm:gap-6 bg-neutral-200">
                                <div className="flex gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 p-2 text-yellow-500 rounded bg-accent-300">
                                        <DollarSignIcon iconSize={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs text-neutral-600">Donation Amount</div>
                                        <div className="font-bold text-neutral-800 text-button-lg">$200</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 p-2 text-white rounded bg-primary-300">
                                        <RepeatIcon iconSize={24} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs text-neutral-600">Frequency</div>
                                        <div className="font-bold text-neutral-800 text-button-lg">Monthly</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 p-2 text-green-500 bg-green-300 rounded">
                                        <CalendarIcon iconSize={24} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs text-neutral-600">Date</div>
                                        <div className="font-bold text-neutral-800 text-button-lg">20-09-2023</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-wrap gap-4">
                        <button className="flex-grow btn btn-dark" label="">Get Certificate</button>
                        <button className="flex-grow btn btn-primary " label="Get Invoice">Get Invoice</button>
                        <button className="flex-grow w-full btn btn-outline-secondary" label="Cancel Subscription">Cancel Subscription</button>
                    </div>
                </div>
            </Transition>
        </>
    );

}
export default ProjectDetailsRecurring;