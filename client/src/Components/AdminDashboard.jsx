import {
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";



const AdminDashboard = ({data}) => {

  const stats = [
    {
      icon: UsersIcon,
      value: data?.totalEmployees || 0,
      label: "Total Employees",
      description: "Active Workforce",
    },

    {
      icon: Building2Icon,
      value: data?.totalDepartments || 0,
      label: "Departments",
      description: "Organization Units",
    },

    {
      icon: CalendarIcon,
      value: data?.todayAttendance || 0,
      label: "Attendance",
      description: "Checked in today",
    },

    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      label: "Pending Leaves",
      description: "Awaiting Approval",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header mb-8">
        <h1 className="page-title text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="page-subtitle text-slate-600 mt-1">
          Welcome back! Admin, here is your overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div>
              {/* Left Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-400/70 group-hover:bg-indigo-500/70 transition-colors duration-200" />

              <p className="text-sm font-medium text-slate-500">
                {s.label}
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {s.value}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {s.description}
              </p>
            </div>

            <s.icon className="size-10 p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;