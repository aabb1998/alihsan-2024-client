import React  from 'react'

export const ChooseDonation = () => {
return (

    <div className="border rounded-2.5xl md:rounded-4xl border-neutral-300 p-4 md:p-7.5 bg-white">
        <div className="flex items-center justify-between mb-5 md:mb-8">
            <h5 className="text-button-lg md:text-heading-5">Choose Donation</h5>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
            <div className="p-2 bg-accent-100 rounded-lg gap-3.5 flex">
                <button className="btn-tab btn-primary filled text-button-md">One-time</button>
                <button className="btn-tab btn-secondary-text filled text-button-md">Recurring</button>
            </div>
            <fieldset className="grid justify-between gap-4 md:gap-3.5 grid-cols-2 md:grid-cols-4">
                <legend className="sr-only">Select an amount to donate</legend>
                <div className="col-span-1">
                    <input type="radio" id="100" name="DonateAmount" value="100" className="hidden peer" />
                    <label htmlFor="100" className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2">
                    $100
                    </label>
                </div>
                <div className="col-span-1">
                    <input type="radio" id="200" name="DonateAmount" value="200" className="hidden peer" />
                    <label htmlFor="200" className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2">
                    $500
                    </label>
                </div>
                <div className="col-span-1">
                    <input type="radio" id="800" name="DonateAmount" value="800" className="hidden peer" />
                    <label htmlFor="800" className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2">
                    $800
                    </label>
                </div>
                <div className="col-span-1">
                    <input type="radio" id="Other" name="DonateAmount" value="Other" className="hidden peer" />
                    <label htmlFor="Other" className="inline-flex items-center justify-center w-full h-full gap-2 px-5 py-2.5 font-bold transition-colors duration-200 ease-in-out border-2 rounded-lg cursor-pointer border-primary-300 text-primary-300 peer-checked:bg-primary-300 peer-checked:text-neutral-100 peer-checked:border-2">
                    Other
                    </label>
                </div>
            </fieldset>
            <div>
                <button className="btn btn-primary filled">Donate</button>
            </div>
        </div>
    </div>

)
}