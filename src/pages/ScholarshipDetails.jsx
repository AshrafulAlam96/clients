import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toastSuccess, toastError } from "../utils/toast";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    axios.get(`${API}/scholarships/${id}`)
      .then(res => setScholarship(res.data))
      .catch(err => console.error(err));

    axios.get(`${API}/reviews/${id}`)
      .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  }, [id, API]);

  if (!scholarship) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ================= ADD REVIEW ================= */

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/auth/login");
      return;
    }

    try {
      await axios.post(
        `${API}/reviews`,
        {
          scholarshipId: id,
          userEmail: user.email,
          userName: user.displayName || "Anonymous",
          rating,
          comment
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toastSuccess("Review submitted for moderation ✔");
      setComment("");
      setRating(5);
    } catch (err) {
      toastError("Failed to submit review");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 space-y-12">

      {/* ================= DETAILS ================= */}
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={scholarship.image}
          alt={scholarship.name}
          className="rounded-xl h-72 w-full object-cover"
        />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{scholarship.name}</h1>
          <p className="text-lg">{scholarship.university}</p>
          <p><b>Country:</b> {scholarship.country}</p>
          <p><b>Degree:</b> {scholarship.degree}</p>
          <p><b>Category:</b> {scholarship.category}</p>
          <p><b>Deadline:</b> {scholarship.deadline}</p>
          <p><b>Fees:</b> ${scholarship.fees}</p>
          <p>{scholarship.description}</p>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <section>
        <h2 className="text-3xl font-semibold mb-5">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r._id} className="border p-4 rounded bg-white shadow">
                <p className="font-semibold">
                  {r.userName} — ⭐ {r.rating}
                </p>
                <p className="text-sm text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ADD REVIEW ================= */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Add Review</h3>

        {user ? (
          <form onSubmit={handleAddReview} className="space-y-4 max-w-lg">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="select select-bordered w-full"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>
                  {n} Star{n > 1 && "s"}
                </option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Write your review..."
              required
            />

            <button className="btn btn-primary">
              Submit Review
            </button>
          </form>
        ) : (
          <p>
            <Link to="/auth/login" className="text-blue-500">
              Login to write a review
            </Link>
          </p>
        )}
      </section>
    </div>
  );
};

export default ScholarshipDetails;
