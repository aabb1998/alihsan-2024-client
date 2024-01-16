import React from "react";
import { Helmet } from "react-helmet";
import { ImpactStoryList } from "./ImpactStoryList";
import PageHead from "../../components/PageHead";

const ImpactStoryComponent = () => {
  return (
    <div className="py-7.5 md:py-15">
      <PageHead title="Impact Story" />
      <ImpactStoryList />
    </div>
  );
};

export default React.memo(ImpactStoryComponent);
