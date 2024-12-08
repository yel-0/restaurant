import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/Design/Share/NavBar";
import Footer from "@/Design/Share/Footer";
import { Link } from "react-router-dom";

const WaiterLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64 h-screen bg-gray-800 border-none text-white">
          <SidebarHeader>
            <div className="p-4 text-lg font-bold">Waiter Dashboard</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <Link
                to="/waiter/order/lists"
                className="p-4 border-b border-gray-700"
              >
                Waiter OrderLists
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/waiter/tables"
                className="p-4 border-b border-gray-700"
              >
                Waiter Tables
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link to="/waiter/order" className="p-4 border-b border-gray-700">
                Waiter Order
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <div className="p-4 border-b border-gray-700">Tables</div>
            </SidebarGroup>
            <SidebarGroup>
              <div className="p-4 border-b border-gray-700">Settings</div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 text-sm text-center border-t border-gray-700">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col bg-gray-100">
          <Navbar />
          <main className="flex-1 bg-white shadow rounded-lg p-6 h-full">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default WaiterLayout;
