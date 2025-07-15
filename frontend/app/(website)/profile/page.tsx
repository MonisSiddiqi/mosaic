import { ProfileOverview } from "@/app/dashboard/profile/-components/profile-overview";
import { PageContainer } from "../_components/page-container";
import { PersonalInformation } from "@/app/dashboard/profile/-components/personal-information";

export default function ProfilePage() {
  return (
    <PageContainer name={"My Profile"}>
      <div className="space-y-7">
        <ProfileOverview />
        <PersonalInformation />
      </div>
    </PageContainer>
  );
}
