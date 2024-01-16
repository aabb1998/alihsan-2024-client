import React from 'react';
import propTypes from "prop-types";

export const SideImage = (props) => {
    const { image, heading, content, altText } = props;

    return <div className="relative flex-col justify-end hidden w-4/12 px-12 py-16 rounded-4xl md:flex">
        <img src={image} alt={altText} className="absolute inset-0 object-cover w-full h-full z--10 rounded-4xl" />
        <h2 className="mb-4 text-2xl text-neutral-100 isolate heading-5">{heading}</h2>
        <p className="leading-5 text-neutral-100 isolate">{content}</p>
    </div>;

};

SideImage.propTypes = {
    image: propTypes.string,
    heading: propTypes.string,
    content: propTypes.string,
    altText: propTypes.string,
}

SideImage.defaultProps = {
    image: null,
    heading: null,
    content: null,
    altText: null,
}