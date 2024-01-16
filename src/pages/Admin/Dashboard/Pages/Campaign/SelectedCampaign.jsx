import React from 'react';
import { PlusIcon } from '../../../../../theme/svg-icons';

export const SelectedCampaignComponent = () => {
    const [count, setCount] = React.useState(0);

    return (

        <div className='mt-10'>
            <form className='w-full mt-7.5'>
                <div className="flex flex-col mb-6 form-group">
                    <div for="dropzone-file" className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76">
                        <img src="/images/campaign/selected-campaign-banner.png" alt="preview" className='object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90' />
                        {/* <button className='absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5'>Change Cover</button> */}
                        <div className="flex items-center justify-center w-full h-full">
                            <label for="dropzone-file" className="!mb-0 cursor-pointer absolute right-5 bottom-5">
                                <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                                    Change Cover
                                </div>
                                <input id="dropzone-file" type="file" className="hidden"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mb-6 form-group">
                    <label htmlFor="ProjectName" className="">Project Name</label>
                    <input type="text" name="ProjectName" className="w-full bg-white form-control" id="project-name" placeholder="Project Name" />
                </div>
                <div className="relative flex flex-col mb-6 text-area">
                    <label htmlFor="description" className="">Project Description</label>
                    <textarea onChange={e => setCount(e.target.value.length)} rows={5} className="w-full bg-white !min-h-40 form-control" id="description" placeholder="Project Description">
                    </textarea>
                    <p className='absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2'>{count}/500</p>
                </div>
            </form>
            <div className='flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3'>
                <h5 className='flex items-center text-button-lg gap-x-2'>Project Images</h5>
                <button className="btn btn-primary text-button-md md:text-button-lg" variant="primaryFull" type="submit" >
                    Add Image
                </button>
            </div>

            <form className='flex flex-wrap gap-2 p-5 md:flex-nowrap sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl'>
                <div className="flex flex-grow md:flex-grow-0 form-group">
                    <div for="dropzone-file" className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51">
                        <img src="/images/campaign/campaign-details-1.png" alt="preview" className='object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90' />
                    </div>
                </div>
                <div className="flex flex-grow md:flex-grow-0 form-group ">
                    <div for="dropzone-file" className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51">
                        <img src="/images/campaign/campaign-details-2.png" alt="preview" className='object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90' />
                    </div>
                </div>
                <div className="flex flex-grow md:flex-grow-0 form-group ">
                    <div for="dropzone-file" className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51">
                        <img src="/images/campaign/campaign-details-3.png" alt="preview" className='object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90' />
                    </div>
                </div>
                <div for="dropzone-file" className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer lg:max-w-51 md:py-12 md:px-8 border-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                        <PlusIcon />
                        <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photos or Video</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </div>
            </form>
        </div>
    )
}
