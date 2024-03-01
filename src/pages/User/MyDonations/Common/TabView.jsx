import { Tab } from '@headlessui/react';
import React from 'react';
import { SubscriptionsComponent } from '.';
import { FilterIcon, SearchIcon } from '../../../../theme/svg-icons';

function DonationsTab() {
  return (
    <div>
    <Tab.Group>
      <Tab.List className="flex flex-wrap border-b sm:gap-y-4 border-b-neutral-300">
        <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 active:text-primary-300 active:border-b-primary-300 focus:outline-none focus-within:outline-none">Active Subscriptions</Tab>
        <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">Inactive Subscriptions</Tab>

      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
        <div className="py-7.5 flex items-center justify-between form-group whitespace-nowrap">
                        <div className="items-center hidden gap-4 sm:flex">
                            <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
                                Sort By:
                            </label>
                            <select className="text-sm h-10 !py-0 w-[140px] !text-neutral-800 form-control !rounded-md !pr-8 truncate" id="SortBy">
                                <option value="1">Type</option>
                            </select>
                            <button className="text-sm font-bold !mb-0">
                                Clear
                            </button>
                        </div>
                        <div className='flex flex-row gap-1 sm:hidden'>
                          <FilterIcon />
                          <p className='font-medium text-md text-neutral-800'>Filter</p>
                        </div>
                        <div className="">
                            <div className="form-group">
                                <label className="relative block !mb-0">
                                    <span className="sr-only">Search</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                                        <SearchIcon />
                                    </span>
                                    <input className="block w-full !py-2.5 !pr-3 bg-white border rounded-md form-control !pl-11 md:w-[200px] lg:w-[300px]" placeholder="Search" type="text" name="search" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                    <SubscriptionsComponent />
                    <SubscriptionsComponent />
                    </div>
        </Tab.Panel>
        <Tab.Panel>
        <div className="py-7.5 flex items-center justify-between form-group whitespace-nowrap">
                        <div className="items-center hidden gap-4 sm:flex">
                            <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
                                Sort By:
                            </label>
                            <select className="text-sm h-10 !py-0 w-[140px] !text-neutral-800 form-control !rounded-md !pr-8 truncate" id="SortBy">
                                <option value="1">Type</option>
                            </select>
                            <button className="text-sm font-bold !mb-0">
                                Clear
                            </button>
                        </div>
                        <div className='flex flex-row gap-1 sm:hidden'>
                          <FilterIcon />
                          <p className='font-medium text-md text-neutral-800'>Filter</p>
                        </div>
                        <div className="">
                            <div className="form-group">
                                <label className="relative block !mb-0">
                                    <span className="sr-only">Search</span>
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                                        <SearchIcon />
                                    </span>
                                    <input className="block w-full !py-2.5 !pr-3 bg-white border rounded-md form-control !pl-11 md:w-[200px] lg:w-[300px]" placeholder="Search" type="text" name="search" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                    <SubscriptionsComponent />
                    <SubscriptionsComponent />
                    </div>



        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  );
}
export default DonationsTab;