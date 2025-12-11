import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const StudentDashboardLayout = () => {
  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-base-200">

      {/* SIDEBAR */}
      <aside className="bg-white border-r shadow-md p-5">
        <h2 className="text-xl font-bold mb-8">Student Panel</h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/dashboard/student"
            end
            className={({ isActive }) =>
              `btn btn-sm justify-start ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/student/applications"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            My Applications
          </NavLink>

          <NavLink
            to="/dashboard/student/reviews"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            My Reviews
          </NavLink>

          <NavLink
            to="/dashboard/student/profile"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${
                isActive ? "btn-primary" : "btn-ghost"
              }`
            }
          >
            My Profile
          </NavLink>
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
