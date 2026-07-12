import { Bell, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Employees", path: "/" },
  { label: "Workforce Cost", path: "/workforce-cost" },
  { label: "Attendance", path:"/attendance" },
  { label: "Leave Management", path:"/leave-management" },
  { label: "Timesheet" },
];

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <h1 className="min-w-0 truncate text-sm font-semibold text-gray-900 sm:text-lg">
            Singh Hotel <span className="text-gray-400">/</span>{" "}
            <span className="text-gray-600">Master Catalogue</span>
          </h1>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <button aria-label="Notifications" className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button aria-label="Settings" className="text-gray-600 hover:text-gray-900">
              <Settings size={20} />
            </button>
            <button onClick={() => navigate("/employee-profile")} aria-label="User profile" className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-1 ring-slate-300 transition hover:ring-emerald-500" />
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max gap-5 sm:gap-8">
            {tabs.map((tab) => {
              const isActive = tab.path === location.pathname;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => tab.path && navigate(tab.path)}
                  className={`whitespace-nowrap py-3 text-sm font-medium border-b-2 transition-colors sm:py-4 ${
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
