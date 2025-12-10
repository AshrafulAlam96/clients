import { NavLink, Outlet } from "react-router-dom";
// import { motion } from "framer-motion";

const ModeratorDashboardLayout = () => {
  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-base-200">

      {/* SIDEBAR */}
      <aside className="bg-white border-r shadow-md p-5">
        <h2 className="text-xl font-bold mb-8">Moderator Panel</h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/dashboard/mod"
            end
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/mod/scholarship-approval"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Approve Scholarships
          </NavLink>

          <NavLink
            to="/dashboard/mod/application-approval"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Approve Applications
          </NavLink>

          <NavLink
            to="/dashboard/mod/review-moderation"
            className={({ isActive }) =>
              `btn btn-sm justify-start ${isActive ? "btn-primary" : "btn-ghost"}`
            }
          >
            Moderate Reviews
          </NavLink>

        </nav>
      </aside>

      {/* CONTENT */}
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

export default ModeratorDashboardLayout;
