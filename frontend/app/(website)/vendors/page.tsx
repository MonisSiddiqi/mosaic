import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Briefcase,
  DollarSign,
  Clock,
  ArrowRight,
  Quote,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Get Contractor Leads in Michigan | Crafty Future for Trade Professionals",
  description:
    "Get matched with real home improvement projects in Michigan. No bidding, no middlemen. Perfect for contractors, plumbers, electricians, and handymen.",
  keywords:
    "contractor leads Detroit, electrician jobs Wayne County, remodeling jobs Oakland County, trade work Michigan, handyman leads Macomb County, construction jobs",
  openGraph: {
    title:
      "Get Contractor Leads in Michigan | Crafty Future for Trade Professionals",
    description:
      "Get matched with real home improvement projects in Michigan. No bidding, no middlemen.",
    type: "website",
  },
};

export default function ProfessionalsPage() {
  const services = [
    "General Contractors",
    "Plumbers",
    "Electricians",
    "Roofers",
    "HVAC Technicians",
    "Remodelers",
    "Painters",
    "Handymen",
  ];

  const locations = [
    "Detroit",
    "Wayne County",
    "Macomb County",
    "Oakland County",
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Unlimited Leads",
      description:
        "Pay once, receive project matches every month — no per-lead charges or bidding stress.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Get Found in Your Local Area",
      description:
        "Be seen by homeowners searching for your services in your specific service area.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Work When You Want",
      description:
        "You're in control. Accept the projects you want. Focus on your craft — we bring the work to you.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Professional Support",
      description:
        "Our platform is designed to support your business growth and make your work life easier.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              Crafty Future for Trade Professionals
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl">
              Get Matched with Real Projects
            </h1>
            <p className="mb-4 text-xl text-gray-600">
              <span className="font-semibold">
                No Bidding. No Middlemen. Just Work.
              </span>
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
              Connect with homeowners looking for skilled contractors, handymen,
              electricians, plumbers, and roofers across Michigan
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-green-600 px-8 py-3 text-lg hover:bg-green-700"
                asChild
              >
                <Link href={"/auth/register/vendor"}>
                  Start Getting Leads <ArrowRight className="ml-2 h-5 w-5" />
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
              Grow Your Business with Crafty Future
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Are you a skilled contractor, handyman, electrician, plumber, or
              roofer in Michigan? Crafty Future connects qualified trade
              professionals like you with homeowners looking for help - right in
              your service area.
            </p>
            <p className="mb-6 text-lg text-gray-600">
              We understand how challenging it can be to find reliable
              employment opportunities. You shouldn&apos;t have to chase leads,
              waste time on bidding wars, or pay high fees just to get one job.
            </p>
            <p className="text-lg text-gray-600">
              {"That's"} why we built Crafty Future — a{" "}
              <strong>smart contractor job matching platform</strong> that helps
              you get real projects, matched to your skills, without the hassle.
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
              Start getting matched with quality projects in 3 simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xl font-bold text-green-600">1</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Set Up Your Profile
                </h3>
                <p className="text-gray-600">
                  Tell us what services you offer and where you work (e.g.,
                  Wayne County, Macomb, Oakland, or Detroit).
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Receive Job Matches
                </h3>
                <p className="text-gray-600">
                  We&apos;ll match you with homeowners who need work that fits
                  your skillset — from plumbing to home remodeling to electrical
                  repair.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 p-6 text-center shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Connect & Get Hired
                </h3>
                <p className="text-gray-600">
                  Chat with the client, confirm details, and get started. No
                  public bidding. No per-lead charges. You just do what you do
                  best.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Services We Match
            </h2>
            <p className="text-lg text-gray-600">
              We help professionals in all home service fields, including:
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 rounded-lg bg-green-50 p-4"
              >
                <Briefcase className="h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="font-medium text-gray-700">{service}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Whether you want to find{" "}
              <strong>construction work near Detroit</strong> or {"you're"}{" "}
              looking for <strong>remodeling jobs in Oakland County</strong>,
              we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      <section id="locations" className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Where We&apos;re Active
            </h2>
            <p className="text-lg text-gray-600">
              We currently help professionals in all areas across Michigan,
              including:
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
              Surrounding regions
            </Badge>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Why Join Crafty Future?
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 p-6 text-center shadow-lg">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
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

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              What Trade Pros Are Saying
            </h2>
          </div>

          <Card className="mx-auto max-w-4xl border-0 p-8 shadow-lg">
            <CardContent className="text-center">
              <Quote className="mx-auto mb-6 h-12 w-12 text-blue-600" />
              <blockquote className="mb-6 text-xl italic text-gray-700">
                {'"'}Crafty Future gave me job leads that actually match what I
                do. No more bidding wars or spam leads. Real jobs, real results.{" "}
                {'"'}
              </blockquote>
              <cite className="font-medium text-gray-600">
                – Local HVAC Pro, Wayne County
              </cite>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Ready to Grow Your Trade Business?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl">
            Don&apos;t waste another day chasing cold leads. Join Crafty Future
            and start receiving real project opportunities that match your
            skillset and location.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-8 py-3 text-lg text-gray-600 hover:bg-gray-100"
              asChild
            >
              <Link href={"/auth/register/vendor"}>
                Sign Up Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-gray-500">
            Be one of the first verified professionals in your area.
          </p>
        </div>
      </section>
    </div>
  );
}
