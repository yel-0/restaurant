import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/Design/Share/NavBar";
import {
  Home,
  Users,
  Table,
  List,
  Settings,
  ListOrdered,
  Grid,
  Crown,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  // Function to determine active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="">
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64 bg-white border-l text-black">
          <div className=" h-[66px] px-6 text-2xl flex flex-row   items-center gap-2">
            <Crown className="text-4xl mr-2" />
            <h2 className="text-2xl text-black">Iron Fork</h2>
          </div>
          <SidebarContent className="border-l">
            <SidebarGroup>
              <Link
                to="/admin"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/users"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin/users")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Users className="h-5 w-5" />
                Users
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/order/lists"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin/order/lists")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <ListOrdered className="h-5 w-5" />
                Order List
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/tables"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin/tables")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Table className="h-5 w-5" />
                Tables
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/category"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin/category")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <List className="h-5 w-5" />
                Category
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/menus"
                className={`p-4 flex items-center gap-2  rounded-xl ${
                  isActive("/admin/menus")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <List className="h-5 w-5" />
                Menu
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/admin/settings"
                className={`p-4 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/settings")
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 text-sm text-center ">
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
