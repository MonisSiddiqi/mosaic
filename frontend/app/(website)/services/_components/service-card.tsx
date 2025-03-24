import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ServiceCardProps = {
  id?: string;
  iconUrl: string | null;
  title: string;
  description: string;
};

export function ServiceCard({
  id,
  iconUrl,
  title,
  description,
}: ServiceCardProps) {
  return (
    <Link href={`/my-projects/add?service=${id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader>
          <Avatar className="size-16 rounded">
            <AvatarImage
              className="size-16 object-contain"
              src={iconUrl as string}
              alt={`@${title}`}
            />
            <AvatarFallback className="rounded text-lg font-semibold text-gray-700">
              {getInitials(title)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>

        <CardContent>
          <h3 className="mb-2 line-clamp-1 text-2xl font-bold">{title}</h3>
          <p className="line-clamp-3 text-gray-600">{description} </p>
        </CardContent>
      </Card>
    </Link>
  );
}
