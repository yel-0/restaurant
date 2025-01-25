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
import { Table, ListOrdered, ClipboardList } from "lucide-react";

const WaiterLayout = ({ children }) => {
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
            <ClipboardList className="text-3xl" />
            <h2 className="text-xl font-semibold text-black">Waiter Panel</h2>
          </div>

          {/* Sidebar Content */}
          <SidebarContent className="border-l mt-3">
            <SidebarGroup>
              <Link
                to="/waiter/order"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/waiter/order")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <ClipboardList className="h-5 w-5" />
                Menus
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/waiter/order/lists"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/waiter/order/lists")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <ListOrdered className="h-5 w-5" />
                Order Lists
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to="/waiter/tables"
                className={`p-3 flex items-center gap-2 rounded-xl ${
                  isActive("/waiter/tables")
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <Table className="h-5 w-5" />
                Tables
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
        <div className="w-full bg-gray-100">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default WaiterLayout;
