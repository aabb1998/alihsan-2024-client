import React, { useState } from 'react';
import propTypes from "prop-types";
import { InfoIcon } from '../../../theme/svg-icons';
import { Popover } from '@headlessui/react'

export const PasswordMeter = (props) => {
    const { isVisiblePasswordMeter, passwordScore, passwordValue } = props;

    let text = '';
    let textClass = 'text-xs w-8.5 text-right';
    let meterOneClass, meterTwoClass, meterThreeClass, meterFourClass, meterFiveClass;
    meterOneClass = meterTwoClass = meterThreeClass = meterFourClass = meterFiveClass = 'block w-1/5 h-1 transition-colors ease-in-out rounded-xl';

    if (passwordScore < 3) {
        text = 'Poor';
        textClass = textClass + ' text-neutral-300';

        meterOneClass = meterOneClass + ' bg-neutral-300'
        meterTwoClass = meterTwoClass + ' bg-neutral-300';
        meterThreeClass = meterThreeClass + ' bg-neutral-300';
        meterFourClass = meterFourClass + ' bg-neutral-300';
        meterFiveClass = meterFiveClass + ' bg-neutral-300';
    } else if (passwordScore < 5) {
        text = 'Bad';
        textClass = textClass + ' text-red-300';

        meterOneClass = meterOneClass + ' bg-red-300'
        meterTwoClass = meterTwoClass + ' bg-red-300';
        meterThreeClass = meterThreeClass + ' bg-neutral-300';
        meterFourClass = meterFourClass + ' bg-neutral-300';
        meterFiveClass = meterFiveClass + ' bg-neutral-300';
    } else if (passwordScore < 7) {
        text = 'Weak';
        textClass = textClass + ' text-accent-400';

        meterOneClass = meterOneClass + ' bg-accent-400'
        meterTwoClass = meterTwoClass + ' bg-accent-400';
        meterThreeClass = meterThreeClass + ' bg-accent-400';
        meterFourClass = meterFourClass + ' bg-neutral-300';
        meterFiveClass = meterFiveClass + ' bg-neutral-300';
    } else if (passwordScore < 9) {
        text = 'Good';
        textClass = textClass + ' text-yellow-300';

        meterOneClass = meterOneClass + ' bg-yellow-300'
        meterTwoClass = meterTwoClass + ' bg-yellow-300';
        meterThreeClass = meterThreeClass + ' bg-yellow-300';
        meterFourClass = meterFourClass + ' bg-yellow-300';
        meterFiveClass = meterFiveClass + ' bg-neutral-300';
    } else {
        text = 'Great!';
        textClass = textClass + ' text-green-300';

        meterOneClass = meterOneClass + ' bg-green-300'
        meterTwoClass = meterTwoClass + ' bg-green-300';
        meterThreeClass = meterThreeClass + ' bg-green-300';
        meterFourClass = meterFourClass + ' bg-green-300';
        meterFiveClass = meterFiveClass + ' bg-green-300';
    }

    return <div className={isVisiblePasswordMeter ? "flex items-center justify-between gap-3 mx-1 mt-2 mb-5" : ""}>
        <div className={isVisiblePasswordMeter ? "flex gap-1.5 justify-between w-full" : "hidden"}>
            {/* Bg Colors: bg-neutral-300,bg-red-300,bg-accent-400,bg-yellow-300,bg-green-300*/}
            <div className={meterOneClass + " duration-200"}></div>
            <div className={meterTwoClass}></div>
            <div className={meterThreeClass}></div>
            <div className={meterFourClass}></div>
            <div className={meterFiveClass}></div>
        </div>
        <div className={isVisiblePasswordMeter ? "flex items-center gap-2 shrink-0" : "hidden"}>
            {/* text Colors: text-neutral-300,text-red-300,text-accent-400,text-yellow-300,text-green-300*/}
            <div className={textClass}>{text}</div>
            <div className="text-[#2980F5] cursor-pointer flex items-center">
                <div>
                    <Popover className="relative">
                        <Popover.Button><InfoIcon iconSize={16} /></Popover.Button>

                        <Popover.Panel className="absolute right-0 z-10 w-[340px] sm:w-[360px] bg-neutral-100 p-2.5 rounded shadow-sm">
                            <div className="grid">
                                <ul className="ml-5 text-xs list-disc text-neutral-600">
                                    <li className={passwordValue.length > 7 ? "text-green-300" : passwordValue.length > 0 ? "text-red-300" : ""}>Password should contain atleast 8 characters</li>
                                    <li className={/[A-Z]/.test(passwordValue) ? "text-green-300" : passwordValue.length > 0 ? "text-red-300" : ""}>Password should contain atleast one uppercase letter</li>
                                    <li className={/[a-z]/.test(passwordValue) ? "text-green-300" : passwordValue.length > 0 ? "text-red-300" : ""}>Password should contain atleast one lowercase letter</li>
                                    <li className={/\d/.test(passwordValue) ? "text-green-300" : passwordValue.length > 0 ? "text-red-300" : ""}>Password should contain atleast one numeric value</li>
                                    <li className={/[!@#\$%\^&\*\(\)+\{\}\[\]:;<>,.?~\\\-=/`_]/.test(passwordValue) ? "text-green-300" : passwordValue.length > 0 ? "text-red-300" : ""}>Password should contain atleast one special character</li>
                                </ul>
                            </div>
                            <img src="/solutions.jpg" alt="" />
                        </Popover.Panel>
                    </Popover>

                </div>
            </div>
        </div>
    </div>;
};

PasswordMeter.propTypes = {
    isVisiblePasswordMeter: propTypes.bool,
    passwordScore: propTypes.number,
    passwordValue: propTypes.string
}

PasswordMeter.defaultProps = {
    isVisiblePasswordMeter: null,
    passwordScoreVal: null,
    passwordValue: null
}