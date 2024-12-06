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

export function EmployeeActivity() {
  return (
    <Card className="max-w-xs mx-auto shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-semibold">
          Employee Activity
        </CardTitle>
        <CardDescription className="text-sm opacity-80">
          Track active employees and working hours
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center space-x-4 p-4">
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md w-1/2">
          <Users className="text-blue-500 mb-2 h-6 w-6" />
          <h3 className="text-sm text-muted-foreground">Active</h3>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md w-1/2">
          <Users className="text-teal-500 mb-2 h-6 w-6" />
          <h3 className="text-sm text-muted-foreground">Total Worked</h3>
          <p className="text-xl font-bold">220 hours</p>
        </div>
      </CardContent>
      <CardFooter className="text-center text-xs text-muted-foreground">
        Employee performance summary
      </CardFooter>
    </Card>
  );
}
