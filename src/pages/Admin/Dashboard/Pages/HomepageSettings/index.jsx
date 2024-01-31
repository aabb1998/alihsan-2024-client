import React, { useState } from "react";
import {
    ChevronsUpIcon,
    Edit3Icon,
    FilterIcon,
    PlusIcon,
    SearchIcon,
} from "../../../../../theme/svg-icons";
// import ActionButtonBgWithIcon from "../../Common/ActionButtonBgWithIcon";
import { Pagination } from "../../../../../features/projects/Pagination";
import Img from "../../../../../components/Image";
import { AddNewGroup } from "./Common";
import ActionButtonBgWithIcon from "../../../Common/ActionButtonBgWithIcon";

const options = ["This Week", "THis Month", "This Year"];
export const HomepageSettings = () => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
                <div className="">
                    {/* dashboard title rea */}
                    <div className="w-full border-b border-neutral-300 pb-3.5">
                        <h5 className="text-heading-7 md:text-heading-5">Campaign Settings</h5>
                    </div>
                    {/* card area */}

                    <div className="mt-6 md:mt-10">
                        <div className="flex flex-col gap-5 sm:gap-6">
                            <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
                                <div className="w-full border-b border-neutral-300 pb-3.5">
                                    <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600"> Campaign Settings</span></h5>
                                </div>
                                <div className="flex flex-col gap-3 mt-5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-md text-neutral-600 grow basis-0">Feed The Needy</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600 ">Clothe Poor People</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">One-time & Recurring Donations</p>
                                        <div className="flex flex-wrap gap-4 grow basis-0">
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
                                <div className="w-full border-b border-neutral-300 pb-3.5">
                                    <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600"> water Wells</span></h5>
                                </div>
                                <div className="flex flex-col gap-3 mt-5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Shallow Water Well</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Deep Water Well</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-md text-neutral-600 grow basis-0">Deep Water Well with Water Station</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
                                <div className="w-full border-b border-neutral-300 pb-3.5">
                                    <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600"> Fedyah/Kaffarah</span></h5>
                                </div>
                                <div className="flex flex-col gap-3 mt-5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Palliative care/Chronic illness/Elderly</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Deliberately breaking fast with no excuse</p>
                                        <div className="flex flex-wrap gap-4 grow basis-0">
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Intimacy with Spouse During Ramadan</p>
                                        <div className="flex flex-wrap gap-4 grow basis-0">
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Temporary Sickness or Travel</p>
                                        <div className="flex flex-wrap gap-4 grow basis-0">
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Temporary Sickness or Travel</p>
                                        <div className="flex flex-wrap gap-4 grow basis-0">
                                            <div class="relative overflow-hidden form-group ">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                            <div class="relative overflow-hidden form-group">
                                                <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                    <Edit3Icon iconSize={18} />
                                                </div>
                                                <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
                                <div className="w-full border-b border-neutral-300 pb-3.5">
                                    <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600"> Aqeeqah Adahi</span></h5>
                                </div>
                                <div className="flex flex-col gap-3 mt-5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium grow basis-0 text-md text-neutral-600">Aqeeqah Adahi Donation</p>
                                        <div class="relative overflow-hidden form-group grow basis-0">
                                            <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                                                <Edit3Icon iconSize={18} />
                                            </div>
                                            <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder="$12" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
                                <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
                                    <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600"> Qurban</span></h5>
                                    <button
                                        className=" btn btn-primary text-button-md md:text-button-lg"
                                        variant="primaryFull"
                                        type="submit"
                                        onClick={() => setIsOpen(true)}
                                    >
                                        {" "}
                                        <span className="sm:hidden">
                                            <PlusIcon />
                                        </span>{" "}
                                        <span className="hidden sm:flex">Add New Group</span>{" "}
                                    </button>
                                    {isOpen && (
                                        <AddNewGroup
                                            isOpen={isOpen}
                                            onClose={() => setIsOpen(false)}
                                        />
                                    )}
                                </div>
                                <div className="grid mt-5 md:mt-7">
                                <div className="relative overflow-x-auto ">
                                    <table class="table-auto w-full text-start">
                                        <thead className="rounded bg-neutral-200">
                                            <tr className="">
                                                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                                                    Group Name
                                                </th>
                                                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                                                    Donation Amount
                                                </th>

                                                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                                                    Distributed In
                                                </th>
                                                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                                                <td className="p-4 text-button-md font-Montserrat text-neutral-700">
                                                    Group A
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    $100
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <div className="flex flex-wrap gap-3">
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <ActionButtonBgWithIcon />
                                                </td>
                                            </tr>
                                            <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                                                <td className="p-4 text-button-md font-Montserrat text-neutral-700">
                                                    Group B
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    $100
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <div className="flex gap-3">
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <ActionButtonBgWithIcon />
                                                </td>
                                            </tr>
                                            <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                                                <td className="p-4 text-button-md font-Montserrat text-neutral-700">
                                                    Group B
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    $100
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <div className="flex gap-3">
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                        <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                                                            <Img src={'../images/flags/US.png'} className={'w-[1.375rem] h-auto'} alt="flag" />
                                                            <p className="text-sm text-neutral-800 line-clamp-1">US</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                                                    <ActionButtonBgWithIcon />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="mt-5">
                                        <Pagination />
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
