import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModeration = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/reviews/pending")
      .then(res => setReviews(res.data));
  }, []);

  const approveReview = (id) => {
    axiosSecure.patch(`/admin/reviews/approve/${id}`)
      .then(() => setReviews(prev => prev.filter(r => r._id !== id)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Review Moderation</h1>

      {reviews.map(r => (
        <div key={r._id} className="bg-white p-4 rounded shadow mb-3">
          <p>{r.comment}</p>
          <button onClick={() => approveReview(r._id)}
            className="btn btn-success btn-sm mt-2">
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewModeration;
