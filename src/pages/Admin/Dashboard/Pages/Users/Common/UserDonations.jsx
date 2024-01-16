import React from "react";
// import ActionButtonBgWithIcon from "../../../Common/ActionButtonBgWithIcon";
import { ChevronsUpIcon } from "../../../../../../theme/svg-icons";
import { Pagination } from "../../../../../../features/projects/Pagination";
import ActionButtonBgWithIcon from "../../../../Common/ActionButtonBgWithIcon";
export const UserDonations = () => {
    return(
        <>
        <div className='mt-6'>
                        <div className='relative overflow-x-auto'>
                            <table class="table-auto w-full text-start">
                                <thead className='rounded bg-neutral-200'>
                                    <tr className=''>
                                    <th className='p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600'>
                                            Donation ID
                                        </th>
                                        <th className='p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600 '>
                                            <div className='flex gap-1.5 items-center'>
                                                Amount
                                                <span className='cursor-pointer'><ChevronsUpIcon iconSize={14} /></span>
                                            </div>
                                        </th>
                                        <th className='p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600'>
                                            Campaign
                                        </th>
                                        <th className='p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600'>Type</th>
                                        <th className='p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600 '>
                                            <div className='flex gap-1.5 items-center'>
                                                Date
                                                <span className='cursor-pointer'><ChevronsUpIcon iconSize={14} /></span>
                                            </div>
                                        </th>

                                        <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                    <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>#023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>$100</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>Project name goes here</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>One-time</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>22/03/2023</td>
                                        <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                            <ActionButtonBgWithIcon />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='mt-5'>
                                <Pagination />
                            </div>

                        </div>

                    </div>

        </>
    );

};