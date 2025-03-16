import PageHeader from "../_components/page-header";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServicesContainer } from "./-components/services-container";

export default function Service() {
  return (
    <main className="w-full bg-background-secondary">
      <PageHeader title="Services" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="mb-8 text-center text-4xl font-bold">Our Services</h1>
        <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-600">
          Discover our wide range of professional home services designed to meet
          all your needs. From outdoor transformations to indoor perfection, we
          have got you covered.
        </p>
        <div className="mb-6 h-fit w-full rounded border-8 border-white p-2 pb-5 shadow lg:w-fit lg:p-5">
          <div className="flex w-full gap-4 lg:w-fit">
            <div className="relative w-full lg:w-fit">
              <div className="w-full lg:w-fit">
                <SearchIcon className="absolute left-2 top-2.5 size-5" />
                <Input
                  placeholder="Search service..."
                  className="w-full pl-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-ring lg:w-80"
                />
              </div>
            </div>

            <Button>Search</Button>
          </div>
        </div>
        <ServicesContainer />
      </div>
    </main>
  );
}
