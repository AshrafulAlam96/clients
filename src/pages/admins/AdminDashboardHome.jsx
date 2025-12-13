import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  GraduationCap,
  ClipboardList,
  MessageSquare
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API = import.meta.env.VITE_API_BASE_URL;

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#ef4444"];

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    { label: "Users", value: stats.users, icon: Users, color: "bg-blue-500" },
    { label: "Scholarships", value: stats.scholarships, icon: GraduationCap, color: "bg-green-500" },
    { label: "Applications", value: stats.applications, icon: ClipboardList, color: "bg-orange-500" },
    { label: "Reviews", value: stats.reviews, icon: MessageSquare, color: "bg-red-500" },
  ];

  const pieData = cards.map((c) => ({
    name: c.label,
    value: c.value,
  }));

  return (
    <div className="space-y-8">

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500">{c.label}</p>
              <h2 className="text-3xl font-bold">{c.value}</h2>
            </div>
            <div className={`p-3 rounded-full text-white ${c.color}`}>
              <c.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">System Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
