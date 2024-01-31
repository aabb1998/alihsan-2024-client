import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const retrieveUserInfo = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn ? JSON.parse(isLoggedIn) : { token: null, role: null };
};

const Authentication = ({ children, allowedUserTypes }) => {
  const { token, role } = retrieveUserInfo();

  if (token) {
    if (allowedUserTypes.includes(role)) {
      return <div>{children}</div>;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    return <Navigate to="/admin/login" />;
  }
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  allowedUserTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Authentication;
