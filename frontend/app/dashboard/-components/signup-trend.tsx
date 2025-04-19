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

const signupTrend = {
  year: 2025,
  data: [
    { month: "January", signup: 4 },
    { month: "February", signup: 5 },
    { month: "March", signup: 1 },
    { month: "April", signup: 6 },
    { month: "May", signup: 0 },
    { month: "June", signup: 0 },
    { month: "July", signup: 0 },
    { month: "August", signup: 0 },
    { month: "September", signup: 0 },
    { month: "October", signup: 0 },
    { month: "November", signup: 0 },
    { month: "December", signup: 0 },
  ],
};

const chartConfig = {
  signup: {
    label: "signup",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SignupTrend() {
  return (
    <Card>
      <CardHeader className="flex w-full justify-between md:flex-row">
        <div>
          <CardTitle>Signup trend </CardTitle>
          <CardDescription>
            Showing total signups for {signupTrend.year}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-96 w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={signupTrend.data}
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
              dataKey="signup"
              type="natural"
              fill="#1F509A"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
