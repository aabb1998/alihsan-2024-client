import React from 'react';
import { Button } from '../../../../../../components';
import { CloseIcon } from '../../../../../../theme/svg-icons';


export const FeatureCampaign = () => {
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
                                            Feature Campaigns
                                        </div>
                                        <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                                            <CloseIcon iconSize={24} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
                                        <div className="grid grid-cols-1 gap-5">
                                            <div className="form-group">
                                                <label htmlFor="tag name" className="block">Feature Campaign 01</label>
                                                <select
                                                    className="w-full text-sm !text-neutral-800 form-control"
                                                    id="Campaign"
                                                    name="Campaign"
                                                >
                                                    <option value="">Select Campaign</option>
                                                    <option value="Campaign-01">Feature Campaign 01</option>
                                                    <option value="Campaign-01">Feature Campaign 02</option>
                                                    <option value="Campaign-01">Feature Campaign 03</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tag name" className="block">Feature Campaign 02</label>
                                                <select
                                                    className="w-full text-sm !text-neutral-800 form-control"
                                                    id="Campaign"
                                                    name="Campaign"
                                                >
                                                    <option value="">Select Campaign</option>
                                                    <option value="Campaign-01">Feature Campaign 01</option>
                                                    <option value="Campaign-01">Feature Campaign 02</option>
                                                    <option value="Campaign-01">Feature Campaign 03</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tag name" className="block">Feature Campaign 03</label>
                                                <select
                                                    className="w-full text-sm !text-neutral-800 form-control"
                                                    id="Campaign"
                                                    name="Campaign"
                                                >
                                                    <option value="">Select Campaign</option>
                                                    <option value="Campaign-01">Feature Campaign 01</option>
                                                    <option value="Campaign-01">Feature Campaign 02</option>
                                                    <option value="Campaign-01">Feature Campaign 03</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tag name" className="block">Feature Campaign 04</label>
                                                <select
                                                    className="w-full text-sm !text-neutral-800 form-control"
                                                    id="Campaign"
                                                    name="Campaign"
                                                >
                                                    <option value="">Select Campaign</option>
                                                    <option value="Campaign-01">Feature Campaign 01</option>
                                                    <option value="Campaign-01">Feature Campaign 02</option>
                                                    <option value="Campaign-01">Feature Campaign 03</option>
                                                </select>
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
export default FeatureCampaign;