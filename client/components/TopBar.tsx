import { Bell, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { HRMSSidebar } from "./HRMSSidebar";

const tabs = [
  { label: "Employees", path: "/" }, { label: "Workforce Cost", path: "/workforce-cost" }, { label: "Attendance", path: "/attendance" }, { label: "Leave Management", path: "/leave-management" }, { label: "Timesheet", path: "/timesheet" },
];
function pageTitle(pathname: string) {
  if (pathname === "/") return "Employees";
  if (pathname === "/leave-management/leave-types") return "Leave Management / Leave Types";
  if (pathname.startsWith("/timesheet/")) return "Timesheet / Details";
  if (pathname.startsWith("/employee-profile/compensation")) return "Employees / Compensation";
  if (pathname.startsWith("/employee-profile/attendance")) return "Employees / Attendance";
  if (pathname.startsWith("/employee-profile/leave")) return "Employees / Leave";
  if (pathname.startsWith("/employee-profile")) return "Employees / Profile";
  return tabs.find((tab) => tab.path === pathname)?.label ?? "Employees";
}
export function TopBar() {
  const location = useLocation(); const navigate = useNavigate(); const title = pageTitle(location.pathname);
  return <><header className="border-b border-gray-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:flex-nowrap sm:gap-4 sm:px-6 sm:py-4 lg:px-8"><div className="flex min-w-0 items-center gap-2"><HRMSSidebar /><h1 className="min-w-0 truncate text-xs font-semibold text-gray-900 sm:text-lg">Singh Hotel <span className="text-gray-400">/</span> <span className="text-gray-600">{title}</span></h1></div><div className="flex shrink-0 items-center gap-3 sm:gap-4"><button aria-label="Notifications" className="text-gray-600 hover:text-gray-900"><Bell size={20} /></button><button aria-label="Settings" className="text-gray-600 hover:text-gray-900"><Settings size={20} /></button><button onClick={() => navigate("/employee-profile")} aria-label="User profile" className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-1 ring-slate-300 transition hover:ring-green-500" /></div></div></header><nav className="border-b border-gray-200 bg-white"><div className="px-3 sm:px-6 lg:px-8"><div className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-8">{tabs.map((tab) => { const active = tab.label === "Employees" ? location.pathname === "/" || location.pathname.startsWith("/employee-profile") : location.pathname === tab.path || (tab.label === "Leave Management" && location.pathname.startsWith("/leave-management/")); return <button key={tab.label} type="button" onClick={() => navigate(tab.path)} className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors sm:py-4 ${active ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-900"}`}>{tab.label}</button>; })}</div></div></nav></>;
}
