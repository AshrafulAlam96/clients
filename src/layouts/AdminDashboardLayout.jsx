import { NavLink, Outlet } from "react-router-dom";
// import { motion } from "framer-motion";

const AdminDashboardLayout = () => {
  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-base-200">

      {/* SIDEBAR */}
      <aside className="bg-white border-r shadow-md p-5">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/dashboard/admin"
            end
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/admin/scholarships"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Manage Scholarships
          </NavLink>

          <NavLink
            to="/dashboard/admin/add-scholarship"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Add Scholarship
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/reviews"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Manage Reviews
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

export default AdminDashboardLayout;
