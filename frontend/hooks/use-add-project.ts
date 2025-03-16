import { AddProjectContext } from "@/context/add-project-context";
import { useContext } from "react";

export const useAddProject = () => {
  const context = useContext(AddProjectContext);

  if (!context) {
    throw new Error(
      "Add Project Context can only be used inside AddProjectProvider",
    );
  }

  return context;
};
