"use client";

import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentOrders = [
  { orderId: "#001", customer: "John Doe", status: "Completed" },
  { orderId: "#002", customer: "Jane Smith", status: "Pending" },
  { orderId: "#003", customer: "Mark Lee", status: "Completed" },
];

export function RecentOrders() {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <CardTitle className="text-2xl font-semibold">Recent Orders</CardTitle>
        <CardDescription className="text-sm text-gray-200">
          Track the latest orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-6">
          {recentOrders.map((order, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
                <span className="font-medium text-gray-800">
                  {order.orderId}
                </span>
              </div>
              <span
                className={`text-sm font-semibold ${
                  order.status === "Completed"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 text-center text-gray-500 text-sm">
        Overview of orders placed recently
      </CardFooter>
    </Card>
  );
}
