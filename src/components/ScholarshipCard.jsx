import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { API_BASE_URL } from "../config/api";

const ScholarshipCard = ({ item }) => {
  const { user } = useAuth() || {};
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!user) return;

    axios.get(`${API_BASE_URL}/bookmarks/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const found = res.data.some(
        b => b.scholarship._id === item._id
      );
      setBookmarked(found);
    });
  }, [user, item._id]);

  const toggleBookmark = async () => {
    if (!user) return navigate("/auth/login");

    if (bookmarked) {
      await axios.delete(
        `${API_BASE_URL}/bookmarks/${item._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarked(false);
    } else {
      await axios.post(
        `${API_BASE_URL}/bookmarks`,
        { scholarshipId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarked(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white shadow border"
    >
      <figure>
        <img src={item.image} className="h-44 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.university}</p>
        <p className="font-semibold">${item.fees}</p>

        <div className="card-actions justify-between">
          <Link to={`/scholarships/${item._id}`} className="btn btn-sm btn-primary">
            Details
          </Link>

          <button
            onClick={toggleBookmark}
            className={`btn btn-sm ${bookmarked ? "btn-success" : "btn-ghost"}`}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
