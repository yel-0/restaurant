import OverviewCards from "@/Design/Admin/OverviewCards";
import React from "react";
import { SalesPerformance } from "@/Design/Admin/SalesPerformance";
import { OrderBreakdown } from "@/Design/Admin/OrderBreakdown";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-3">
      <OverviewCards />
      <SalesPerformance />
      <OrderBreakdown />
    </div>
  );
};

export default AdminDashboard;
