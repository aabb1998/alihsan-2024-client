import React from 'react';
import { CheckIcon, StepperRightArrowIcon, StepperRightArrowSmallIcon } from '../../../../../theme/svg-icons';

export const StepperBasket =() =>{ return(


<div>
    <div className="flex flex-wrap items-center justify-center">
        <div className="flex items-center gap-1 md:gap-2">
            <div className="items-center justify-center hidden w-6 h-6 text-xs font-bold rounded-full md:text-lg md:flex md:w-11 md:h-11 bg-accent-300 text-primary-300">
                1
            </div>
            <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:hidden md:w-11 md:h-11 bg-accent-300 text-primary-300">
               1
            </div>
            <span className="text-button-md md:text-heading-7">Basket</span>
        </div>
        <div className="hidden mx-5 md:block text-neutral-400">
            <StepperRightArrowIcon />
        </div>
        <div className="mx-1.5 md:hidden text-neutral-400">
            <StepperRightArrowSmallIcon />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:w-11 md:h-11 bg-neutral-300 text-neutral-100">2</div>
            <span className="text-button-md md:text-heading-7 text-neutral-400 whitespace-nowrap">Checkout</span>
        </div>
        <div className="hidden mx-5 md:block text-neutral-400">
            <StepperRightArrowIcon />
        </div>
        <div className="mx-1.5 md:hidden text-neutral-400">
            <StepperRightArrowSmallIcon />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:w-11 md:h-11 bg-neutral-300 text-neutral-100">3</div>
            <span className="text-button-md md:text-heading-7 text-neutral-400">Confirm</span>
        </div>
    </div>
</div>

)
}