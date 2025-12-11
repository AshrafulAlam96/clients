import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ReviewList = ({ scholarshipId, onWrite }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");

  const loadReviews = () => {
    axios.get(`/reviews/${scholarshipId}`).then(res => setReviews(res.data));
  };

  useEffect(() => {
    loadReviews();
  }, [scholarshipId]);

  const deleteReview = async (id) => {
    await axios.delete(`/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadReviews();
  };

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="border p-4 rounded-xl bg-white shadow">
          <p className="font-semibold">
            {r.email} — ⭐ {r.rating}
          </p>
          <p>{r.comment}</p>

          {user?.email === r.email && (
            <div className="mt-2 flex gap-3">
              <button
                onClick={() => onWrite(r)}  // open update form
                className="btn btn-sm btn-outline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteReview(r._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
