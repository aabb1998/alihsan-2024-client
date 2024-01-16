import React from 'react';
import { useState } from "react";
import { FilterIcon, SearchIcon } from '../../../../../theme/svg-icons';
import { Pagination } from '../../../../../features/projects/Pagination';
import { Button } from '../../../../../components';
import Img from '../../../../../components/Image';

const options = ["Type", "Type 2", "Type 3"];
export const ListCampaignComponent = () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
      {/* dashboard title rea */}
      <div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
        <h5 className='text-heading-7 md:text-heading-4'>Campaigns</h5>
        <Button className=" btn btn-primary text-button-md md:text-button-lg" variant="" type="submit" label={'Add New'} />
      </div>
      <div className='flex flex-wrap sm:flex-nowrap items-center justify-between mt-7.5 mb-5'>
        <form className='flex items-center gap-4 mb-3 sm:mb-0'>
          <label className='flex items-center gap-1 cursor-pointer text-button-md text-neutral-1000'>
            <span className=' md:hidden'><FilterIcon /> </span>Filter:</label>
          <div className='hidden md:block'>
            <select className='border rounded border-neutral-300 py-1.5 px-4 w-35' value={selected} onChange={e => setSelected(e.target.value)}>
              {options.map((value) => (
                <option className='text-sm font-medium font-Montserrat text-neutral-800' value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <Button className='hidden text-button-md text-neutral-1000 md:block' variant='' label={'Clear Filter'} />
        </form>
        <div className="hidden w-full md:block md:w-auto form-group md:min-w-72">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
              <SearchIcon />
            </span>
            <input className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9" placeholder="Search" type="text" name="search" />
          </label>

        </div>
      </div>
      <div className='gap-5 md:gap-7.5 grid sm:grid-cols-2 md:grid-cols-3'>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-green-300 rounded-lg w-fit'>
            <h6 className='text-button-lg text-primary-300'>Active</h6>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-primary-100 rounded-lg w-fit'>
            <h6 className='text-button-lg text-primary-300'>Inactive</h6>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-neutral-1000 rounded-lg w-fit'>
            <h6 className='text-white text-button-lg'>Draft</h6>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-yellow-300 rounded-lg w-fit'>
            <h6 className='text-button-lg text-primary-300'>Paused</h6>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-green-300 rounded-lg w-fit'>
            <h6 className='text-button-lg text-primary-300'>Active</h6>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
          <Img src={'/images/campaign/campaign-list-1.png'} alt='campaign list' className='transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
          <div>
            <h6 className='mb-3 text-heading-6 text-neutral-800'>Project name</h6>
            <p className='text-sm font-medium font-Montserrat text-neutral-600'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
          <div className='py-1.5 px-5 bg-primary-100 rounded-lg w-fit'>
            <h6 className='text-button-lg text-primary-300'>Inactive</h6>
          </div>
        </div>

      </div>
      <div className='mt-7.5'>
        <Pagination />
      </div>


    </div>
  )
}