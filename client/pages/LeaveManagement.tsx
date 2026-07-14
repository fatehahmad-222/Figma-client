import React, { useMemo, useRef, useState } from "react";
import { Camera, ChevronDown, Eye, EyeOff, FileText, Filter, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { TopBar } from "@/components/TopBar";

type LeaveTab = "pending" | "rejected";
type LeaveType = "Annual Leave" | "Compassionate Leave" | "Sick Leave" | "Compensatory Leave" | "Maternity Leave" | "Manage Leave";
type Employee = { id: number; name: string; department: string; role: string; initials: string; color: string };
type LeaveRequest = { id: number; employee: string; department: string; leaveType: LeaveType; startDate: string; endDate: string; days: number; status: "Pending" | "Rejected"; appliedOn: string };
type Filters = { employee: string; department: string; month: string; year: string; store: string };
type NewLeave = { staffName: string; leaveType: string; fromDate: string; toDate: string; numberOfDays: number; reason: string; attachmentFileName: string };

const employees: Employee[] = [
  { id: 1, name: "Marcus Reed", department: "Engineering", role: "Engineering", initials: "MR", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Jessica Lee", department: "HR", role: "Human Resources", initials: "JL", color: "bg-pink-100 text-pink-700" },
  { id: 3, name: "David Chen", department: "Finance", role: "Finance", initials: "DC", color: "bg-amber-100 text-amber-700" },
  { id: 4, name: "Emily Davis", department: "Marketing", role: "Marketing", initials: "ED", color: "bg-violet-100 text-violet-700" },
  { id: 5, name: "Sarah Johnson", department: "Engineering", role: "Engineering", initials: "SJ", color: "bg-green-100 text-green-700" },
  { id: 6, name: "Robert Fox", department: "Operations", role: "Operations", initials: "RF", color: "bg-orange-100 text-orange-700" },
  { id: 7, name: "Linda Park", department: "Design", role: "Design", initials: "LP", color: "bg-rose-100 text-rose-700" },
];

const timelineLeaves = [
  { employee: "Marcus Reed", leaveType: "Annual Leave" as LeaveType, start: 12, end: 18 },
  { employee: "Jessica Lee", leaveType: "Sick Leave" as LeaveType, start: 7, end: 8 },
  { employee: "David Chen", leaveType: "Annual Leave" as LeaveType, start: 20, end: 26 },
  { employee: "Emily Davis", leaveType: "Manage Leave" as LeaveType, start: 16, end: 18 },
  { employee: "Sarah Johnson", leaveType: "Compassionate Leave" as LeaveType, start: 10, end: 13 },
  { employee: "Robert Fox", leaveType: "Sick Leave" as LeaveType, start: 4, end: 5 },
  { employee: "Linda Park", leaveType: "Maternity Leave" as LeaveType, start: 24, end: 31 },
];

const initialPending: LeaveRequest[] = [
  { id: 1, employee: "Marcus Reed", department: "Engineering", leaveType: "Annual Leave", startDate: "2026-07-12", endDate: "2026-07-18", days: 7, status: "Pending", appliedOn: "2026-06-28" },
  { id: 2, employee: "Jessica Lee", department: "HR", leaveType: "Sick Leave", startDate: "2026-07-02", endDate: "2026-07-03", days: 2, status: "Pending", appliedOn: "2026-06-30" },
  { id: 3, employee: "Sarah Johnson", department: "Engineering", leaveType: "Manage Leave", startDate: "2026-06-30", endDate: "2026-06-30", days: 1, status: "Pending", appliedOn: "2026-06-25" },
  { id: 4, employee: "David Chen", department: "Finance", leaveType: "Annual Leave", startDate: "2026-08-05", endDate: "2026-08-12", days: 8, status: "Pending", appliedOn: "2026-07-20" },
  { id: 5, employee: "Emily Davis", department: "Marketing", leaveType: "Manage Leave", startDate: "2026-07-15", endDate: "2026-07-17", days: 3, status: "Pending", appliedOn: "2026-07-01" },
  { id: 6, employee: "Robert Fox", department: "Operations", leaveType: "Sick Leave", startDate: "2026-07-04", endDate: "2026-07-05", days: 2, status: "Pending", appliedOn: "2026-07-02" },
  { id: 7, employee: "Linda Park", department: "Design", leaveType: "Maternity Leave", startDate: "2026-07-10", endDate: "2026-09-10", days: 62, status: "Pending", appliedOn: "2026-06-15" },
];

const initialRejected: LeaveRequest[] = [
  { id: 101, employee: "Robert Fox", department: "Operations", leaveType: "Manage Leave", startDate: "2026-07-20", endDate: "2026-07-22", days: 3, status: "Rejected", appliedOn: "2026-07-05" },
  { id: 102, employee: "Jessica Lee", department: "HR", leaveType: "Annual Leave", startDate: "2026-08-01", endDate: "2026-08-05", days: 5, status: "Rejected", appliedOn: "2026-07-10" },
  { id: 103, employee: "David Chen", department: "Finance", leaveType: "Sick Leave", startDate: "2026-06-15", endDate: "2026-06-16", days: 2, status: "Rejected", appliedOn: "2026-06-12" },
];

const leaveTypes: LeaveType[] = ["Annual Leave", "Sick Leave", "Compassionate Leave", "Compensatory Leave", "Maternity Leave", "Manage Leave"];
const legend = [
  ["Annual Leave", "bg-green-100"], ["Compassionate Leave", "bg-blue-100"], ["Sick Leave", "bg-rose-100"],
  ["Compensatory Leave", "bg-amber-100"], ["Maternity Leave", "bg-pink-100"], ["Manage Leave", "bg-violet-100"],
] as const;
const leaveColors: Record<string, string> = { "Annual Leave": "bg-green-100 text-green-700", "Compassionate Leave": "bg-blue-100 text-blue-700", "Sick Leave": "bg-rose-100 text-rose-700", "Compensatory Leave": "bg-amber-100 text-amber-800", "Maternity Leave": "bg-pink-100 text-pink-700", "Manage Leave": "bg-violet-100 text-violet-700"};

const emptyLeave = (): NewLeave => ({ staffName: "", leaveType: "", fromDate: "", toDate: "", numberOfDays: 0, reason: "", attachmentFileName: "" });
const getDays = (from: string, to: string) => from && to ? Math.max(0, Math.floor((new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86400000) + 1) : 0;

const LeaveManagement: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [activeLeaveTab, setActiveLeaveTab] = useState<LeaveTab>("pending");
  const [pendingLeaves, setPendingLeaves] = useState(initialPending);
  const [rejectedLeaves, setRejectedLeaves] = useState(initialRejected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeave, setNewLeave] = useState<NewLeave>(emptyLeave);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEmployees = useMemo(() => employees.filter((employee) => {
    const queryMatches = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const employeeMatches = appliedFilters.employee === "All Employees" || employee.name === appliedFilters.employee;
    const departmentMatches = appliedFilters.department === "All Departments" || employee.department === appliedFilters.department;
    return queryMatches && employeeMatches && departmentMatches;
  }), [appliedFilters, searchQuery]);

  const requests = activeLeaveTab === "pending" ? pendingLeaves : rejectedLeaves;
  const filteredRequests = useMemo(() => requests.filter((request) => {
    const queryMatches = request.employee.toLowerCase().includes(searchQuery.toLowerCase());
    const employeeMatches = appliedFilters.employee === "All Employees" || request.employee === appliedFilters.employee;
    const departmentMatches = appliedFilters.department === "All Departments" || request.department === appliedFilters.department;
    return queryMatches && employeeMatches && departmentMatches;
  }), [appliedFilters, requests, searchQuery]);

  const updateLeave = (key: Exclude<keyof NewLeave, "numberOfDays">, value: string) => setNewLeave((current) => ({ ...current, [key]: value, ...(key === "fromDate" || key === "toDate" ? { numberOfDays: getDays(key === "fromDate" ? value : current.fromDate, key === "toDate" ? value : current.toDate) } : {}) }));
  const resetModal = () => { setNewLeave(emptyLeave()); setIsModalOpen(false); setIsDragging(false); };
  const selectFile = (file?: File) => { if (file) setNewLeave((current) => ({ ...current, attachmentFileName: file.name })); };
  const submitLeave = () => {
    if (!newLeave.staffName || !newLeave.leaveType || !newLeave.fromDate || !newLeave.toDate || !newLeave.reason) return;
    const employee = employees.find((item) => item.name === newLeave.staffName);
    if (!employee) return;
    setPendingLeaves((current) => [{ id: Date.now(), employee: employee.name, department: employee.department, leaveType: newLeave.leaveType as LeaveType, startDate: newLeave.fromDate, endDate: newLeave.toDate, days: newLeave.numberOfDays, status: "Pending", appliedOn: new Date().toISOString().slice(0, 10) }, ...current]);
    resetModal();
  };
  const deleteRequest = (id: number) => activeLeaveTab === "pending" ? setPendingLeaves((current) => current.filter((item) => item.id !== id)) : setRejectedLeaves((current) => current.filter((item) => item.id !== id));
  const resetFilters = () => { const next = { employee: "All Employees", department: "All Departments", month: "July", year: "2026", store: "All Stores" }; setFilters(next); setAppliedFilters(next); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <TopBar />
      <main className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Leave Applications</h2>
          <button type="button" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600"><Plus className="h-4 w-4" /> Add Leave Application</button>
        </div>
        <div className="mb-5 flex flex-wrap gap-4 text-xs text-slate-600">{legend.map(([label, color]) => <span key={label} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${color}`} />{label}</span>)}</div>

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100"><Search className="h-4 w-4 shrink-0 text-slate-400" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /></div>
            <button type="button" className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600">Search</button>
            <button type="button" onClick={() => setFiltersVisible((visible) => !visible)} className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-600"><Filter className="h-4 w-4" />{filtersVisible ? "Hide Filters" : "Show Filters"}</button>
          </div>
          {filtersVisible && <div className="mt-5 border-t border-slate-100 pt-4"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{(["employee", "department", "month", "year", "store"] as const).map((key) => <label key={key} className="relative block text-xs font-medium text-slate-500">{key[0].toUpperCase() + key.slice(1)}<select value={filters[key]} onChange={(event) => setFilters({ ...filters, [key]: event.target.value })} className="mt-1.5 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-normal text-slate-700 outline-none focus:border-green-500"><option>{key === "employee" ? "All Employees" : key === "department" ? "All Departments" : key === "month" ? "July" : key === "year" ? "2026" : "All Stores"}</option>{key === "employee" ? employees.map((employee) => <option key={employee.id}>{employee.name}</option>) : key === "department" ? [...new Set(employees.map((employee) => employee.department))].map((department) => <option key={department}>{department}</option>) : key === "month" ? ["June", "July", "August"].map((month) => <option key={month}>{month}</option>) : key === "year" ? ["2025", "2026", "2027"].map((year) => <option key={year}>{year}</option>) : <><option>Main Store</option><option>City Store</option><option>Airport Store</option></>} </select><ChevronDown className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 text-slate-400" /></label>)}</div><div className="mt-4 flex items-center justify-end gap-4"><button type="button" onClick={() => { setAppliedFilters(filters); setFiltersVisible(false); }} className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600">Apply Filters</button><button type="button" onClick={resetFilters} className="text-sm text-slate-500 hover:underline">Reset Filters</button></div></div>}
        </section>

        <section className="mb-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><div className="min-w-[1050px] p-3"><div className="grid grid-cols-[220px_repeat(31,minmax(25px,1fr))] border-b border-slate-100 text-center text-[10px] text-slate-500"><div className="px-2 py-2 text-left font-semibold">Employee</div>{Array.from({ length: 31 }, (_, index) => <div key={index} className="border-l border-slate-100 py-2">{index + 1}</div>)}</div>{filteredEmployees.length === 0 ? <div className="px-4 py-10 text-center text-sm text-slate-500">No results found</div> : filteredEmployees.map((employee) => { const leave = timelineLeaves.find((item) => item.employee === employee.name); return <div key={employee.id} className="grid grid-cols-[220px_repeat(31,minmax(25px,1fr))] items-center border-b border-slate-100 last:border-0"><div className="flex items-center gap-2 px-2 py-2"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${employee.color}`}>{employee.initials}</span><span className="min-w-0"><strong className="block truncate text-xs text-slate-700">{employee.name}</strong><small className="block truncate text-[10px] text-slate-400">{employee.role}</small></span></div><div className="relative col-span-31 grid h-11 grid-cols-31 items-center border-l border-slate-100" style={{ gridColumn: "2 / 33" }}>{leave && <span className={`z-10 mx-0.5 truncate rounded px-2 py-1 text-center text-[10px] font-semibold ${leaveColors[leave.leaveType]}`} style={{ gridColumn: `${leave.start} / ${leave.end + 1}` }}>{leave.leaveType}</span>}</div></div>; })}</div></section>

        <div className="mb-3 flex items-center gap-6 border-b border-slate-200"><button type="button" onClick={() => setActiveLeaveTab("pending")} className={`border-b-2 px-2 pb-3 text-sm font-semibold ${activeLeaveTab === "pending" ? "border-green-500 text-green-500" : "border-transparent text-slate-500"}`}>Pending Leaves</button><button type="button" onClick={() => setActiveLeaveTab("rejected")} className={`border-b-2 px-2 pb-3 text-sm ${activeLeaveTab === "rejected" ? "border-green-500 font-semibold text-green-500" : "border-transparent text-slate-500"}`}>Rejected Leaves</button><button type="button" className="ml-auto mb-2 flex items-center gap-2 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600"><Filter className="h-3.5 w-3.5" /> Filters</button></div>
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[1050px] border-collapse text-xs"><thead><tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] font-bold uppercase text-slate-500"><th className="px-3 py-3">#</th><th className="px-3 py-3">Employee</th><th className="px-3 py-3">Leave Type</th><th className="px-3 py-3">Start Date</th><th className="px-3 py-3">End Date</th><th className="px-3 py-3">Days</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Applied On</th><th className="px-3 py-3">Actions</th></tr></thead><tbody>{filteredRequests.length === 0 ? <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-500">No results found</td></tr> : filteredRequests.map((request, index) => { const employee = employees.find((item) => item.name === request.employee); return <tr key={request.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50"><td className="px-3 py-3">{index + 1}</td><td className="px-3 py-3"><div className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${employee?.color || "bg-slate-100 text-slate-700"}`}>{employee?.initials}</span><span><strong className="block text-slate-700">{request.employee}</strong><small className="text-[10px] text-slate-400">{request.department}</small></span></div></td><td className="px-3 py-3">{request.leaveType}</td><td className="px-3 py-3">{request.startDate}</td><td className="px-3 py-3">{request.endDate}</td><td className="px-3 py-3">{request.days}</td><td className="px-3 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${request.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{request.status}</span></td><td className="px-3 py-3">{request.appliedOn}</td><td className="px-3 py-3"><div className="flex items-center gap-2"><button type="button" aria-label={`View ${request.employee}`} onClick={() => window.alert(`${request.employee} — ${request.leaveType}`)} className="text-slate-500 hover:text-slate-900"><Eye className="h-3.5 w-3.5" /></button><button type="button" aria-label={`Edit ${request.employee}`} onClick={() => console.log("Edit leave", request.id)} className="text-slate-500 hover:text-slate-900"><Pencil className="h-3.5 w-3.5" /></button><button type="button" aria-label={`Delete ${request.employee}`} onClick={() => deleteRequest(request.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /></button></div></td></tr>; })}</tbody></table></section>
      </main>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4"><div className="absolute inset-0 backdrop-blur-sm" onClick={resetModal} /><section className="relative z-10 w-full max-w-[500px] rounded-2xl bg-white p-4 shadow-xl sm:p-6"><header className="mb-5 border-b border-slate-100 pb-4"><button type="button" onClick={resetModal} className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-4 w-4" /></button><h3 className="text-base font-bold text-slate-900">Add Leave Application</h3><p className="mt-1 text-xs text-slate-400">Submit a leave request for manager approval.</p></header><div className="space-y-4"><label className="block text-xs font-bold text-slate-700">Staff Name *<select value={newLeave.staffName} onChange={(event) => updateLeave("staffName", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-green-500"><option value="">Select staff name</option>{employees.map((employee) => <option key={employee.id}>{employee.name}</option>)}</select></label><label className="block text-xs font-bold text-slate-700">Leave Type *<select value={newLeave.leaveType} onChange={(event) => updateLeave("leaveType", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-green-500"><option value="">Select leave type</option>{leaveTypes.map((type) => <option key={type}>{type}</option>)}</select></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-slate-700">From Date *<input type="date" value={newLeave.fromDate} onChange={(event) => updateLeave("fromDate", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-green-500" /></label><label className="block text-xs font-bold text-slate-700">To Date *<input type="date" value={newLeave.toDate} onChange={(event) => updateLeave("toDate", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-green-500" /></label></div><label className="block text-xs font-bold text-slate-700">Number of Days<input readOnly value={`${newLeave.numberOfDays} Days`} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-500" /></label><label className="block text-xs font-bold text-slate-700">Reason *<textarea value={newLeave.reason} onChange={(event) => updateLeave("reason", event.target.value)} rows={4} placeholder="Describe the reason for your leave..." className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-green-500" /></label><div><div className="mb-1.5 text-xs font-bold text-slate-700">Attachment <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-normal text-slate-500">Optional</span></div><button type="button" onClick={() => fileInputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); selectFile(event.dataTransfer.files[0]); }} className={`w-full rounded-lg border-2 border-dashed p-5 text-center ${isDragging ? "border-green-500 bg-green-50" : "border-slate-300 bg-slate-50"}`}><Camera className="mx-auto h-5 w-5 text-slate-400" /><strong className="mt-1 block text-xs text-slate-700">{newLeave.attachmentFileName || "Upload Document"}</strong><span className="mt-1 block text-[10px] text-slate-400">Drag &amp; Drop or click to browse</span></button><input ref={fileInputRef} type="file" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} /></div></div><footer className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={resetModal} className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button><button type="button" onClick={submitLeave} className="rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600">Submit Application</button></footer></section></div>}
    </div>
  );
};

export default LeaveManagement;
