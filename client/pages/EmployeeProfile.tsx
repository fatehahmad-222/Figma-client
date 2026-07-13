import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Check, ChevronDown, Edit3, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";

const personalDetails = [
  ["Full Name", "Arjun Singh"],
  ["Email", "arjun.singh@singhhotel.com"],
  ["Mobile", "+91 98765 43210"],
  ["Date of Birth", "Mar 15, 1988"],
  ["Gender", "Male"],
  ["Address", "123 Main St, New York, NY 10001"],
];

const employmentDetails = [
  ["Employee ID", "EMP-0043"],
  ["Store", "Singh Hotel Main"],
  ["Department", "Management"],
  ["Role", "General Manager"],
  ["Employment Type", "Full Time"],
  ["Date of Joining", "Jan 01, 2025"],
  ["Reporting Manager", "Rajesh Kumar"],
];

function DetailRows({ details, employmentType, employmentTypeOpen, onToggleEmploymentType, onSelectEmploymentType }: { details: string[][]; employmentType?: string; employmentTypeOpen?: boolean; onToggleEmploymentType?: () => void; onSelectEmploymentType?: (value: string) => void }) {
  return (
    <div>
      {details.map(([label, value]) => (
        <div key={label} className="relative flex min-h-9 items-center justify-between gap-5 border-b border-slate-100 py-2 text-xs last:border-0">
          <span className="text-slate-500">{label}</span>
          {label === "Employment Type" && employmentType && onToggleEmploymentType && onSelectEmploymentType ? (
            <div className="relative">
              <button type="button" onClick={onToggleEmploymentType} className="flex min-w-[150px] items-center justify-between gap-4 rounded border border-slate-200 bg-white px-3 py-2 text-left font-medium text-slate-700 shadow-sm hover:border-slate-300"><span>{employmentType}</span><ChevronDown className="h-4 w-4 text-slate-400" /></button>
              {employmentTypeOpen && <div className="absolute right-0 top-full z-20 mt-1 w-[150px] overflow-hidden rounded border border-slate-200 bg-white text-left shadow-lg"><button type="button" onClick={() => onSelectEmploymentType("Hourly")} className="block w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">Hourly</button><button type="button" onClick={() => onSelectEmploymentType("Contract")} className="block w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">Contract</button><button type="button" onClick={() => onSelectEmploymentType("Full Time")} className="block w-full bg-sky-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100">Full Time</button><button type="button" onClick={() => onSelectEmploymentType("Part Time")} className="block w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">Part Time</button></div>}
            </div>
          ) : <span className="text-right font-medium text-slate-800">{value}</span>}
        </div>
      ))}
    </div>
  );
}

function Section({ title, children, employmentType, employmentTypeOpen, onToggleEmploymentType, onSelectEmploymentType }: { title: string; children: React.ReactNode; employmentType?: string; employmentTypeOpen?: boolean; onToggleEmploymentType?: () => void; onSelectEmploymentType?: (value: string) => void }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
        <h2 className="text-[11px] font-bold uppercase text-slate-800">{title}</h2>
        <button type="button" aria-label={`Edit ${title.toLowerCase()}`} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Edit3 className="h-4 w-4" /></button>
      </div>
      <div className="px-4 pb-3 pt-2 sm:px-5 sm:pb-4"><DetailRows details={children as unknown as string[][]} employmentType={employmentType} employmentTypeOpen={employmentTypeOpen} onToggleEmploymentType={onToggleEmploymentType} onSelectEmploymentType={onSelectEmploymentType} /></div>
    </section>
  );
}

export default function EmployeeProfile() {
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [employmentTypeOpen, setEmploymentTypeOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <TopBar />
      <main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8 sm:py-6">
        {showBanner && <div className="mb-4 flex items-center gap-3 rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-2.5 text-sm text-green-800"><Check className="h-5 w-5 shrink-0 rounded-full bg-green-500 p-0.5 text-white" /><span className="flex-1 font-medium">Employee profile complete. All information has been successfully filled in.</span><button onClick={() => setShowBanner(false)} aria-label="Dismiss" className="text-green-600 hover:text-green-800"><X className="h-4 w-4" /></button></div>}

        <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-lg font-bold text-emerald-700">AS</div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold text-slate-900">Arjun Singh</h1><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span></div><p className="mt-1 text-sm text-slate-500">General Manager · Management · Morning Shift</p><p className="mt-1 text-xs text-slate-400">EMP-0043</p></div><button className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 sm:self-center">Edit Profile</button></section>

        <nav className="mt-3 flex gap-7 border-b border-slate-200 text-sm"><NavLink to="/employee-profile" end className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>General</NavLink><NavLink to="/employee-profile/compensation" className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Compensation</NavLink><NavLink to="/employee-profile/attendance" className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Attendance</NavLink><NavLink to="/employee-profile/leave" className={({ isActive }) => `border-b-2 px-0 py-3 ${isActive ? "border-green-600 font-semibold text-green-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Leave</NavLink></nav>

        <div className="mt-4 space-y-4">
          <Section title="Personal Information">{personalDetails}</Section>
          <Section title="Employment Details" employmentType={employmentType} employmentTypeOpen={employmentTypeOpen} onToggleEmploymentType={() => setEmploymentTypeOpen((open) => !open)} onSelectEmploymentType={(value) => { setEmploymentType(value); setEmploymentTypeOpen(false); }}>{employmentDetails}</Section>
        </div>
      </main>
    </div>
  );
}
