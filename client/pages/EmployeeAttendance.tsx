import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Check, ChevronDown, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";

const employee = { id: "EMP-0043", name: "Arjun Singh", initials: "AS", status: "Active" as const, role: "General Manager", department: "Management", shift: "Morning Shift" };
const tabs = ["General", "Compensation", "Attendance", "Leave"] as const;

const attendanceData = [
  { date: "06-07-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "1 hr 00 min" },
  { date: "05-07-2026", status: "Leave", clockIn: (
    <span className="text-rose-600 font-medium">On Leave</span>
  ), clockOut: (
    <span className="text-rose-600 font-medium">On Leave</span>
  ), clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "04-07-2026", status: "Holiday", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "03-07-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "02-07-2026", status: "Late", clockIn: "10:30 am", clockOut: "05:00 pm", clocked: "6 hrs 30 mins", clockedPct: 65, overtime: "0 hrs 00 min" },
  { date: "01-07-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "0 hrs 30 min" },
  { date: "30-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "1 hr 30 min" },
  { date: "29-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "28-06-2026", status: "Holiday", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "27-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "26-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "0 hrs 00 min" },
  { date: "25-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "24-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "2 hrs 00 min" },
  { date: "23-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "22-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "0 hrs 45 min" },
  { date: "21-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "20-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "1 hr 15 min" },
  { date: "19-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "18-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "0 hrs 00 min" },
  { date: "17-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "16-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "1 hr 00 min" },
  { date: "15-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "14-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "0 hrs 30 min" },
  { date: "13-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
  { date: "12-06-2026", status: "Present", clockIn: "08:00 am", clockOut: "05:00 pm", clocked: "9 hrs 00 mins", clockedPct: 90, overtime: "1 hr 30 min" },
  { date: "11-06-2026", status: "Not Marked", clockIn: "-", clockOut: "-", clocked: "-", clockedPct: 0, overtime: "-" },
];

function StatusPill({ status }: { status: string }) {
  if (status === "Present") return <span className="font-bold rounded bg-green-100 text-green-600 px-2 py-0.5">Present</span>;
  if (status === "Leave") return <span className="rounded bg-rose-100 px-2 py-0.5 font-bold text-rose-600">Leave</span>;
  if (status === "Holiday") return <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-blue-600">Holiday</span>;
  if (status === "Late") return <span className="rounded bg-rose-100 px-2 py-0.5 font-bold text-rose-600">Late</span>;
  return <span className="font-medium rounded bg-slate-100 px-2 py-0.5 text-slate-400">Not Marked</span>;
}

const EmployeeAttendance: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("July");
  const tabPath = (tab: typeof tabs[number]) => tab === "General" ? "/employee-profile" : `/employee-profile/${tab.toLowerCase()}`;

  return <div className="min-h-screen bg-slate-50 text-slate-800"><TopBar /><main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8 sm:py-6">
    {showBanner && <div className="mb-4 flex items-center gap-3 rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-2.5 text-sm text-green-800"><Check className="h-5 w-5 shrink-0 rounded-full bg-green-500 p-0.5 text-white" /><span className="flex-1 font-medium">Employee profile complete. All information has been successfully filled in.</span><button onClick={() => setShowBanner(false)} aria-label="Dismiss" className="text-green-600 hover:text-green-800"><X className="h-4 w-4" /></button></div>}
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-lg font-bold text-green-700">{employee.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1><span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">{employee.status}</span></div><p className="mt-1 text-sm text-slate-500">{employee.role} · {employee.department} · {employee.shift}</p><p className="mt-1 text-xs text-slate-400">{employee.id}</p></div><button className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 sm:w-auto">Edit Profile</button></section>
    <nav className="no-scrollbar mt-3 flex gap-7 overflow-x-auto border-b border-slate-200 text-sm">{tabs.map((tab) => <NavLink key={tab} end={tab === "General"} to={tabPath(tab)} className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>{tab}</NavLink>)}</nav>
    <div className="mt-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div><h2 className="text-xs font-bold tracking-wide text-slate-900">ATTENDANCE</h2><p className="mt-1 text-sm text-slate-500">Review clock-ins, status, and time worked for the selected period.</p></div>
        <div className="flex w-full items-center gap-2 sm:w-auto"><label className="relative flex-1 sm:flex-none"><select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm outline-none"><option>2025</option><option>2026</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" /></label><label className="relative flex-1 sm:flex-none"><select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm outline-none"><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" /></label></div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[["PRESENT / WORKING DAYS", "2/6 Days", "text-slate-900"], ["TOTAL OFFICE TIME", "16 hrs", "text-green-600"], ["TOTAL WORKED TIME", "2 hrs 14 mins", "text-rose-600"], ["LATE", "1 Days (16.67%)", "text-rose-600"], ["HALF DAYS", "0", "text-rose-600"], ["LEAVES IN MONTH", "0", "text-rose-600"]].map(([label, value, color], i) => <div key={i} className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm"><p className="text-[10px] font-semibold uppercase text-slate-400">{label}</p><p className={`mt-1 text-lg font-bold ${color}`}>{value}{label === "TOTAL WORKED TIME" && <span className="ml-1 text-xs font-normal text-slate-400">(13.96%)</span>}</p></div>)}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-sm"><thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] font-semibold uppercase text-slate-500"><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Clock In</th><th className="px-4 py-3">Clock Out</th><th className="px-4 py-3">Clocked Time</th><th className="px-4 py-3">Over Time</th></tr></thead>
          <tbody>{attendanceData.map((row) => <tr key={row.date} className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3 text-slate-600">{row.date}</td><td className="px-4 py-3"><StatusPill status={row.status} /></td><td className="px-4 py-3 text-slate-600">{row.clockIn}</td><td className="px-4 py-3 text-slate-600">{row.clockOut}</td><td className="px-4 py-3">{row.clocked !== "-" ? <div><span className="font-semibold text-slate-800">{row.clocked}</span><div className="mt-1 h-1 w-full rounded-full bg-slate-100"><div className="h-1 rounded-full bg-green-500" style={{ width: `${row.clockedPct}%` }} /></div></div> : <span className="text-slate-400">-</span>}</td><td className={`px-4 py-3 ${row.overtime !== "-" && row.overtime !== "0 hrs 00 min" ? "font-medium text-green-600" : "text-slate-400"}`}>{row.overtime}</td></tr>)}</tbody>
        </table>
      </div>
    </div></main></div>;
};
export default EmployeeAttendance;
