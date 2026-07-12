import { useState } from "react";
import { Download, Calendar, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function WorkforceCost() {
  const [showAmounts, setShowAmounts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    employee: "All Employees",
    department: "All Departments",
    month: "July",
    year: "2026",
    store: "All Stores",
  });
  const [showFilters, setShowFilters] = useState(true);

  const monthlyTrendData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 60 },
    { month: "May", value: 50 },
    { month: "Jun", value: 65 },
  ];

  const departmentalCostData = [
    { name: "Kitchen", amount: "₹ 1,80,000", color: "#22c55e" },
    { name: "FOH", amount: "₹ 1,20,000", color: "#3b82f6" },
    { name: "Management", amount: "₹ 65,000", color: "#f59e0b" },
    { name: "Bar", amount: "₹ 60,000", color: "#ef4444" },
  ];

  const employees = [
    {
      id: 1,
      name: "Arjun Singh",
      role: "General Manager",
      department: "Management",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Executive Chef",
      department: "Kitchen",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 3,
      name: "Vikram Rao",
      role: "Senior Waiter",
      department: "FOH",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 4,
      name: "Sanya Malhotra",
      role: "Lead Bartender",
      department: "Bar",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 5,
      name: "Rohan Gupta",
      role: "Sous Chef",
      department: "Kitchen",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 6,
      name: "Ananya Das",
      role: "Receptionist",
      department: "FOH",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 7,
      name: "Rahul Verma",
      role: "Bartender",
      department: "Bar",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 8,
      name: "Meena Patel",
      role: "Housekeeping",
      department: "Operations",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 9,
      name: "Suresh Kumar",
      role: "Line Cook",
      department: "Kitchen",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
    {
      id: 10,
      name: "Kavitha Nair",
      role: "Front Desk",
      department: "FOH",
      baseSalary: "•••••",
      overtime: "•••••",
      allowances: "•••••",
      totalCost: "•••••",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            Filter by Department
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Calendar size={16} />
            June 01 - June 30
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Cost Breakdown Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Cost Breakdown</h2>
            <div
              onClick={() => setShowAmounts(!showAmounts)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm cursor-pointer"
            >
              <span>Show Amounts</span>
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showAmounts ? "bg-green-500" : "bg-gray-300"}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${showAmounts ? "translate-x-6" : "translate-x-1"}`} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
            <button className="rounded-lg border border-green-500 px-6 py-2 text-sm font-medium text-green-600 hover:bg-green-50">Search</button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <>
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <select
                  value={filters.employee}
                  onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>All Employees</option>
                </select>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>All Departments</option>
                  <option>Kitchen</option>
                  <option>FOH</option>
                  <option>Bar</option>
                  <option>Management</option>
                  <option>Operations</option>
                </select>
                <select
                  value={filters.month}
                  onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>July</option>
                  <option>June</option>
                  <option>May</option>
                  <option>April</option>
                  <option>March</option>
                  <option>February</option>
                  <option>January</option>
                </select>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <select
                  value={filters.store}
                  onChange={(e) => setFilters({ ...filters, store: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>All Stores</option>
                  <option>Store 1</option>
                  <option>Store 2</option>
                </select>
              </div>

              {/* Filter Buttons */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <button className="rounded-lg border border-green-500 px-6 py-2 text-sm font-medium text-green-600 hover:bg-green-50">Apply Filters</button>
                <button
                  onClick={() => {
                    setFilters({
                      employee: "All Employees",
                      department: "All Departments",
                      month: "July",
                      year: "2026",
                      store: "All Stores",
                    });
                    setSearchTerm("");
                  }}
                  className="rounded-lg border border-green-500 px-6 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
                >
                  Reset Filters
                </button>
              </div>
            </>
          )}

          {/* Table */}
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Employee</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Role</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Department</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Base Salary</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Overtime</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Allowances</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Total Cost</th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-semibold text-gray-700 sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((emp) =>
                    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900 sm:px-4">{emp.name}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.role}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600 sm:px-4">{emp.department}</td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{emp.baseSalary}</span>
                          <Eye size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">{emp.overtime}</span>
                          <Eye size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{emp.allowances}</span>
                          <Eye size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{emp.totalCost}</span>
                          <Eye size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-3">
                          <Eye size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                          <Pencil size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                          <Trash2 size={16} className="text-red-500 hover:text-red-700 cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Monthly Cost Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Monthly Cost Trend</h3>
              <span className="text-xs text-gray-500">Jan - Jun 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyTrendData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "11px" }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={20}>
                  {monthlyTrendData.map((entry, index) => {
                    const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#22c55e", "#3b82f6", "#22c55e"];
                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Departmental Cost */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Departmental Cost</h3>
            <div className="space-y-5">
              {departmentalCostData.map((dept, idx) => {
                const amounts = [180000, 120000, 65000, 60000];
                const maxAmount = 180000;
                const width = (amounts[idx] / maxAmount) * 60;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                      <span className="text-sm text-gray-600">{dept.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${width}%`, backgroundColor: dept.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
