import React, { useState } from "react";
import { ChefHat, ClipboardCheck, Timer } from "lucide-react";

const CookDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([
    { id: 1, status: "in-progress", date: "2024-12-11" },
    { id: 2, status: "completed", date: "2024-12-11" },
    { id: 3, status: "new", date: "2024-12-12" },
    { id: 4, status: "in-progress", date: "2024-12-12" },
    { id: 5, status: "completed", date: "2024-12-12" },
  ]);

  // Filter orders by date
  const filteredOrders = selectedDate
    ? orders.filter((order) => order.date === selectedDate)
    : orders;

  const getOrderCountByStatus = (status) =>
    filteredOrders.filter((order) => order.status === status).length;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Cook Dashboard</h1>

      {/* Date Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="font-medium text-gray-600">Filter by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setSelectedDate("")}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders in Progress */}
        <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <Timer className="text-blue-600 w-8 h-8" />
            <span className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full">
              {selectedDate || "All Dates"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Orders in Progress</h2>
          <p className="text-gray-600 mt-2">
            {getOrderCountByStatus("in-progress")} orders being prepared.
          </p>
          <button className="mt-4 text-blue-600 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* New Orders */}
        <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <ChefHat className="text-green-600 w-8 h-8" />
            <span className="bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full">
              {selectedDate || "All Dates"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">New Orders</h2>
          <p className="text-gray-600 mt-2">
            {getOrderCountByStatus("new")} new orders just arrived!
          </p>
          <button className="mt-4 text-green-600 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* Completed Orders */}
        <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <ClipboardCheck className="text-gray-600 w-8 h-8" />
            <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">
              {selectedDate || "All Dates"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Completed Orders</h2>
          <p className="text-gray-600 mt-2">
            {getOrderCountByStatus("completed")} orders completed.
          </p>
          <button className="mt-4 text-gray-600 font-medium hover:underline">
            View All Completed
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">
              {getOrderCountByStatus("in-progress")}
            </span>
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-green-600">
              {getOrderCountByStatus("new")}
            </span>
            <span className="text-gray-600">New Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-600">
              {getOrderCountByStatus("completed")}
            </span>
            <span className="text-gray-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookDashboard;
