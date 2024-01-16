import React, { useEffect } from "react";
import Button from "../../components/Button";
import {
  ChevronDownIcon,
  CloseIcon,
  GlobeIcon,
  SearchIcon,
} from "../../theme/svg-icons";
import  ProjectDetail  from "../../features/projectDetails/ProjectDetail";
import { Link } from "react-router-dom";
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
