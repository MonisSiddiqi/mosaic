"use client";

import { useParams } from "next/navigation";
import AssignBidForm from "./_components/forms/assign-bid-form";
import { BackButton } from "@/components/back-button";

export default () => {
  const params = useParams();

  const projectId = params.id as string;

  const backUrl = `/dashboard/projects/${projectId}/bid-history`;

  return (
    <div>
      <BackButton href={backUrl} className="mb-4" />
      <AssignBidForm projectId={projectId} />
    </div>
  );
};
