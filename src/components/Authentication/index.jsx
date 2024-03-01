import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Authentication = ({ children, allowedUserTypes }) => {
  const { auth, isReady } = useSelector(state => state.profile);;

	if(!isReady)
		return <div className="">Loading..</div>;

  if (auth) {
    if (allowedUserTypes.includes(auth.role)) {
      return <div>{children}</div>;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
		return (
			<Navigate to={
				allowedUserTypes.includes('USER')
					?"/login"
					:"/admin/login"
			} />
		);
  }
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  allowedUserTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Authentication;
