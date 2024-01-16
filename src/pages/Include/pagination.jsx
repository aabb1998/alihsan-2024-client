import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../theme/svg-icons';

export const Pagination =() =>{ return(
    <div className="flex justify-center gap-2 py-3 md:gap-2">
        <button className="btn-pagination btn-neutral-text" disabled><ArrowLeftIcon iconSize={20} /> <span className="hidden md:block">Previous</span>  </button>    
        <ul className="flex items-center justify-center gap-3">
            <li className="flex transition-all items-center justify-center h-10 p-2 border border-accent-300 rounded-[3px] cursor-pointer min-w-[2.5rem] hover:bg-accent-300 text-primary-300 bg-accent-300">1</li>
            <li className="flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">2</li>
            <li className="hidden sm:flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">3</li>
            <li className="flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">...</li>
            <li className="hidden sm:flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">21</li>
            <li className="flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">22</li>
            <li className="flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200">23</li>
        </ul>
        <button className="btn-pagination btn-neutral-text"> <span className="hidden md:block">Next</span> <ArrowRightIcon iconSize={20} /> </button>    
    </div>
) }


