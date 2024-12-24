import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, X } from "lucide-react";
import useOrderHistory from "@/Hook/OrderHistory/useOrderHistory";
import useOrderHistoryById from "@/Hook/OrderHistory/useOrderHistoryById";

const AdminOrderHistory = ({ orderId }) => {
  const [shouldFetch, setShouldFetch] = useState(false); // State to control query fetching
  const [selectedHistoryId, setSelectedHistoryId] = useState(null); // State for selected history ID
  const { data, isLoading, isError } = useOrderHistory(orderId, shouldFetch);
  const { open, setOpen } = useState(false);

  const {
    data: detailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useOrderHistoryById(selectedHistoryId);

  const handleSheetOpen = () => {
    setShouldFetch(true);
  };

  const handleItemClick = (id) => {
    setSelectedHistoryId(id); // Set selected history ID to fetch detailed data
  };

  const handleBackClick = () => {
    setSelectedHistoryId(null); // Go back to the list of updates
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" // Added cursor-pointer here
        onClick={handleSheetOpen}
      >
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

          {/* Show the order history list or the detailed view */}
          {selectedHistoryId ? (
            <div className="mt-4 p-4 border rounded-md bg-white shadow-md">
              <button
                onClick={handleBackClick}
                className="text-blue-500 mb-4 flex items-center cursor-pointer" // Added cursor-pointer here
              >
                <X className="mr-2" size={16} />
                Back to History
              </button>

              {isDetailLoading && (
                <div className="flex justify-center items-center">
                  <Loader2 className="animate-spin text-gray-500" size={24} />
                </div>
              )}

              {isDetailError && (
                <div className="text-red-500 flex items-center space-x-2">
                  <X size={16} />
                  <span>
                    Error fetching detailed order history. Please try again
                    later.
                  </span>
                </div>
              )}

              {detailData && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">
                    Detailed History for Order Update
                  </h4>
                  <p>
                    <strong>Updated by:</strong> {detailData.changedBy.name}
                  </p>
                  <p>
                    <strong>Change Date:</strong>{" "}
                    {new Date(detailData.changeDate).toLocaleString()}
                  </p>

                  <div className="mt-4 overflow-y-scroll max-h-[550px]">
                    <h5 className="text-md font-semibold text-gray-600">
                      Changes:
                    </h5>
                    {Array.isArray(detailData.changes) &&
                    detailData.changes.length > 0 ? (
                      <div className="space-y-4">
                        {detailData.changes.map((change, index) => (
                          <div
                            key={change._id || index}
                            className="text-sm text-gray-700 space-y-2"
                          >
                            <p>
                              <span className="font-semibold">Field:</span>{" "}
                              {change.field}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Previous Value:
                              </span>{" "}
                              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                                {JSON.stringify(
                                  change.previousValue,
                                  null,
                                  2
                                ) || "N/A"}
                              </pre>
                            </p>
                            <p>
                              <span className="font-semibold">New Value:</span>{" "}
                              <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                                {JSON.stringify(change.newValue, null, 2) ||
                                  "N/A"}
                              </pre>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No changes available for this update.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-y-scroll max-h-[700px]">
              {data && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Updates
                  </h3>
                  <ul className="space-y-3">
                    {data.map((history) => (
                      <li
                        key={history._id}
                        className="border p-4 rounded-md bg-white shadow-md cursor-pointer" // Added cursor-pointer here
                        onClick={() => handleItemClick(history._id)} // Fetch details when clicked
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-lg">
                            Updated by: {history.changedBy.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(history.changeDate).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminOrderHistory;
