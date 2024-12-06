import OverviewCards from "@/Design/Admin/OverviewCards";
import React from "react";
import { SalesPerformance } from "@/Design/Admin/SalesPerformance";
import { OrderBreakdown } from "@/Design/Admin/OrderBreakdown";
import { CustomerInsights } from "@/Design/Admin/CustomerInsights";
import { InventoryManagement } from "@/Design/Admin/InventoryManagement";
import { RecentOrders } from "@/Design/Admin/RecentOrders";
import { RevenueOverview } from "@/Design/Admin/RevenueOverview";
import { EmployeeActivity } from "@/Design/Admin/EmployeeActivity";
import { MotivationalCard } from "@/Design/Admin/MotivationalCard";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <OverviewCards />
      <SalesPerformance />
      <OrderBreakdown />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CustomerInsights />
        <InventoryManagement />
        <RecentOrders />
        <RevenueOverview />
        <EmployeeActivity />
        <MotivationalCard />
      </div>
    </div>
  );
};

export default AdminDashboard;
