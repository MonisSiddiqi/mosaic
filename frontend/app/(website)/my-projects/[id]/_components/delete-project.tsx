import { ProjectStatusEnum } from "@/apis/projects";
import { ProjectStatusTimeline } from "@/app/(website)/_components/project-status-timeline";
import { DeleteProjectAlert } from "@/app/dashboard/projects/_components/alerts/delete-project-alert";
import { FC } from "react";

type Props = {
  id: string;
  status: ProjectStatusEnum;
};

export const DeleteProject: FC<Props> = ({ id, status }) => {
  return (
    <div className="flex max-w-3xl flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 text-gray-800">
      <p className="text-sm text-gray-500">Delete Project</p>

      <DeleteProjectAlert
        id={id}
        disabled={status !== ProjectStatusEnum.IN_PROGRESS}
      />

      <div className="rounded-md border border-yellow-400 bg-yellow-100 p-4 text-sm text-yellow-700">
        <span className="font-bold">Note</span>: Project can only be deleted
        when it is {"In Progress"} status. If project is in {"Vendor Found"}{" "}
        status, you can reject {"vendor's"} proposal to bring it back to{" "}
        {"In Progress"}
        status then you can delete this project.
      </div>

      <ProjectStatusTimeline status={status} />
    </div>
  );
};
