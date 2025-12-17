import { useEffect, useState } from "react";
import axios from "axios";

const ModeratorDashboardHome = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/moderator/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setStats(res.data));
  }, [API, token]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="stat bg-white shadow rounded">
        <div className="stat-title">Pending Scholarships</div>
        <div className="stat-value text-warning">{stats.pendingScholarships}</div>
      </div>

      <div className="stat bg-white shadow rounded">
        <div className="stat-title">Pending Applications</div>
        <div className="stat-value text-info">{stats.pendingApplications}</div>
      </div>

      <div className="stat bg-white shadow rounded">
        <div className="stat-title">Pending Reviews</div>
        <div className="stat-value text-error">{stats.pendingReviews}</div>
      </div>
    </div>
  );
};

export default ModeratorDashboardHome;
