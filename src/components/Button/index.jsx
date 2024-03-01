import React from "react";
import propTypes from "prop-types";
import { ChevronDownIcon } from "../../theme/svg-icons";

const Button = (props) => {
  const {
    variant,
    className,
    leftIcon,
    rightIcon,
    label,
    onClick,
    type,
    name,
    value,
    disabled,
  } = props;

  const variants = {
    primary: "btn btn-primary",
    primaryFull: "btn btn-primary w-full",
    secondary: "btn btn-secondary",
    secondaryFull: "btn btn-secondary w-full",
    secondaryText: "btn btn-secondary-text",
    secondaryTextFull: "btn btn-secondary-text w-full",
    secondaryOutline: "btn btn-outline-secondary",
    secondaryOutlineFull: "btn btn-outline-secondary w-full",
    neutral: "btn btn-neutral",
    neutralFull: "btn btn-neutral w-full",
    text: "btn btn-text w-full",
    textFull: "btn btn-text w-full",
    neutralText: "btn btn-neutral-text", // used in pagination
    redText: "btn btn-red-text",
    none: "",
    dark: "btn btn-dark",
  };

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
      type={type}
      name={name}
      value={value}
      disabled={disabled}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: propTypes.string,
  className: propTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  className: "",
};
