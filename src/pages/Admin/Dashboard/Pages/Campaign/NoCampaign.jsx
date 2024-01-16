import React from 'react';
import { DownloadIcon } from '../../../../../theme/svg-icons';
import Img from '../../../../../components/Image';

export const NoCampaignComponent = () => {
    return (
        <div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
            {/* dashboard title rea */}
            <div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
                <h5 className='text-button-lg md:text-heading-5'>Campaigns</h5>
                <button className=" btn btn-primary text-button-md md:text-button-lg" variant="" type="submit" >
                    <span className='sm:hidden'><DownloadIcon /></span>
                    <span className='hidden sm:flex'>Add New</span>
                </button>
            </div>
            <div className='flex flex-col items-center justify-center gap-5 py-10 mt-5 text-center bg-neutral-200 rounded-xl'>
                <Img src={'../../images/no-campaign.png'} alt='No campaign' className='w-2/4 sm:w-fit' />
                <div>
                    <h6 className='mb-2 font-bold text-button-lg text-neutral-1000 md:text-heading-6'>No Campaigns yet</h6>
                    <p className='text-sm font-medium w-60 font-Montserrat text-neutral-600'>No Campaigns has been made. Please add a campaign.</p>
                </div>

            </div>
        </div>
    )
}
