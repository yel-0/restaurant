import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSideBar } from "@/Design/User/HomeSideBar";
import { OrderSideBar } from "@/Design/User/OrderSideBar";

export default function HomeLayout({ children }) {
  return (
    <SidebarProvider>
      <HomeSideBar />
      <main>
        <div className="m-5">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
