import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, X } from "lucide-react"; // You can use icons like 'lucide-react' for some visual elements
import useOrderHistory from "@/Hook/OrderHistory/useOrderHistory";
const AdminOrderHistory = ({ orderId }) => {
  const { data, error, isLoading, isError } = useOrderHistory(orderId); // Fetch order history using the custom hook

  return (
    <Sheet>
      <SheetTrigger className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Open Order History
      </SheetTrigger>

      <SheetContent className="sm:max-w-xl p-4">
        <SheetHeader>
          <SheetTitle>Order History for Order ID: {orderId}</SheetTitle>
          <SheetDescription>
            This section displays the complete change history for the specified
            order.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-gray-500" size={24} />
            </div>
          )}
          {isError && (
            <div className="text-red-500 flex items-center space-x-2">
              <X size={16} />
              <span>Error fetching order history. Please try again later.</span>
            </div>
          )}
          {data && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Changes:</h3>
              <ul className="space-y-3">
                {data.map((history) => (
                  <li
                    key={history._id}
                    className="border p-4 rounded-md bg-white shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-lg">
                        {history.changedBy.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(history.changeDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h5 className="text-sm text-gray-600">Changes:</h5>
                      {history.changes.map((change, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          <p>
                            <span className="font-semibold">
                              {change.field}:
                            </span>{" "}
                            <span className="text-gray-500">
                              Previous: {change.previousValue || "N/A"}
                            </span>
                          </p>
                          <p className="font-semibold">New Value:</p>
                          <pre className="bg-gray-100 p-2 rounded-md text-sm">
                            {JSON.stringify(change.newValue, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminOrderHistory;
