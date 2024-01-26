import React from 'react'
import propTypes from 'prop-types'

export const HoverComponent = ({ content ,mapCountries }) => {
    const getActiveElement =() =>{
         const countryList = [...mapCountries]?.find(country=>country?.name ===content);
         return countryList || {};
     }
   
    return (<div style={{ padding: 0 }}>
        <div style={{ backgroundColor: 'white', padding: 0, color: 'black' }}>
            <div className="flex flex-col w-full gap-3 p-4 rounded-lg shadow-sm md:w-60">
                <div className="hidden w-full overflow-hidden md:block h-36 rounded-xl">
                    <img
                        src={getActiveElement()?.image || "./images/banner/banner.jpg"}
                        className="object-cover w-full h-full"
                        alt="country"
                    />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <img
                        src={`${process.env.REACT_APP_COUNTRY_URL}${getActiveElement()?.country}.svg`}
                        className="object-contain w-4 h-auto"
                        alt="US flag"
                    />
                    <p className="text-sm font-bold sm:text-md sm:font-500 text-neutral-1000">
                        {getActiveElement()?.name}
                    </p>
                </div>
                <p className="font-medium text-center text-button-sm text-neutral-600">
                    {getActiveElement()?.text}
                </p>
            </div>
        </div>
    </div>)
}

HoverComponent.propTypes ={
    content: propTypes.string,
    mapCountries: propTypes.array
}

HoverComponent.defaultProps = {
    content: "",
    mapCountries:[]
}