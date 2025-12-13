import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/reviews/moderation/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReviews(res.data));
  }, []);

  const updateStatus = (id, status) => {
    axios.patch(`${API_BASE_URL}/reviews/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      setReviews(reviews.filter(r => r._id !== id));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Review Moderation</h1>

      {reviews.map(r => (
        <div key={r._id} className="bg-white p-4 shadow rounded mb-3">
          <p><strong>{r.userName}</strong> ⭐ {r.rating}</p>
          <p>{r.comment}</p>

          <div className="mt-2 space-x-2">
            <button className="btn btn-success btn-sm"
              onClick={() => updateStatus(r._id, "approved")}>
              Approve
            </button>

            <button className="btn btn-error btn-sm"
              onClick={() => updateStatus(r._id, "rejected")}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewModeration;
