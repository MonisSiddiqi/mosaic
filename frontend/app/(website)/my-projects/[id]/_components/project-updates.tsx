"use client";

import {
  GetProjectUpdatesApiResponse,
  GetProjectUpdatesApiResponseItem,
} from "@/apis/projects";
import { useGetProjectUpdatesQuery } from "@/queries/projects.queries";
import { MilestoneIcon, Trash2Icon } from "lucide-react";
import { ShowFile } from "./show-file";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddUpdateSheet } from "./sheets/add-update-sheet";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { EditUpdateSheet } from "./sheets/edit-update-sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { EmptyUI } from "@/components/empty-ui";
import { DeleteProjectUpdateAlert } from "./alerts/delete-project-update.alert";

export const ProjectUpdatesContainer = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { data } = useGetProjectUpdatesQuery(projectId);

  const { user } = useAuth();

  const vendorUpdates = data?.filter((item) => item.vendorId);
  const userUpdates = data?.filter((item) => !item.vendorId);

  return (
    <div className="grid gap-5 rounded-md bg-muted p-5 md:grid-cols-2">
      {userUpdates && (
        <ProjectUpdates
          title="Updates From Home Owner"
          updates={userUpdates}
          projectId={projectId}
          isOwner={user?.role === UserRole.USER}
        />
      )}
      {vendorUpdates && (
        <ProjectUpdates
          title="Updates From Vendor"
          updates={vendorUpdates}
          projectId={projectId}
          isOwner={user?.role === UserRole.VENDOR}
        />
      )}
    </div>
  );
};

type Props = {
  updates: GetProjectUpdatesApiResponse;
  title: string;
  isOwner?: boolean;
  projectId: string;
};

const ProjectUpdates = ({ title, updates, isOwner, projectId }: Props) => {
  return (
    <div className="flex flex-col gap-5 rounded-md bg-white p-5 pr-2">
      <div className="flex gap-2">
        <MilestoneIcon />
        <p>{title}</p>
      </div>
      <ScrollArea className="flex h-[35rem] flex-col gap-4 pr-3" type="auto">
        {updates.length > 0 ? (
          updates.map((item) => (
            <Updates key={item.id} {...item} isOwner={isOwner} />
          ))
        ) : (
          <EmptyUI text="No updates yet" className="mt-72" />
        )}
      </ScrollArea>

      {isOwner && (
        <div className="mr-2 flex justify-end">
          <AddUpdateSheet projectId={projectId} />{" "}
        </div>
      )}
    </div>
  );
};

const Updates = ({
  ProjectUpdateFile,
  description,
  createdAt,
  isOwner,
  id,
}: GetProjectUpdatesApiResponseItem & { isOwner?: boolean }) => {
  const beforeImage = ProjectUpdateFile.find((item) => item.type === "BEFORE");
  const afterImage = ProjectUpdateFile.find((item) => item.type === "AFTER");

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 bg-muted p-4 text-gray-500">
      {beforeImage && (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Before Image</p>
          <ShowFile url={beforeImage.fileUrl} />
        </div>
      )}

      {afterImage && (
        <div className="flex flex-col gap-2">
          <p className="text-sm">After Image</p>
          <ShowFile url={afterImage.fileUrl} />
        </div>
      )}
      <div className="col-span-2 flex flex-col gap-2">
        <p className="text-sm">{createdAt}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {isOwner && (
        <div className="col-span-2 flex justify-end gap-4">
          <Button
            className="bg-white"
            variant={"secondary"}
            onClick={() => setOpen(true)}
          >
            <Pencil2Icon className="size-5" />
          </Button>

          <Button
            className="group bg-white"
            variant={"secondary"}
            onClick={() => setOpenDelete(true)}
          >
            <Trash2Icon className="size-5 group-hover:text-destructive" />
          </Button>

          <DeleteProjectUpdateAlert
            id={id}
            open={openDelete}
            setOpen={setOpenDelete}
          />

          <EditUpdateSheet
            id={id}
            description={description}
            open={open}
            setOpen={setOpen}
          />
        </div>
      )}
    </div>
  );
};
