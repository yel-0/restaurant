"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const revenueData = [
  { month: "January", revenue: 12000 },
  { month: "February", revenue: 14000 },
  { month: "March", revenue: 13000 },
  { month: "April", revenue: 11000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

export function RevenueOverview() {
  return (
    <Card className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-lg">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-semibold">
          Revenue Overview
        </CardTitle>
        <CardDescription className="text-sm text-gray-200">
          Track total revenue for each month
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <BarChart width="100%" height={350} data={revenueData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={15}
            axisLine={false}
            tick={{ fontSize: 14, fontWeight: "bold" }}
          />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderColor: "#ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
        </BarChart>
      </CardContent>
      <CardFooter className="p-4 text-center text-sm text-gray-200">
        Displaying revenue from January to April 2024
      </CardFooter>
    </Card>
  );
}
