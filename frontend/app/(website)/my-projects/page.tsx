import { PageContainer } from "../_components/page-container";
import { MyProjectsContainer } from "./_components/my-projects-container";

export default function MyProjectsPage() {
  return (
    <PageContainer name={"My Projects"}>
      <MyProjectsContainer />
    </PageContainer>
  );
}
