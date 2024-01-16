import React from 'react'

export const HeaderModal = ({ children, show }) => {
    return (
        <div className='container relative !p-0'>
            <div
                className={`w-full md:px-8 px-0 mt-[5rem] gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-30 transition hidden md:flex duration-800 transform ${show
                    ? "translate-y-100 opacity-100"
                    : "-translate-y-[850px] opacity-0"
                    }`}
            >{children}
            </div>
        </div>

    )

}

