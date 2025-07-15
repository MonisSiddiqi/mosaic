import { MultiStepForm } from "@/app/(website)/my-projects/add/-components/multi-step-form";
import PageHeader from "../../_components/page-header";
import { AddProjectContextProvider } from "@/context/add-project-context";

export default function AddProjectPage() {
  return (
    <main className="bg-background-secondary">
      <PageHeader title="Add Project" />
      <div className="container mx-auto min-h-screen px-4 py-10">
        <AddProjectContextProvider>
          <MultiStepForm />
        </AddProjectContextProvider>
      </div>
    </main>
  );
}
