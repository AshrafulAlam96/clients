import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import useAuth from "../../hooks/useAuth";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Admin Analytics</h1>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Stat title="Total Users" value={stats.totalUsers} />
        <Stat title="Scholarships" value={stats.totalScholarships} />
        <Stat title="Applications" value={stats.totalApplications} />
        <Stat title="Revenue ($)" value={stats.totalRevenue} />
      </div>

      {/* APPLICATION STATUS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Application Status</h2>

        <ul className="space-y-2">
          <li>🕒 Pending: {stats.applications.pending}</li>
          <li>✅ Approved: {stats.applications.approved}</li>
          <li>❌ Rejected: {stats.applications.rejected}</li>
        </ul>
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow border">
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminDashboardHome;
