import React from 'react'
import Img from '../../../components/Image'

export default function ZakatHeader() {
  return (
    <div className="relative flex flex-col-reverse items-start justify-start gap-5 px-4 py-5 mb-6 md:px-10 md:justify-between md:flex-row bg-primary-300 sm:rounded-2xl sm:mb-9">
      <h1 className="text-white text-heading-6 sm:text-heading-5">
        Zakat Calculator
      </h1>
      <Img
        src={"/images/illustration/stars.svg"}
        className="absolute bottom-0 right-4"
        alt="stars"
      />
    </div>
  )
}
