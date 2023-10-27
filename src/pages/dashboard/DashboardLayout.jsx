import DashboardHeader from "../../components/DashboardHeader";
import SideNavbar from "../../components/DashboardNavbar";

import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className=" layout w-screen h-screen ">
      <SideNavbar />
      <DashboardHeader />
      <div className=" content w-full h-full border border-slate-800 overflow-y-auto ">{children}</div>
    </div>
  );
}
