import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer }
    from "recharts";

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!stats) return <p className="p-4">Loading statistics...</p>;

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold mb-4">📊 Admin Analytics Dashboard</h1>

      {/* Summary cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Scholarships</h2>
          <p className="text-3xl font-bold">{stats.totalScholarships}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h2 className="text-lg font-semibold">Total Applications</h2>
          <p className="text-3xl font-bold">{stats.totalApplications}</p>
        </div>
      </div>

      {/* Application Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-100 text-blue-800 rounded-xl shadow">
          Pending: {stats.pendingApps}
        </div>
        <div className="p-6 bg-green-100 text-green-800 rounded-xl shadow">
          Approved: {stats.approvedApps}
        </div>
        <div className="p-6 bg-red-100 text-red-800 rounded-xl shadow">
          Rejected: {stats.rejectedApps}
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">💰 Total Revenue: ${stats.totalRevenue}</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Applications trend */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">📈 Monthly Applications</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlyApplications}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="count" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminStatistics;
