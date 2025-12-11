// import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ScholarshipCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");

  const [bookmarked, setBookmarked] = useState(false);

  // Optional: check if already bookmarked
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const res = await axios.get("/bookmarks/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const already = res.data.find((b) => b.scholarshipId === item._id);
        if (already) setBookmarked(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookmarks();
  }, [user, item._id, token]);

  // Add bookmark handler
  const handleBookmark = async () => {
    if (!user) return navigate("/login");

    try {
      const res = await axios.post(
        "/bookmarks",
        { scholarshipId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.added) setBookmarked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-white shadow-md hover:shadow-xl border border-base-200"
    >
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="h-44 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p className="text-sm">{item.university}</p>
        <p className="text-sm">Country: {item.country}</p>
        <p className="font-semibold">Fees: ${item.fees}</p>

        <div className="card-actions justify-end">
          <Link
            to={`/scholarships/${item._id}`}
            className="btn btn-primary btn-sm"
          >
            Details
          </Link>

          <button
            onClick={handleBookmark}
            className={`btn btn-sm ${
              bookmarked ? "btn-success" : "btn-ghost"
            }`}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
