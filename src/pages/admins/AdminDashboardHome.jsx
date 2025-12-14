import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaGraduationCap,
  FaFileAlt,
  FaStar
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#facc15", "#38bdf8", "#22c55e"];

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // ===== PIE DATA =====
  const roleData = [
    { name: "Admin", value: stats.roles.admin },
    { name: "Moderator", value: stats.roles.moderator },
    { name: "Student", value: stats.roles.student }
  ];

  // ===== BAR DATA =====
  const overviewData = [
    { name: "Users", count: stats.totalUsers },
    { name: "Scholarships", count: stats.totalScholarships },
    { name: "Applications", count: stats.totalApplications },
    { name: "Reviews", count: stats.totalReviews }
  ];

  // ===== HISTOGRAM DATA (BUCKETED) =====
  // Example buckets (you can tune later)
  const histogramData = [
    { range: "0–10", count: Math.min(stats.totalUsers, 10) },
    { range: "11–50", count: Math.max(0, Math.min(stats.totalUsers - 10, 40)) },
    { range: "51–100", count: Math.max(0, Math.min(stats.totalUsers - 50, 50)) },
    { range: "100+", count: Math.max(0, stats.totalUsers - 100) }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Analytics Dashboard</h1>

      {/* ===== STAT CARDS ===== */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard icon={<FaUsers />} title="Users" value={stats.totalUsers} />
        <StatCard icon={<FaGraduationCap />} title="Scholarships" value={stats.totalScholarships} />
        <StatCard icon={<FaFileAlt />} title="Applications" value={stats.totalApplications} />
        <StatCard icon={<FaStar />} title="Reviews" value={stats.totalReviews} />
      </div>

      {/* ===== PIE + BAR (ROW) ===== */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            User Role Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {roleData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            System Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== HISTOGRAM (FULL WIDTH) ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          User Count Distribution (Histogram)
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;


// =========================
// Stat Card Component
// =========================
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
    <div className="text-3xl text-warning">{icon}</div>
    <div>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  </div>
);
