import PageHeader from "../_components/page-header";
import { ProjectsGrid } from "./-components/my-project-grid";
import { ProjectsHeader } from "./-components/my-project-header";

export default function MyProjectsPage() {
  return (
    <div className="bg-background-secondary w-full">
      <PageHeader title="My Projects" />
      <div className="container mx-auto px-4 py-8">
        <ProjectsHeader />
        <ProjectsGrid />
      </div>
    </div>
  );
}
