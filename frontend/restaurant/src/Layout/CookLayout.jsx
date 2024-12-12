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
import { Home, Users, ListOrdered } from "lucide-react";
const CookLayout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar className="w-64  bg-gray-800 border-none text-white">
          <SidebarHeader>
            <div className="p-4 text-lg font-bold">Cook Dashboard</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <Link
                to={"/cook"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/cook/orders"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <Users className="h-5 w-5" />
                Cook Orders
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/cook/order/detail"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <ListOrdered className="h-5 w-5" />
                Order Detail
              </Link>
            </SidebarGroup>
            <SidebarGroup>
              <Link
                to={"/cook/tv"}
                className="p-4 flex items-center gap-2 border-gray-700"
              >
                <ListOrdered className="h-5 w-5" />
                Cook TV
              </Link>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 text-sm text-center  border-gray-700">
              Powered by Restaurant App
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 bg-gray-100 ">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CookLayout;
