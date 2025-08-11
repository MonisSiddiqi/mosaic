import { ProjectStatusEnum, statusOptions } from "@/apis/projects";
import { DeleteProjectAlert } from "@/app/dashboard/projects/_components/alerts/delete-project-alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  id: string;
  status: ProjectStatusEnum;
};

export const DeleteProject: FC<Props> = ({ id, status }) => {
  return (
    <div className="flex max-w-3xl flex-col gap-4 rounded border border-gray-200 p-4 text-gray-800">
      <p className="text-sm text-gray-500">Delete Project</p>

      <DeleteProjectAlert
        id={id}
        disabled={status !== ProjectStatusEnum.IN_PROGRESS}
      />

      <div className="rounded border border-yellow-400 bg-yellow-100 p-4 text-sm text-yellow-700">
        <span className="font-bold">Note</span>: Project can only be deleted
        when it is {"In Progress"} status. If project is in {"Vendor Found"}{" "}
        status, you can reject {"vendor's"} proposal to bring it back to{" "}
        {"In Progress"}
        status then you can delete this project.
      </div>
      <div className="rounded border border-gray-100 p-4">
        <p className="text-sm text-gray-500">Current Status</p>
        <div className="mt-4 flex gap-2">
          {statusOptions.map((item, i) => (
            <div className="flex items-center gap-2" key={item.value}>
              {i !== 0 && <ArrowRightIcon className="size-4" />}
              <Badge variant={item.value === status ? "default" : "outline"}>
                {item.label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
