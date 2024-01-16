import React from "react";
import { CalendarIcon, CloseIcon, InfoIcon, UsaFlagIcon } from "../../../../../../theme/svg-icons";
import { Button } from "../../../../../../components";

export const AddDonationModalComponent = ({onClose}) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
                    <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                        <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
                            <div className="bg-white px-4 pt-4 pb-7.5 sm:px-10 sm:pt-10 sm:pb-10 py-10">
                                <div className="flex flex-col gap-5 sm:gap-8">
                                    <div className="flex justify-between">
                                        <div className="font-bold tracking-tighter text-md sm:text-heading-7">Add Donations</div>
                                        <button className="text-neutral-1000" onClick={onClose}>
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                            <div className="form-group">
                                                <label htmlFor="amount" className="block">Donation Amount</label>
                                                <input type="text" className="w-full form-control" id="Weight" placeholder="$100" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="date" className="block">Date</label>
                                                <div className="relative">
                                                    <input type="number" className="w-full !pr-10 form-control [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" id="Weight" placeholder="MM/DD/YYYY" />
                                                    <span className="absolute cursor-pointer text-neutral-500 right-4 top-3">
                                                        <CalendarIcon />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full form-group">
                                            <label htmlFor="campaign" className="block">Select Campaign</label>
                                            <select className="w-full text-sm !text-neutral-800 border-neutral-300 form-control" id="SelectProject">
                                                <option value="1" className="text-neutral-400">Select Campaign</option>
                                            </select>
                                        </div>
                                        <h5 className="text-button-lg">Donor Details</h5>
                                        <div className="flex flex-col gap-4 sm:gap-5">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                                <div className="form-group">
                                                    <label htmlFor="first name" className="block">First Name</label>
                                                    <input type="text" className="w-full form-control" placeholder="First Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="last name" className="block">Last Name</label>
                                                    <input type="text" className="w-full form-control" placeholder="Last Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="company name" className="block">Company Name (Optional)</label>
                                                    <input type="text" className="w-full form-control" placeholder="Company Name (Optional)" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Country" className="block">Country</label>
                                                    <select className="w-full text-sm !text-neutral-800 border-neutral-300 form-control" id="SelectProject">
                                                        <option value="1" className="text-neutral-400">Select Country</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full form-group">
                                                <label htmlFor="address" className="block">Address</label>
                                                <input type="text" className="w-full form-control" placeholder="Address" />
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 mb-1 sm:grid-cols-2 sm:gap-5">
                                                <div className="form-group">
                                                    <label htmlFor="email" className="block">Email Address</label>
                                                    <input type="text" className="w-full form-control" placeholder="Email Address" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="number" className="block">Phone Number</label>
                                                    <div class="relative">
                                                        <div class="absolute items-center cursor-pointer bg-neutral-200 flex justify-center p-2 h-11 border rounded-tl-lg rounded-bl-lg border-neutral-300">
                                                            <UsaFlagIcon iconSize={14} />
                                                        </div>
                                                    </div>
                                                    <input type="text" className="w-full !pl-10 form-control" placeholder="+38 (000) 000 - 00 - 00" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 sm:gap-7.5">
                                        <Button className="flex-grow basis-0 btn btn-outline-secondary" variant="" label={'Cancel'} />
                                        <Button className="flex-grow basis-0 btn btn-primary" variant="" label={'Add Donation'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}