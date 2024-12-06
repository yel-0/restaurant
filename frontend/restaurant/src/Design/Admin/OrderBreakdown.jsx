"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const orderData = [
  { name: "Dine-In", value: 60 },
  { name: "Takeout", value: 30 },
  { name: "Delivery", value: 10 },
];

const COLORS = ["#34d399", "#60a5fa", "#f87171"];

export function OrderBreakdown() {
  return (
    <Card className="hover:bg-transparent">
      <CardHeader>
        <CardTitle>Order Breakdown</CardTitle>
        <CardDescription>
          Order types: Dine-In, Takeout, Delivery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={300} className="mx-auto">
          <Pie
            data={orderData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}%`}
          >
            {orderData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Data representing the distribution of orders
        </div>
      </CardFooter>
    </Card>
  );
}
