import React, { useState, useEffect } from "react";
import ProjectList from "../../features/projects/ProjectList";

const AllProjectsComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <ProjectList />;
};

export default AllProjectsComponent;
