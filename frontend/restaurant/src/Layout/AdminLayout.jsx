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
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="">
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64  bg-gray-800 border-none text-white">
          <SidebarHeader>
            <div className="p-4 text-lg font-bold">Admin Dashboard</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <Link to={"/admin"} className="p-4 border-b border-gray-700">
                Dashboard
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/users"}
                className="p-4 border-b border-gray-700"
              >
                Users
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/tables"}
                className="p-4 border-b border-gray-700"
              >
                Tables
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/menus"}
                className="p-4 border-b border-gray-700"
              >
                Menu
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/inventory"}
                className="p-4 border-b border-gray-700"
              >
                Inventory
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/reports"}
                className="p-4 border-b border-gray-700"
              >
                Reports
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link className="p-4 border-b border-gray-700">Settings</Link>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 text-sm text-center border-t border-gray-700">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full bg-gray-100 ">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
