import React from 'react';
import { FilterIcon } from '../../../../theme/svg-icons';
import { Transition } from '@headlessui/react';
const PaymentHistoryDetails = ({isOpen}) => {
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
                <div className="flex flex-col gap-4">
                    <h3 className='hidden sm:flex text-heading-6 text-neutral-1000'>Aqeeqah Adahi</h3>
                    <div className="hidden gap-4 sm:flex">
                        <label htmlFor="SortBy" className="text-sm font-bold !mb-0">
                            Sort By:
                        </label>
                        <select className="text-sm h-10 !py-0 w-[140px] !text-neutral-800 form-control !rounded-md !pr-8 truncate" id="SortBy">
                            <option value="1">Type</option>
                        </select>
                        <input htmlFor="amount" className="text-sm h-10 !py-0 w-24 !text-neutral-800 form-control !rounded-md" id="amount" placeholder='$200' aria-label='amount' />
                        <button className="text-sm font-bold !mb-0">
                            Clear Filter
                        </button>
                    </div>
                    <div className='flex justify-between sm:hidden'>
                        <h3 className='text-button-lg text-neutral-1000'>Aqeeqah Adahi</h3>
                        <div className='flex flex-row gap-1 '>
                            <FilterIcon />
                            <p className='font-medium text-md text-neutral-800'>Filter</p>
                        </div>
                    </div>
                    <div className='grid'>
                    <div className='relative overflow-x-auto h-100 max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-20rem)]'>
                        <table class="table-auto w-full text-start">
                            <thead className='rounded bg-neutral-200'>
                                <tr className=''>
                                    <th className='flex gap-4 p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        Date
                                    </th>
                                    <th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                    <td className='flex gap-4 p-4 my-2.5 text-sm font-medium font-Montserrat text-neutral-1000'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        16-06-2023
                                    </td>
                                    <td className='p-4 text-sm font-medium font-Montserrat text-neutral-1000'>$200</td>
                                </tr>
                                <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                    <td className='flex gap-4 p-4 my-2.5 text-sm font-medium font-Montserrat text-neutral-1000'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        16-06-2023
                                    </td>
                                    <td className='p-4 text-sm font-medium font-Montserrat text-neutral-1000'>$200</td>
                                </tr>
                                <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                    <td className='flex gap-4 p-4 my-2.5 text-sm font-medium font-Montserrat text-neutral-1000'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        16-06-2023
                                    </td>
                                    <td className='p-4 text-sm font-medium font-Montserrat text-neutral-1000'>$200</td>
                                </tr>
                                <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                    <td className='flex gap-4 p-4 my-2.5 text-sm font-medium font-Montserrat text-neutral-1000'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        16-06-2023
                                    </td>
                                    <td className='p-4 text-sm font-medium font-Montserrat text-neutral-1000'>$200</td>
                                </tr>
                                <tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
                                    <td className='flex gap-4 p-4 my-2.5 text-sm font-medium font-Montserrat text-neutral-1000'>
                                        <input htmlFor="date" type="checkbox" id="date" value="" />
                                        16-06-2023
                                    </td>
                                    <td className='p-4 text-sm font-medium font-Montserrat text-neutral-1000'>$200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button className="flex-grow btn btn-dark" label="">Get Certificate</button>
                        <button className="flex-grow btn btn-primary " label="Get Invoice">Get Invoice</button>
                    </div>
                </div>
            </Transition>
        </>
    );

}
export default PaymentHistoryDetails;