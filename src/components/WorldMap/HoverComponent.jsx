import React, { useMemo } from 'react'
import propTypes from 'prop-types'

export const HoverComponent = ({ content ,mapCountries }) => {
	const activeElement = useMemo(() => {
		const countryList = [...mapCountries].find(country => country.countryName === content);
		return countryList || {};
	}, [content, mapCountries])

    return (<div style={{ padding: 0 }}>
        <div style={{ backgroundColor: 'white', padding: 0, color: 'black', borderRadius: '1rem', width: '15rem' }}>
            <div className="flex flex-col w-full gap-3 p-4 rounded-lg shadow-sm md:w-60">
                <div className="hidden w-full overflow-hidden md:block h-36 rounded-xl">
                    <img
                        src={activeElement.image || "./images/banner/banner.jpg"}
                        className="object-cover w-full h-full"
                        alt="country"
                    />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <img
                        src={`${process.env.REACT_APP_COUNTRY_URL}${activeElement.country}.svg`}
                        className="object-contain w-4 h-auto"
                        alt="US flag"
                    />
                    <p className="text-sm font-bold break-words sm:text-md sm:font-500 text-neutral-1000 line-clamp-1">
                        {activeElement.name}
                    </p>
                </div>
                <p className="font-medium text-center break-words text-button-sm text-neutral-600 line-clamp-3">
                    {activeElement.text}
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