"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Daily data example
const dailyChartData = [
  { day: "Monday", revenue: 1200, target: 1500 },
  { day: "Tuesday", revenue: 1800, target: 1700 },
  { day: "Wednesday", revenue: 2000, target: 1900 },
  { day: "Thursday", revenue: 2200, target: 2100 },
  { day: "Friday", revenue: 2500, target: 2400 },
  { day: "Saturday", revenue: 2700, target: 2600 },
  { day: "Sunday", revenue: 3000, target: 2800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
};

export function SalesPerformance() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Daily Revenue vs Target</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width="100%" height={300} data={dailyChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="target" fill="var(--color-target)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 3.1% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing revenue performance for the current week.
        </div>
      </CardFooter>
    </Card>
  );
}
