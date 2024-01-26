import React from 'react';
import { PaginationFull } from '../../../../Include/paginationFull';
// import ActionButtonBgWithIcon from '../../Common/ActionButtonBgWithIcon';
import { useState } from "react";
import { ChevronUpIcon, ChevronsUpIcon, PhoneCallIcon, PlusIcon, SearchIcon } from '../../../../../theme/svg-icons';
import { Pagination } from '../../../../../features/projects/Pagination';
import Img from '../../../../../components/Image';
import ActionButtonBgWithIcon from '../../../Common/ActionButtonBgWithIcon';

const options = ["This Week", "THis Month", "This Year"];
export const DonationCampaignComponent = () => {
    const [selected, setSelected] = useState(options[0]);
    return (

        <>
            <div className='mt-5 sm:mt-10'>
                {/* dashboard title rea */}
                <div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
                    <h5 className='text-button-lg md:text-heading-5'>Donations</h5>
                    <button className=" btn btn-primary text-button-md md:text-button-lg" variant="primaryFull" type="submit" > <span className='sm:hidden'><PlusIcon /></span> <span className='hidden sm:flex'>Add Donation</span> </button>
                </div>
                {/* card area */}
                <div className='flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap'>
                    <div className='py-5 grow px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-accent-300 cursor-pointer'>
                        <h6 className='mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600'> Total Donations</h6>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-heading-5 md:text-heading-2'>832</h2>
                        </div>
                    </div>
                    <div className='py-5 grow px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-accent-300 cursor-pointer'>
                        <h6 className='mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600'> Total Donors</h6>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-heading-5 md:text-heading-2'>132</h2>

                        </div>
                    </div>
                    <div className='py-5 grow px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 hover:bg-accent-300 cursor-pointer'>
                        <h6 className='mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600'> Total Donation Amount</h6>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-heading-5 md:text-heading-2'>$10,832</h2>
                        </div>
                    </div>
                </div>

                <div className='mt-6 md:mt-10'>
                    <div className='flex flex-wrap sm:flex-nowrap items-center justify-between my-5 md:my-7.5'>
                        <form className='flex flex-wrap items-center gap-4'>
                            <label className='text-button-md text-neutral-1000'>Filter:</label>
                            <div>
                                <select className='border rounded border-neutral-300 py-1.5 px-4 min-w-35' value={selected} onChange={e => setSelected(e.target.value)}>
                                    {options.map((value) => (
                                        <option className='text-sm font-medium font-Montserrat text-neutral-800' value={value} key={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className='border rounded border-neutral-300 py-1.5 px-4 min-w-35' value={selected} onChange={e => setSelected(e.target.value)}>
                                    {options.map((value) => (
                                        <option className='text-sm font-medium font-Montserrat text-neutral-800' value={value} key={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='text-button-md text-neutral-1000'>Clear Filter</button>
                        </form>
                        <div className="w-full sm:w-auto form-group sm:min-w-72">
                            <label className="relative block">
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                                    <SearchIcon />
                                </span>
                                <input className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9" placeholder="Search" type="text" name="search" />
                            </label>

                        </div>
                    </div>
                    < div className='grid'>
                    <div className="relative overflow-x-auto">
                            <table class="table-auto w-full text-start">
                                <thead className='rounded bg-neutral-200'>
                                    <tr className=''>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Name</th>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 '>
                                            <div className='flex gap-1.5 items-center'>
                                                Amount
                                                <span className='cursor-pointer'><ChevronsUpIcon iconSize={14} /></span>
                                            </div>
                                        </th>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 '>
                                            <div className='flex gap-1.5 items-center'>
                                                Date
                                                <span className='cursor-pointer'><ChevronsUpIcon iconSize={14} /></span>
                                            </div>
                                        </th>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Email</th>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Country</th>
                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Courtney-Henry.png'} alt='Courtney Henry' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Courtney Henry
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Jenny-Wilson.png'} alt='Jenny Wilson' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Jenny Wilson
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Jacob-Jones.png'} alt='Jacob Jones' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Jacob Jones
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Leslie-Alexander.png'} alt='Leslie Alexander' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Leslie Alexander
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Eleanor-Pena.png'} alt='Eleanor Pena' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Eleanor Pena
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Darlene-Robertson.png'} alt='Darlene Robertson' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Darlene Robertson
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src='/images/avatar/Devon-Lane.png' alt='Devon Lane' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Devon Lane
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
                                            <div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
                                                <Img src={'/images/avatar/Arlene-McCoy.png'} alt='Arlene McCoy' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' />
                                                Arlene McCoy
                                            </div>
                                        </td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>UK</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <div className='flex gap-2 sm:gap-4'>
                                                <div className='p-2 text-green-300 bg-green-100 rounded cursor-pointer'>
                                                    <PhoneCallIcon />
                                                </div>
                                                <ActionButtonBgWithIcon />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='mt-5'>
                                <Pagination />
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </>
    );
}