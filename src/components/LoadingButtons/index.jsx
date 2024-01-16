import React from 'react';
import { LoaderIcon } from '../../theme/svg-icons';

export function PrimaryLoadingButton({ loadingText = "Loading...", additionalButtonClasses = "" }) {
    return (
        <div type="button" className={"btn btn-primary " + additionalButtonClasses}>
            <LoaderIcon />
            {loadingText}
        </div>
    );
}

export function SecondaryLoadingButton({ loadingText = "Loading..." }) {
    return (
        <div type="button" className="btn btn-secondary">
            <LoaderIcon />
            {loadingText}
        </div>
    );
}

export function CustomLoadingButton({ loadingText = "Loading...", fillColor = "fill-accent-300", textColor = "text-red-400" }) {
    return (
        <div type="button" className="btn btn-outline-secondary">
            <LoaderIcon fillColor={fillColor} textColor={textColor} />
            {loadingText}
        </div>
    );
}

export function SocialLoadingButton({ loadingText = "Loading..." }) {
    return (
        <div className="flex items-center justify-center w-full col-span-1 gap-2 px-4 py-3 tracking-tighter border rounded-md sm:col-span-1 text-button-md border-neutral-300 cursor-pointer">
            <LoaderIcon />
            <div className="font-bold tracking-tighter text-neutral-700 whitespace-nowrap">{loadingText}</div>
        </div>
    );
}
