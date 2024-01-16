import React from 'react'
import Button from '../../../components/Button'
import { useDispatch } from 'react-redux'
import { zakatStep } from '../slice'

export default function Step1 () {
  const dispatch = useDispatch()
  return (
    <>
      <h2 className="mb-6 md:mb-10 text-heading-5 md:text-heading-2">
        Bismillah, let’s get started.
      </h2>
      <p className="mb-6 text-sm sm:mb-5 md:text-md">
        In Sharia, Nisab is the minimum amount that a Muslim must have
        before being obliged to give Zakat. We recommend using Silver
        as the Nisab.
      </p>
      <Button variant="primary" label="Start Calculation" onClick={() => dispatch(zakatStep(1))} />
    </>
  )
}
