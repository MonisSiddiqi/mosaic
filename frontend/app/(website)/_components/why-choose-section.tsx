import { Shield, ThumbsUp, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description:
      "All our service providers are thoroughly vetted and background-checked to ensure reliability and trust.",
  },
  {
    icon: ThumbsUp,
    title: "Quality Services Guaranteed",
    description:
      "We bring you the best vendors who are committed to delivering top-notch services for your projects.",
  },
  {
    icon: Clock,
    title: "Effortless Booking",
    description:
      "Experience a hassle-free booking process tailored to connect you with the right professional quickly and efficiently.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Our customer support team is here to assist you every step of the way, ensuring a smooth experience.",
  },
];

export default function WhyChooseSection() {
  return (
    <div className="w-full bg-stone-50 py-20">
      <section className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">
              Why Choose Crafty Future?
            </h3>
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Discover the Advantages of Our Trusted Services
            </h2>
            <p className="text-lg text-muted-foreground">
              At Crafty Future, we connect you with thoroughly verified and
              reliable professionals to ensure your project is in expert hands.
              From seamless booking to exceptional customer support, we
              prioritize quality and convenience at every step of your journey.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="rounded-none border-gray-100 px-4 py-6 shadow-none"
              >
                <CardContent className="flex items-start gap-4 p-0">
                  <div
                    className={`rounded-lg p-2 ${
                      index === 0
                        ? "bg-blue-50"
                        : index === 1
                          ? "bg-green-50"
                          : index === 2
                            ? "bg-yellow-50"
                            : "bg-purple-50"
                    }`}
                  >
                    <feature.icon
                      className={`h-6 w-6 ${
                        index === 0
                          ? "text-blue-600"
                          : index === 1
                            ? "text-green-600"
                            : index === 2
                              ? "text-yellow-600"
                              : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
