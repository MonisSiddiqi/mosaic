import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  UserCheck,
  ThumbsUp,
  HandshakeIcon,
} from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StepCard
            icon={<ClipboardList className="h-12 w-12 text-blue-500" />}
            title="1. Describe Your Project"
            description="Tell us about your home improvement needs."
          />
          <StepCard
            icon={<UserCheck className="h-12 w-12 text-green-500" />}
            title="2. Get Matched"
            description="We'll connect you with qualified professionals."
          />
          <StepCard
            icon={<HandshakeIcon className="h-12 w-12 text-yellow-500" />}
            title="3. Accept Proposal"
            description="Accept the proposal that fits your needs and budget."
          />
          <StepCard
            icon={<ThumbsUp className="h-12 w-12 text-purple-500" />}
            title="4. Enjoy Quality Work"
            description="Sit back and relax as the job gets done right."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
