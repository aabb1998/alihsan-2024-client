import React from "react";
import propTypes from "prop-types";
// import LazyLoad from "react-lazyload";

const Img = (props) => {
  const { src, className, alt } = props;

  return (
    // <LazyLoad placeholder={<></>}>
      <img src={src||'/images/banner/placeholder.jpg'} alt={alt} className={className} />
    // </LazyLoad>
  );
};

export default Img;

Img.propTypes = {
  className: propTypes.string,
};

Img.defaultProps = {
  className: "",
};
