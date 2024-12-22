import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const AddProjectButton = () => {
  <Link href={"/my-projects/add"}>
    <Button>
      <PlusIcon /> Add Project
    </Button>
  </Link>;
};
