import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  MessageSquare,
  LogOut
} from "lucide-react";

const AdminDashboardLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition 
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800"}`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        {/* LOGO */}
        <div className="px-6 py-5 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-wide">
            Admin Panel
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <NavLink to="/dashboard/admin" end className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/admin/users" className={linkClass}>
            <Users size={20} />
            Manage Users
          </NavLink>

          <NavLink to="/dashboard/admin/scholarships" className={linkClass}>
            <GraduationCap size={20} />
            Manage Scholarships
          </NavLink>

          <NavLink to="/dashboard/admin/reviews" className={linkClass}>
            <MessageSquare size={20} />
            Review Moderation
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                       bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* TOP HEADER */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <img
              src="https://i.ibb.co/ZYW3VTp/avatar.png"
              alt="admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminDashboardLayout;
