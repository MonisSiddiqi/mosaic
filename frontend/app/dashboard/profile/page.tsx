import { ProfileOverview } from "./-components/profile-overview";
import { PersonalInformation } from "./-components/personal-information";
import { ProfileAddress } from "./-components/profile-address";

export default async function ProfilePage() {
  return (
    <div className="space-y-4">
      <ProfileOverview />

      <PersonalInformation />

      <ProfileAddress />
    </div>
  );
}
