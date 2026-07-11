import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import {
  ArrowRightCircle,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Eye,
  EyeOff,
  Flag,
  Plus,
  Search,
  Star,
  Square,
  X,
  XCircle,
} from "lucide-react";

type AttendanceStatus =
  | "present"
  | "absent"
  | "half-day"
  | "on-leave"
  | "holiday"
  | "day-off"
  | "future"
  | "not-added"
  | "late"
  | "early-departure"
  | "overtime";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  store: string;
  avatar: string;
  avatarClass: string;
  worked: string;
};

type Filters = {
  employee: string;
  department: string;
  month: string;
  year: string;
  store: string;
};

type NewRecord = {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
  clockIn: string;
  clockOut: string;
  notes: string;
};

const baseEmployees: Employee[] = [
  { id: 1, name: "Sarah Johnson", role: "Marketing Lead", department: "Marketing", store: "Main Store", avatar: "SJ", avatarClass: "bg-rose-100 text-rose-600", worked: "17.5/23" },
  { id: 2, name: "Marcus Williams", role: "Finance Analyst", department: "Finance", store: "Main Store", avatar: "MW", avatarClass: "bg-blue-100 text-blue-600", worked: "20/23" },
  { id: 3, name: "Priya Sharma", role: "HR Coordinator", department: "Human Resources", store: "City Store", avatar: "PS", avatarClass: "bg-emerald-100 text-emerald-600", worked: "22/23" },
  { id: 4, name: "David Park", role: "IT Support", department: "Technology", store: "Airport Store", avatar: "DP", avatarClass: "bg-amber-100 text-amber-600", worked: "18/23" },
  { id: 5, name: "Lisa Chen", role: "Operations Manager", department: "Operations", store: "Main Store", avatar: "LC", avatarClass: "bg-violet-100 text-violet-600", worked: "21/23" },
  { id: 6, name: "James Okafor", role: "Sales Executive", department: "Sales", store: "City Store", avatar: "JO", avatarClass: "bg-pink-100 text-pink-600", worked: "16/23" },
  { id: 7, name: "Emma Rodriguez", role: "Customer Success", department: "Customer Success", store: "Main Store", avatar: "ER", avatarClass: "bg-orange-100 text-orange-600", worked: "23/23" },
  { id: 8, name: "Daniel Kim", role: "Backend Developer", department: "Technology", store: "Airport Store", avatar: "DK", avatarClass: "bg-teal-100 text-teal-600", worked: "19/23" },
  { id: 9, name: "Fatima Al-Hassan", role: "Legal Advisor", department: "Legal", store: "City Store", avatar: "FA", avatarClass: "bg-indigo-100 text-indigo-600", worked: "20/23" },
  { id: 10, name: "Carlos Mendez", role: "Procurement Head", department: "Procurement", store: "Main Store", avatar: "CM", avatarClass: "bg-green-100 text-green-700", worked: "17/23" },
];

const extraNames = [
  "Ava Thompson", "Noah Williams", "Mia Patel", "Liam Wilson", "Olivia Brown", "Ethan Davis", "Sofia Garcia", "Lucas Martin", "Amelia Lee", "Henry Clark",
  "Isabella Lewis", "Mateo Young", "Grace Hall", "Leo Allen", "Chloe Wright", "Jack King", "Nora Scott", "Mason Green", "Ella Baker", "Owen Adams",
  "Maya Nelson", "Elijah Hill", "Zoe Ramirez", "James Campbell", "Aria Mitchell", "Benjamin Roberts", "Layla Carter", "Samuel Phillips", "Hannah Evans", "Michael Turner",
  "Luna Torres", "Alexander Parker", "Camila Collins", "Daniel Edwards", "Harper Stewart",
];

const employees: Employee[] = [
  ...baseEmployees,
  ...extraNames.map((name, index) => ({
    id: index + 11,
    name,
    role: ["Team Member", "Senior Associate", "Coordinator"][index % 3],
    department: ["Operations", "Sales", "Finance", "Marketing"][index % 4],
    store: ["Main Store", "City Store", "Airport Store"][index % 3],
    avatar: name.split(" ").map((part) => part[0]).join(""),
    avatarClass: ["bg-cyan-100 text-cyan-600", "bg-slate-100 text-slate-600", "bg-fuchsia-100 text-fuchsia-600"][index % 3],
    worked: `${15 + (index % 9)}/23`,
  })),
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const departments = ["All Departments", ...Array.from(new Set(employees.map((employee) => employee.department)))];
const stores = ["All Stores", "Main Store", "City Store", "Airport Store"];
const statusLabels: { status: AttendanceStatus; label: string }[] = [
  { status: "present", label: "Present" },
  { status: "absent", label: "Absent" },
  { status: "half-day", label: "Half Day" },
  { status: "on-leave", label: "On Leave" },
  { status: "holiday", label: "Holiday" },
  { status: "day-off", label: "Day Off" },
  { status: "future", label: "Future" },
  { status: "not-added", label: "Not Added" },
  { status: "late", label: "Late" },
  { status: "early-departure", label: "Early Departure" },
  { status: "overtime", label: "Overtime" },
];

function getDaysInMonth(month: string, year: string) {
  return new Date(Number(year), months.indexOf(month) + 1, 0).getDate();
}

function getStatus(employeeId: number, day: number, overrides: Record<string, AttendanceStatus>): AttendanceStatus {
  const date = `2026-07-${String(day).padStart(2, "0")}`;
  const override = overrides[`${employeeId}-${date}`];
  if (override) return override;
  const weekday = new Date(2026, 6, day).getDay();
  if (weekday === 0 || weekday === 6) return "day-off";
  const patterns: AttendanceStatus[] = ["present", "present", "present", "late", "present", "early-departure", "present", "half-day", "present", "on-leave", "present", "overtime"];
  return patterns[(employeeId * 3 + day) % patterns.length];
}

function StatusIcon({ status }: { status: AttendanceStatus }) {
  const common = "h-3.5 w-3.5";
  if (status === "present") return <CheckCircle2 className={`${common} text-emerald-500`} />;
  if (status === "absent") return <XCircle className={`${common} text-rose-500`} />;
  if (status === "half-day") return <Circle className={`${common} fill-amber-400 text-amber-500`} />;
  if (status === "on-leave") return <Flag className={`${common} text-rose-500`} />;
  if (status === "holiday") return <Star className={`${common} fill-amber-300 text-amber-500`} />;
  if (status === "day-off") return <Circle className={`${common} text-slate-200`} />;
  if (status === "future") return <Circle className={`${common} border border-dashed border-slate-300 text-transparent`} />;
  if (status === "not-added") return <span className="text-xs text-slate-300">—</span>;
  if (status === "late") return <Clock3 className={`${common} text-orange-500`} />;
  if (status === "early-departure") return <ArrowRightCircle className={`${common} text-blue-500`} />;
  return <Square className={`${common} fill-purple-500 text-purple-500`} />;
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative block text-xs font-medium text-slate-500">
      <span className="mb-1.5 block">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-normal text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 text-slate-400" />
    </label>
  );
}

export default function Attendance() {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, AttendanceStatus>>({});
  const [newRecord, setNewRecord] = useState<NewRecord>({ employeeId: "", date: "", status: "present", clockIn: "09:00", clockOut: "18:00", notes: "" });
  const pageSize = 10;
  const daysInMonth = getDaysInMonth(appliedFilters.month, appliedFilters.year);

  const visibleEmployees = useMemo(() => employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmployee = appliedFilters.employee === "All Employees" || employee.name === appliedFilters.employee;
    const matchesDepartment = appliedFilters.department === "All Departments" || employee.department === appliedFilters.department;
    const matchesStore = appliedFilters.store === "All Stores" || employee.store === appliedFilters.store;
    return matchesSearch && matchesEmployee && matchesDepartment && matchesStore;
  }), [appliedFilters, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(visibleEmployees.length / pageSize));
  const pageEmployees = visibleEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const openModal = () => {
    setNewRecord({ employeeId: "", date: "", status: "present", clockIn: "09:00", clockOut: "18:00", notes: "" });
    setIsModalOpen(true);
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setFiltersVisible(false);
  };

  const submitRecord = () => {
    if (!newRecord.employeeId || !newRecord.date) return;
    setOverrides((current) => ({ ...current, [`${newRecord.employeeId}-${newRecord.date}`]: newRecord.status }));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <TopBar />
      <div className={isModalOpen ? "blur-sm" : ""}>
        <main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Singh Hotel</span><span>/</span><span>HRMS</span><span>/</span><span className="font-semibold text-slate-700">Attendance</span>
          </div>
          <nav className="mb-6 flex gap-7 border-b border-slate-200 text-sm">
            {["Employees", "Attendance", "Leave Management", "Scheduling"].map((tab) => (
              <button key={tab} type="button" className={`border-b-2 px-0 pb-3 pt-2 transition-colors ${tab === "Attendance" ? "border-slate-800 font-semibold text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                {tab}
              </button>
            ))}
          </nav>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Attendance Records</h2>
            <button onClick={openModal} type="button" className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"><Plus className="h-4 w-4" /> Add Record</button>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="Search..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
              </div>
              <button type="button" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Search</button>
              <button type="button" onClick={() => setFiltersVisible((visible) => !visible)} className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"><span>{filtersVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</span>{filtersVisible ? "Hide Filters" : "Show Filters"}</button>
            </div>
            {filtersVisible && <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <SelectField label="Employee" value={filters.employee} onChange={(value) => setFilters({ ...filters, employee: value })}><option>All Employees</option>{employees.slice(0, 10).map((employee) => <option key={employee.id}>{employee.name}</option>)}</SelectField>
                <SelectField label="Department" value={filters.department} onChange={(value) => setFilters({ ...filters, department: value })}>{departments.map((department) => <option key={department}>{department}</option>)}</SelectField>
                <SelectField label="Month" value={filters.month} onChange={(value) => setFilters({ ...filters, month: value })}>{months.map((month) => <option key={month}>{month}</option>)}</SelectField>
                <SelectField label="Year" value={filters.year} onChange={(value) => setFilters({ ...filters, year: value })}><option>2025</option><option>2026</option><option>2027</option></SelectField>
                <SelectField label="Store" value={filters.store} onChange={(value) => setFilters({ ...filters, store: value })}>{stores.map((store) => <option key={store}>{store}</option>)}</SelectField>
              </div>
              <div className="mt-4 flex items-center justify-end gap-4"><button onClick={applyFilters} type="button" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Apply Filters</button><button onClick={() => { setFilters({ employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" }); setAppliedFilters({ employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" }); setCurrentPage(1); }} type="button" className="text-sm text-slate-500 hover:text-slate-800 hover:underline">Reset Filters</button></div>
            </div>}
          </section>

          <div className="my-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            {statusLabels.map(({ status, label }) => <span key={status} className="flex items-center gap-1.5"><StatusIcon status={status} />{label}</span>)}
          </div>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1500px] border-collapse text-xs">
                <thead><tr className="border-b border-slate-200 bg-slate-50 text-center text-[10px] font-bold text-slate-500"><th className="sticky left-0 z-10 w-[230px] min-w-[230px] border-r border-slate-200 bg-slate-50 px-4 py-3 text-left">EMPLOYEES</th>{Array.from({ length: daysInMonth }, (_, index) => { const day = index + 1; const weekday = new Date(Number(appliedFilters.year), months.indexOf(appliedFilters.month), day).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(); return <th key={day} className="w-11 min-w-[44px] px-1 py-2"><div>{weekday}</div><div className="mt-1 text-slate-700">{day}</div></th>; })}</tr></thead>
                <tbody>{pageEmployees.length === 0 ? <tr><td colSpan={daysInMonth + 1} className="px-4 py-12 text-center text-sm text-slate-500">No employees found.</td></tr> : pageEmployees.map((employee) => <tr key={employee.id} className="group border-b border-slate-100 last:border-0 hover:bg-slate-50"><td className="sticky left-0 z-[1] border-r border-slate-100 bg-white px-3 py-2 group-hover:bg-slate-50"><div className="flex items-center gap-2.5"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${employee.avatarClass}`}>{employee.avatar}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-700">{employee.name}</div><div className="truncate text-[10px] text-slate-400">{employee.role} <span className="font-semibold text-emerald-600">{employee.worked}</span></div></div></div></td>{Array.from({ length: daysInMonth }, (_, index) => <td key={index} className="px-1 py-3 text-center"><div className="flex justify-center"><StatusIcon status={getStatus(employee.id, index + 1, overrides)} /></div></td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>
          <div className="flex flex-col gap-3 px-1 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleEmployees.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, visibleEmployees.length)} of {visibleEmployees.length} employees</span><div className="flex items-center gap-1"><button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-md border border-slate-200 px-3 py-2 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{Array.from({ length: Math.min(5, totalPages) }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => setCurrentPage(page)} className={`h-8 w-8 rounded-md border text-sm ${page === currentPage ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{page}</button>)}<button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="rounded-md border border-slate-200 px-3 py-2 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>
        </main>
      </div>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"><div role="dialog" aria-modal="true" className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h3 className="text-lg font-bold text-slate-900">Add Attendance Record</h3><p className="mt-1 text-sm text-slate-500">Log attendance for an employee</p></div><button onClick={() => setIsModalOpen(false)} type="button" aria-label="Close modal" className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button></div><div className="space-y-4"><label className="relative block text-xs font-semibold text-slate-700">Employee<select value={newRecord.employeeId} onChange={(event) => setNewRecord({ ...newRecord, employeeId: event.target.value })} className="mt-1.5 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-emerald-500"><option value="">Select Employee</option>{baseEmployees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-2.5 right-3 h-4 w-4 text-slate-400" /></label><label className="block text-xs font-semibold text-slate-700">Date<input type="date" value={newRecord.date} onChange={(event) => setNewRecord({ ...newRecord, date: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-600 outline-none focus:border-emerald-500" /></label><div><span className="text-xs font-semibold text-slate-700">Attendance Status</span><div className="mt-2 flex flex-wrap gap-2">{(["present", "absent", "half-day", "late", "on-leave"] as AttendanceStatus[]).map((status) => <button key={status} type="button" onClick={() => setNewRecord({ ...newRecord, status })} className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition ${newRecord.status === status ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>{status.replace("-", " ")}</button>)}</div></div><div className="grid grid-cols-2 gap-3"><label className="block text-xs font-semibold text-slate-700">Clock In<input type="time" value={newRecord.clockIn} onChange={(event) => setNewRecord({ ...newRecord, clockIn: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-500" /></label><label className="block text-xs font-semibold text-slate-700">Clock Out<input type="time" value={newRecord.clockOut} onChange={(event) => setNewRecord({ ...newRecord, clockOut: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-500" /></label></div><label className="block text-xs font-semibold text-slate-700">Notes (Optional)<textarea value={newRecord.notes} onChange={(event) => setNewRecord({ ...newRecord, notes: event.target.value })} placeholder="Add any notes here..." rows={3} className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-500" /></label></div><div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5"><button onClick={() => setIsModalOpen(false)} type="button" className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={submitRecord} type="button" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Add Record</button></div></div></div>}
    </div>
  );
}
