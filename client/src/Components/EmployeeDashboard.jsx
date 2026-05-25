import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";

import { Link } from "react-router-dom";
import { dummyEmployeeDashboardData } from "../assets/assets";

const EmployeeDashboard = () => {
  const data = dummyEmployeeDashboardData;

  const emp = data?.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data?.currentMonthAttendance || 0,
      title: "Days Present",
      subtitle: "This Month",
    },

    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },

    {
      icon: DollarSignIcon,
      value: data?.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Payout",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header mb-8">
        <h1 className="page-title text-3xl font-bold text-slate-900">
          Welcome, {emp?.firstName || "Employee"}!
        </h1>

        <p className="page-subtitle text-slate-600 mt-1">
          {emp?.position || "No Position"} -{" "}
          {emp?.department || "No Department"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div>
              {/* Left Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-400/70 group-hover:bg-indigo-500/70 transition-colors duration-200" />

              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {card.value}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {card.subtitle}
              </p>
            </div>

            <card.icon className="size-10 p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendance"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          Mark Attendance
          <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link
          to="/leave"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200"
        >
          Apply For Leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;