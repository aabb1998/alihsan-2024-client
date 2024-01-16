import React from 'react';
import ActionButtonWithIcon from '../../Common/ActionButtonwithIcon';
export const UpdateCampaignComponent = () => {
    return (
        <div className='flex flex-col gap-3 mt-10 sm:gap-6'>
            <div className='flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <img src='../../images/avatar/avatar-2.jpg' width={44} height={44} className='object-cover rounded-full w-11 h-11' alt='avatar'/>
                    <div className='flex flex-col gap-2'>
                        <h6 className='text-heading-7 text-neutral-1000'>Jone Joe</h6>
                        <p className='text-sm font-medium font-Montserrat text-neutral-500'>25 days ago</p>
                    </div>
                </div>
                <ActionButtonWithIcon/>
            </div>
            <p className='text-sm font-medium font-Montserrat text-neutral-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, neque non sodales porttitor, dolor tellus sodales metus, ac condimentum erat ante sed tortor. Ut et urna pulvinar, varius velit at, ultrices quam. Nunc rhoncus dui at urna.</p>
            <div className='grid flex-wrap grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 md:gap-5'>
                <img src="../../images/campaign/update-Image-1.png" className='rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90' alt=''/>
                <img src="../../images/campaign/update-Image-2.png" className='rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow  w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90' alt=''/>
                <img src="../../images/campaign/update-Image-3.png" className='rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow  w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90' alt=''/>
                <img src="../../images/campaign/update-Image-4.png" className='rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow  w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90' alt=''/>
            </div>

        </div>
        <div className='flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <img src='../../images/avatar/avatar-2.jpg' width={44} height={44} className='object-cover rounded-full w-11 h-11' alt='avatar'/>
                        <div className='flex flex-col gap-2'>
                            <h6 className='text-heading-7 text-neutral-1000'>Jone Joe</h6>
                            <p className='text-sm font-medium font-Montserrat text-neutral-500'>25 days ago</p>
                        </div>
                    </div>
                    <ActionButtonWithIcon/>
                </div>
                <p className='text-sm font-medium font-Montserrat text-neutral-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, neque non sodales porttitor, dolor tellus sodales metus, ac condimentum erat ante sed tortor. Ut et urna pulvinar, varius velit at, ultrices quam. Nunc rhoncus dui at urna.</p>
                <div className='w-full'>
                    <img src="../../images/campaign/update-Image-5.png" className='rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90' alt=''/>
                </div>

            </div>
            <div className='flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <img src='../../images/avatar/avatar-2.jpg' width={44} height={44} className='object-cover rounded-full w-11 h-11' alt='avatar'/>
                        <div className='flex flex-col gap-2'>
                            <h6 className='text-heading-7 text-neutral-1000'>Jone Joe</h6>
                            <p className='text-sm font-medium font-Montserrat text-neutral-500'>25 days ago</p>
                        </div>
                    </div>
                    <ActionButtonWithIcon/>
                </div>
                <p className='text-sm font-medium font-Montserrat text-neutral-800'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus, neque non sodales porttitor, dolor tellus sodales metus, ac condimentum erat ante sed tortor. Ut et urna pulvinar, varius velit at, ultrices quam. Nunc rhoncus dui at urna.</p>

            </div>
        </div>


    );
}