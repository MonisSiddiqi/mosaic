"use client";

import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProjectsHeader() {
  return (
    <div className="mb-8 flex w-full flex-col justify-between gap-4 sm:flex-row">
      <div className="flex w-full gap-4">
        <div className="relative max-w-lg flex-grow overflow-hidden rounded bg-white">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search your project..."
            className="h-12 rounded pl-10 pr-4"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 px-6">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <Button asChild className="h-12 bg-[#0F172A] px-6 hover:bg-[#1E293B]">
        <Link href="/projects/new">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </Button>
    </div>
  );
}
