import React, { useState, useEffect } from "react";
import ProjectList from "../../features/projects/ProjectList";

export const AllProjectsComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.title = "Al-Ihsan Foundation - All Projects";
  }, []);
  return <ProjectList />;
};
