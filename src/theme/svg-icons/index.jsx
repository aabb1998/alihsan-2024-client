import React from "react";

export const MenuIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        stroke="#393B4B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12h18M3 6h18M3 18h18"
      ></path>
    </svg>
  );
};

export const EyeIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M.833 10S4.167 3.333 10 3.333c5.834 0 9.167 6.667 9.167 6.667S15.833 16.667 10 16.667.833 10 .833 10z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      ></path>
    </svg>
  );
};

export const EyeOffIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_1145_10065)"
      >
        {" "}
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.494 18.494 0 01-2.16 3.19m-6.72-1.07a2.998 2.998 0 01-5.194-2.098A3 3 0 019.88 9.88m8.06 8.06A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94l11.88 11.88zM1 1l22 22"></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="clip0_1145_10065">
          {" "}
          <path fill="#fff" d="M0 0H24V24H0z"></path>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export const GoogleIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="#4285F4"
        fillRule="evenodd"
        d="M20.35 10.227c0-.709-.064-1.39-.182-2.045H10.75v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#34A853"
        fillRule="evenodd"
        d="M10.75 20c2.7 0 4.963-.896 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.596-4.123h-3.34v2.59A9.996 9.996 0 0010.75 20z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M5.155 11.9c-.2-.6-.314-1.24-.314-1.9 0-.659.114-1.3.314-1.9V5.51H1.814A9.996 9.996 0 00.75 10c0 1.614.386 3.141 1.064 4.491l3.34-2.59z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#EA4335"
        fillRule="evenodd"
        d="M10.75 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C15.709.99 13.445 0 10.75 0 6.84 0 3.459 2.24 1.813 5.51L5.154 8.1c.787-2.364 2.991-4.123 5.596-4.123z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const FacebookIcon2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="#2980F5"
        d="M14.66 10.961l.467-2.963h-2.918V6.075c0-.81.407-1.602 1.714-1.602h1.327V1.95s-1.204-.2-2.355-.2c-2.404 0-3.974 1.42-3.974 3.989v2.259H6.25v2.963h2.671v7.165a10.855 10.855 0 003.288 0V10.96h2.451z"
      ></path>
    </svg>
  );
};

export const AlertCircle = ({ iconSize = 20 }) => {
  return (
    <svg
      className="shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clip0_2316_9930)"
      >
        <path d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334zM8 5.333V8"></path>
        <path strokeWidth="1.5" d="M8 10.667h.007"></path>
      </g>
      <defs>
        <clipPath id="clip0_2316_9930">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const InfoIcon = ({ iconSize = 20, strokeWidth = 1.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        clipPath="url(#clip0_1145_10193)"
      >
        {" "}
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01"></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="clip0_1145_10193">
          {" "}
          <path fill="#fff" d="M0 0H24V24H0z"></path>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export const GlobeIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#393B4B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 18.333a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667zM1.666 10h16.667"
      ></path>
      <path
        stroke="#393B4B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 1.667A12.75 12.75 0 0113.332 10a12.75 12.75 0 01-3.334 8.333A12.75 12.75 0 016.666 10a12.75 12.75 0 013.333-8.333v0z"
      ></path>
    </svg>
  );
};

export const UsaFlagIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 28 20"
    >
      {" "}
      <g clipPath="url(#clip0_2535_20154)">
        {" "}
        <rect width="28" height="20" fill="#fff" rx="3"></rect>{" "}
        <path
          fill="#1A47B8"
          fillRule="evenodd"
          d="M0 0h12v9.333H0V0z"
          clipRule="evenodd"
        ></path>{" "}
        <path
          fill="#F93939"
          fillRule="evenodd"
          d="M12 0v1.333h16V0H12zm0 2.667V4h16V2.667H12zm0 2.666v1.334h16V5.333H12zM12 8v1.333h16V8H12zM0 10.667V12h28v-1.333H0zm0 2.666v1.334h28v-1.334H0zM0 16v1.333h28V16H0zm0 2.667V20h28v-1.333H0z"
          clipRule="evenodd"
        ></path>{" "}
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M1.333 1.333v1.334h1.333V1.333H1.333zm2.667 0v1.334h1.333V1.333H4zm2.666 0v1.334H8V1.333H6.666zm2.667 0v1.334h1.333V1.333H9.333zM8 2.667V4h1.333V2.667H8zm-2.667 0V4h1.333V2.667H5.333zm-2.667 0V4H4V2.667H2.666zM1.333 4v1.333h1.333V4H1.333zM4 4v1.333h1.333V4H4zm2.666 0v1.333H8V4H6.666zm2.667 0v1.333h1.333V4H9.333zm-8 2.667V8h1.333V6.667H1.333zm2.667 0V8h1.333V6.667H4zm2.666 0V8H8V6.667H6.666zm2.667 0V8h1.333V6.667H9.333zM8 5.333v1.334h1.333V5.333H8zm-2.667 0v1.334h1.333V5.333H5.333zm-2.667 0v1.334H4V5.333H2.666z"
          clipRule="evenodd"
        ></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="clip0_2535_20154">
          {" "}
          <rect width="28" height="20" fill="#fff" rx="3"></rect>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export const ChevronDownIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6l4 4 4-4"
      ></path>
    </svg>
  );
};

export const SearchIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      ></path>
    </svg>
  );
};

export const UserIcon = ({ iconSize = 20, strokeWidth = 1.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      ></path>
    </svg>
  );
};

export const ShoppingCartIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        stroke="#1A0B00"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
      ></path>
    </svg>
  );
};

export const ArrowRightIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.166 10.25h11.667M10 4.417l5.833 5.833L10 16.083"
      ></path>
    </svg>
  );
};
export const ArrowLeftIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.832 10H4.165M10 15.832L4.167 9.999 10 4.165"
      ></path>{" "}
    </svg>
  );
};
export const FacebookIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12c0 5.175 3.744 9.476 8.671 10.341v-7.13H7.5v-2.963h2.671v-2.26C10.171 7.42 11.741 6 14.145 6c1.15 0 2.355.2 2.355.2v2.523h-1.327c-1.307 0-1.714.791-1.714 1.602v1.923h2.918l-.467 2.963H13.46v7.165A10.84 10.84 0 0112 22.5z"
        clipRule="evenodd"
      ></path>{" "}
    </svg>
  );
};

export const TwitterIcon = ({ iconSize = 18 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 39 38"
    >
      <path
        fill="currentcolor"
        d="M.92 0l14.662 21.375L1.23 38h3.18l12.576-14.578 10 14.578H39L23.682 15.67 37.199 0h-3.17L22.275 13.617 12.934 0H.92zm3.797 2h7.164l23.322 34H28.04L4.717 2z"
      ></path>
    </svg>
  );
};

export const InstagramIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 25 24"
    >
      {" "}
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M2.453 11.1c0-3.36 0-5.04.654-6.324A6 6 0 015.73 2.154C7.013 1.5 8.693 1.5 12.053 1.5h1.8c3.36 0 5.04 0 6.324.654A6 6 0 0122.8 4.776c.654 1.284.654 2.964.654 6.324v1.8c0 3.36 0 5.04-.654 6.324a6 6 0 01-2.622 2.622c-1.283.654-2.964.654-6.324.654h-1.8c-3.36 0-5.04 0-6.324-.654a6 6 0 01-2.622-2.622c-.654-1.284-.654-2.964-.654-6.324v-1.8zm3.49-4.143c-.49.963-.49 2.223-.49 4.743v.6c0 2.52 0 3.78.49 4.743a4.5 4.5 0 001.967 1.966c.963.491 2.223.491 4.743.491h.6c2.52 0 3.78 0 4.743-.49a4.5 4.5 0 001.967-1.967c.49-.963.49-2.223.49-4.743v-.6c0-2.52 0-3.78-.49-4.743a4.5 4.5 0 00-1.967-1.967c-.962-.49-2.223-.49-4.743-.49h-.6c-2.52 0-3.78 0-4.743.49a4.5 4.5 0 00-1.966 1.967zM13.254 6h-.6c-1.285 0-2.158.001-2.833.056-.658.054-.994.151-1.229.271a3 3 0 00-1.31 1.311c-.12.235-.218.57-.272 1.229-.055.675-.056 1.548-.056 2.833v.6c0 1.285.001 2.158.056 2.833.054.658.152.994.271 1.229a3 3 0 001.311 1.311c.235.12.571.217 1.229.27.675.056 1.548.057 2.833.057h.6c1.285 0 2.158-.001 2.834-.056.657-.054.994-.151 1.228-.271a3 3 0 001.311-1.311c.12-.235.217-.57.27-1.229.056-.675.057-1.548.057-2.833v-.6c0-1.285-.001-2.158-.056-2.833-.054-.658-.151-.994-.27-1.229a3 3 0 00-1.312-1.311c-.235-.12-.57-.217-1.228-.27C15.41 6 14.538 6 13.253 6zm4.95 1.875a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-5.25 7.875a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0-1.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        clipRule="evenodd"
      ></path>{" "}
    </svg>
  );
};

export const LinkedinIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM9.464 7.27c0 .7-.608 1.268-1.357 1.268-.75 0-1.357-.568-1.357-1.269C6.75 6.57 7.358 6 8.107 6c.75 0 1.357.568 1.357 1.27zM6.936 9.47h2.32V16.5h-2.32V9.471zm3.734 0h2.32v.902c.389-.495 1.136-1.043 2.342-1.043 2.031 0 2.648 1.091 2.668 3.46v3.71h-2.32c0-.458-.003-.92-.006-1.38-.005-.654-.009-1.307-.004-1.952.006-.842.013-1.929-1.265-1.929-1.132 0-1.415.834-1.415 1.665V16.5h-2.32V9.471z"
        clipRule="evenodd"
      ></path>{" "}
    </svg>
  );
};

export const WhatsappIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      {" "}
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M10 18.75a8.75 8.75 0 10-7.613-4.434L1.25 18.75l4.572-1.06A8.711 8.711 0 0010 18.75zM7.036 5.557c.297-.003.584-.005.777.381.166.335.37.909.612 1.594l.003.009c.057.16.145.41.029.575-.118.169-.38.508-.571.728-.049.056-.147.185-.014.395.034.052.062.105.094.164.126.237.3.563 1.009 1.25.714.692 1.61 1.091 1.942 1.224.09.05.305.119.45-.016.067-.062.192-.222.33-.397.16-.205.336-.43.451-.54a.807.807 0 00.011-.01c.077-.07.2-.183.424-.093.197.079.951.442 1.521.716l.31.149c.09.029.221.134.221.346 0 .479-.338 1.895-1.984 1.924-1.645.03-3.627-.831-5.136-2.495-1.563-1.724-2.027-2.876-2.027-3.929 0-1.284.899-1.975 1.475-1.975h.073z"
        clipRule="evenodd"
      ></path>{" "}
    </svg>
  );
};

export const WhatsappIcon2 = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5-1.816 0-3.524-.46-5.014-1.272L1.5 22.5l1.364-5.321A10.452 10.452 0 011.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12zm-1.615 0A8.885 8.885 0 016.96 19.318l-3.037.759.796-2.984A8.885 8.885 0 1120.885 12zM8.369 6.961c.356-.003.701-.006.932.458.2.401.445 1.09.735 1.913l.004.01c.068.192.173.492.034.69-.141.203-.457.61-.685.873-.059.068-.176.222-.016.474.04.063.074.127.112.198.152.285.36.675 1.21 1.499.858.831 1.934 1.31 2.33 1.47.108.06.368.142.541-.02.08-.074.23-.266.395-.476.193-.246.405-.517.543-.649l.013-.011c.092-.085.239-.22.508-.112.236.095 1.142.53 1.826.86l.37.178c.11.035.267.161.267.416 0 .574-.406 2.273-2.38 2.308-1.975.035-4.354-.997-6.164-2.994-1.876-2.068-2.432-3.451-2.432-4.714 0-1.542 1.078-2.37 1.77-2.37h.087z"
        clipRule="evenodd"
      ></path>{" "}
    </svg>
  );
};

export const PdfIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 36 40"
    >
      <path
        fill="#F1F5FF"
        d="M33.88 36.429A3.575 3.575 0 0130.302 40H5.699a3.575 3.575 0 01-3.579-3.571V3.57A3.575 3.575 0 015.7 0h15.316c.713 0 1.396.283 1.9.787l10.181 10.182c.502.503.784 1.183.784 1.892V36.43z"
      ></path>
      <path
        fill="#D3D4D8"
        d="M8.113 40H5.698a3.575 3.575 0 01-3.578-3.572V3.572A3.575 3.575 0 015.698 0h2.415a3.575 3.575 0 00-3.578 3.572v32.856A3.575 3.575 0 008.113 40zM33.88 12.861v1.307h-9.332a4.84 4.84 0 01-4.834-4.834V0h1.301c.712 0 1.397.283 1.9.786L33.096 10.97c.503.502.785 1.183.785 1.892z"
      ></path>
      <path
        fill="#F31E53"
        d="M33.64 11.754h-9.092a2.42 2.42 0 01-2.42-2.42V.242c.291.131.557.315.787.544L33.097 10.97c.229.23.412.495.543.785zM32.407 34.688H3.594a3.22 3.22 0 01-3.22-3.22v-11.75a3.22 3.22 0 013.22-3.219h28.813a3.22 3.22 0 013.219 3.22v11.75a3.22 3.22 0 01-3.22 3.22z"
      ></path>
      <path
        fill="#921232"
        d="M5.606 34.688H3.594a3.22 3.22 0 01-3.22-3.22v-11.75a3.22 3.22 0 013.22-3.219h2.012a3.22 3.22 0 00-3.22 3.22v11.75a3.22 3.22 0 003.22 3.22z"
      ></path>
      <path
        fill="#F1F5FF"
        d="M28.319 21.643a.603.603 0 100-1.207h-3.691a.604.604 0 00-.604.604v9.107a.604.604 0 001.207 0v-4.036h2.794a.604.604 0 000-1.207h-2.794v-3.26h3.088zM18.215 20.538h-2.522a.603.603 0 00-.603.605v8.758a.6.6 0 00.018.144v.002a.603.603 0 00.603.602h.003c.076 0 1.87-.008 2.585-.02 1.213-.021 2.292-.57 3.04-1.547.693-.905 1.075-2.143 1.075-3.488 0-3.024-1.687-5.056-4.199-5.056zm.063 8.884c-.449.008-1.358.014-1.965.017-.003-.996-.01-2.96-.01-3.855l-.005-3.838h1.917c2.206 0 2.992 1.987 2.992 3.848 0 2.224-1.204 3.798-2.929 3.828zM9.433 20.425H6.857c-.527 0-.555.23-.555.555v9.25a.555.555 0 101.11 0v-3.467a478.19 478.19 0 012.02-.008c1.774 0 3.216-1.42 3.216-3.165s-1.442-3.165-3.215-3.165zm0 5.22c-.462 0-1.403.006-2.007.01a499.63 499.63 0 01-.008-2.065l-.005-2.055h2.02c1.142 0 2.106.94 2.106 2.055 0 1.115-.964 2.056-2.106 2.056z"
      ></path>
    </svg>
  );
};

export const DollarSignIcon = ({ iconSize = 20, strokeWidth = 2 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        clipPath="url(#clip0_4503_16274)"
      >
        <path d="M10 .833v18.334M14.167 4.167h-6.25a2.917 2.917 0 100 5.833h4.166a2.917 2.917 0 010 5.833H5"></path>
      </g>
      <defs>
        {" "}
        <clipPath id="clip0_4503_16274">
          {" "}
          <path fill="#fff" d="M0 0H20V20H0z"></path>{" "}
        </clipPath>{" "}
      </defs>
    </svg>
  );
};

export const CreditCardIcon = ({ iconSize = 20, strokeWidth = 1.5 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        clipPath="url(#clip0_4503_10742)"
      >
        <path d="M17.5 3.333h-15C1.58 3.333.833 4.08.833 5v10c0 .92.747 1.667 1.667 1.667h15c.92 0 1.667-.747 1.667-1.667V5c0-.92-.746-1.667-1.667-1.667zM.833 8.333h18.334"></path>
      </g>
      <defs>
        <clipPath id="clip0_4503_10742">
          {" "}
          <path fill="#fff" d="M0 0H20V20H0z"></path>{" "}
        </clipPath>
      </defs>
    </svg>
  );
};

export const CalendarIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 16 17"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.667 3.417H3.333C2.597 3.417 2 4.014 2 4.75v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333V4.75c0-.736-.597-1.333-1.333-1.333zM10.666 2.083V4.75M5.334 2.083V4.75M2 7.417h12"
      ></path>
    </svg>
  );
};

export const ArrowLefCircleIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 50 50"
    >
      {" "}
      <path
        fill="#D0DEFF"
        d="M25 46.084c11.505 0 20.833-9.328 20.833-20.834S36.505 4.417 24.999 4.417 4.166 13.744 4.166 25.25c0 11.506 9.327 20.834 20.833 20.834z"
      ></path>{" "}
      <path
        stroke="#393B4B"
        strokeLinecap="square"
        strokeLinejoin="round"
        d="M25 19.206l-6.043 6.044 6.044 6.044M31.044 25.25H19.58"
      ></path>{" "}
    </svg>
  );
};

export const ArrowRightCircleIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 50 50"
    >
      {" "}
      <path
        fill="#D0DEFF"
        d="M25 4.416c-11.505 0-20.833 9.328-20.833 20.834s9.328 20.833 20.834 20.833 20.833-9.327 20.833-20.833c0-11.506-9.327-20.834-20.833-20.834z"
      ></path>{" "}
      <path
        stroke="#393B4B"
        strokeLinecap="square"
        strokeLinejoin="round"
        d="M25 31.294l6.043-6.044-6.044-6.044M18.956 25.25H30.42"
      ></path>{" "}
    </svg>
  );
};

export const CloseIcon = ({ iconSize = 20, strokeWidth = 2, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M18 6L6 18M6 6l12 12"
      ></path>{" "}
    </svg>
  );
};

export const PlusIcon = ({ iconSize = 20, strokeWidth = 2 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M12 5v14M5 12h14"
      ></path>{" "}
    </svg>
  );
};
export const CirclePlusIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect
        width="30.546"
        height="30.546"
        x="0.727"
        y="0.727"
        stroke="#9A9BA5"
        strokeWidth="1.455"
        rx="15.273"
      ></rect>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.091"
        d="M16 10.91V21.09M10.91 16h10.182"
      ></path>
    </svg>
  );
};

export const MinusIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14"
      ></path>{" "}
    </svg>
  );
};

export const TrashIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
      ></path>{" "}
    </svg>
  );
};

export const EditIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34"
      ></path>{" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 2l4 4-10 10H8v-4L18 2z"
      ></path>{" "}
    </svg>
  );
};

export const Edit3Icon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 2l4 4L7 17H3v-4L14 2zM3 22h18"
      ></path>{" "}
    </svg>
  );
};

export const MastercardIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 46 46"
    >
      <ellipse cx="17" cy="23" fill="#EB001B" rx="10" ry="10"></ellipse>
      <ellipse cx="29" cy="23" fill="#F79E1B" rx="10" ry="10"></ellipse>
      <path
        fill="#FF5F00"
        fillRule="evenodd"
        d="M23 31a9.232 9.232 0 004.62-8 9.232 9.232 0 00-4.618-8 9.232 9.232 0 00-4.62 8 9.232 9.232 0 004.619 8z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const VisacardIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 32 11"
    >
      {" "}
      <g clipPath="url(#clip0_271_10272)">
        {" "}
        <path
          fill="#00579F"
          d="M13.866 10.209h-2.593L12.895.184h2.592l-1.621 10.025zM23.26.427A6.388 6.388 0 0020.935 0c-2.56 0-4.362 1.365-4.373 3.317-.022 1.44 1.29 2.24 2.272 2.72 1.003.49 1.343.81 1.343 1.248-.01.671-.81.98-1.556.98-1.035 0-1.59-.159-2.432-.532l-.342-.16-.363 2.25c.608.277 1.728.523 2.891.533 2.72 0 4.491-1.344 4.512-3.423.01-1.142-.682-2.016-2.176-2.73-.906-.46-1.462-.769-1.462-1.238.01-.427.47-.864 1.493-.864a4.404 4.404 0 011.931.384l.235.107.352-2.165zM26.714 6.657l1.035-2.805c-.011.022.213-.586.34-.96l.182.864s.49 2.4.597 2.901h-2.154zm3.2-6.473h-2.006c-.618 0-1.088.18-1.355.831l-3.85 9.194h2.72l.544-1.504h3.328c.075.352.31 1.504.31 1.504h2.4L29.913.184zM9.11.184L6.573 7.02l-.277-1.387c-.47-1.6-1.941-3.338-3.584-4.202l2.325 8.767h2.741L11.852.184H9.111z"
        ></path>{" "}
        <path
          fill="#FAA61A"
          d="M4.213.184H.043L0 .386c3.253.832 5.408 2.837 6.293 5.248l-.906-4.608c-.15-.64-.608-.821-1.174-.842z"
        ></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="clip0_271_10272">
          {" "}
          <path fill="#fff" d="M0 0H32V10.356H0z"></path>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export const StepperRightArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="81"
      height="16"
      fill="none"
      viewBox="0 0 81 16"
    >
      {" "}
      <path
        fill="currentcolor"
        d="M80.707 8.707a1 1 0 000-1.414L74.343.929a1 1 0 10-1.414 1.414L78.586 8l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM0 9h80V7H0v2z"
      ></path>{" "}
    </svg>
  );
};

export const StepperRightArrowSmallIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="12"
      fill="none"
      viewBox="0 0 28 12"
    >
      {" "}
      <path
        fill="currentcolor"
        d="M27.53 6.53a.75.75 0 000-1.06L22.757.697a.75.75 0 00-1.06 1.06L25.939 6l-4.242 4.243a.75.75 0 001.06 1.06L27.53 6.53zM0 6.75h27v-1.5H0v1.5z"
      ></path>{" "}
    </svg>
  );
};

export const CheckIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 6L9 17l-5-5"
      ></path>{" "}
    </svg>
  );
};

export const ChevronLeftIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 18l-6-6 6-6"
      ></path>{" "}
    </svg>
  );
};

export const ChevronRightIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 18l6-6-6-6"
      ></path>{" "}
    </svg>
  );
};

export const FilterIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="#393B4B"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.333 2.5H1.667l6.666 7.883v5.45l3.334 1.667v-7.117L18.333 2.5z"
      ></path>{" "}
    </svg>
  );
};
// ADMIN SIDE MENU
export const GridIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.333 2.5H2.5v5.833h5.833V2.5zM17.5 2.5h-5.833v5.833H17.5V2.5z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.5 11.667h-5.833V17.5H17.5v-5.833zM8.333 11.667H2.5V17.5h5.833v-5.833z"
      ></path>
    </svg>
  );
};

export const CompaignsIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentcolor"
        strokeWidth="1.5"
        d="M11.667 3.167L4.09 5.06a1 1 0 00-.758.97v3.855a1 1 0 00.758.97l7.576 1.894V3.167zM11.667 13.167V2.75a1.25 1.25 0 012.5 0v10.417a1.25 1.25 0 01-2.5 0z"
      ></path>
      <path
        stroke="currentcolor"
        strokeWidth="1.5"
        d="M3.333 6.5h-1.5a1 1 0 00-1 1v.917a1 1 0 001 1h1.5M4.583 11.083v4.584c0 .69.56 1.25 1.25 1.25v0c.69 0 1.25-.56 1.25-1.25v-.834m0-3.333v3.333m2.917-2.5c0 .556-.583 1.834-2.917 2.5"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M17.083 4l2.084-1.667M16.667 7.75h2.5M17.5 11.917l1.667 1.25"
      ></path>
    </svg>
  );
};
export const StatisticsIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke="currentcolor"
        strokeWidth="1.5"
        clipPath="url(#clip0_6313_854)"
      >
        <path
          strokeMiterlimit="1.5"
          d="M2.645 2.092V16.34a1 1 0 001 1H17.91"
        ></path>
        <path
          strokeLinecap="round"
          strokeMiterlimit="1.5"
          d="M17.47 15.968l.878 1.372-.878 1.373M1.273 2.545l1.372-.878 1.373.878"
        ></path>
        <path
          strokeLinecap="round"
          d="M6.25 14.167V7.5M10.833 14.167V5M15 14.167V3.333"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6313_854">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
export const UsersIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.167 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H4.167a3.333 3.333 0 00-3.334 3.333V17.5M7.5 9.167a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM19.167 17.5v-1.667a3.333 3.333 0 00-2.5-3.225M13.333 2.608a3.333 3.333 0 010 6.459"
      ></path>
    </svg>
  );
};
export const DollarsignIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 .833v18.334M14.167 4.167h-6.25a2.917 2.917 0 100 5.833h4.166a2.917 2.917 0 010 5.833H5"
      ></path>
    </svg>
  );
};
export const CreditcardIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.5 3.333h-15C1.58 3.333.833 4.08.833 5v10c0 .92.747 1.667 1.667 1.667h15c.92 0 1.667-.747 1.667-1.667V5c0-.92-.747-1.667-1.667-1.667zM.833 8.333h18.334"
      ></path>
    </svg>
  );
};
export const NavigationmenuIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.667 1.667H5a1.667 1.667 0 00-1.667 1.666v13.334A1.666 1.666 0 005 18.333h10a1.667 1.667 0 001.667-1.666v-13a2 2 0 00-2-2h-3zM13.333 10.833H6.667M13.333 14.167H6.667M8.333 7.5H6.667"
      ></path>
    </svg>
  );
};
// export const UserIcon =({ iconSize = 20 }) =>{ return(
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={iconSize} height={iconSize}
//       fill="none"
//       viewBox="0 0 20 20"
//     >
//       <path
//          stroke="currentcolor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="1.5"
//         d="M16.667 17.5v-1.667a3.333 3.333 0 00-3.334-3.333H6.667a3.333 3.333 0 00-3.334 3.333V17.5M10 9.167A3.333 3.333 0 1010 2.5a3.333 3.333 0 000 6.667z"
//       ></path>
//     </svg>
// )}
export const AirplayIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.167 14.167h-.834A1.667 1.667 0 011.667 12.5V4.167A1.667 1.667 0 013.333 2.5h13.334a1.666 1.666 0 011.666 1.667V12.5a1.666 1.666 0 01-1.666 1.667h-.834"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 12.5l4.167 5H5.833l4.167-5z"
      ></path>
    </svg>
  );
};
export const HomeIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.5 7.5L10 1.667 17.5 7.5v9.167a1.666 1.666 0 01-1.667 1.666H4.167A1.667 1.667 0 012.5 16.667V7.5z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.5 18.333V10h5v8.333"
      ></path>
    </svg>
  );
};

export const ChevronUpIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 15l-6-6-6 6"
      ></path>
    </svg>
  );
};
export const MoreverticalIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.75 10.833a.833.833 0 100-1.666.833.833 0 000 1.666zM10.75 5a.833.833 0 100-1.667.833.833 0 000 1.667zM10.75 16.667a.833.833 0 100-1.667.833.833 0 000 1.667z"
      ></path>
    </svg>
  );
};
export const Trash2Icon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
      ></path>
    </svg>
  );
};
// =================

export const MoreVerticalIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 10.833a.833.833 0 100-1.666.833.833 0 000 1.666zM10 5a.833.833 0 100-1.666A.833.833 0 0010 5zM10 16.667A.833.833 0 1010 15a.833.833 0 000 1.667z"
      ></path>
    </svg>
  );
};

export const DownloadIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
      ></path>{" "}
    </svg>
  );
};

export const LoaderIcon = ({
  fillColor = "fill-primary-300",
  textColor = "text-primary-100",
  Size = "w-5 h-5",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      className={`${Size} ${textColor} animate-spin ${fillColor}`}
      viewBox="0 0 100 101"
    >
      <path
        fill="currentColor"
        d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919z"
      ></path>
      <path
        fill="currentFill"
        d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0041.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0144.131 25.769c.902 2.34 3.361 3.802 5.787 3.165z"
      ></path>
    </svg>
  );
};

export const LogoutIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      ></path>{" "}
    </svg>
  );
};
export const ModalLoader = ({ iconSize = 20 }) => (
  <div
    role="status"
    className="flex items-center justify-center h-full bg-neutral-300 "
  >
    <svg
      aria-hidden="true"
      class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
);

export const PostIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 60 60"
    >
      <g clipPath="url(#clip0_6463_20440)">
        {" "}
        <path
          stroke="currentcolor"
          strokeLinecap="round"
          strokeWidth="3.387"
          d="M20.999 18.004h18.665c12.444 0 14 10.888 14 14v15.554a3.11 3.11 0 01-3.111 3.111H31.887M21 18.004c-7.778 0-14 5.288-14 14v15.555a3.11 3.11 0 003.111 3.11h21.777M21 18.004c2.25 0 10.888 3 10.888 14v18.665m-17.11-9.333h7.777m7.778 10.889v6.221m9.332-6.221v6.221M36.554 5.56v15.555m0-15.555c0-1.037-.106-4.305 4.666-3.111 6.222 1.555 9.333-1.556 9.333 0v4.019c0 1.45-.327 3.007-1.644 3.612-1.255.577-3.238.87-6.133.146-4.978-1.244-6.222 1.037-6.222 1.556V5.56z"
        ></path>{" "}
      </g>
      <defs>
        {" "}
        <clipPath id="clip0_6463_20440">
          {" "}
          <path fill="#fff" d="M0 0H60V60H0z"></path>{" "}
        </clipPath>{" "}
      </defs>
    </svg>
  );
};

export const PhoneCallIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 61 60"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M38.292 12.5a12.5 12.5 0 019.875 9.875M38.292 2.5a22.5 22.5 0 0119.875 19.85m-2.5 19.95v7.5a5 5 0 01-5.45 5 49.475 49.475 0 01-21.575-7.675 48.75 48.75 0 01-15-15A49.475 49.475 0 015.967 10.45 5 5 0 0110.942 5h7.5a5 5 0 015 4.3 32.1 32.1 0 001.75 7.025 5 5 0 01-1.125 5.275l-3.175 3.175a40 40 0 0015 15l3.175-3.175a5 5 0 015.275-1.125 32.102 32.102 0 007.025 1.75 5 5 0 014.3 5.075z"
      ></path>
    </svg>
  );
};

export const MailIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 60 60"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M10 10h40c2.75 0 5 2.25 5 5v30c0 2.75-2.25 5-5 5H10c-2.75 0-5-2.25-5-5V15c0-2.75 2.25-5 5-5z"
      ></path>{" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M55 15L30 32.5 5 15"
      ></path>{" "}
    </svg>
  );
};

export const MapPinIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 61 60"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M52.834 25c0 17.5-22.5 32.5-22.5 32.5s-22.5-15-22.5-32.5a22.5 22.5 0 1145 0z"
      ></path>{" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M30.334 32.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
      ></path>{" "}
    </svg>
  );
};

// export const PlusIcon =({ iconSize = 20 }) =>{ return(
//     <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} fill="none" viewBox="0 0 25 24" > <path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 5v14M5.5 12h14" ></path> </svg>
// )}

export const ClockIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 60 60"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M30 55c13.807 0 25-11.193 25-25S43.807 5 30 5 5 16.193 5 30s11.193 25 25 25z"
      ></path>{" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M30 15v15l10 5"
      ></path>{" "}
    </svg>
  );
};

export const CodeOfEthicsIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <g fill="currentcolor" clipPath="url(#clip0_6484_26982)">
        <path d="M5.236 23.957h3.947V18.38l-3.947 5.577zM10.193 18.38v5.577h3.947l-3.947-5.577zM33.862 23.957h3.949V18.38l-3.95 5.577zM38.816 18.38v5.577h3.952l-3.952-5.577z"></path>
        <path
          fillRule="evenodd"
          d="M48 4a4 4 0 00-4-4H4a4 4 0 00-4 4v40a4 4 0 004 4h40a4 4 0 004-4V4zM5.668 29.786a6.297 6.297 0 01-2.021-3.885h12.077a6.297 6.297 0 01-2.021 3.885 6.002 6.002 0 01-4.018 1.552 6.002 6.002 0 01-4.017-1.552zm27.945 10.116a.989.989 0 00.071-.37.951.951 0 00-.942-.961H15.147a.93.93 0 00-.665.28.979.979 0 00-.278.68c0 .536.426.97.943.97h17.596a.921.921 0 00.667-.284.97.97 0 00.203-.315zm-.03 1.094H14.306v2.793h19.275v-2.793zm.712-11.206a6.297 6.297 0 01-2.019-3.889H44.35a6.292 6.292 0 01-2.018 3.889 5.997 5.997 0 01-4.018 1.554 6.002 6.002 0 01-4.019-1.554zm4.778-12.82l4.945 6.987h.614v1.29H31.999v-1.29h.617l4.946-6.987h-8.41a5.5 5.5 0 00-.062-.797 1.252 1.252 0 01-.07-.37 5.18 5.18 0 00-1.316-2.432 4.982 4.982 0 00-2.357-1.374V25.25h.045c.107 4.984 2.497 10.386 5.928 12.828H16.97c3.43-2.442 5.66-7.844 5.762-12.828h.049V11.997a4.984 4.984 0 00-2.358 1.374 5.181 5.181 0 00-1.316 2.431c0 .127-.027.25-.068.37-.04.257-.069.525-.069.798h-8.53l4.944 6.985h.62v1.291H3.369v-1.29h.618l4.946-6.988H6.41c-.638 0-1.159-.54-1.159-1.21 0-.662.52-1.197 1.16-1.197h11.059a7.113 7.113 0 012.057-3.02 6.855 6.855 0 013.255-1.558l-.063-4.567a1.228 1.228 0 01.342-.853 1.168 1.168 0 01.83-.352l.11.012.11-.012c.65 0 1.174.535 1.174 1.205l.062 4.569c1.2.217 2.322.754 3.255 1.558a7.117 7.117 0 012.059 3.02h11.056c.643 0 1.161.535 1.161 1.198 0 .668-.518 1.21-1.16 1.21h-2.644zm-28.57-3.26c.22-.219.346-.516.355-.829 0-.663-.524-1.206-1.17-1.205-.647 0-1.174.542-1.174 1.206.009.312.136.61.355.828.219.218.512.34.817.34.305 0 .598-.122.817-.34zm27.812.306c.647 0 1.172-.53 1.172-1.198a1.23 1.23 0 00-.326-.882 1.172 1.172 0 00-.846-.37 1.146 1.146 0 00-.845.37 1.21 1.21 0 00-.326.882 1.22 1.22 0 00.342.85 1.162 1.162 0 00.83.348z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6484_26982">
          <path fill="#fff" d="M0 0H48V48H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const ModernSlaveryIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <g fill="currentcolor" clipPath="url(#clip0_6484_2362)">
        <path d="M24.371 23.62l.89.065.043.08.13-.067.15.011h.001a.612.612 0 01.134.026.348.348 0 01.088.045c.03.022.055.049.077.079.058.08.09.2.081.321a.503.503 0 01-.13.308.398.398 0 01-.091.07.345.345 0 01-.105.032.548.548 0 01-.117.002l-1.214-.09a.468.468 0 01-.132-.028.298.298 0 01-.126-.11.395.395 0 01-.037-.07l.01-.009L24 24.26a.589.589 0 01.101-.54c.066-.071.132-.109.269-.099zM24.058 19.609a1.046 1.046 0 01.222-.757 1.018 1.018 0 01.483-.333l.015-.005.01-.003.035-.01.023-.005a1.006 1.006 0 01.86.207 1.04 1.04 0 01-.21 1.737 4.045 4.045 0 010-.363.393.393 0 00-.095-.28l-.005-.006a.382.382 0 00-.425-.098.379.379 0 00-.189.17.393.393 0 00-.046.163 4.87 4.87 0 00-.008.45 1.018 1.018 0 01-.457-.336 1.045 1.045 0 01-.213-.531z"></path>
        <path
          fillRule="evenodd"
          d="M26.854 13.974l-.255.448.254.448a.238.238 0 01-.084.32l-.44.26v.516a.237.237 0 01-.067.166.229.229 0 01-.163.069h-.507l-.255.448a.227.227 0 01-.315.086l-.44-.26-.44.26a.227.227 0 01-.314-.086l-.255-.448h-.507a.228.228 0 01-.163-.069.237.237 0 01-.067-.166v-.516l-.44-.26a.239.239 0 01-.084-.32l.254-.448-.255-.448a.224.224 0 01-.029-.086.237.237 0 01.113-.235l.44-.259v-.516a.238.238 0 01.137-.214.227.227 0 01.094-.02h.507l.255-.449a.231.231 0 01.22-.116.227.227 0 01.094.03l.44.26.44-.26a.226.226 0 01.086-.029c.013-.002.026-.002.04-.002a.233.233 0 01.19.117l.254.449h.507a.229.229 0 01.218.159.24.24 0 01.012.075v.517l.44.259a.231.231 0 01.108.142.24.24 0 01-.023.178zm-2.603-.624a.342.342 0 00-.49 0 .355.355 0 00.124.578.34.34 0 00.366-.08.355.355 0 000-.498zm-.544 1.868l.368.281 1.383-1.877-.368-.282-1.383 1.878zm1.32.348a.338.338 0 00.376-.076.356.356 0 000-.498.342.342 0 00-.564.114.362.362 0 000 .27.352.352 0 00.187.19z"
          clipRule="evenodd"
        ></path>
        <path d="M12.824 32.292a.576.576 0 01.408-.7l4.382-1.137a.565.565 0 01.688.416.576.576 0 01-.409.7l-4.382 1.137a.565.565 0 01-.687-.416zM22.136 29.875a.577.577 0 01-.408.7.564.564 0 01-.688-.415.577.577 0 01.408-.7.565.565 0 01.688.415zM35.71 31.575a.577.577 0 01.407.7.564.564 0 01-.687.416l-4.382-1.138a.577.577 0 01-.408-.7.565.565 0 01.687-.415l4.382 1.137zM27.214 30.558a.576.576 0 01-.409-.7.564.564 0 01.688-.415.576.576 0 01.408.7.564.564 0 01-.687.415zM28.1 25.814a.254.254 0 00-.068-.038.402.402 0 00-.054-.017.53.53 0 00-.334.048.52.52 0 00-.242.23c-.04.086-.051.162.012.295l.53 1.116c.07.147.15.198.247.224a.415.415 0 00.153.01.507.507 0 00.172-.05.528.528 0 00.169-.13.404.404 0 00.065-.102c.039-.091.049-.187-.023-.338l-.532-1.115h.001a.358.358 0 00-.096-.133zM22.138 25.882a.398.398 0 00-.047-.134.26.26 0 00-.085-.086.529.529 0 00-.365-.06.514.514 0 00-.292.157c-.06.073-.091.146-.064.29l.229 1.216c.03.161.094.232.18.283.087.05.208.07.326.047a.479.479 0 00.284-.163c.06-.079.095-.168.064-.333l-.23-1.217z"></path>
        <path
          fillRule="evenodd"
          d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 9.745 0 23s10.745 25 24 25zm.85-26.267c.041.393.09.849.18 1.26l-.611-.044a.99.99 0 00-.799.309 1.2 1.2 0 00-.303.725v.014l-.002.01-1.566.91c-.076.001-.153.008-.228.023-.254.047-.498.17-.676.383-.178.214-.27.528-.208.852l.228 1.217c.062.332.257.596.5.738.141.084.296.129.45.142l-.335.6a1.028 1.028 0 01-.171.03l-1.096.284a1.129 1.129 0 00-1.375-.83l-7.668 1.99c-.605.157-.97.783-.816 1.4l.558 2.23c.134.535.615.886 1.135.867l.443 1.856a2 2 0 001.945 1.536h4.801a2 2 0 001.899-2.629l-.953-2.874c.466-.237.724-.78.59-1.314l1.095-.285c.605-.157.97-.784.816-1.4a1.146 1.146 0 00-.497-.692l.279-.897a1.08 1.08 0 00.357-.295 1.1 1.1 0 00.195-.877l-.23-1.216a1.037 1.037 0 00-.315-.573l1.023-.453.011.017c.157.23.431.402.755.426l1.213.09c.25.019.654.03.84-.219l.738.366a1.255 1.255 0 00-.138.155 1.066 1.066 0 00-.109.183 1.04 1.04 0 00.014.878l.531 1.115c.064.136.155.257.266.357l-.012.78a1.13 1.13 0 00-1.346.838 1.153 1.153 0 00.816 1.4l1.095.284a1.159 1.159 0 00.59 1.314l-.741 3.043a2 2 0 001.947 2.473l4.544-.009a2 2 0 001.942-1.536l.443-1.86c.52.02 1.001-.331 1.135-.866l.558-2.23a1.153 1.153 0 00-.816-1.4l-7.668-1.991a1.13 1.13 0 00-1.375.831l-.475-.123-.027-.69c.202.014.4-.03.577-.117.236-.115.442-.31.553-.572a1.101 1.101 0 00-.035-.898l-.53-1.115a1.033 1.033 0 00-.284-.362.966.966 0 00-.379-.188 1.063 1.063 0 00-.454-.009l-.016.003-1.103-.54c.038-.105.06-.215.069-.326a1.159 1.159 0 00-.21-.775.944.944 0 00-.233-.227 1.076 1.076 0 00-.433-.177 5.253 5.253 0 01-.026-.163c-.046-.311-.076-.676-.101-1l-.015-.197-.001-.017a23.107 23.107 0 00-.038-.465 2.69 2.69 0 00-.01-.087l.62-.064a.835.835 0 00.57-.376l1.366-1.832c.113-.222.164-.47.15-.72l-.75-7.317a.652.652 0 00-.23-.435.628.628 0 00-.466-.141l-5.612.576c-.348.037-.475.34-.44.695l.75 7.318c.023.21.154.514.294.674l1.97 1.493c.139.16.423.271.632.25l.379-.04c.021.15.04.332.06.528zM38.45 13.78a1.22 1.22 0 011.499-.88c.668.17 1.078.836.918 1.493l-1.016 4.152-2.417-.613 1.016-4.152zm5.752 2.719a1.246 1.246 0 00-.919-1.493 1.22 1.22 0 00-1.498.88l-.726 2.966 2.417.613.725-2.966zm-7.25-1.84a1.246 1.246 0 00-.919-1.492 1.22 1.22 0 00-1.498.88l-.871 3.559c-.16.656.25 1.323.918 1.493a1.22 1.22 0 001.498-.88l.871-3.56zm-4.206 1.454a1.245 1.245 0 00-.918-1.493 1.22 1.22 0 00-1.499.88l-.58 2.373c-.161.656.25 1.323.918 1.493a1.22 1.22 0 001.498-.88l.58-2.373zm2.827 4.182l.005-.022a2.543 2.543 0 01-2.533-.73 2.465 2.465 0 01-2.669 1.01 2.51 2.51 0 01-1.13-.626l-.078.319c-.474 1.939.051 3.903 1.256 5.359l-.16.652c-.16.657.25 1.324.918 1.493l6.042 1.533a1.22 1.22 0 001.498-.88 6.18 6.18 0 002.066-.756l.544-.319a4.797 4.797 0 002.236-2.996l.245-1.001c.32-1.309-.503-2.648-1.836-2.986l-3.323-.843c-.834-.212-1.673.28-1.873 1.1-.2.82.313 1.654 1.148 1.866l2.114.537c.332.084.539.42.46.746a.613.613 0 01-.75.44l-2.115-.536c-1.503-.382-2.426-1.884-2.065-3.36zM8.994 12.916a1.22 1.22 0 011.498.88l1.016 4.153-2.417.613-1.016-4.153c-.16-.656.25-1.324.919-1.493zM4.74 16.515c-.16-.656.25-1.324.918-1.493a1.22 1.22 0 011.498.88l.726 2.966-2.417.613-.725-2.966zm7.25-1.84c-.16-.655.25-1.323.918-1.492a1.22 1.22 0 011.498.88l.871 3.56c.16.655-.25 1.323-.918 1.492a1.22 1.22 0 01-1.498-.88l-.871-3.56zm4.206 1.454c-.161-.656.25-1.323.918-1.493a1.22 1.22 0 011.498.88l.58 2.373c.161.656-.25 1.324-.917 1.493a1.22 1.22 0 01-1.499-.88l-.58-2.373zm-2.827 4.183l-.006-.023a2.542 2.542 0 002.533-.73 2.465 2.465 0 002.669 1.01 2.508 2.508 0 001.13-.626l.078.32c.475 1.938-.051 3.903-1.255 5.358l.16.653c.16.656-.25 1.323-.919 1.493l-6.042 1.532a1.22 1.22 0 01-1.498-.88 6.18 6.18 0 01-2.066-.756l-.543-.319a4.797 4.797 0 01-2.237-2.996l-.245-1c-.32-1.31.503-2.649 1.836-2.987l3.323-.843c.835-.212 1.673.28 1.873 1.1.2.82-.313 1.655-1.147 1.866l-2.115.537a.626.626 0 00-.46.746c.08.326.418.524.75.44l2.115-.536c1.503-.381 2.427-1.884 2.066-3.36z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6484_2362">
          <path fill="#fff" d="M0 0H48V48H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const SafeguardingIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M37.667 6.258v8.692c1.963 0 2.666 2.383 2.666 3.717l.004 1.813h-.004v22.187c0 2.945-3.724 5.333-6.67 5.333H13c-2.252 0-3.852-.943-4.824-2.239A6.04 6.04 0 017 42.24V19.2c0-1.324.475-2.6 1.333-3.62V6.258L23 0l14.667 6.258zM11 17.44h11.972V28.88H23v-.003c4.719-1.388 9.353-7.131 9.23-11.483h-9.258V3.328L35 8.46v6.9l-.056 2.56c-.57 6.555-5.48 12.092-11.944 13.62v-.026l-.026.025-.002-.002v.016C16.492 30.022 11.57 24.062 11 17.441zM12.968 36a.635.635 0 100 1.27h12.064a.635.635 0 100-1.27H12.968zm-.635 3.492c0-.35.285-.635.635-.635h8.254a.635.635 0 110 1.27h-8.254a.635.635 0 01-.635-.635zm0 2.54c0-.351.285-.635.635-.635h12.064a.635.635 0 110 1.27H12.968a.635.635 0 01-.635-.635z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const ComplaintHandlingIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <g fill="currentcolor" clipPath="url(#clip0_6484_32053)">
        <path
          fillRule="evenodd"
          d="M48 10c0-5.523-4.477-10-10-10H10C4.477 0 0 4.477 0 10v32a6 6 0 006 6h36a6 6 0 006-6V10zm-4.454 23.183a8.03 8.03 0 001.787-5.046v-6.714C45.333 14.009 39.293 8 31.843 8c-6.596 0-12.185 3.333-13.357 9.588h-3.835a2.885 2.885 0 00-2.876 2.876v19.175l5.273-5.752h12.943a2.885 2.885 0 002.877-2.877V20.464a2.885 2.885 0 00-2.877-2.876h-8.628c.509-2.227 1.197-3.321 2.876-4.794 1.971-1.73 4.975-2.108 7.603-2.108 2.629 0 5.167.954 7.139 2.684a10.723 10.723 0 013.57 6.71h-3.963c-.716 0-1.402.283-1.908.787a2.677 2.677 0 00-.79 1.898v5.369c0 .712.284 1.395.79 1.898a2.705 2.705 0 001.908.787h3.325c-.4.688-.947 1.28-1.604 1.731a5.416 5.416 0 01-2.195.883V36c2.195-.19 4.276-1.386 5.432-2.817zM6.98 21.423c-.863 0-1.438.575-1.438 1.438s.575 1.438 1.438 1.438h2.876v-2.876H6.981zm-1.438 5.752c-.863 0-1.438.575-1.438 1.438s.575 1.439 1.438 1.439h4.314v-2.877H5.543zm-1.438 5.753c-.863 0-1.438.575-1.438 1.438s.575 1.438 1.438 1.438h5.752v-2.876H4.105z"
          clipRule="evenodd"
        ></path>
        <path d="M20 21a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM14 25.5a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 010 3h-9a1.5 1.5 0 01-1.5-1.5zM14 30a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM14 21a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"></path>
      </g>
      <defs>
        <clipPath id="clip0_6484_32053">
          <path fill="#fff" d="M0 0H48V48H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const DataDeletionsIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 49"
    >
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M12.521 4.1c0-2.264 1.804-4.1 4.032-4.1h7.257c3.32 0 4.665.864 6.177 2.401A8.269 8.269 0 0132.35 8.2v4.294c-.003 1.016-.006 1.98.705 2.704.711.723 1.662.72 2.663.718h4.22c2.138 0 4.19.863 5.701 2.4A8.27 8.27 0 0148 24.114v17.7c0 2.263-1.807 4.1-4.032 4.1H26.912l-.13-22.395h2.435V20.99H12.522V18.46h16.695v-2.528h-2.435s0-1.29-4.87-2.023v-1.77a3.94 3.94 0 00-1.116-2.686 3.655 3.655 0 00-2.608-1.106h-5.666V4.099zM33.084 25c-.598 0-1.083.448-1.083 1s.485 1 1.083 1h8.667c.598 0 1.083-.448 1.083-1s-.485-1-1.083-1h-8.667zM32 32c0-.552.485-1 1.083-1h10.834c.598 0 1.083.448 1.083 1s-.485 1-1.083 1H33.083C32.485 33 32 32.552 32 32zm0 6c0-.552.485-1 1.083-1h8.667c.598 0 1.083.448 1.083 1s-.485 1-1.083 1h-8.667C32.485 39 32 38.552 32 38z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M12.521 10.876V8.348h-1.638a3.589 3.589 0 00-2.535 1.137 3.87 3.87 0 00-1.044 2.655v1.77a8.843 8.843 0 00-4.886 2.038L0 15.933v2.528h12.521v-5.029c1.271-.025 2.61-.025 3.312-.025a23.969 23.969 0 013.718.15v-1.42a1.362 1.362 0 00-.403-.896 1.265 1.265 0 00-.885-.365h-5.742zm0 0h-1.567a1.22 1.22 0 00-.852.378 1.314 1.314 0 00-.363.886v1.444c.512-.085 1.62-.129 2.782-.152v-2.556zM12.521 20.99H0v2.528h2.435v22.755c3.004 1.596 6.554 2.529 10.313 2.529h3.723c3.63.006 7.207-.536 10.44-2.246v-.644H16.554c-1.538 0-2.877-.877-3.556-2.167h4.046V26.046h-4.521V20.99zM7.304 43.113c.796.185 1.607.329 2.435.43V26.046H7.304v17.067z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentcolor"
        d="M35.099 8.199A11.548 11.548 0 0032.349.69a20.923 20.923 0 019.51 5.553 21.443 21.443 0 015.462 9.67 11.137 11.137 0 00-7.384-2.796h-4.032a.813.813 0 01-.806-.82v-4.1zM21.913 43.037c-.65.177-1.476.344-2.313.465l-.122-17.456h2.435v16.991z"
      ></path>
    </svg>
  );
};

export const WhistleBlowerIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <g fill="currentcolor" clipPath="url(#clip0_6484_39699)">
        <path
          fillRule="evenodd"
          d="M5.4 2h37.2A5.4 5.4 0 0148 7.4v25.2a5.4 5.4 0 01-5.4 5.4H5.4A5.4 5.4 0 010 32.6V7.4A5.4 5.4 0 015.4 2zm8.092 21.423a.9.9 0 01.3.556l.01.122v4.202l.008.154a1.5 1.5 0 001.337 1.339l.154.007h4.2l.122.009a.9.9 0 010 1.784l-.122.007h-4.2l-.2-.006a3.3 3.3 0 01-3.094-3.084l-.006-.21v-4.202l.008-.122a.9.9 0 011.483-.556zm22.176-.02a.9.9 0 01.324.576L36 24.1v4.202a3.3 3.3 0 01-3.098 3.294l-.202.006h-4.2a.9.9 0 01-.122-1.791l.122-.009h4.2a1.5 1.5 0 001.493-1.346l.007-.154v-4.202a.9.9 0 011.468-.698zM20.138 7.865a.9.9 0 01-.515 1.528l-.122.009h-4.2a1.5 1.5 0 00-1.492 1.346l-.008.154v4.202a.9.9 0 01-1.792.122l-.008-.122v-4.202a3.3 3.3 0 013.1-3.294l.2-.006h4.2a.9.9 0 01.636.263zM32.7 7.602l.202.006a3.3 3.3 0 013.092 3.085l.006.209v4.202l-.008.122a.9.9 0 01-1.783 0l-.009-.122v-4.202l-.007-.154a1.5 1.5 0 00-1.34-1.339l-.153-.007h-4.2l-.122-.009a.9.9 0 010-1.783l.122-.008h4.2zM20.124 19.794a4.199 4.199 0 107.759 3.214 4.199 4.199 0 00-7.759-3.214zm-3.077-.476l.01-.025c.088-.202.188-.398.3-.588a7.287 7.287 0 011.133-1.468c1.056-1.056 2.786-2.135 5.514-2.135 2.73 0 4.458 1.08 5.514 2.135.439.44.82.932 1.134 1.468.09.152.172.309.247.47.025.053.053.12.053.12l.01.023a.91.91 0 001.157.526.9.9 0 00.527-1.158l-.001-.003v-.002l-.01-.024a7.556 7.556 0 00-.43-.86 9.086 9.086 0 00-1.415-1.832c-1.344-1.344-3.515-2.663-6.786-2.663-3.27 0-5.44 1.32-6.787 2.663a9.086 9.086 0 00-1.416 1.833 7.663 7.663 0 00-.428.859l-.007.018c-.003.006-.195.9.523 1.169a.9.9 0 001.158-.524v-.002z"
          clipRule="evenodd"
        ></path>
        <path d="M17.8 41.6h14.4a1.8 1.8 0 110 3.6H17.8a1.8 1.8 0 110-3.6z"></path>
      </g>
      <defs>
        <clipPath id="clip0_6484_39699">
          <path fill="#fff" d="M0 0H48V48H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const AntiBriberyIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <g clipPath="url(#clip0_6484_10738)">
        <path
          fill="currentcolor"
          fillRule="evenodd"
          d="M38.563 43.077a23.999 23.999 0 10-31.679-2.253A23.929 23.929 0 0023.998 48a23.895 23.895 0 0014.565-4.923zm2.868-6.36c-.077-3.942-.224-7.397-.5-7.676-.576-.564-6.6-2.943-9.22-3.977l-.006-.003-.041-.016h-.003c-.408-.162-.73-.289-.929-.37-1.457-.578-2.038-2.181-2.038-2.181s-.656.363-.656-.656c0-.352.078-.383.208-.434.245-.097.674-.267 1.104-2.842 0 0 1.82-.51 1.458-4.731h-.437s.197-.819.33-1.853c-1.557.172-3.726.306-6.703.306-2.73 0-4.78-.113-6.302-.264.066.74.16 1.395.296 1.666l-.433.141c-.364 4.222 1.455 4.734 1.455 4.734.43 2.575.859 2.745 1.104 2.842.13.051.208.082.208.434 0 1.018-.656.656-.656.656s-.583 1.602-2.038 2.182l-.225.089-.612.242-.008.003c-2.541 1.002-8.773 3.46-9.347 4.032-.284.29-.43 4.02-.507 8.162a21.578 21.578 0 0111.79-34.125l-.896 5.38-4.115 2.056s2.057 1.029 10.286 1.029 10.286-1.029 10.286-1.029l-4.115-2.057-.896-5.38a21.575 21.575 0 0113.824 10.879l-11.936 8.68a.229.229 0 00.032.39l1.828.913c.075.038.165.031.233-.017l10.9-7.63a21.577 21.577 0 01-2.722 20.425zm-18.234-21.38a2.057 2.057 0 11-.362-1.165h2.781a2.057 2.057 0 11-.33.8h-2.121c.021.118.032.24.032.365zm.114 12.092l-2.286-2.286 3.428.816 3.429-.816-2.286 2.286 1.715 13.142-2.858 2.858-2.857-2.858 1.715-13.142zm-1.77 1.608L7.826 38.18l1.204 1.663a.2.2 0 00.273.049L21.025 32l.516-2.963z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6484_10738">
          <path fill="#fff" d="M0 0H48V48H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const ChildProtectionIcon = ({ iconSize = 48 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentcolor"
      viewBox="0 0 48 48"
    >
      <path
        fill="currentcolor"
        d="M23.685 0h.128c.268.136.528.283.8.388a8789.034 8789.034 0 0016.762 7.614.886.886 0 01.618.96 970.585 970.585 0 000 11.648 25.16 25.16 0 01-1.352 8.38c-.508 1.451-1.145 2.86-1.731 4.31-1.88-1.041-3.475-.777-4.978.465-1.914 1.576-3.832 3.145-5.782 4.66-.506.333-1.041.62-1.6.858l-.1-.168a.998.998 0 01.105-.213 3.642 3.642 0 00.524-4.217c-.75-1.51-2.054-2.108-3.708-2.096H13.085c-.39-.016-.78.01-1.165.077-1.04.222-2.073.486-3.156.742-1.794-3.3-3.014-6.869-3.157-10.686-.171-4.66-.093-9.357-.14-14.032 0-.346.148-.478.435-.606a1671.87 1671.87 0 009.05-4.112A895.21 895.21 0 0023.686 0zm-4.632 18.987h9.198a9.31 9.31 0 000-.994c-.058-.516.156-.777.602-1.044a36.097 36.097 0 003.293-2.268 1.906 1.906 0 00.233-2.675 1.883 1.883 0 00-2.605-.319c-.583.389-1.142.847-1.72 1.258-2.233 1.573-4.66 1.918-7.157.835-1.122-.49-2.108-1.316-3.133-2.019-1.025-.703-2.093-.57-2.76.3a1.938 1.938 0 00.388 2.744 16.182 16.182 0 002.252 1.62c1.052.562 1.957 1.102 1.409 2.562zm4.582-6.135a3.459 3.459 0 10-3.347-3.537 3.395 3.395 0 003.347 3.537zm-4.415 8.115c-.843 1.223-1.658 2.361-2.427 3.53a1.872 1.872 0 00.241 2.38c.726.776 1.46 1.526 2.217 2.268.85.83 1.996.85 2.768.07a1.976 1.976 0 00-.046-2.796 10.216 10.216 0 01-.808-.835.644.644 0 01-.046-.582c.283-.501.633-.963.986-1.472l-2.885-2.563zm7.288 4.337c-.423.443-.858.859-1.242 1.317a1.94 1.94 0 00.163 2.636 1.856 1.856 0 002.578 0 52.791 52.791 0 002.368-2.384c.54-.579.777-1.336.389-2.027-.777-1.328-1.682-2.578-2.56-3.883l-2.896 2.57 1.2 1.771zM17.19 6.014l-.03-.264c-.362 0-.777-.116-1.069 0-2.791 1.235-5.56 2.517-8.344 3.767a.718.718 0 00-.481.776c.018 2.478.018 4.954 0 7.428 0 .528.194.75.757.73v-.718-6.99a.754.754 0 01.516-.826c1.732-.777 3.452-1.553 5.172-2.33 1.15-.497 2.314-1.037 3.475-1.569l.004-.004zM37.9 31.101c1.087-2.33 1.899-4.71 2.074-7.214.194-2.745.143-5.506.21-8.263 0-.481-.276-.559-.707-.601v5.898a20.361 20.361 0 01-.777 5.824c-.388 1.374-.897 2.718-1.363 4.116l.563.24z"
      ></path>
      <path
        fill="currentcolor"
        d="M0 39.345a1.58 1.58 0 011.534-.73c.883.048 1.768.048 2.652 0 .418-.035.82-.18 1.165-.42 1.393-1.01 2.718-2.127 4.135-3.083a5.925 5.925 0 013.347-.83h10.74c1.359 0 2.33.896 2.33 2.154a2.181 2.181 0 01-2.272 2.155h-5.114c-.92 0-1.464.719-1.165 1.484a1.033 1.033 0 001.04.722h8.28a4.206 4.206 0 002.624-1.122c1.918-1.553 3.836-3.142 5.778-4.68.382-.309.827-.531 1.304-.651a1.995 1.995 0 012.272 1.195 2.162 2.162 0 01-.637 2.621c-1.534 1.262-3.08 2.5-4.62 3.751-1.725 1.402-3.414 2.842-5.184 4.182-.719.543-1.608.866-2.42 1.29H0v-8.038z"
      ></path>
    </svg>
  );
};

export const ListIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      {" "}
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.5 6h13M5.5 12h13M5.5 18h13"
      ></path>{" "}
    </svg>
  );
};

export const HelpCircleIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 16 16"
    >
      {" "}
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clip0_7220_36044)"
      >
        {" "}
        <path d="M7.999 14.667a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334z"></path>{" "}
        <path d="M6.059 6a2 2 0 013.886.667c0 1.333-2 2-2 2M8 11.333h.007"></path>{" "}
      </g>{" "}
      <defs>
        {" "}
        <clipPath id="clip0_7220_36044">
          {" "}
          <path fill="#fff" d="M0 0H16V16H0z"></path>{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
};

export const HeartFilledIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill="currentcolor"
        d="M22.933 6.629a5.556 5.556 0 00-7.861 0L14 7.699 12.93 6.63a5.558 5.558 0 00-7.86 7.86l1.07 1.071 7.861 7.86 7.86-7.86 1.072-1.07a5.556 5.556 0 000-7.861z"
      ></path>
    </svg>
  );
};

export const ChevronsUpIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.917 4.667L7 1.75 4.083 4.667M4.083 9.333L7 12.25l2.916-2.917"
      ></path>
    </svg>
  );
};
export const RepeatIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.5 1l4 4-4 4"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.5 11V9a4 4 0 014-4h14M7.5 23l-4-4 4-4"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21.5 13v2a4 4 0 01-4 4h-14"
      ></path>
    </svg>
  );
};
export const DeleteIcon = ({ iconSize = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2v0zM18 9l-6 6M12 9l6 6"
      ></path>
    </svg>
  );
};

export const GoatIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.53125 14.3438L8.77469 13.7188L8.96875 14.3438L9.14969 13.6147L9.01688 12.1147C8.77438 12.3629 8.46875 12.6725 8.0875 13.0607L8.53125 14.3438ZM9.73438 2.44191C9.54081 2.21088 9.31897 2.0051 9.07406 1.82941C8.53297 1.45816 7.96725 1.23838 7.35281 1.13754C6.76684 1.04169 6.16563 1.05182 5.5925 1.14129C5.09962 1.21895 4.61756 1.35426 4.15625 1.54441C3.83382 1.67608 3.52401 1.83674 3.23062 2.02441C2.84612 2.29307 2.90466 2.23779 3.26031 2.08129C3.57209 1.94817 3.89529 1.84358 4.22594 1.76879C5.80178 1.61779 7.30125 1.53194 8.41875 2.61785C8.56725 2.76766 8.69619 2.93566 8.8025 3.11785C8.94981 3.36973 9.04641 3.64526 9.10437 3.91754L10.5322 4.00629C10.3749 3.45154 10.0554 2.8321 9.73438 2.44191ZM11.2984 3.2741C11.0318 2.86107 10.7205 2.47948 10.3716 2.1841C10.2208 2.05644 10.0551 1.94752 9.87813 1.85973C9.96156 1.94348 10.0412 2.03004 10.1159 2.11973C10.2179 2.24055 10.3131 2.36689 10.4012 2.49816L10.4044 2.50254L10.4072 2.50691C10.7126 2.98004 10.9436 3.5651 11.0566 4.04285L11.75 4.08348C11.6156 3.80501 11.4644 3.53496 11.2984 3.2741ZM11.5956 4.57779C11.984 4.60222 12.323 4.84977 12.4645 5.21232L14.2734 9.84834C14.3674 10.0894 14.3644 10.3576 14.2649 10.5964L14.0506 11.1107L11.9953 9.92504L11.7453 10.3582L13.8566 11.5769L13.7213 11.7567L13.2105 11.7088C12.6191 11.6534 12.0423 11.4931 11.5071 11.2353L10.2747 10.6416C10.1799 10.616 10.0825 10.601 9.98438 10.5969C9.80594 10.5969 9.68688 10.6613 9.58719 10.8038C9.5372 10.8751 8.56989 11.862 7.31914 13.1292C5.81997 14.648 3.7729 15.5 1.63879 15.5H0.5V7.6166L1.63715 7.66375C2.79943 7.71195 3.95825 7.50608 5.03282 7.06051L6.31563 6.52859C6.58339 6.41756 6.8883 6.42458 7.13822 6.57141C7.41271 6.73269 7.67555 6.91339 7.92469 7.11223C8.02824 7.19305 8.15615 7.23634 8.2875 7.23504C8.51224 7.20939 8.68975 7.133 8.85604 7.02717C9.15677 6.83579 9.2801 6.46101 9.22589 6.1087C9.18579 5.84807 9.14588 5.58874 9.10763 5.34037C9.05059 4.97 8.79121 4.66269 8.43566 4.54431C8.42669 4.54132 8.41772 4.53834 8.40875 4.53535L8.54594 4.38598L11.5956 4.57779ZM11.0684 6.64973C10.9427 6.19019 10.4399 6.04263 10.1128 6.08285C10.0168 6.09635 9.92009 6.12744 9.83875 6.1666C9.86587 6.26316 9.90656 6.41254 9.95719 6.49004C10.1612 6.77788 10.4993 6.92435 10.8209 6.88098C10.9449 6.85998 11.1003 6.7661 11.0684 6.64973ZM12.9944 9.94566L13.5881 10.5707L13.9506 10.2269L13.3569 9.60191L12.9944 9.94566ZM14.8438 5.40598C14.8438 5.40598 13.5769 4.53723 13.0625 5.36848L13.4141 6.26941L14.8438 5.40598ZM9.1875 11.9391L9.60625 12.6353L9.59375 11.5216C9.49094 11.6294 9.35844 11.766 9.18906 11.9391H9.1875ZM8.23125 6.72035C8.41431 6.77885 8.78156 6.53135 8.77281 6.47004L8.61052 5.41575C8.58043 5.2203 8.49713 5.02829 8.32114 4.9381C7.54679 4.54128 5.83827 4.71898 5.58719 5.11504C6.82456 6.35666 6.82237 5.64223 8.23125 6.72035ZM12.9146 12.1232C12.4464 12.1232 11.9851 12.0126 11.5633 11.8092C11.2946 11.6795 11.025 11.5515 10.7563 11.4219C10.9173 12.3403 11.0967 13.2554 11.2484 14.1753L12.0378 15.3419L11.9566 14.2794L12.5 14.6753V13.7794L12.8184 12.4685L13.0269 12.1232H12.9146Z"
        fill="currentcolor"
      />
    </svg>
  );
};
export const CowIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M7.333 9.667H9c0 .13.018.258.053.38a.298.298 0 00-.164.391l.013.032a.333.333 0 00.434.182l.038-.015c.115.134.253.253.41.353a.333.333 0 10.586.318l.028-.051c.22.057.448.082.675.075l.008.045a.334.334 0 00.655-.126l-.006-.032c.29-.093.556-.249.778-.457l.104 1.243a.333.333 0 00.055.662h1v-6a2.04 2.04 0 00-.424-1.252c.209.056.354.138.457.237.186.178.3.479.3 1.015l.13 1.806A1.008 1.008 0 0014 9c0 .368.15.667.334.667.184 0 .333-.299.333-.667 0-.214-.05-.405-.13-.527l.13-1.806c0-.612-.128-1.134-.505-1.496-.372-.358-.919-.492-1.59-.504h-.738v.002a1.887 1.887 0 00-.093-.002H6.833a5.046 5.046 0 01-1.54-.223l-.05-.069c.223-.056.448-.147.61-.266.423-.312.668-.938.127-.87-.158.02-.272.025-.365.028-.226.008-.326.011-.626.232a2.2 2.2 0 00-.317.283c-.467-.347-1.087-.502-2.172-.449a.167.167 0 000 .334h.58c.094.06.176.118.248.173L2.133 5.333h-.07a.667.667 0 00-.639.859l.1.333A.667.667 0 002.163 7h1.12c.141 0 .279.045.392.128l.73.53c.022.016.045.03.068.044.522 1.346 1.073 2.395 1.69 2.923l.115 1.38a.333.333 0 00.055.662h1v-3zm3.27 0h-.936c0 .443.478 1 1.333 1 .317 0 .582-.077.79-.196-.476-.19-.845-.472-1.186-.804z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const RiceIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="11"
      fill="none"
      viewBox="0 0 12 11"
    >
      <path
        fill="currentcolor"
        d="M4.125.563c0-.312.25-.563.563-.563h.375c.311 0 .562.25.562.563 0 .311-.25.562-.563.562h-.375a.561.561 0 01-.562-.563zm.563 1.125h.375a.561.561 0 110 1.125h-.375a.561.561 0 01-.563-.563c0-.312.25-.563.563-.563zM1.313 3.375h.375c.311 0 .562.25.562.563 0 .311-.25.562-.563.562h-.375a.561.561 0 01-.562-.563c0-.311.25-.562.563-.562zM0 5.892c0-.354.288-.642.642-.642h10.716c.354 0 .642.288.642.642a3.86 3.86 0 01-2.5 3.612l-.043.34a.75.75 0 01-.745.656H3.286a.751.751 0 01-.745-.656l-.043-.338A3.866 3.866 0 010 5.892zm5.25-1.955c0-.311.25-.562.563-.562h.375c.311 0 .562.25.562.563 0 .311-.25.562-.563.562h-.375a.561.561 0 01-.562-.563zm-2.25 0c0-.311.25-.562.563-.562h.374c.312 0 .563.25.563.563 0 .311-.25.562-.563.562h-.374A.561.561 0 013 3.937zm-.563-2.25h.376c.311 0 .562.251.562.563 0 .312-.25.563-.563.563h-.374a.561.561 0 01-.563-.563c0-.312.25-.563.563-.563zM7.5 3.938c0-.311.25-.562.563-.562h.374c.312 0 .563.25.563.563 0 .311-.25.562-.563.562h-.374a.561.561 0 01-.563-.563zm-.563-2.25h.375c.312 0 .563.251.563.563 0 .312-.25.563-.563.563h-.375a.561.561 0 01-.562-.563c0-.312.25-.563.563-.563zm2.813 2.25c0-.311.25-.562.563-.562h.374c.312 0 .563.25.563.563 0 .311-.25.562-.563.562h-.374a.561.561 0 01-.563-.563zm-.563-2.25h.376c.311 0 .562.251.562.563 0 .312-.25.563-.563.563h-.374a.561.561 0 01-.563-.563c0-.312.25-.563.563-.563zM6.938 0h.375c.312 0 .563.25.563.563 0 .311-.25.562-.563.562h-.375a.561.561 0 01-.562-.563c0-.311.25-.562.563-.562z"
      ></path>
    </svg>
  );
};
export const ZoomInIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M9.167 15.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM17.5 17.5l-3.625-3.625M9.167 6.667v5M6.667 9.167h5"
      ></path>
    </svg>
  );
};
export const ZoomOutIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.583"
        d="M9.208 15.542a6.333 6.333 0 100-12.667 6.333 6.333 0 000 12.667zM17.125 17.125l-3.443-3.444M6.833 9.208h4.75"
      ></path>
    </svg>
  );
};

export const SortIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentcolor"
        fill="currentcolor"
        d="M16 18l-4-4h3V4h-3l4-4 4 4h-3v10h3M0 16v-2h10v2M0 10V8h7v2M0 4V2h4v2H0z"
      ></path>
    </svg>
  );
};
export const FeatherIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20.24 12.24a6.003 6.003 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9"
      ></path>
    </svg>
  );
};
export const FilmIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.82 2H4.18A2.18 2.18 0 002 4.18v15.64A2.18 2.18 0 004.18 22h15.64A2.18 2.18 0 0022 19.82V4.18A2.18 2.18 0 0019.82 2zM7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"
      ></path>
    </svg>
  );
};
export const FileIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 2v7h7"
      ></path>
    </svg>
  );
};
export const BriefCaseIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
      ></path>
    </svg>
  );
};
export const SettingsIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_10_2176)"
      >
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a1.998 1.998 0 010 2.83 1.998 1.998 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a1.998 1.998 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 013.417 1.415 2 2 0 01-.587 1.415l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1v0z"></path>
      </g>
      <defs>
        <clipPath id="clip0_10_2176">
          <path fill="currentcolor" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
export const MappinIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 13a3 3 0 100-6 3 3 0 000 6z"
      ></path>
    </svg>
  );
};
export const TagIcon = ({ iconSize = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_10_1189)">
        <path
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 7h.01m13.58 6.41l-7.17 7.17a1.998 1.998 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_10_1189">
          <path fill="currentcolor" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
