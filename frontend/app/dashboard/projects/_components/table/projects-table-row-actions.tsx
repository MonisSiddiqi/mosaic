import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Project, ProjectStatusEnum } from "@/apis/projects";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ProjectsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const project = row.original as Project;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/projects/${project.id}`}>
              <Eye className="h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          {project.status === ProjectStatusEnum.IN_PROGRESS && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/projects/${project.id}/bid-history/assign`}
                >
                  <Eye className="h-4 w-4" />
                  Assign Vendor
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
