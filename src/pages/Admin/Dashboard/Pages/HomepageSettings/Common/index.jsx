import React from "react";
import { CalendarIcon, CloseIcon, InfoIcon, UsaFlagIcon } from "../../../../../../theme/svg-icons";
import { Button } from "../../../../../../components";

export const AddNewGroup = ({ onClose }) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
                    <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                        <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
                            <div className="bg-white px-4 pt-4 pb-7.5 sm:px-10 sm:pt-10 sm:pb-10 py-10">
                                <div className="flex flex-col gap-5 sm:gap-8">
                                    <div className="flex justify-between">
                                        <div className="font-bold tracking-tighter text-md sm:text-heading-7">Add New Group</div>
                                        <button className="text-neutral-1000" onClick={onClose}>
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="w-full form-group">
                                        <label htmlFor="amount" className="block">Group Name</label>
                                        <input type="text" className="w-full form-control" id="Weight" placeholder="Group F" />
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                            <div className="form-group">
                                                <label htmlFor="country" className="block">Country</label>
                                                <select className="w-full text-sm !text-neutral-800 border-neutral-300 form-control" id="SelectProject">
                                                    <option value="1" className="text-neutral-400">Select Country</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cost" className="block">Cost</label>
                                                <input type="text" className="w-full form-control" id="Weight" placeholder="$130" />

                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex gap-5 sm:gap-7.5">
                                        <Button className="flex-grow basis-0 btn btn-outline-secondary" variant="" label={'Cancel'} />
                                        <Button className="flex-grow basis-0 btn btn-primary" variant="" label={'Submit'} />
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