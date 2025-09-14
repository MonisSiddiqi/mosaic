import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PageHeader } from "./bids-page-header";
import { Roboto } from "next/font/google";

import Link from "next/link";
import { useCurrentPlanQuery } from "@/queries/payments.queries";
import { ReactNode } from "react";
import { HashIcon, WrenchIcon } from "lucide-react";

const font = Roboto({ subsets: ["latin"], weight: "500" });

export function ServicesStats() {
  const { data } = useCurrentPlanQuery();

  const stats = [
    {
      title: "Total Services",
      value: data?.Plan?.Service.length || 0,
      icon: <WrenchIcon className="h-7 w-7 text-violet-500" />,
      description: "Total number of services you're providing.",
      className:
        "bg-gradient-to-r from-violet-100 to-violet-50 text-violet-800",
    },
    {
      title: "Total Tags",
      value:
        data?.Plan?.Service.reduce((prev, curr) => prev + curr.Tag.length, 0) ||
        0,
      icon: <HashIcon className="h-7 w-7 text-indigo-500" />,
      description: "Total number of tags associated with your services.",
      className:
        "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-800",
    },
  ];

  return (
    <div className="rounded-md border border-gray-200 bg-white p-6">
      <PageHeader
        title="Services"
        description="Showing relavant data for your ease"
        className="mb-7"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {stats.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
            className={item.className}
            Icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  title: string;
  value: number;
  description: string;
  className?: string;
  Icon?: ReactNode;
};

const InfoCard = ({ title, value, description, className, Icon }: Props) => {
  return (
    <Link href={"/dashboard/services"} key={title}>
      <Card className={cn("border-none bg-muted shadow-none", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon ? Icon : null}
        </CardHeader>
        <CardContent className={font.className}>
          <div className="flex h-14 items-center">
            <div className="text-5xl font-bold">{value}</div>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
