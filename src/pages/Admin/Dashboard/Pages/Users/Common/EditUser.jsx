import React from 'react';
import { CloseIcon,  UsaFlagIcon } from '../../../../../../theme/svg-icons';
import Button from '../../../../../../components/Button';
export const EditUser = () => {
    return (
        <>

            <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
                    <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
                        <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                            <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
                                    <div className="flex justify-between">
                                        <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                                            Edit User
                                        </div>
                                        <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                            <div className="form-group">
                                                <label htmlFor="first name" className="block">First Name</label>
                                                <input type="text" className="w-full form-control" placeholder="First Name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="last name" className="block">Last Name</label>
                                                <input type="text" className="w-full form-control" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
                                        <div className="flex flex-col gap-4 sm:gap-5">

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
                                    <div className='flex justify-between gap-4 sm:gap-5'>
                                        <Button variant={"secondaryOutline"} className="flex-grow" label={"Cancel"} />
                                        <Button variant={"primary"} className="flex-grow" label={"Save"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default EditUser;