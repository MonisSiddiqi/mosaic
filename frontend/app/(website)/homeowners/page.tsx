import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  MapPin,
  Users,
  Clock,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Trusted Home Service Experts in Michigan | Crafty Future",
  description:
    "Connect with verified home repair professionals across Michigan. Fast, easy, and hassle-free matching for plumbing, electrical, roofing, remodeling, and more.",
  keywords:
    "home repair professionals Michigan, hire contractor Sterling Heights, home renovation services Detroit, electrical repair Macomb County, plumber Oakland County, Michigan handyman",
  openGraph: {
    title: "Find Trusted Home Service Experts in Michigan | Crafty Future",
    description:
      "Connect with verified home repair professionals across Michigan. Fast, easy, and hassle-free matching.",
    type: "website",
  },
};

export default function HomePage() {
  const services = [
    "Plumbing & leak repairs",
    "Electrical installations & fixes",
    "Roofing inspections & replacements",
    "Basement waterproofing",
    "Kitchen & bathroom remodeling",
    "Painting & drywall",
    "Handyman tasks",
    "General home improvement",
  ];

  const locations = [
    "Sterling Heights",
    "Detroit",
    "Macomb County",
    "Wayne County",
    "Oakland County",
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Professionals",
      description:
        "We only match you with experts who are background-checked, licensed, and experienced.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Matching",
      description:
        "No more searching through long directories. Just share your project, and we do the work of finding the right pros for you.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "No Pressure, No Bidding",
      description: `You'll never get spam calls or be forced into a bidding war. Review matches, choose who fits your style — no stress.`,
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Save Time & Money",
      description:
        "Get your home taken care of by real professionals who respect your time, budget, and vision.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Welcome Homeowners
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
              Find Trusted Home Service Experts in{" "}
              <span className="text-blue-600">Michigan</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Fast, Easy, and Hassle-Free connection with verified, qualified
              home repair professionals across Michigan
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-blue-600 px-8 py-3 text-lg hover:bg-blue-700"
                asChild
              >
                <Link href={"/my-projects/add"}>
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              Crafty Future Makes Home Projects Simple
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              {`Whether you're planning a big home renovation or just need a small repair,
              we make it easy to connect with the right expert — without
              searching endlessly or chasing unreliable leads.`}
            </p>
            <p className="text-lg text-gray-600">
              Our goal is simple: help you take care of your home by matching
              your needs with skilled professionals who are ready to help.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get connected with the right professionals in just 3 simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Tell Us About Your Project
                </h3>
                <p className="text-gray-600">
                  Answer a few questions — what you need done, your location,
                  your budget, and timeline. You can even upload photos!
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  We Match You with the Right Pros
                </h3>
                <p className="text-gray-600">
                  Our system instantly finds the best-fit local professionals
                  based on your needs. No public directories. No bidding. Just
                  real matches.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Get the Job Done Right
                </h3>
                <p className="text-gray-600">
                  Review your matches, connect with your chosen expert, and let
                  the work begin. {"It's"} fast, easy, and reliable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              What Kind of Services Can You Find?
            </h2>
            <p className="text-lg text-gray-600">
              We help homeowners across Michigan with:
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Whether {"it's"} a minor repair or a major renovation, {"you'll"}{" "}
              find the right person for the job through Crafty Future.
            </p>
          </div>
        </div>
      </section>

      <section id="locations" className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              {`We're Active In`}
            </h2>
            <p className="text-lg text-gray-600">
              Crafty Future proudly connects homeowners with licensed
              professionals in:
            </p>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
            {locations.map((location, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white px-4 py-2 text-sm text-gray-700"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {location}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="bg-white px-4 py-2 text-sm text-gray-700"
            >
              <MapPin className="mr-2 h-4 w-4" />
              And other surrounding cities
            </Badge>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              No matter where you are in Michigan, help is just a few clicks
              away.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Why Homeowners Love Crafty Future
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 p-6 text-center shadow-lg">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Crafty Future Helps You Protect & Improve Your Home
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl">
            Your home is one of your biggest investments — and {"we're"} here to
            help you care for it. From basic repairs to major renovations, we
            make sure every homeowner in Michigan can easily access
            professional, affordable, and trustworthy services.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-8 py-3 text-lg text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href={"/my-projects/add"}>
                Ready to Get Started? <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-gray-600">
            {`Click above to tell us about your project, and we'll connect you
            with verified experts near you.`}
          </p>
          <p className="mt-2 text-lg font-semibold">
            Your home deserves the best — {"let's"} get to work.
          </p>
        </div>
      </section>
    </div>
  );
}
