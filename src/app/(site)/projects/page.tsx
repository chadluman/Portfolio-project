import Breadcrumb from "@/components/Breadcrumb";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Chad Luman",
  description:
    "Project portfolio for Chad Luman, including React, JavaScript, Tailwind, and full-stack web projects.",
};

const ProjectsPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Projects" />
      <ProjectsGrid />
    </>
  );
};

export default ProjectsPage;
