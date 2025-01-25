import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarTrigger,
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
  Crown,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  // Function to determine active route
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64 bg-white border-l text-black">
          {/* Sidebar Header */}
          <div className="h-14 px-6 flex items-center gap-2">
            <Crown className="text-3xl" />
            <h2 className="text-xl font-semibold text-black">Iron Fork</h2>
          </div>

          {/* Sidebar Content */}
          <SidebarContent className="border-l mt-3">
            <SidebarGroup>
              <Link
                to="/admin"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin")
                    ? "bg-black text-white"
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
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/users")
                    ? "bg-black text-white"
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
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/order/lists")
                    ? "bg-black text-white"
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
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/tables")
                    ? "bg-black text-white"
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
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/category")
                    ? "bg-black text-white"
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
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/admin/menus")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <List className="h-5 w-5" />
                Menu
              </Link>
            </SidebarGroup>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <div className="p-4 text-sm text-center">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="w-full bg-white">
          <Navbar />
          <SidebarTrigger />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
