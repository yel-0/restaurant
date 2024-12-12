import React from "react";

const CookDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Cook Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Orders in Progress</h2>
          <p className="text-gray-600">3 orders being prepared.</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">New Orders</h2>
          <p className="text-gray-600">2 new orders just arrived!</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Completed Orders</h2>
          <p className="text-gray-600">5 orders completed today.</p>
        </div>
      </div>
    </div>
  );
};

export default CookDashboard;
