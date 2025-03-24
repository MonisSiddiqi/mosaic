import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Home1 from "@/app/assets/home-1.jpg";
import Home2 from "@/app/assets/home-2.jpg";
import Home3 from "@/app/assets/home-3.jpg";
import Home4 from "@/app/assets/home-4.jpg";
import Home5 from "@/app/assets/home-5.jpg";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "searching" | "in-progress" | "completed";
}

const projects: Project[] = [
  {
    id: 1,
    title: "Home Renovation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas habitant enim odio est pulvinar commodo. Nunc nibh ac malesuada condimentum imperdiet nam. Elementum diam id nunc enim adipiscing dapibus vel. Turpis arcu posuere turpis aliquam.",
    image: Home1.src,
    status: "searching",
  },
  {
    id: 2,
    title: "Home Renovation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas habitant enim odio est pulvinar commodo. Nunc nibh ac malesuada condimentum imperdiet nam. Elementum diam id nunc enim adipiscing dapibus vel. Turpis arcu posuere turpis aliquam.",
    image: Home2.src,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Home Renovation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas habitant enim odio est pulvinar commodo. Nunc nibh ac malesuada condimentum imperdiet nam. Elementum diam id nunc enim adipiscing dapibus vel. Turpis arcu posuere turpis aliquam.",
    image: Home3.src,
    status: "completed",
  },
  {
    id: 4,
    title: "Home Renovation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas habitant enim odio est pulvinar commodo. Nunc nibh ac malesuada condimentum imperdiet nam. Elementum diam id nunc enim adipiscing dapibus vel. Turpis arcu posuere turpis aliquam.",
    image: Home4.src,
    status: "in-progress",
  },
  {
    id: 5,
    title: "Home Renovation",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nulla egestas habitant enim odio est pulvinar commodo. Nunc nibh ac malesuada condimentum imperdiet nam. Elementum diam id nunc enim adipiscing dapibus vel. Turpis arcu posuere turpis aliquam.",
    image: Home5.src,
    status: "completed",
  },
];

function getStatusConfig(status: Project["status"]) {
  switch (status) {
    case "searching":
      return {
        label: "Searching Vendor",
        className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      };
    case "in-progress":
      return {
        label: "In Progress",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      };
    case "completed":
      return {
        label: "Completed",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      };
  }
}

export function ProjectsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const statusConfig = getStatusConfig(project.status);

        return (
          <Link key={project.id} href={`/my-projects`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative h-[240px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 top-4">
                  <Badge className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-gray-500">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
