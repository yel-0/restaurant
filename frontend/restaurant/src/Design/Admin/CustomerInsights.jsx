"use client";

import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CustomerInsights() {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <CardTitle className="text-2xl font-semibold">
          Customer Insights
        </CardTitle>
        <CardDescription className="text-sm">
          New customers and top customers
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="p-4 mb-4 bg-green-500 text-white rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              New Sign-ups
            </h3>
            <p className="text-3xl font-bold text-gray-900">250</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="p-4 mb-4 bg-blue-500 text-white rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Top Customers
            </h3>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 text-center text-gray-500 text-sm">
        Insights on customer activity and engagement
      </CardFooter>
    </Card>
  );
}
