import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

const ScholarshipCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");

  const [bookmarked, setBookmarked] = useState(false);

  // Check bookmark (optional)
  useEffect(() => {
    async function checkBookmark() {
      if (!user) return;

      try {
        const res = await axios.get("/bookmarks/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const isBookmarked = res.data.some(
          (b) => b.scholarshipId === item._id
        );

        setBookmarked(isBookmarked);
      } catch (err) {
        console.error("Bookmark fetch error:", err);
      }
    }

    checkBookmark();
  }, [user, token, item._id]);

  // Bookmark handler
  const handleBookmark = async () => {
    if (!user) return navigate("/auth/login");

    try {
      const res = await axios.post(
        "/bookmarks",
        { scholarshipId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.added) setBookmarked(true);
      if (res.data.removed) setBookmarked(false);
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  // Apply Button handler
  const handleApply = () => {
    if (!user) return navigate("/auth/login");

    if (item.fees > 0) {
      return navigate(`/payment/checkout?id=${item._id}`);
    }

    // Free scholarship apply logic (optional)
    navigate(`/scholarships/${item._id}`);
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

        <div className="card-actions justify-between">
          {/* Details Button */}
          <Link to={`/scholarships/${item._id}`} className="btn btn-primary btn-sm">
            Details
          </Link>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`btn btn-sm ${bookmarked ? "btn-success" : "btn-ghost"}`}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          {/* Apply NOW button */}
          <button onClick={handleApply} className="btn btn-accent btn-sm">
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
