"use client";

import { Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function InventoryManagement() {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <CardTitle className="text-2xl font-semibold">
          Inventory Management
        </CardTitle>
        <CardDescription className="text-sm">
          Stock levels and product availability
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="p-4 mb-4 bg-red-500 rounded-full text-white">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Low Stock</h3>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="p-4 mb-4 bg-gray-500 rounded-full text-white">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Out of Stock
            </h3>
            <p className="text-3xl font-bold text-gray-900">2 </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 text-center text-gray-500 text-sm">
        Information on stock levels and alerts for low inventory
      </CardFooter>
    </Card>
  );
}
