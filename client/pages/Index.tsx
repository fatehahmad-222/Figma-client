import { useState, type FormEvent } from "react";
import { Check, ChevronDown, Plus, Users, Target, TrendingUp, Tag, Search, Calendar, Camera, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

type ModalStatus = "Active" | "Inactive";

const departmentsList = ["Kitchen", "Front of House", "Housekeeping", "Bar", "Management"];
const storesList = ["Main Store", "City Store", "Airport Store"];
const colorTags = ["green", "blue", "amber", "red", "purple", "pink"] as const;
const colorClasses: Record<(typeof colorTags)[number], string> = { green: "bg-green-500", blue: "bg-blue-500", amber: "bg-amber-500", red: "bg-red-500", purple: "bg-purple-500", pink: "bg-pink-500" };

function ModalSelect({ value, onChange, placeholder, children }: { value: string; onChange: (value: string) => void; placeholder?: string; children: React.ReactNode }) {
  return <div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className={`w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 ${value ? "text-slate-800" : "text-slate-400"}`}><option value="">{placeholder}</option>{children}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" /></div>;
}

function StatusRadios({ status, onChange }: { status: ModalStatus; onChange: (status: ModalStatus) => void }) {
  return <div className="flex gap-6"><button type="button" onClick={() => onChange("Active")} className="flex items-center gap-2 text-sm font-semibold text-slate-800"><span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${status === "Active" ? "border-green-600" : "border-slate-300"}`}>{status === "Active" && <span className="h-2.5 w-2.5 rounded-full bg-green-600" />}</span>Active</button><button type="button" onClick={() => onChange("Inactive")} className="flex items-center gap-2 text-sm text-slate-500"><span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${status === "Inactive" ? "border-green-600" : "border-slate-300"}`}>{status === "Inactive" && <span className="h-2.5 w-2.5 rounded-full bg-green-600" />}</span>Inactive</button></div>;
}

function ModalShell({ title, subtitle, onClose, children, scrollable = true }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode; scrollable?: boolean }) {
  return <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"><div className="absolute inset-0 backdrop-blur-sm" /><section onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" className={`relative z-10 w-full max-w-[460px] rounded-2xl bg-white shadow-xl ${scrollable ? "max-h-[calc(100vh-2rem)] overflow-y-auto" : ""}`}><header className="relative border-b border-slate-100 px-6 pb-4 pt-6 sm:px-7"><button type="button" onClick={onClose} aria-label="Close modal" className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></header>{children}</section></div>;
}

function DepartmentModal({ departments, onClose, onAdd }: { departments: string[]; onClose: () => void; onAdd: (name: string) => void }) {
  const [form, setForm] = useState({ existingDepartment: "", name: "", code: "", store: "Main Store", parentDepartment: "", colorTag: "green", description: "", status: "Active" as ModalStatus });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (!form.name.trim() || !form.store) return; onAdd(form.name.trim()); };
  return <ModalShell title="Add Department" subtitle="Set up a new department and assign it to a store." onClose={onClose}><form onSubmit={submit} className="px-6 pb-6 pt-5 sm:px-7"><label className="block text-sm font-bold text-slate-800">Department<ModalSelect value={form.existingDepartment} onChange={(value) => update("existingDepartment", value)} placeholder="Select department">{departments.map((department) => <option key={department}>{department}</option>)}</ModalSelect></label><div className="my-6 flex items-center gap-3 text-sm font-bold text-slate-700"><span className="h-px flex-1 bg-slate-200" /><span className="whitespace-nowrap bg-white px-1">Or Create new Department</span><span className="h-px flex-1 bg-slate-200" /></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-800">Department Name <span className="text-red-500">*</span><input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Kitchen" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-600" /></label><label className="block text-sm font-bold text-slate-800">Department Code<input value={form.code} onChange={(event) => update("code", event.target.value)} placeholder="e.g. KIT, FOH, BAR" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-600" /></label></div><label className="mt-5 block text-sm font-bold text-slate-800">Store <span className="text-red-500">*</span><ModalSelect value={form.store} onChange={(value) => update("store", value)}>{storesList.map((store) => <option key={store}>{store}</option>)}</ModalSelect></label><label className="mt-5 block text-sm font-bold text-slate-800">Parent Department<ModalSelect value={form.parentDepartment} onChange={(value) => update("parentDepartment", value)} placeholder="Select parent department - optional">{departments.map((department) => <option key={department}>{department}</option>)}</ModalSelect></label><fieldset className="mt-5"><legend className="mb-2 text-sm font-bold text-slate-800">Color Tag</legend><div className="flex gap-3">{colorTags.map((color) => <button type="button" key={color} onClick={() => update("colorTag", color)} className={`flex h-9 w-9 items-center justify-center rounded-full ${colorClasses[color]}`}>{form.colorTag === color && <Check className="h-5 w-5 text-white" />}</button>)}</div></fieldset><label className="mt-5 block text-sm font-bold text-slate-800">Description<textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows={4} placeholder="Enter a brief description of the department's responsibilities..." className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-600" /></label><fieldset className="mt-5 border-t border-slate-100 pt-4"><legend className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Status</legend><StatusRadios status={form.status} onChange={(status) => update("status", status)} /></fieldset><div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Add Department</button></div></form></ModalShell>;
}

function DesignationModal({ departments, designations, onClose, onAdd }: { departments: string[]; designations: string[]; onClose: () => void; onAdd: (name: string) => void }) {
  const [form, setForm] = useState({ existingDesignation: "", name: "", department: "", description: "", status: "Active" as ModalStatus });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (!form.name.trim() || !form.department) return; onAdd(form.name.trim()); };
  return <ModalShell title="Add Designation" subtitle="Create a new designation to assign roles across departments." onClose={onClose}><form onSubmit={submit} className="px-6 pb-6 pt-5 sm:px-7"><label className="block text-sm font-bold text-slate-800">Designation<ModalSelect value={form.existingDesignation} onChange={(value) => update("existingDesignation", value)} placeholder="Select department">{designations.map((designation) => <option key={designation}>{designation}</option>)}</ModalSelect></label><div className="my-6 flex items-center gap-3 text-sm font-bold text-slate-700"><span className="h-px flex-1 bg-slate-200" /><span className="whitespace-nowrap bg-white px-1">Or Create new Designation</span><span className="h-px flex-1 bg-slate-200" /></div><label className="block text-sm font-bold text-slate-800">Designation Name <span className="text-red-500">*</span><input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Senior Waiter" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-600" /></label><label className="mt-5 block text-sm font-bold text-slate-800">Department <span className="text-red-500">*</span><ModalSelect value={form.department} onChange={(value) => update("department", value)} placeholder="Select department">{departments.map((department) => <option key={department}>{department}</option>)}</ModalSelect></label><label className="mt-5 block text-sm font-bold text-slate-800">Description <span className="font-normal text-slate-500">— Optional</span><textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows={4} placeholder="Brief description of responsibilities" className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-600" /></label><fieldset className="mt-5 border-t border-slate-100 pt-4"><legend className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Status</legend><StatusRadios status={form.status} onChange={(status) => update("status", status)} /></fieldset><div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Add Designation</button></div></form></ModalShell>;
}

export default function Index() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
  const [departments, setDepartments] = useState(departmentsList);
  const [designations, setDesignations] = useState(["Senior Waiter", "Sous Chef", "Front Desk Manager", "Housekeeping Supervisor"]);

  const monthlyData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 60 },
    { month: "May", value: 50 },
    { month: "Jun", value: 65 },
  ];

  const departmentData = [
    { name: "Kitchen", amount: "₹ 1,80,000", color: "#22c55e" },
    { name: "FOH", amount: "₹ 1,20,000", color: "#3b82f6" },
    { name: "Management", amount: "₹ 1,25,000", color: "#f59e0b" },
  ];

  const employees = [
    {
      id: 1,
      name: "Arjun Singh",
      role: "General Manager",
      department: "Management",
      status: "Active",
      shift: "Morning",
      checkIn: "9:00 AM",
      checkOut: "5:00 PM",
      duration: "8 hrs",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Executive Chef",
      department: "Kitchen",
      status: "Active",
      shift: "Morning",
      checkIn: "8:00 AM",
      checkOut: "4:00 PM",
      duration: "8 hrs",
    },
    {
      id: 3,
      name: "Vikram Rao",
      role: "Senior Waiter",
      department: "Front of House",
      status: "Active",
      shift: "Evening",
      checkIn: "4:00 PM",
      checkOut: "11:00 PM",
      duration: "7 hrs",
    },
    {
      id: 4,
      name: "Sanya Malhotra",
      role: "Lead Bartender",
      department: "Bar",
      status: "On Leave",
      shift: "Night",
      checkIn: "8:00 PM",
      checkOut: "2:00 AM",
      duration: "6 hrs",
    },
    {
      id: 5,
      name: "Rohan Gupta",
      role: "Sous Chef",
      department: "Kitchen",
      status: "Active",
      shift: "Night",
      checkIn: "7:00 PM",
      checkOut: "1:00 AM",
      duration: "6 hrs",
    },
    {
      id: 6,
      name: "Ananya Das",
      role: "Receptionist",
      department: "Front of House",
      status: "Active",
      shift: "Morning",
      checkIn: "8:30 AM",
      checkOut: "4:30 PM",
      duration: "8 hrs",
    },
  ];

  const upcomingLeaves = [
    { name: "Sanya Malhotra", role: "Bartender", dates: "Sep 24 - 26", color: "from-amber-400 to-amber-600" },
    { name: "Vikram Rao", role: "Senior Waiter", dates: "Oct 02 - 05", color: "from-blue-400 to-blue-600" },
    { name: "Priya Sharma", role: "Executive Chef", dates: "Oct 10 - 12", color: "from-gray-400 to-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setIsAddEmployeeOpen(true)} type="button" className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Plus size={16} />
            Add Employee
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Calendar size={16} />
            Create Leave Request
          </button>
          <button onClick={() => setIsDepartmentModalOpen(true)} type="button" className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Users size={16} />
            Add Department
          </button>
          <button onClick={() => setIsDesignationModalOpen(true)} type="button" className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Target size={16} />
            Add Designation
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <TrendingUp size={16} />
            Attendance Summary
          </button>
          <button onClick={() => navigate("/leave-management/leave-types")} className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Tag size={16} />
            Leave Types
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">Monthly Cost Summary</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹ 4,25,000</div>
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <span>▲ 2.4% vs last month</span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="text-gray-600 text-sm font-medium mb-4">Total Employees</div>
            <div className="flex items-start justify-between">
              <div className="text-3xl font-bold text-gray-900">42</div>
              <Users className="text-green-500" size={24} />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="text-gray-600 text-sm font-medium mb-4">Present Today</div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">38</div>
                <div className="text-gray-600 text-xs mt-1">↑ 5% from yesterday</div>
              </div>
              <div className="text-green-500 text-2xl">✓</div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="text-gray-600 text-sm font-medium mb-4">On Leave</div>
            <div className="flex items-start justify-between">
              <div className="text-3xl font-bold text-gray-900">4</div>
              <Calendar className="text-green-500" size={24} />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <div className="text-gray-600 text-sm font-medium mb-4">New This Month</div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">2</div>
                <div className="text-green-600 text-xs mt-1">Joining next week</div>
              </div>
              <Users className="text-green-500" size={24} />
            </div>
          </div>
        </div>

        {/* Attendance Section - Full Width */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <h2 className="text-base font-semibold text-gray-900">Today's Attendance</h2>
            <button className="rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50">Export CSV</button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 sm:px-4">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <Calendar size={16} className="text-gray-400" />
              <span className="ml-auto text-xs text-gray-500">Jan 01 - Jan 31</span>
            </div>

            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Name</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Role</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Department</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Status</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Shift</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Check In</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Check Out</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Work Duration</th>
                    <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees
                    .filter((employee) =>
                      [employee.name, employee.role, employee.department].some((value) =>
                        value.toLowerCase().includes(searchTerm.toLowerCase()),
                      ),
                    )
                    .map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:px-4">{emp.name}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.role}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.department}</td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            emp.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.shift}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.checkIn}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.checkOut}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.duration}</td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <button className="rounded border border-green-500 px-3 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button className="rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50">View All 42 Employees</button>
            </div>
          </div>
        </div>

        {/* Below Attendance - Layout with Upcoming Leaves (narrow) and Monthly Trend (wide) */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Upcoming Leaves (narrow - about 25% width) */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 lg:col-span-3">
            <h3 className="text-xs font-semibold text-gray-900 mb-3">Upcoming Leaves</h3>
            <div className="space-y-2">
              {upcomingLeaves.map((leave, idx) => (
                <div key={idx} className="flex items-start gap-2 pb-2 border-b border-gray-100 last:border-0">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${leave.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-900 leading-tight">{leave.name}</div>
                    <div className="text-xs text-gray-600">{leave.role}</div>
                    <div className="text-xs text-gray-500">{leave.dates}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-2 w-full border-t border-gray-100 py-1 text-xs font-medium text-green-600 hover:text-green-700">
              View All
            </button>

            {/* System Alert inside leaves card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
              <h4 className="text-xs font-semibold text-yellow-900 mb-1">System Alert</h4>
              <p className="text-xs text-yellow-800 leading-tight">
                3 staff members are on leave during the peak weekend (Oct 12). Check coverage.
              </p>
            </div>
          </div>

          {/* Right Column - Monthly Trend and Departmental Breakdown (wide) */}
          <div className="space-y-6 lg:col-span-9">
            {/* Monthly Trend Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold text-gray-900">Monthly trend</h3>
                <span className="text-xs text-gray-500">Jan - Jun</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={monthlyData} margin={{ top: 0, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "11px" }}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={20}>
                    {monthlyData.map((entry, index) => {
                      const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#22c55e", "#3b82f6", "#22c55e"];
                      return <Cell key={`cell-${index}`} fill={colors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Departmental Breakdown - In One Row (No Card) */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-3">Departmental breakdown</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {departmentData.map((dept, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-900">{dept.name}</span>
                      <span className="text-xs text-gray-600">{dept.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: "20%", backgroundColor: dept.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDepartmentModalOpen && <DepartmentModal departments={departments} onClose={() => setIsDepartmentModalOpen(false)} onAdd={(name) => { setDepartments((current) => [...current, name]); setIsDepartmentModalOpen(false); }} />}
      {isDesignationModalOpen && <DesignationModal departments={departments} designations={designations} onClose={() => setIsDesignationModalOpen(false)} onAdd={(name) => { setDesignations((current) => [...current, name]); setIsDesignationModalOpen(false); }} />}

      {isAddEmployeeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-[2px] sm:p-6">
          <form onSubmit={(event) => { event.preventDefault(); setIsAddEmployeeOpen(false); }} className="max-h-[calc(100vh-1rem)] w-full max-w-[720px] overflow-y-auto rounded-2xl bg-white shadow-2xl sm:max-h-none sm:overflow-visible">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-3 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add Employee</h2>
                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">Create a basic employee profile. Additional details such as payroll, tax, bank information, and documents can be completed later.</p>
              </div>
              <button onClick={() => setIsAddEmployeeOpen(false)} type="button" aria-label="Close modal" className="ml-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button>
            </div>

            <div className="px-5 py-3 sm:px-7">
              <label className="mx-auto flex w-fit cursor-pointer flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-slate-200 bg-slate-50 text-slate-400"><Camera className="h-5 w-5" /></span>
                <span className="mt-2 text-xs font-semibold text-slate-800">Upload Photo</span>
                <span className="mt-0.5 text-[11px] text-slate-400">{photoName || "Drag & Drop · Optional"}</span>
                <input onChange={(event) => setPhotoName(event.target.files?.[0]?.name || "")} type="file" accept="image/*" className="sr-only" />
              </label>

              <section className="mt-3">
                <h3 className="border-b border-slate-100 pb-2 text-[11px] font-semibold uppercase text-slate-500">Personal Information</h3>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="relative block text-xs font-semibold text-slate-700 sm:col-span-2">Employee ID <span className="text-rose-500">*</span><input defaultValue="EMP-0043" required className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" /><Pencil className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-400" /></label>
                  <label className="block text-xs font-semibold text-slate-700">First Name <span className="text-rose-500">*</span><input required placeholder="Enter first name" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100" /></label>
                  <label className="block text-xs font-semibold text-slate-700">Last Name <span className="text-rose-500">*</span><input required placeholder="Enter last name" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100" /></label>
                  <label className="block text-xs font-semibold text-slate-700">Email Address <span className="text-rose-500">*</span><input required type="email" placeholder="example@zyappy.com" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100" /></label>
                  <label className="block text-xs font-semibold text-slate-700">Mobile Number <span className="text-rose-500">*</span><input required type="tel" placeholder="+91 00000 00000" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100" /></label>
                </div>
              </section>

              <section className="mt-3">
                <h3 className="border-b border-slate-100 pb-2 text-[11px] font-semibold uppercase text-slate-500">Employment Information</h3>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-slate-700">Store <span className="text-rose-500">*</span><select required defaultValue="Main Store" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-700 outline-none focus:border-green-500"><option>Main Store</option><option>City Store</option><option>Airport Store</option></select></label>
                  <label className="block text-xs font-semibold text-slate-700">Department <span className="text-rose-500">*</span><select required defaultValue="" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-green-500"><option value="" disabled>Select department</option><option>Management</option><option>Kitchen</option><option>Front of House</option><option>Bar</option></select></label>
                  <label className="block text-xs font-semibold text-slate-700">Role / Designation <span className="text-rose-500">*</span><select required defaultValue="" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-green-500"><option value="" disabled>Select role</option><option>General Manager</option><option>Executive Chef</option><option>Senior Waiter</option></select></label>
                  <fieldset><legend className="text-xs font-semibold text-slate-700">Employment Type <span className="text-rose-500">*</span></legend><div className="mt-1.5 grid grid-cols-4 overflow-hidden rounded-lg border border-slate-200 text-center text-xs font-medium">{["Full Time", "Part Time", "Hourly", "Contract"].map((type, index) => <label key={type} className={`cursor-pointer px-1 py-2 ${index < 3 ? "border-r border-slate-200" : ""} ${employmentType === type ? "bg-green-500 text-white" : "bg-white text-slate-700 hover:bg-green-50"}`}><input checked={employmentType === type} onChange={() => setEmploymentType(type)} type="radio" name="employmentType" value={type} className="sr-only" />{type}</label>)}</div></fieldset>
                  <label className="block text-xs font-semibold text-slate-700">Shift<select defaultValue="" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-green-500"><option value="">Select shift</option><option>Morning Shift</option><option>Evening Shift</option><option>Night Shift</option></select></label>
                  <label className="block text-xs font-semibold text-slate-700">Date of Joining <span className="text-rose-500">*</span><input required type="date" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-green-500" /></label>
                  <label className="block text-xs font-semibold text-slate-700">Reporting Manager<select defaultValue="" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-500 outline-none focus:border-green-500"><option value="">Select manager</option><option>Rajesh Kumar</option><option>Arjun Singh</option></select></label>
                  <label className="block text-xs font-semibold text-slate-700">POS PIN <span className="font-normal text-slate-400">Optional</span><input placeholder="Enter POS PIN" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-green-500" /></label>
                </div>
              </section>

              <fieldset className="mt-3 border-t border-slate-100 pt-3"><legend className="text-[11px] font-semibold uppercase text-slate-500">Status</legend><div className="mt-1 flex items-center gap-4 text-xs text-slate-700"><label className="flex cursor-pointer items-center gap-2"><input defaultChecked type="radio" name="status" value="active" className="accent-green-500" />Active</label><label className="flex cursor-pointer items-center gap-2"><input type="radio" name="status" value="inactive" className="accent-green-500" />Inactive</label></div></fieldset>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-5 py-2.5 sm:px-7"><button onClick={() => setIsAddEmployeeOpen(false)} type="button" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button><button type="submit" className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600">Add Employee</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
