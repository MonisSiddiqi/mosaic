import { PageHeaderDescription } from "../../_components/page-header-description";
import { ProjectsGrid } from "./my-project-grid";
import { ProjectsHeader } from "./my-project-header";

export const MyProjectsContainer = () => {
  return (
    <>
      <ProjectsHeader />
      <ProjectsGrid />
    </>
  );
};
