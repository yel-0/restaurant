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
              <div className="p-4 border-b border-gray-700">Orders</div>
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

        <div className="flex-1 bg-gray-100 ">
          <Navbar />
          <div className="bg-white p-6 h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CookLayout;
