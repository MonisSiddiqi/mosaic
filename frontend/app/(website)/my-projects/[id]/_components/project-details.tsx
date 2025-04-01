"use client";

import { ProjectDetailsAlert } from "./project-details-alert";
import { useProjectQuery } from "@/queries/projects.queries";
import { useAuth } from "@/hooks/use-auth";
import { useParams } from "next/navigation";
import { LoaderComponent } from "@/components/loader-component";
import { DefaultErrorPage } from "@/components/default-error-page";
import { H1 } from "@/components/typography/H1";
import { P3 } from "@/components/typography/P3";
import { H3 } from "@/components/typography/H3";
import { ShowFile } from "./show-file";
import { url } from "inspector";
import { AddressCard } from "./project-address";
import {
  CoinsIcon,
  MapIcon,
  MapPinCheck,
  MapPinnedIcon,
  RulerIcon,
  ScaleIcon,
} from "lucide-react";
import { SiteMeasurementCard } from "./site-measurement";
import BudgetPreferenceCard from "./budget-preference";

export const ProjectDetails = () => {
  const { user } = useAuth();

  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError, error } = useProjectQuery(id);

  if (isLoading) {
    <LoaderComponent />;
  }

  if (isError) {
    throw error;
  }

  if (data) {
    return (
      <div className="flex min-h-screen flex-col gap-6 rounded bg-white p-6">
        <ProjectDetailsAlert status={data.status} />

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
            {data.SampleFile?.map((file) => (
              <ShowFile key={file.id} url={file.url} />
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
            <div className="flex items-center gap-2">
              <MapPinnedIcon className="size-5" />{" "}
              <p className="text-lg">Location</p>{" "}
            </div>

            <AddressCard address={data.Address} />
          </div>

          <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
            <div className="flex items-center gap-2">
              <RulerIcon className="size-5" />{" "}
              <p className="text-lg">Site Measurement</p>{" "}
            </div>

            <SiteMeasurementCard measurement={data.SiteMeasurement} />
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-md bg-muted p-5">
          <div className="flex items-center gap-2">
            <CoinsIcon className="size-5" />{" "}
            <p className="text-lg">Budget Preference</p>{" "}
          </div>
          <BudgetPreferenceCard
            budgetPreference={data.budgetPreference}
            preferenceMessage={data.preferenceMessage}
          />
        </div>
      </div>
    );
  }
};
