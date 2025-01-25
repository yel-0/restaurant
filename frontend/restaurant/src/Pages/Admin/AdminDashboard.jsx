import React from "react";
import { Calendar, Smile } from "lucide-react"; // Icon for the date
import OverviewCards from "@/Design/Admin/OverviewCards";
import { SalesPerformance } from "@/Design/Admin/SalesPerformance";

import { MonthlySalesPerformance } from "@/Design/Admin/MonthlySalesPerformance";
import { AdminOrderList } from "@/Design/Admin/AdminOrderList";

const AdminDashboard = () => {
  const today = new Date();
  const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting and Motivational Quote Section */}
      <div className="flex flex-row justify-between items-center shadow-md hover:shadow-lg px-4 transition-shadow duration-300 rounded-lg">
        <div className="flex flex-col p-4 ">
          <p className="text-2xl flex flex-row justify-center items-center gap-2 font-semibold text-black">
            Hello Yel Win Thein <Smile />
          </p>
          <p className="text-sm text-black mt-2">
            Good luck for today, make it amazing!
          </p>
        </div>

        {/* Date Section */}
        <div className="flex items-center bg-blue-500 text-white p-4 rounded-xl">
          <Calendar size={20} className="mr-2" />
          <div>
            <p className="text-sm">{currentDate}</p>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <OverviewCards />
      <div className="flex flex-row justify-between gap-3">
        <SalesPerformance />
        <MonthlySalesPerformance />
      </div>
      <AdminOrderList />
    </div>
  );
};

export default AdminDashboard;
