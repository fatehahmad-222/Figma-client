import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkforceCost from "./pages/WorkforceCost";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import LeaveTypes from "./pages/LeaveTypes";
import Timesheet from "./pages/Timesheet";
import TimesheetDetail from "./pages/TimesheetDetail";
import EmployeeProfile from "./pages/EmployeeProfile";
import Compensation from "./pages/Compensation";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import EmployeeLeave from "./pages/EmployeeLeave";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workforce-cost" element={<WorkforceCost />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/leave-management/leave-types" element={<LeaveTypes />} />
          <Route path="/timesheet" element={<Timesheet />} />
          <Route path="/timesheet/:employeeId" element={<TimesheetDetail />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/employee-profile/compensation" element={<Compensation />} />
          <Route path="/employee-profile/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee-profile/leave" element={<EmployeeLeave />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
