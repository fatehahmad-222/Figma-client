import { useState } from "react";
import { Plus, Users, Target, TrendingUp, Tag, Search, Calendar } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");

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
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Plus size={16} />
            Add Employee
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Calendar size={16} />
            Create Leave Request
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Users size={16} />
            Add Department
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <Target size={16} />
            Add Designation
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
            <TrendingUp size={16} />
            Attendance Summary
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
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
    </div>
  );
}
