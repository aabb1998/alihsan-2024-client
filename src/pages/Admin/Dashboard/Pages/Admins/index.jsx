import React, { useState } from "react";
import { Edit3Icon, EditIcon, PlusIcon, TrashIcon } from "../../../../../theme/svg-icons";
import AdminRoleDropdown from "./Common/AdminRole";
import DeleteAdmins from "./Common/DeleteAdmins";
// import Addadmins from "./Common/AddAdmins";
import { Pagination } from "../../../../../features/projects/Pagination";
import Editadmins from "./Common/EditAdmins";
import Img from "../../../../../components/Image";
import Addadmins from "../../../Common/AddAdmins";
export const AdminsContentComponent = () => {
    const [isAddOpen, setAddOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    return (
        <>
            <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
                <div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
                    <h5 className='text-heading-7 md:text-heading-5'>Admins</h5>
                    <button className=" btn btn-primary text-button-md md:text-button-lg" variant="primaryFull" type="submit" onClick={() => setAddOpen(true)}> <span className='sm:hidden'><PlusIcon /></span> <span className='hidden sm:flex'>Add Admin</span> </button>

                    {isAddOpen && (
                        <Addadmins
                            isAddOpen={isAddOpen}
                            onClose={() => setAddOpen(false)}
                        />
                    )}
                </div>
                <div className="grid mt-5 md:mt-7.5">
                <div className='relative overflow-x-auto h-100'>
                    <table class="table-auto w-full text-start">
                        <thead className='rounded bg-neutral-200'>
                            <tr className=''>
                                <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Name</th>
                                <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Email Address</th>
                                <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Role</th>
                                <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Last Day Active</th>
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
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <AdminRoleDropdown />
                                </td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>20 days ago</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100' onClick={() => setEditOpen(true)}>
                                            <Edit3Icon />
                                        </div>
                                        {isEditOpen && (
                                            <Editadmins
                                                isEditOpen={isEditOpen}
                                                onClose={() => setEditOpen(false)}
                                            />
                                        )}
                                        <div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer' onClick={() => setDeleteOpen(true)}>
                                            <TrashIcon />
                                        </div>
                                        {isDeleteOpen && (
                                            <DeleteAdmins
                                                isOpen={isDeleteOpen}
                                                onClose={() => setDeleteOpen(false)}
                                            />
                                        )}

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
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'> <AdminRoleDropdown /></td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>20 days ago</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100'>
                                            <Edit3Icon />
                                        </div>
                                        <div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer'>
                                            <TrashIcon />
                                        </div>

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
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'> <AdminRoleDropdown /></td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>20 days ago</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100'>
                                            <Edit3Icon />
                                        </div>
                                        <div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer'>
                                            <TrashIcon />
                                        </div>

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
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'> <AdminRoleDropdown /></td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>20 days ago</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100'>
                                            <Edit3Icon />
                                        </div>
                                        <div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer'>
                                            <TrashIcon />
                                        </div>

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
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>johnjoe@gmail.com</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'> <AdminRoleDropdown /></td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>20 days ago</td>
                                <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100'>
                                            <Edit3Icon />
                                        </div>
                                        <div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer'>
                                            <TrashIcon />
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>

                <div className="mt-7.5">
                    <Pagination />
                </div>
            </div>

        </>
    );

}
