import { Footer } from "@/app/(website)/_components/footer";
import { HeroSection } from "@/app/(website)/_components/hero-section";
import { ProjectShowcaseSection } from "@/app/(website)/_components/project-showcase-section";
import { ServicesSection } from "@/app/(website)/_components/services-section";
import { TestimonialSection } from "@/app/(website)/_components/testimonials-section";
import WhyChooseSection from "@/app/(website)/_components/why-choose-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <ServicesSection />
      <ProjectShowcaseSection />
      <TestimonialSection />
      <Footer />
    </>
  );
}
