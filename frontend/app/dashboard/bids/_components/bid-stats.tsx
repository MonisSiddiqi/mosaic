import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building2Icon, CheckCircle, Clock, XCircle } from "lucide-react";
import { PageHeader } from "./bids-page-header";
import { Roboto } from "next/font/google";
import { useBidsStatisticsQuery } from "@/queries/bids.queries";
import { LoaderComponent } from "@/components/loader-component";

const font = Roboto({ subsets: ["latin"], weight: "500" });

export function BidStats() {
  // Dummy data
  const stats = [
    {
      title: "Total Bids",
      value: 0,
      icon: <Building2Icon className="h-5 w-5 text-blue-500" />,
      description: "All time",
      className: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800",
    },
    {
      title: "Pending",
      value: null,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      description: "Awaiting response",
      className: "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800",
    },
    {
      title: "Accepted",
      value: null,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "Won projects",
      className: "bg-gradient-to-r from-green-100 to-green-50 text-green-800",
    },
    {
      title: "Rejected",
      value: null,
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      description: "Unsuccessful bids",
      className: "bg-gradient-to-r from-red-100 to-red-50 text-red-800",
    },
  ];

  const { data, isLoading } = useBidsStatisticsQuery();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Showing relavant data for your ease"
        className="mb-7"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={cn("border-none bg-muted shadow-none", stat.className)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className={font.className}>
              <div className="flex h-14 items-center">
                {isLoading ? (
                  <LoaderComponent showText={false} className="my-auto" />
                ) : (
                  <div className="text-5xl font-bold">
                    {index === 0
                      ? data?.totolBids
                      : index === 1
                        ? data?.pendingBids
                        : index === 2
                          ? data?.acceptedBids
                          : data?.rejectedBids}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
