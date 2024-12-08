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
import { Home, Users, Table, List, Settings, ListOrdered } from "lucide-react";
import { Grid } from "lucide-react";

const AdminLayout = ({ children }) => {
  return (
    <div className="">
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64 bg-white border-l text-black">
          <SidebarHeader className="">
            <div className="p-2 text-2xl font-bold flex text-blue-400 items-center gap-2">
              <Grid className="h-6 w-6 " />
              Savor Haven
            </div>
          </SidebarHeader>
          <SidebarContent className="border-l">
            <SidebarGroup>
              <Link
                to={"/admin"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/users"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/order/lists"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <ListOrdered className="h-5 w-5" />
                Order List
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/tables"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <Table className="h-5 w-5" />
                Tables
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/admin/menus"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <List className="h-5 w-5" />
                Menu
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link className="p-4 flex items-center gap-2 border-gray-700">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 text-sm text-center border-gray-700">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full bg-gray-100">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
