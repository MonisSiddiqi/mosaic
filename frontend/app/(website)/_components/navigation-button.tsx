import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Wrench, ArrowRight, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export function NavigationButtons() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row">
      {/* Homeowners Button */}
      <Card className="w-full border-2 transition-shadow duration-300 hover:border-blue-200 hover:shadow-lg sm:w-auto">
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {"I'm"} a Homeowner
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            Find trusted professionals for your home projects
          </p>
          <Link href="/">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Find Professionals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Professionals Button */}
      <Card className="w-full border-2 transition-shadow duration-300 hover:border-green-200 hover:shadow-lg sm:w-auto">
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Wrench className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {"I'm"} a Professional
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            Get matched with quality projects and grow your business
          </p>
          <Link href="/professionals">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
              Get Leads
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// Alternative compact version for smaller spaces
export function CompactNavigationButtons() {
  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row">
      <Link href="/">
        <Button
          size="lg"
          className="w-full bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 sm:w-auto"
        >
          <Users className="mr-2 h-5 w-5" />
          For Homeowners
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      <Link href="/professionals">
        <Button
          size="lg"
          className="hover:green-blue-700 w-full bg-green-600 px-8 py-3 text-white sm:w-auto"
        >
          <Briefcase className="mr-2 h-5 w-5" />
          For Professionals
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

// Hero section version with larger buttons
export function HeroNavigationButtons() {
  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      {/* Homeowners Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-300 hover:from-blue-100 hover:to-blue-200 hover:shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <Home className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Need Home Services?
          </h3>
          <p className="mb-6 text-lg text-gray-700">
            Connect with verified professionals for repairs, renovations, and
            home improvements
          </p>
          <ul className="mb-6 space-y-2 text-left text-gray-600">
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-600"></div>
              Verified & Licensed Pros
            </li>
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-600"></div>
              No Bidding Wars
            </li>
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-600"></div>
              Fast Matching
            </li>
          </ul>
          <Link href="/">
            <Button
              size="lg"
              className="w-full bg-blue-600 py-4 text-lg text-white hover:bg-blue-700"
            >
              Find Professionals Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Professionals Card */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 transition-all duration-300 hover:from-green-100 hover:to-green-200 hover:shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 shadow-lg">
            <Wrench className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            Grow Your Business?
          </h3>
          <p className="mb-6 text-lg text-gray-700">
            Get matched with quality projects from homeowners in your area
          </p>
          <ul className="mb-6 space-y-2 text-left text-gray-600">
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-green-600"></div>
              Unlimited Project Leads
            </li>
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-green-600"></div>
              No Per-Lead Fees
            </li>
            <li className="flex items-center">
              <div className="mr-3 h-2 w-2 rounded-full bg-green-600"></div>
              Smart Job Matching
            </li>
          </ul>
          <Link href="/professionals">
            <Button
              size="lg"
              className="w-full bg-green-600 py-4 text-lg text-white hover:bg-green-700"
            >
              Start Getting Leads
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
