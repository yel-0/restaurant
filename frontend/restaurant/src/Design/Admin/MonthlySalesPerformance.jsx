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

// Monthly data example
const monthlyChartData = [
  { month: "January", revenue: 12000, target: 15000 },
  { month: "February", revenue: 14000, target: 17000 },
  { month: "March", revenue: 16000, target: 19000 },
  { month: "April", revenue: 18000, target: 21000 },
  { month: "May", revenue: 20000, target: 23000 },
  { month: "June", revenue: 22000, target: 25000 },
  { month: "July", revenue: 24000, target: 27000 },
  { month: "August", revenue: 26000, target: 29000 },
  { month: "September", revenue: 28000, target: 31000 },
  { month: "October", revenue: 30000, target: 33000 },
  { month: "November", revenue: 32000, target: 35000 },
  { month: "December", revenue: 34000, target: 37000 },
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

export function MonthlySalesPerformance() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Monthly Revenue vs Target</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width="100%" height={300} data={monthlyChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
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
          Trending up by 4.5% this year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing revenue performance for the year 2024.
        </div>
      </CardFooter>
    </Card>
  );
}
