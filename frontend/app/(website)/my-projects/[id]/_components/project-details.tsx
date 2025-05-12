"use client";

import { ProjectDetailsAlert } from "./project-details-alert";
import { useProjectQuery } from "@/queries/projects.queries";
import { useParams } from "next/navigation";
import { LoaderComponent } from "@/components/loader-component";
import { P3 } from "@/components/typography/P3";
import { H3 } from "@/components/typography/H3";
import { ShowFile } from "./show-file";
import { AddressCard } from "./project-address";
import { Building2Icon, MapPinnedIcon, RulerIcon } from "lucide-react";
import { SiteMeasurementCard } from "./site-measurement";
import BudgetPreferenceCard from "./budget-preference";
import { ProjectTags } from "./project-tags";
import { BackButton } from "@/components/back-button";
import { CubeIcon } from "@radix-ui/react-icons";
import VendorProposal from "./vendor-proposal";
import { ProjectUpdatesContainer } from "./project-updates";
import { ProjectStatusEnum } from "@/apis/projects";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";

export const ProjectDetails = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError, error } = useProjectQuery(id);

  const { user } = useAuth();

  if (isLoading) {
    <LoaderComponent />;
  }

  if (isError) {
    throw error;
  }

  let backButtonHref = "/my-projects";

  if (user?.role === UserRole.VENDOR) {
    backButtonHref = "/dashboard/bids";
  }

  if (user?.role === UserRole.ADMIN) {
    backButtonHref = "/dashboard/projects";
  }

  if (data) {
    return (
      <div className="flex min-h-screen flex-col gap-6 rounded bg-white p-6">
        <BackButton className="w-fit" href={backButtonHref} />

        {user?.role === UserRole.USER && (
          <ProjectDetailsAlert status={data.status} />
        )}

        {data.Bid && data.Bid.length > 0 && user?.role === UserRole.USER && (
          <VendorProposal {...data.Bid[0]} />
        )}

        {data.status !== ProjectStatusEnum.IN_PROGRESS &&
          data.status !== ProjectStatusEnum.VENDOR_FOUND && (
            <ProjectUpdatesContainer projectId={data.id} />
          )}

        <div>
          <H3 className="text-lg">{data.title}</H3>
          <P3>{data.description}</P3>
        </div>

        <div className="flex flex-col gap-5 rounded-md bg-muted p-6">
          <div>
            <p className="text-lg font-semibold text-gray-800">Project Files</p>
            <p className="text-gray-600">
              Project pictures or videos added by the home owner
            </p>
          </div>

          <div className="grid h-56 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {data.ProjectFile.length === 0 && <div>No files</div>}

            {data.ProjectFile?.map((file) => (
              <ShowFile key={file.id} url={file.url} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-md bg-muted p-6">
          <div>
            <p className="text-lg font-semibold text-gray-800">Sample Files</p>
            <p className="text-gray-600">
              User has given us some picture for reference of what they desire
              from us.
            </p>
          </div>

          <div className="grid h-56 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {data.ProjectFile.length === 0 && <div>No files</div>}

            {data.SampleFile?.map((file) => (
              <ShowFile key={file.id} url={file.url} />
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
            <div className="flex items-center gap-2">
              <MapPinnedIcon className="size-5 text-red-500" />{" "}
              <p className="text-lg">Location</p>{" "}
            </div>

            <AddressCard address={data.Address} />
          </div>

          <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
            <div className="flex items-center gap-2">
              <RulerIcon className="size-5 text-blue-700" />{" "}
              <p className="text-lg">Site Measurement</p>{" "}
            </div>

            <SiteMeasurementCard measurement={data.SiteMeasurement} />
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
          <div className="flex items-center gap-2">
            <Building2Icon className="size-5 text-yellow-400" />{" "}
            <p className="text-lg">Budget Preference</p>{" "}
          </div>
          <BudgetPreferenceCard
            budgetPreference={data.budgetPreference}
            preferenceMessage={data.preferenceMessage}
          />
        </div>

        {(data.Service || data.ProjectTag.length > 0) && (
          <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
            <div className="flex items-center gap-2">
              <CubeIcon className="size-5 text-lime-600" />{" "}
              <p className="text-lg">Service and Tags</p>{" "}
            </div>
            <ProjectTags tags={data.ProjectTag} service={data.Service} />
          </div>
        )}
      </div>
    );
  }
};
