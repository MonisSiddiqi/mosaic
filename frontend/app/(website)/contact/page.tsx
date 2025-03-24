import PageHeader from "../_components/page-header";
import { ContactForm } from "./_components/contact-form";

export default function ContactPage() {
  return (
    <div className="w-full bg-background-secondary">
      <PageHeader title="My Projects" />
      <ContactForm />
    </div>
  );
}
