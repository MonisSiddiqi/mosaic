import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Wrench, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export function KnowMoreCard() {
  return (
    <Card className="h-fit w-full max-w-sm border-white/50 bg-white/10 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Info className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          Know More
        </CardTitle>
        <p className="text-sm text-gray-900">Choose your path to get started</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/homeowners" className="block">
          <Button className="w-full justify-between bg-blue-600 text-white hover:bg-blue-700">
            <div className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              For Homeowners
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/vendors" className="block">
          <Button className="w-full justify-between bg-green-600 text-white hover:bg-green-700">
            <div className="flex items-center">
              <Wrench className="mr-2 h-4 w-4" />
              For Vendors
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Alternative compact version
export function CompactKnowMoreCard() {
  return (
    <Card className="mx-auto w-full max-w-xs shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="mb-4 text-center">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            Know More
          </h3>
          <p className="text-xs text-gray-500">Get started today</p>
        </div>

        <div className="space-y-2">
          <Link href="/">
            <Button
              size="sm"
              className="w-full bg-blue-600 text-xs text-white hover:bg-blue-700"
            >
              <Home className="mr-1 h-3 w-3" />
              Homeowners
            </Button>
          </Link>

          <Link href="/professionals">
            <Button
              size="sm"
              className="w-full bg-green-600 text-xs text-white hover:bg-green-700"
            >
              <Wrench className="mr-1 h-3 w-3" />
              Vendors
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Floating version for sidebars or corners
export function FloatingKnowMoreCard() {
  return (
    <Card className="w-64 border-0 bg-white/95 shadow-xl backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-green-600">
            <Info className="h-5 w-5 text-white" />
          </div>
        </div>

        <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
          Know More
        </h3>
        <p className="mb-4 text-center text-sm text-gray-600">
          Discover what Crafty Future can do for you
        </p>

        <div className="space-y-2">
          <Link href="/">
            <Button className="w-full bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
              <Home className="mr-2 h-4 w-4" />
              {"I'm"} a Homeowner
            </Button>
          </Link>

          <Link href="/professionals">
            <Button className="w-full bg-green-600 py-2 text-sm text-white hover:bg-green-700">
              <Wrench className="mr-2 h-4 w-4" />
              {"I'm"} a Vendor
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Horizontal version for banners
export function HorizontalKnowMoreCard() {
  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Know More</h3>
              <p className="text-xs text-gray-500">Choose your path</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href="/">
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Home className="mr-1 h-3 w-3" />
                Home
              </Button>
            </Link>

            <Link href="/professionals">
              <Button
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Wrench className="mr-1 h-3 w-3" />
                Vendor
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
