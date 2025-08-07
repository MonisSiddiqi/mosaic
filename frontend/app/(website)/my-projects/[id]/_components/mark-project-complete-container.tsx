"use client";

import { Project, ProjectStatusEnum } from "@/apis/projects";
import { FC, useState } from "react";
import { MarkProjectAsCompleteAlert } from "./alerts/mark-project-as-complete.alert";
import { CheckCircleIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { ContactDetails } from "@/app/-components/contact-details";
import { Bid } from "@/apis/bids";

type Props = {
  project: Project;
  awardedBid: Bid;
};

export const MarkProjectCompleteContainer: FC<Props> = ({
  project,
  awardedBid,
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const isCompleted = project.status === ProjectStatusEnum.COMPLETED;

  return (
    <div className="rounded border border-gray-200 p-4">
      <h3 className="mb-4 text-sm text-gray-500">Completion Status</h3>

      <div className="rounded border border-r-gray-200 bg-muted p-4">
        {isCompleted ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">
                Project Completed Successfully
              </h4>
            </div>
            {user?.role === UserRole.VENDOR ? (
              <>
                <div className="space-y-2 text-sm text-green-700">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Project has been marked as completed
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Homeowner has been notified
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Now new project bids will be available for you.
                  </p>
                </div>
                <div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-800">
                    {"What's next?"}
                  </p>
                  <p className="mt-1 text-sm text-blue-700">
                    Keep an eye out for new project opportunities. {"We'll"}{" "}
                    notify you when new bids become available.
                  </p>
                </div>{" "}
              </>
            ) : (
              <>
                <div className="space-y-2 text-sm text-green-700">
                  <p className="flex items-center gap-2">
                    Vendor has marked the project as completed
                  </p>
                </div>
                {user?.role === UserRole.USER && (
                  <div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-4">
                    <p className="mt-1 text-sm text-blue-700">
                      This project is completed you can add more projects.
                    </p>
                    <p className="mt-1 text-sm text-blue-700">
                      If you have some queries you can directly contact the
                      vendor, if they are not responding, you can contact us.
                    </p>
                    <div className="mt-4 w-fit rounded border border-gray-200 bg-white p-4 pt-0">
                      <ContactDetails className="mt-4 bg-transparent p-0" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : user?.role === UserRole.VENDOR ? (
          <div>
            <p className="text-gray-800">
              Before marking as complete, please ensure:
            </p>
            <ul className="mb-4 list-disc pl-5 text-sm text-gray-600">
              <li className="mt-1">All work has been completed as agreed</li>
            </ul>
            <MarkProjectAsCompleteAlert
              open={open}
              setOpen={setOpen}
              id={awardedBid.id}
              projectId={project.id}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserIcon />
            <p className="text-gray-600">
              Vendor is working on this project, {"we'll"} inform you when he
              marks this project as complete.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
