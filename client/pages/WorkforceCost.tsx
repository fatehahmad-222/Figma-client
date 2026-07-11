import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Calendar, Search, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function WorkforceCost() {
  const navigate = useNavigate();
  const [showAmounts, setShowAmounts] = useState(true);
  const [filters, setFilters] = useState({
    employee: "All Employees",
    department: "All Departments",
    month: "July",
    year: "2026",
    store: "All Stores",
  });

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
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Singh Hotel <span className="text-gray-400">/</span> <span className="text-gray-600">Master Catalogue</span>
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">🔔</button>
            <button className="text-gray-600 hover:text-gray-900">⚙️</button>
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8">
          <div className="flex gap-8">
            <button
              onClick={() => navigate("/")}
              className="py-4 font-medium text-sm border-b-2 border-transparent text-gray-600 hover:text-gray-900"
            >
              Employees
            </button>
            <button className="py-4 font-medium text-sm border-b-2 border-green-600 text-green-600">
              Workforce Cost
            </button>
            <button className="py-4 font-medium text-sm border-b-2 border-transparent text-gray-600 hover:text-gray-900">
              Attendance
            </button>
            <button className="py-4 font-medium text-sm border-b-2 border-transparent text-gray-600 hover:text-gray-900">
              Leave Management
            </button>
            <button className="py-4 font-medium text-sm border-b-2 border-transparent text-gray-600 hover:text-gray-900">
              Timesheet
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Filter by Department
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Calendar size={16} />
            June 01 - June 30
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Cost Breakdown Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
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
          <div className="flex gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">Search</button>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">Hide Filters</button>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>All Employees</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>All Departments</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>July</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>2026</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>All Stores</option>
            </select>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">Apply Filters</button>
            <button className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg text-sm font-medium">Reset Filters</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Base Salary</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Overtime</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Allowances</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Cost</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium text-sm">{emp.name}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{emp.role}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{emp.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{emp.baseSalary}</span>
                        <Eye size={16} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">{emp.overtime}</span>
                        <Eye size={16} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{emp.allowances}</span>
                        <Eye size={16} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{emp.totalCost}</span>
                        <Eye size={16} className="text-gray-400" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <Eye size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <Pencil size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <Trash2 size={16} className="text-red-400 hover:text-red-600 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Monthly Cost Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Departmental Cost</h3>
            <div className="space-y-5">
              {departmentalCostData.map((dept, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: "60%", backgroundColor: dept.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
