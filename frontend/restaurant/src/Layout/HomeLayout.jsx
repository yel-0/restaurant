import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "@/Design/Share/NavBar";
import { HomeSideBar } from "@/Design/User/HomeSideBar";

export default function HomeLayout({ children }) {
  return (
    <SidebarProvider>
      <HomeSideBar />
      <main>
        {/* <div className="m-5">
          <SidebarTrigger />
        </div> */}
        <NavBar />
        {children}
      </main>
    </SidebarProvider>
  );
}
