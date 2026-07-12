import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Bell, Check, ChevronDown, HelpCircle, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";

const employee = { id: "EMP-0043", name: "Arjun Singh", initials: "AS", status: "Active" as const, role: "General Manager", department: "Management", shift: "Morning Shift" };
const tabs = ["General", "Compensation", "Attendance", "Leave"] as const;

const leaveBalances = [
  { label: "CASUAL LEAVE", used: 8, total: 12 },
  { label: "SICK LEAVE", used: 4, total: 10 },
  { label: "EARNED LEAVE", used: 15, total: 30 },
  { label: "COMP OFF", used: 2, total: 5 },
];

const leaveRequests = [
  { type: "Earned Leave", from: "2026-08-20", to: "2026-08-25", days: "6 Days", status: "Pending", reason: "Annual family vacation to Manali. All projects handed over." },
  { type: "Sick Leave", from: "2026-07-12", to: "2026-07-14", days: "3 Days", status: "Approved", reason: "High fever and severe cold. Medical certificate attached." },
  { type: "Casual Leave", from: "2026-06-15", to: "2026-06-15", days: "1 Days", status: "Approved", reason: "Urgent personal work at the bank regarding home loan." },
  { type: "Comp Off", from: "2026-05-05", to: "2026-05-05", days: "1 Days", status: "Approved", reason: "Time off in lieu of working overtime during the Grand Launch event." },
  { type: "Casual Leave", from: "2026-04-10", to: "2026-04-11", days: "2 Days", status: "Rejected", reason: "Requesting time off for a local festival." },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Pending") return <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">Pending</span>;
  if (status === "Approved") return <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">Approved</span>;
  return <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">Rejected</span>;
}

const EmployeeLeave: React.FC = () => {
  const { employeeId = employee.id } = useParams();
  const [showBanner, setShowBanner] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [selectedYear, setSelectedYear] = useState("2026");
  const tabPath = (tab: typeof tabs[number]) => tab === "General" ? `/employees/${employeeId}` : `/employees/${employeeId}/${tab.toLowerCase()}`;

  return <div className="min-h-screen bg-slate-50 text-slate-800"><TopBar /><main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8 sm:py-6">
    <div className="mb-4 flex items-center justify-between text-xs"><div className="flex items-center gap-2 text-slate-500"><NavLink to="/">Singh Hotel</NavLink><span>/</span><span>HRMS</span><span>/</span><NavLink to="/">Employees</NavLink><span>/</span><span className="font-bold text-slate-900">Arjun Singh</span></div><div className="flex items-center gap-4 text-slate-500"><Bell className="h-4 w-4" /><HelpCircle className="h-4 w-4" /><div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">AS</div></div></div>
    {showBanner && <div className="mb-4 flex items-center gap-3 rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-2.5 text-sm text-green-800"><Check className="h-5 w-5 shrink-0 rounded-full bg-green-500 p-0.5 text-white" /><span className="flex-1 font-medium">Employee profile complete. All information has been successfully filled in.</span><button onClick={() => setShowBanner(false)} aria-label="Dismiss" className="text-green-600 hover:text-green-800"><X className="h-4 w-4" /></button></div>}
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-700">{employee.initials}</div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{employee.status}</span></div><p className="mt-1 text-sm text-slate-500">{employee.role} · {employee.department} · {employee.shift}</p><p className="mt-1 text-xs text-slate-400">{employee.id}</p></div><button className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 sm:self-center">Edit Profile</button></section>
    <nav className="mt-3 flex gap-7 border-b border-slate-200 text-sm">{tabs.map((tab) => <NavLink key={tab} to={tabPath(tab)} className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>{tab}</NavLink>)}</nav>
    <div className="mt-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div><h2 className="text-xs font-bold tracking-wide text-slate-900">LEAVE MANAGEMENT</h2><p className="mt-1 text-sm text-slate-500">Manage leave balances and review employee requests.</p></div>
        <div className="flex items-center gap-2"><label className="relative"><select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm outline-none"><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" /></label><label className="relative"><select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm outline-none"><option>2025</option><option>2026</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" /></label></div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">{leaveBalances.map((balance) => <div key={balance.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-[10px] font-semibold uppercase text-slate-400">{balance.label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{balance.used} <span className="text-sm font-normal text-slate-400">/ {balance.total} Days</span></p><div className="mt-2 h-1.5 w-full rounded-full bg-slate-100"><div className="h-1.5 rounded-full bg-green-500" style={{ width: `${(balance.used / balance.total) * 100}%` }} /></div></div>)}</div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-sm"><thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] font-semibold uppercase text-slate-500"><th className="px-4 py-3">Leave Type</th><th className="px-4 py-3">From</th><th className="px-4 py-3">To</th><th className="px-4 py-3">Days</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Reason</th></tr></thead>
          <tbody>{leaveRequests.map((req, i) => <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50"><td className="px-4 py-4 font-semibold text-slate-800">{req.type}</td><td className="px-4 py-4 text-slate-600">{req.from}</td><td className="px-4 py-4 text-slate-600">{req.to}</td><td className="px-4 py-4 text-slate-600">{req.days}</td><td className="px-4 py-4"><StatusBadge status={req.status} /></td><td className="px-4 py-4 text-sm text-slate-500">{req.reason}</td></tr>)}</tbody>
        </table>
      </div>
    </div></main></div>;
};
export default EmployeeLeave;
