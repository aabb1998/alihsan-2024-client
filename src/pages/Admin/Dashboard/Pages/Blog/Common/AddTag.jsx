import React from 'react';
import { CloseIcon, UsaFlagIcon } from '../../../../../../theme/svg-icons';
import { Button } from '../../../../../../components';


export const AddTag = () => {
    return (
        <>

            <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
                    <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
                        <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                            <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-7.5 bg-white rounded-t-3xl sm:rounded-3xl">
                                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
                                    <div className="flex justify-between">
                                        <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                                            Create New Tag
                                        </div>
                                        <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
                                        <div className="grid grid-cols-1">
                                            <div className="form-group">
                                                <label htmlFor="tag name" className="block">Tag Name</label>
                                                <input type="text" className="w-full form-control" placeholder="Tag Name" />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                                            <div className="form-group">
                                                <label htmlFor="color" className="block">Tag Color</label>
                                                <div className='flex flex-wrap gap-3'>

                                                    <div className='w-8 h-8 rounded-lg bg-accent-300 hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                    <div className='w-8 h-8 bg-green-300 rounded-lg hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                    <div className='w-8 h-8 rounded-lg bg-[#2980F5] hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                    <div className='w-8 h-8 bg-red-300 rounded-lg hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                    <div className='w-8 h-8 rounded-lg bg-neutral-600 hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                    <div className='w-8 h-8 rounded-lg bg-[#003859] hover:border-2 hover:border-neutral-400 '>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-center justify-center gap-1 p-3 rounded-lg form-group bg-neutral-200'>
                                                <p className='text-sm font-medium text-neutral-600'>Preview</p>
                                                <div className='text-sm h-fit w-fit rounded font-semibold px-3 py-1.5 bg-accent-300 text-primary-300'>
                                                    New Tag
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-4 sm:gap-5'>
                                        <Button variant={"secondaryOutline"} className="flex-grow" label={"Cancel"} />
                                        <Button variant={"primary"} className="flex-grow" label={"Create Tag"} />
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
export default AddTag;