import React from 'react';
import { ArrowLeftIcon } from '../../../../../theme/svg-icons';
import InfoCampaignTabs from '../../Common/Tabs';
import SaveDraftModal from '../../Common/SaveDraftModal';
import DeleteModal from '../../Common/DeleteModal';
import PostUpdateModal from '../../Common/PostUpdateModal';
import { Button } from '../../../../../components';


export const EditCampaignComponent = () => {
    return (
        <div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
            {/* dashboard title rea */}
            <div className='flex flex-wrap items-center justify-between w-full gap-4'>
                <button className='flex items-center text-button-lg gap-x-2' >
                    <span ><ArrowLeftIcon /> </span>Back to Campaigns</button>
                <div className='flex flex-wrap items-center gap-2 lg:gap-3'>
                    <Button className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg" variant="" type="submit" label={'Delete'} />
                    <Button className="flex-grow btn btn-dark text-button-md md:text-button-lg" variant="" type="submit" label={'Save as Draft'} />
                    <Button className="flex-grow btn btn-primary text-button-md md:text-button-lg" variant="" type="submit" label={'Publish'} />


                </div>
            </div>
            <div className='mt-7.5'>
                <InfoCampaignTabs />
            </div>
            <div className='flex gap-2 my-5'>
                <SaveDraftModal />
                <DeleteModal />
                <PostUpdateModal />
            </div>
        </div>

    )
}
