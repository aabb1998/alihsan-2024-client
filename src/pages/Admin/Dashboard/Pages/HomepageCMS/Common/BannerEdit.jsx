import React from 'react';
import { CloseIcon, UsaFlagIcon } from '../../../../../../theme/svg-icons';
import { Button } from '../../../../../../components';
export const BannerEdit = () => {
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
                                            Homepage Banner (AU)
                                        </div>
                                        <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
                                        <div className="flex flex-col form-group">
                                            <div for="dropzone-file" className="relative overflow-hidden cursor-pointer rounded-3xl h-[12.5rem]">
                                                <img src="../images/banner/banner.jpg" alt="banner" className='object-cover w-full h-full' />
                                                {/* <button className='absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5'>Change Cover</button> */}
                                                <div className=" flex items-center justify-center w-full h-full">
                                                    <label for="dropzone-file" className="!mb-0 cursor-pointer absolute right-5 bottom-5">
                                                        <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                                                            Change Cover
                                                        </div>
                                                        <input id="dropzone-file" type="file" className="hidden" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-4 sm:gap-5'>
                                        <Button variant={"secondaryOutline"} className="flex-grow" label={"Cancel"} />
                                        <Button variant={"primary"} className="flex-grow" label={"Update"} />
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
export default BannerEdit;