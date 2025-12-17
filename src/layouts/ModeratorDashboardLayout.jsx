import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaClipboardCheck, FaGraduationCap } from "react-icons/fa";

const ModeratorDashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-5 text-xl font-bold text-center border-b">
          Moderator Panel
        </div>

        <nav className="menu p-4 text-gray-700">
          <NavLink
            to="/"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
          >
            🏠 Home
          </NavLink>
          <div className="divider my-2"></div>
          <NavLink
            to="/dashboard/mod"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive ? "bg-warning text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/mod/reviews"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive ? "bg-warning text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <FaClipboardCheck /> Review Moderation
          </NavLink>

          <NavLink
            to="/dashboard/mod/scholarships"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive ? "bg-warning text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <FaGraduationCap /> Scholarship Review
          </NavLink>

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboardLayout;
