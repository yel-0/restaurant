import React from "react";
import { ChefHat, ClipboardCheck, Timer } from "lucide-react";

const CookDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Cook Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders in Progress */}
        <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <Timer className="text-blue-600 w-8 h-8" />
            <span className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full">
              Updated 2 mins ago
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Orders in Progress</h2>
          <p className="text-gray-600 mt-2">3 orders being prepared.</p>
          <button className="mt-4 text-blue-600 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* New Orders */}
        <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <ChefHat className="text-green-600 w-8 h-8" />
            <span className="bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full">
              5 mins ago
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">New Orders</h2>
          <p className="text-gray-600 mt-2">2 new orders just arrived!</p>
          <button className="mt-4 text-green-600 font-medium hover:underline">
            View Details
          </button>
        </div>

        {/* Completed Orders */}
        <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <ClipboardCheck className="text-gray-600 w-8 h-8" />
            <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">
              Today
            </span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">Completed Orders</h2>
          <p className="text-gray-600 mt-2">5 orders completed today.</p>
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
            <span className="text-4xl font-bold text-blue-600">3</span>
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-green-600">2</span>
            <span className="text-gray-600">New Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-600">5</span>
            <span className="text-gray-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookDashboard;
