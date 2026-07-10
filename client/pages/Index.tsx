import { useState } from "react";
import { Bell, Settings, User, Plus, MessageSquare, Users, Target, TrendingUp, Tag, Search, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Index() {
  const [activeTab, setActiveTab] = useState("Employees");

  const tabs = ["Employees", "Workforce Cost", "Attendance", "Leave Management", "Timesheet"];

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
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Singh Hotel <span className="text-gray-400">/</span> <span className="text-gray-600">Master Catalogue</span>
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings size={20} />
            </button>
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-green-600 border-green-600"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            Add Employee
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Calendar size={16} />
            Create Leave Request
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Users size={16} />
            Add Department
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Target size={16} />
            Add Designation
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <TrendingUp size={16} />
            Attendance Summary
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Tag size={16} />
            Leave Types
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-medium mb-2">Monthly Cost Summary</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹ 4,25,000</div>
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <span>▲ 2.4% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-medium mb-4">Total Employees</div>
            <div className="flex items-start justify-between">
              <div className="text-3xl font-bold text-gray-900">42</div>
              <Users className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-medium mb-4">Present Today</div>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">38</div>
                <div className="text-gray-600 text-xs mt-1">↑ 5% from yesterday</div>
              </div>
              <div className="text-green-500 text-2xl">✓</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm font-medium mb-4">On Leave</div>
            <div className="flex items-start justify-between">
              <div className="text-3xl font-bold text-gray-900">4</div>
              <Calendar className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
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
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-900">Today's Attendance</h2>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">Export CSV</button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 border border-gray-300 rounded-lg px-4 py-2 bg-white">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <Calendar size={16} className="text-gray-400" />
              <span className="text-gray-500 text-xs">Jan 01 - Jan 31</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Shift</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Work Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium text-sm">{emp.name}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.role}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.department}</td>
                      <td className="py-3 px-4">
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
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.shift}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.checkIn}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.checkOut}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{emp.duration}</td>
                      <td className="py-3 px-4">
                        <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded text-sm font-medium transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All 42 Employees</button>
            </div>
          </div>
        </div>

        {/* Below Attendance - 3 Column Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Upcoming Leaves + System Alert */}
          <div className="space-y-6">
            {/* Upcoming Leaves */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Upcoming Leaves</h3>
              <div className="space-y-4">
                {upcomingLeaves.map((leave, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${leave.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-900">{leave.name}</div>
                      <div className="text-xs text-gray-600">{leave.role}</div>
                      <div className="text-xs text-gray-500 mt-1">{leave.dates}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-gray-600 hover:text-gray-900 text-xs font-medium py-2">View All</button>
            </div>

            {/* System Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-yellow-900 mb-2">System Alert</h4>
              <p className="text-xs text-yellow-800 leading-relaxed">
                3 staff members are on leave during the peak weekend (Oct 12). Check coverage.
              </p>
            </div>
          </div>

          {/* Middle Column - Monthly Trend Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-semibold text-gray-900">Monthly trend</h3>
              <span className="text-xs text-gray-500">Jan - Jun</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "11px" }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? "#22c55e" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Right Column - Departmental Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-900 mb-4">Departmental breakdown</h3>
            <div className="space-y-4">
              {departmentData.map((dept, idx) => (
                <div key={idx} className="flex justify-between items-end gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-900">{dept.name}</span>
                      <span className="text-xs text-gray-600">{dept.amount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${75 + idx * 10}%`, backgroundColor: dept.color }} />
                    </div>
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
