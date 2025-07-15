"use client";

import { Search, Plus, SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export function ProjectsHeader({ query, setQuery }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="mb-4 flex w-full flex-col justify-between gap-4 sm:flex-row">
      <div className="flex w-full gap-4">
        <div className="relative max-w-lg flex-grow overflow-hidden rounded bg-white">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search your project..."
            className="h-12 rounded pl-10 pr-16"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(value);
              }
            }}
          />
          {query && (
            <Button
              onClick={() => {
                setQuery("");
                setValue("");
              }}
              variant={"secondary"}
              className="absolute right-1.5 top-1.5"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setQuery(value)} className="h-12 px-6">
            <SearchIcon className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      <Button asChild className="h-12 bg-[#0F172A] px-6 hover:bg-[#1E293B]">
        <Link href="/my-projects/add">
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </Button>
    </div>
  );
}
