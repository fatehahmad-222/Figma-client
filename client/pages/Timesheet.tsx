import { useMemo, useState } from "react";
import { ChevronDown, Eye, EyeOff, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";

type TimesheetStatus = "Approved" | "Pending" | "Rejected";
type Timesheet = { id: number; employee: string; department: string; initials: string; avatarClass: string; weekPeriod: string; regular: string; overtime: string; total: string; status: TimesheetStatus };
type Filters = { employee: string; department: string; month: string; year: string; store: string };

const initialTimesheetData: Timesheet[] = [
  { id: 1, employee: "Marcus Reed", department: "Engineering", initials: "MR", avatarClass: "bg-blue-100 text-blue-700", weekPeriod: "Jul 01 - Jul 07", regular: "40 hrs", overtime: "8 hrs", total: "48 hrs", status: "Approved" },
  { id: 2, employee: "Jessica Lee", department: "HR", initials: "JL", avatarClass: "bg-pink-100 text-pink-700", weekPeriod: "Jul 01 - Jul 07", regular: "38 hrs", overtime: "0 hrs", total: "38 hrs", status: "Pending" },
  { id: 3, employee: "Sarah Johnson", department: "Engineering", initials: "SJ", avatarClass: "bg-emerald-100 text-emerald-700", weekPeriod: "Jul 01 - Jul 07", regular: "42 hrs", overtime: "12 hrs", total: "54 hrs", status: "Approved" },
  { id: 4, employee: "David Chen", department: "Finance", initials: "DC", avatarClass: "bg-amber-100 text-amber-700", weekPeriod: "Jul 01 - Jul 07", regular: "35 hrs", overtime: "0 hrs", total: "35 hrs", status: "Rejected" },
  { id: 5, employee: "Emily Davis", department: "Marketing", initials: "ED", avatarClass: "bg-violet-100 text-violet-700", weekPeriod: "Jul 01 - Jul 07", regular: "40 hrs", overtime: "4 hrs", total: "44 hrs", status: "Approved" },
  { id: 6, employee: "Robert Fox", department: "Operations", initials: "RF", avatarClass: "bg-orange-100 text-orange-700", weekPeriod: "Jul 01 - Jul 07", regular: "45 hrs", overtime: "10 hrs", total: "55 hrs", status: "Pending" },
  { id: 7, employee: "Linda Park", department: "Design", initials: "LP", avatarClass: "bg-rose-100 text-rose-700", weekPeriod: "Jul 01 - Jul 07", regular: "37 hrs", overtime: "2 hrs", total: "39 hrs", status: "Approved" },
  { id: 8, employee: "James Okafor", department: "Sales", initials: "JO", avatarClass: "bg-cyan-100 text-cyan-700", weekPeriod: "Jul 01 - Jul 07", regular: "48 hrs", overtime: "5 hrs", total: "53 hrs", status: "Approved" },
  { id: 9, employee: "Fatima Al-Hassan", department: "Legal", initials: "FA", avatarClass: "bg-fuchsia-100 text-fuchsia-700", weekPeriod: "Jul 01 - Jul 07", regular: "40 hrs", overtime: "0 hrs", total: "40 hrs", status: "Pending" },
  { id: 10, employee: "Daniel Kim", department: "Backend", initials: "DK", avatarClass: "bg-teal-100 text-teal-700", weekPeriod: "Jul 01 - Jul 07", regular: "40 hrs", overtime: "6 hrs", total: "46 hrs", status: "Approved" },
];

const defaultFilters: Filters = { employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" };
const statusClass: Record<TimesheetStatus, string> = { Approved: "bg-green-100 text-green-700", Pending: "bg-amber-100 text-amber-700", Rejected: "bg-red-100 text-red-700" };

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <label className="relative block text-xs font-medium text-slate-500">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-normal text-slate-700 outline-none focus:border-green-600"><>{children}</></select><ChevronDown className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 text-slate-400" /></label>;
}

export default function Timesheet() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddTimesheetModalOpen, setIsAddTimesheetModalOpen] = useState(false);
  const [timesheets, setTimesheets] = useState(initialTimesheetData);
  const pageSize = 10;
  const totalRecords = 45;

  const filteredTimesheets = useMemo(() => timesheets.filter((item) => {
    const matchesQuery = [item.employee, item.department].some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEmployee = appliedFilters.employee === "All Employees" || item.employee === appliedFilters.employee;
    const matchesDepartment = appliedFilters.department === "All Departments" || item.department === appliedFilters.department;
    return matchesQuery && matchesEmployee && matchesDepartment;
  }), [appliedFilters, searchQuery, timesheets]);
  const pageCount = Math.max(5, Math.ceil(totalRecords / pageSize));
  const visibleTimesheets = filteredTimesheets.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const updateFilter = (key: keyof Filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const applyFilters = () => { setAppliedFilters(filters); setCurrentPage(1); setFiltersVisible(false); };
  const resetFilters = () => { setFilters(defaultFilters); setAppliedFilters(defaultFilters); setCurrentPage(1); };
  const deleteTimesheet = (id: number) => setTimesheets((current) => current.filter((item) => item.id !== id));

  return <div className="min-h-screen bg-slate-50 text-slate-800">
    <TopBar />
    <main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Timesheet</h1>
        <button type="button" onClick={() => setIsAddTimesheetModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"><Plus className="h-4 w-4" />Add Timesheet</button>
      </div>

      <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100"><Search className="h-4 w-4 shrink-0 text-slate-400" /><input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="Search employees..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /></div>
          <button type="button" className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          <button type="button" onClick={() => setFiltersVisible((visible) => !visible)} className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">{filtersVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}{filtersVisible ? "Hide Filters" : "Show Filters"}</button>
        </div>
        {filtersVisible && <div className="mt-5 border-t border-slate-100 pt-4"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SelectField label="Employee" value={filters.employee} onChange={(value) => updateFilter("employee", value)}><option>All Employees</option>{timesheets.map((item) => <option key={item.id}>{item.employee}</option>)}</SelectField>
          <SelectField label="Department" value={filters.department} onChange={(value) => updateFilter("department", value)}><option>All Departments</option>{[...new Set(timesheets.map((item) => item.department))].map((department) => <option key={department}>{department}</option>)}</SelectField>
          <SelectField label="Month" value={filters.month} onChange={(value) => updateFilter("month", value)}>{["June", "July", "August"].map((month) => <option key={month}>{month}</option>)}</SelectField>
          <SelectField label="Year" value={filters.year} onChange={(value) => updateFilter("year", value)}>{["2025", "2026", "2027"].map((year) => <option key={year}>{year}</option>)}</SelectField>
          <SelectField label="Store" value={filters.store} onChange={(value) => updateFilter("store", value)}>{["All Stores", "Main Store", "City Store", "Airport Store"].map((store) => <option key={store}>{store}</option>)}</SelectField>
        </div><div className="mt-4 flex items-center justify-end gap-4"><button type="button" onClick={applyFilters} className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Apply Filters</button><button type="button" onClick={resetFilters} className="text-sm text-slate-500 hover:text-slate-800 hover:underline">Reset Filters</button></div></div>}
      </section>

      <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[950px] border-collapse text-xs"><thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] font-bold uppercase text-slate-500"><th className="px-3 py-3">#</th><th className="px-3 py-3">Employee</th><th className="px-3 py-3">Week Period</th><th className="px-3 py-3">Regular</th><th className="px-3 py-3">Overtime</th><th className="px-3 py-3">Total</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Actions</th></tr></thead><tbody>{visibleTimesheets.length === 0 ? <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-500">No timesheets found.</td></tr> : visibleTimesheets.map((item) => <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50"><td className="px-3 py-3 text-slate-500">{item.id}</td><td className="px-3 py-3"><div className="flex items-center gap-2"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${item.avatarClass}`}>{item.initials}</span><span><strong className="block text-slate-700">{item.employee}</strong><small className="text-[10px] text-slate-400">{item.department}</small></span></div></td><td className="px-3 py-3 text-slate-600">{item.weekPeriod}</td><td className="px-3 py-3 text-slate-600">{item.regular}</td><td className="px-3 py-3 text-slate-600">{item.overtime}</td><td className="px-3 py-3 font-semibold text-slate-700">{item.total}</td><td className="px-3 py-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[item.status]}`}>{item.status}</span></td><td className="px-3 py-3"><div className="flex items-center gap-2"><button aria-label={`View ${item.employee}`} className="text-slate-400 hover:text-slate-900"><Eye className="h-4 w-4" /></button><button aria-label={`Edit ${item.employee}`} className="text-slate-400 hover:text-slate-900"><Pencil className="h-4 w-4" /></button><button aria-label={`Delete ${item.employee}`} onClick={() => deleteTimesheet(item.id)} className="text-slate-400 hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}</tbody></table></section>
      <div className="flex flex-col gap-3 px-1 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleTimesheets.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} employees</span><div className="flex items-center gap-1"><button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => setCurrentPage(page)} className={`h-8 w-8 rounded-lg border text-sm ${page === currentPage ? "border-green-600 bg-green-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}>{page}</button>)}<button disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => page + 1)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>
    </main>

    {isAddTimesheetModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><button type="button" onClick={() => setIsAddTimesheetModalOpen(false)} aria-label="Close modal" className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button><h2 className="text-lg font-bold text-slate-900">Add Timesheet</h2><p className="mt-1 text-sm text-slate-500">Timesheet creation will be available here.</p><div className="mt-6 flex justify-end"><button type="button" onClick={() => setIsAddTimesheetModalOpen(false)} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Close</button></div></section></div>}
  </div>;
}
