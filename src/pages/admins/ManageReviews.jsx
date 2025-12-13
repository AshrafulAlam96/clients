import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/reviews/moderation/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReviews(res.data));
  }, []);

  const deleteReview = id => {
    axios.delete(`${API_BASE_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setReviews(reviews.filter(r => r._id !== id));
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>

      {reviews.map(r => (
        <div key={r._id} className="border p-4 rounded mb-3">
          <p>{r.comment}</p>
          <button className="btn btn-error btn-sm"
            onClick={() => deleteReview(r._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageReviews;
