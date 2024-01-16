import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckIcon, StepperRightArrowIcon, StepperRightArrowSmallIcon } from '../../../theme/svg-icons';

const Arrow = () => (
  <>
    <div className="hidden mx-5 md:block text-neutral-400">
      <StepperRightArrowIcon />
    </div>
    <div className="mx-1.5 md:hidden text-neutral-400">
      <StepperRightArrowSmallIcon />
    </div>
  </>
)

const Stage = ({ number, done, text, onClick, disabled }) => done?(
  <div className="flex items-center gap-1 md:gap-2" onClick={onClick}>
    <div className="items-center justify-center hidden w-6 h-6 text-xs font-bold rounded-full md:text-lg md:flex md:w-11 md:h-11 bg-accent-300 text-primary-300">
      <CheckIcon iconSize={24} />
    </div>
    <div className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:hidden md:w-11 md:h-11 bg-accent-300 text-primary-300">
      <CheckIcon iconSize={16} />
    </div>
    <span className="text-button-md md:text-heading-7">{text}</span>
  </div>
):(
  <div className="flex items-center gap-1 md:gap-2">
    <div className={"flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full md:text-lg md:w-11 md:h-11 "+(disabled?"bg-neutral-300 text-neutral-200":"bg-accent-300 text-primary-300")}>{number}</div>
    <span className={"text-button-md md:text-heading-7 "+(disabled?" text-neutral-400":"")}>{text}</span>
  </div>
)

export default function Stepper({ }) {
  const { pathname } = useLocation();
  const stage = pathname==='/basket'
    ? 1 : pathname==='/checkout'
    ? 2 : pathname==='/confirm'
    ? 3 : 4

  const navigate = useNavigate()
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center">
        <Stage number={1} done={stage>1} text="Basket" onClick={() => navigate('/basket')} />
        <Arrow />
        <Stage number={2} done={stage>2} disabled={stage<2} text="Checkout" onClick={() => navigate('/checkout')} />
        <Arrow />
        <Stage number={3} done={stage>3} disabled={stage<3} text="Confirm" onClick={() => navigate('/confirm')} />
      </div>
    </div>
  )
}
