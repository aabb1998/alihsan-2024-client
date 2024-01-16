import React, { useState } from 'react';
import { ArrowRightIcon, CalendarIcon, DollarSignIcon } from '../../../../theme/svg-icons';
import ViewDetailsOneTime from './ViewOnetimeModal';
import Img from '../../../../components/Image';

export const OneTimeSubscriptionsComponent =() =>{
    const [isOpen, setIsOpen] = useState(false);
     return(


    <div className="flex flex-col gap-5 p-4 border md:flex-row border-neutral-300 rounded-2xl">
        <div className="shrink-0">
            <div className="relative">
                <Img src={"/images/banner/projects/1.jpg"} alt="" className="object-cover h-full min-h-[108px] w-full md:w-[162px] rounded-xl" />
            </div>
        </div>
        <div className="flex flex-col justify-between grow">
            <div>
                <h3 className="mb-1 text-heading-7 text-neutral-800">Project name</h3>
                <p className="mb-5 text-sm text-neutral-600 line-clamp-3 sm:line-clamp-2 md:line-clamp-1"> "Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor "Lorem ipsum dolor sit amet, nsectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>
            <div className="flex flex-wrap justify-between gap-4 sm:gap-5">
                <div className="flex gap-2">
                    <div className="flex items-center justify-center w-10 h-10 p-2 text-yellow-500 rounded bg-accent-300">
                        <DollarSignIcon iconSize={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-neutral-600">Donation Amount</div>
                        <div className="font-bold">$200</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center justify-center w-10 h-10 p-2 text-green-500 bg-green-300 rounded">
                        <CalendarIcon iconSize={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-neutral-600">Date</div>
                        <div className="font-bold">20-09-2023</div>
                    </div>
                </div>
                <div className="flex w-full md:w-auto">
                    <button className="!py-2 btn btn-secondary flex-grow md:flex-grow-0" onClick={()=>setIsOpen(true)}> <span>View</span> <ArrowRightIcon iconSize={20}  /> </button>
                    {isOpen && (  <ViewDetailsOneTime isOpen={isOpen} onClose={() => setIsOpen(false)} project={null} /> )}
                </div>
            </div>
        </div>
    </div>

) }
