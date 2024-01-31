import React, { useEffect } from "react";
import  ProjectDetail  from "../../features/projectDetails/ProjectDetail";
import PageHead from "../../components/PageHead";

const ProjectDetails = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <PageHead title={"Project details"} />
      <ProjectDetail />
    </>
  );
};

export default React.memo(ProjectDetails);
