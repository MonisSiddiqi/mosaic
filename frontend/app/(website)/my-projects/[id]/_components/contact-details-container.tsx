import { User, UserProfile } from "@/apis/users";
import { FC } from "react";
import { ContactDetailsCard } from "./contact-details-card";

type Props = {
  homeowner: User & { UserProfile: UserProfile };
  vendor: User & { UserProfile: UserProfile };
};

export const ContactDetailsContainer: FC<Props> = ({ homeowner, vendor }) => {
  return (
    <div className="rounded border border-gray-200 p-4">
      <p className="text-sm text-gray-500">Contact Details</p>
      <p className="mb-4 text-sm text-gray-500">
        We are showing contact details because you have both agreed to the
        proposal. You may now reach out to each other for project coordination.
      </p>

      <div className="grid gap-4 rounded border border-gray-200 bg-muted p-4 md:grid-cols-2">
        <ContactDetailsCard user={homeowner} />
        <ContactDetailsCard user={vendor} />
      </div>
    </div>
  );
};
