import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building, Gavel, Truck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="5,678"
          icon={<Users className="h-8 w-8" />}
          description="15% increase from last month"
        />
        <StatCard
          title="Active Properties"
          value="1,234"
          icon={<Building className="h-8 w-8" />}
          description="5% increase from last month"
        />
        <StatCard
          title="Open Bids"
          value="89"
          icon={<Gavel className="h-8 w-8" />}
          description="3% decrease from last month"
        />
        <StatCard
          title="Registered Vendors"
          value="456"
          icon={<Truck className="h-8 w-8" />}
          description="10% increase from last month"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a table or list of recent user registrations here */}
            <p className="text-gray-600">
              Display a list of recently registered users here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Bids</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a table or list of latest bids here */}
            <p className="text-gray-600">
              Display a list of the latest bids here.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add a list of important system notifications here */}
          <p className="text-gray-600">
            Display important system notifications and alerts here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
