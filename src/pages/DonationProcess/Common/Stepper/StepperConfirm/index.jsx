import React from 'react';
import { CheckIcon, StepperRightArrowIcon, StepperRightArrowSmallIcon } from '../../../../../theme/svg-icons';
import { useNavigate } from 'react-router-dom'

export const StepperConfirm =() =>{
  const navigate = useNavigate()
  return(


<div>
    <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 md:gap-2" onClick={() => navigate('/basket')}>
            <div className="items-center justify-center hidden w-6 h-6 text-lg font-bold rounded-full md:flex md:w-11 md:h-11 bg-accent-300 text-primary-300">
                <CheckIcon iconSize={24} />
            </div>
            <div className="flex items-center justify-center w-6 h-6 text-lg font-bold rounded-full md:hidden md:w-11 md:h-11 bg-accent-300 text-primary-300">
                <CheckIcon iconSize={16} />
            </div>       
            <span className="text-button-md md:text-heading-7">Basket</span>
        </div>
        <div className="hidden mx-5 md:block text-accent-300">
            <StepperRightArrowIcon />
        </div>
        <div className="mx-1.5 md:hidden text-accent-300">
            <StepperRightArrowSmallIcon />
        </div>
        <div className="flex items-center gap-1 md:gap-2" onClick={() => navigate('/checkout')}>
            <div className="items-center justify-center hidden w-6 h-6 text-lg font-bold rounded-full md:flex md:w-11 md:h-11 bg-accent-300 text-primary-300">
                <CheckIcon iconSize={24} />
            </div>
            <div className="flex items-center justify-center w-6 h-6 text-lg font-bold rounded-full md:hidden md:w-11 md:h-11 bg-accent-300 text-primary-300">
                <CheckIcon iconSize={16} />
            </div>  
            <span className="text-button-md md:text-heading-7 whitespace-nowrap">Checkout</span>
        </div>
        <div className="hidden mx-5 md:block text-accent-300">
            <StepperRightArrowIcon />
        </div>
        <div className="mx-1.5 md:hidden text-accent-300">
            <StepperRightArrowSmallIcon />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:w-11 md:h-11 bg-accent-300 text-primary-300">3</div>          
            <span className="text-button-md md:text-heading-7">Confirm</span>
        </div>
    </div>
</div>

)
}
