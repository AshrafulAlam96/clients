import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaGraduationCap, FaChartBar, FaStar } from "react-icons/fa";
import Logo from "../assets/logo_01.jpg";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-amber-100 shadow-lg flex flex-col">
        
        {/* Logo + Site Home */}
        <div className="p-4 border-b bg-blue-950">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="ScholarStream"
              className="w-10 h-10 rounded"
            />
            <span className="text-xl font-bold text-warning">
              ScholarStream
            </span>
          </NavLink>
        </div>

        {/* Menu */}
        <ul className="menu p-4 text-gray-700 flex-1">
          
          {/* Home (Public Site) */}
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome /> Home
            </NavLink>
          </li>

          <div className="divider my-2"></div>

          {/* Dashboard */}
          <li>
            <NavLink to="/dashboard/admin" end className="flex items-center gap-2">
              <FaChartBar /> Dashboard
            </NavLink>
          </li>

          {/* Users */}
          <li>
            <NavLink to="/dashboard/admin/users" className="flex items-center gap-2">
              <FaUsers /> Manage Users
            </NavLink>
          </li>

          {/* Scholarships */}
          <li>
            <NavLink to="/dashboard/admin/scholarships" className="flex items-center gap-2">
              <FaGraduationCap /> Manage Scholarships
            </NavLink>
          </li>

          {/* Reviews */}
          <li>
            <NavLink to="/dashboard/admin/reviews" className="flex items-center gap-2">
              <FaStar /> Review Moderation
            </NavLink>
          </li>
        </ul>

        {/* Footer */}
        <div className="p-4 text-xs text-gray-400 border-t text-center">
          Admin Panel © {new Date().getFullYear()}
        </div>
      </aside>

      {/* ========== CONTENT ========== */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminDashboardLayout;
