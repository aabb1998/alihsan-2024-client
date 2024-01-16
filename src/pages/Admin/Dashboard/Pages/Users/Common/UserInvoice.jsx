import React from "react";
import { DownloadIcon } from "../../../../../../theme/svg-icons";
export const UserInvoice = () => {
    return (
        <>
            <div className='mt-6'>
                <div className="flex flex-col gap-3 sm:gap-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border sm:items-center rounded-2xl border-neutral-300">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <p className="text-sm font-medium text-neutral-500">Invoice #023</p>
                            <h5 className="text-heading-6">Aug 1st, 2023</h5>
                        </div>
                        <p className="max-w-xs text-sm font-medium text-neutral-500 line-clamp-1">Project name goes here</p>
                        <div className="flex items-center gap-2 sm:gap-9">
                            <h5 className="text-heading-6 text-neutral-700">$300</h5>
                            <button className="btn bg-primary-100 !p-2"><DownloadIcon /></button>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border sm:items-center rounded-2xl border-neutral-300">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <p className="text-sm font-medium text-neutral-500">Invoice #023</p>
                            <h5 className="text-heading-6">Aug 1st, 2023</h5>
                        </div>
                        <p className="max-w-xs text-sm font-medium text-neutral-500 line-clamp-1">Project name goes here</p>
                        <div className="flex items-center gap-2 sm:gap-9">
                            <h5 className="text-heading-6 text-neutral-700">$300</h5>
                            <button className="btn bg-primary-100 !p-2"><DownloadIcon /></button>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border sm:items-center rounded-2xl border-neutral-300">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <p className="text-sm font-medium text-neutral-500">Invoice #023</p>
                            <h5 className="text-heading-6">Aug 1st, 2023</h5>
                        </div>
                        <p className="max-w-xs text-sm font-medium text-neutral-500 line-clamp-1">Project name goes here</p>
                        <div className="flex items-center gap-2 sm:gap-9">
                            <h5 className="text-heading-6 text-neutral-700">$300</h5>
                            <button className="btn bg-primary-100 !p-2"><DownloadIcon /></button>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-6 border sm:items-center rounded-2xl border-neutral-300">
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <p className="text-sm font-medium text-neutral-500">Invoice #023</p>
                            <h5 className="text-heading-6">Aug 1st, 2023</h5>
                        </div>
                        <p className="max-w-xs text-sm font-medium text-neutral-500 line-clamp-1">Project name goes here</p>
                        <div className="flex items-center gap-2 sm:gap-9">
                            <h5 className="text-heading-6 text-neutral-700">$300</h5>
                            <button className="btn bg-primary-100 !p-2"><DownloadIcon /></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

};