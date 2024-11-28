import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function HomeSideBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold p-4">Home Sidebar</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
            Profile
          </Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">
            Settings
          </Link>
          <Link to="/help" className="block px-4 py-2 hover:bg-gray-200">
            Help
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="p-4 text-gray-500 text-sm">© 2024 Your Company</p>
      </SidebarFooter>
    </Sidebar>
  );
}
