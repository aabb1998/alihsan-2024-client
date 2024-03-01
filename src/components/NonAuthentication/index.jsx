import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Authentication = ({ children, isAdmin }) => {
  const { auth, isReady } = useSelector((state) => state.profile);
  if (!isReady) return <div className="">Loading..</div>;

  if (auth && isAdmin === (auth.role !== "USER")) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace={true} />;
  } else {
    return children;
  }
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Authentication;
