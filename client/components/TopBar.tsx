import { Bell, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Employees", path: "/" },
  { label: "Workforce Cost", path: "/workforce-cost" },
  { label: "Attendance", path: "/attendance" },
  { label: "Leave Management", path: "/leave-management" },
  { label: "Timesheet" },
];

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Singh Hotel <span className="text-gray-400">/</span>{" "}
            <span className="text-gray-600">Master Catalogue</span>
          </h1>
          <div className="flex items-center gap-4">
            <button aria-label="Notifications" className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button aria-label="Settings" className="text-gray-600 hover:text-gray-900">
              <Settings size={20} />
            </button>
            <button aria-label="User profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const isActive = tab.path === location.pathname;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => tab.path && navigate(tab.path)}
                  className={`py-4 font-medium text-sm border-b-2 transition-colors ${
                    isActive
                      ? "text-green-600 border-green-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
