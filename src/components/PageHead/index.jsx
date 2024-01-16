import React from "react";
import { Helmet } from "react-helmet";

const PageHead = ({ title }) => {
  return (
    <Helmet>
      <title>{`Al-Ihsan Foundation - ${title}`}</title>
    </Helmet>
  );
};

export default PageHead;
