import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export function BidStats() {
  // Dummy data
  const stats = [
    {
      title: "Total Bids",
      value: 24,
      icon: null,
      description: "All time",
    },
    {
      title: "Pending",
      value: 8,
      icon: <Clock className="h-4 w-4 text-amber-500" />,
      description: "Awaiting response",
    },
    {
      title: "Accepted",
      value: 12,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      description: "Won projects",
    },
    {
      title: "Rejected",
      value: 4,
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      description: "Unsuccessful bids",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-muted border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
