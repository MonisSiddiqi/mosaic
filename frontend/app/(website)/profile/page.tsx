import { PageContainer } from "../_components/page-container";
import { ProfilePageContainer } from "./_components/profile-page-container";

export default function ProfilePage() {
  return (
    <PageContainer name={"My Profile"}>
      <ProfilePageContainer />
    </PageContainer>
  );
}
