import { useEffect, useState } from "react";
import axios from "axios";
import { toastSuccess, toastError } from "../../utils/toast";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  /* =========================
     FETCH PENDING REVIEWS
  ========================= */
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${API}/reviews/moderation/pending`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setReviews(res.data);
    } catch (err) {
      toastError("Failed to load reviews");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* =========================
     APPROVE / REJECT
  ========================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API}/reviews/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toastSuccess(`Review ${status}`);
      fetchReviews();
    } catch (err) {
      toastError("Action failed");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Review Moderation</h1>

      {reviews.length === 0 && (
        <p className="text-gray-500">No pending reviews 🎉</p>
      )}

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-white p-5 shadow rounded-xl">
            <p className="font-semibold">{r.userEmail}</p>
            <p className="text-sm text-gray-600 mt-1">
              {r.comment}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => updateStatus(r._id, "approved")}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(r._id, "rejected")}
                className="btn btn-error btn-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
