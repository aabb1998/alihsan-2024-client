import React from "react";
import { PaginationFull } from "../../../../../Include/paginationFull";
import { ArrowLeftIcon, ChevronsUpIcon, Edit3Icon, EditIcon, SearchIcon } from "../../../../../../theme/svg-icons";
import { Tab } from "@headlessui/react";
import { UserDonations } from "./UserDonations";
import { UserInvoice } from "./UserInvoice";
import Img from "../../../../../../components/Image";


export const UserInfoTable = () => {
    return (

        <>
            <div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
                <div className=''>
                    {/* dashboard title rea */}
                    <div className='flex items-center justify-start w-full pb-3.5'>
                        <button className='flex items-center text-button-lg gap-x-2'>
                            <span ><ArrowLeftIcon /> </span>Back to Users</button>
                    </div>
                    {/* card area */}
                    <div className="py-2.5 px-4 bg-neutral-200 rounded-lg flex justify-between flex-col sm:flex-row items-start md:items-center">
                        <div className="flex flex-wrap items-center justify-start gap-2 mb-2 md:gap-3 lg:justify-between lg:gap-5 sm:mb-0">
                            <div className='flex flex-wrap items-center justify-start text-button-md md:flex-nowrap gap-x-3'>
                                <Img src={'/images/avatar/Courtney-Henry.png'} alt='Courtney Henry' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                Courtney Henry
                            </div>
                            <div className="lg:p-4">
                                <p className='text-sm font-medium font-Montserrat text-neutral-700'><span>Email: </span>johnjoe@gmail.com</p>
                            </div>
                            <div className="lg:p-4">
                                <p className='text-sm font-medium font-Montserrat text-neutral-700'><span>Company: </span> Collabify</p>
                            </div>
                            <div className="lg:p-4">
                                <p className='text-sm font-medium font-Montserrat text-neutral-700'><span>Location: </span>  UK</p>
                            </div>
                        </div>

                        <button className="btn btn-primary !py-2 h-fit"><span><Edit3Icon /></span> Edit</button>
                    </div>
                    <div className="mt-5 md:mt-7.5">
                    <Tab.Group>
                        <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
                            <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 active:text-primary-300 active:border-b-primary-300 focus:outline-none focus-within:outline-none">Donation</Tab>
                            <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">Invoice</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <UserDonations />
                            </Tab.Panel>
                            <Tab.Panel>
                            <UserInvoice />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                    </div>
                </div>
            </div>
        </>
    );
}