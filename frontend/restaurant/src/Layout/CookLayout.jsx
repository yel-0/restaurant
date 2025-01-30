import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/Design/Share/NavBar";
import { Home, Users, ListOrdered, List } from "lucide-react"; // Importing relevant icons

const CookLayout = ({ children }) => {
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
            <Home className="text-3xl" />
            <h2 className="text-xl font-semibold text-black">Cook Dashboard</h2>
          </div>

          {/* Sidebar Content */}
          <SidebarContent className="border-l mt-3">
            <SidebarGroup>
              <Link
                to="/cook"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/cook")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </SidebarGroup>
            {/* <SidebarGroup>
              <Link
                to="/cook/orders"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/cook/orders")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Users className="h-5 w-5" />
                Cook Orders
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/cook/order/detail"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/cook/order/detail")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <ListOrdered className="h-5 w-5" />
                Order Detail
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/cook/tv"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/cook/tv")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <List className="h-5 w-5" />
                Cook TV
              </Link>
            </SidebarGroup> */}
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <div className="p-4 text-sm text-center">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="w-full bg-gray-100">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CookLayout;
