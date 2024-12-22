import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Link href={"/"}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="h-16 w-16 overflow-hidden">
            <Image src={icon} alt={title} width={64} height={64} />{" "}
          </div>
        </CardHeader>

        <CardContent>
          <h3 className="mb-2 line-clamp-1 text-2xl font-bold">{title}</h3>
          <p className="line-clamp-3 text-gray-600">{description} </p>
        </CardContent>
      </Card>
    </Link>
  );
}
