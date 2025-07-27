"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboardQuery } from "@/queries/dashboard.queries";
import { LoaderComponent } from "@/components/loader-component";

const chartConfig = {
  signup: {
    label: "signups",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SignupTrend() {
  const { data, isLoading } = useDashboardQuery();

  return (
    <Card>
      <CardHeader className="flex w-full justify-between md:flex-row">
        <div>
          <CardTitle>Signup trend </CardTitle>
          <CardDescription>
            Showing total signups for {data?.signupTrend.year}
          </CardDescription>
        </div>
      </CardHeader>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <CardContent>
          <ChartContainer className="h-96 w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data?.signupTrend.data}
              margin={{
                left: 12,
                right: 12,
              }}
              height={200}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="signups"
                type="natural"
                fill="#1F509A"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
