import PageHeader from "../_components/page-header";
import { AboutSection } from "./-components/about-us";

export default function Page() {
  return (
    <main className="w-full">
      <PageHeader title="About Us" />
      <AboutSection />
    </main>
  );
}
