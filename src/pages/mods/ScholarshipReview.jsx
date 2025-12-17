import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toastSuccess, toastError } from "../../utils/toast";

const ScholarshipDetails = () => {
  const { id } = useParams(); // scholarshipId
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  /* =============================
     FETCH SCHOLARSHIP
  ============================== */
  useEffect(() => {
    axios.get(`${API}/scholarships/${id}`)
      .then(res => setScholarship(res.data))
      .catch(() => toastError("Failed to load scholarship"));
  }, [id]);

  /* =============================
     FETCH APPROVED REVIEWS
  ============================== */
  useEffect(() => {
    axios.get(`${API}/reviews/${id}`)
      .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(() => toastError("Failed to load reviews"));
  }, [id]);

  /* =============================
     SUBMIT REVIEW (STUDENT)
  ============================== */
  const submitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      return toastError("Login required to review");
    }

    try {
      await axios.post(
        `${API}/reviews`,
        {
          scholarshipId: id,
          userEmail: user.email,
          comment,
          rating
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toastSuccess("Review submitted for moderation");
      setComment("");
      setRating(5);
    } catch (err) {
      toastError("Failed to submit review");
    }
  };

  if (!scholarship) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* SCHOLARSHIP INFO */}
      <div className="bg-white shadow rounded-xl p-6">
        <img src={scholarship.image} className="w-full h-64 object-cover rounded mb-4" />
        <h1 className="text-3xl font-bold">{scholarship.name}</h1>
        <p className="text-gray-600">{scholarship.university}</p>
        <p className="mt-2">{scholarship.description}</p>
      </div>

      {/* ADD REVIEW */}
      {user && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Add a Review</h2>

          <form onSubmit={submitReview} className="space-y-3">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />

            <select
              className="select select-bordered"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} Star</option>
              ))}
            </select>

            <button className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* REVIEW LIST */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r._id} className="border p-4 rounded">
              <p className="font-semibold">{r.userEmail}</p>
              <p className="text-sm text-gray-600">Rating: ⭐ {r.rating}</p>
              <p className="mt-2">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
