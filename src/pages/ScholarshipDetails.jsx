import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { scholarshipsData } from "../data/scholarshipsData";

// Review API helpers
import {
  getReviews,
  getAverageRating,
  addOrUpdateReview,
  deleteReview,
} from "../api/reviews";

import AddReviewModal from "../components/AddReviewModal";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Load scholarship details (temporary from local JSON)
  useEffect(() => {
    const found = scholarshipsData.find(
      (item) => String(item._id) === String(id)
    );
    setData(found || null);
  }, [id]);

  // Fetch reviews
  const fetchReviews = async () => {
    const data = await getReviews(id);
    setReviews(data);

    const avg = await getAverageRating(id);
    setAvgRating(avg);
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Free apply handler
  const handleFreeApply = async () => {
    if (!user) return navigate("/auth/login");

    try {
      await axios.post(
        "/applications/apply",
        { scholarshipId: data._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard/student/applications");
    } catch (err) {
      console.error(err);
    }
  };

  // Submit review
  const handleSubmitReview = async ({ rating, comment }) => {
    if (!user) return navigate("/auth/login");

    await addOrUpdateReview(
      {
        scholarshipId: id,
        rating,
        comment,
      },
      token
    );

    setShowModal(false);
    fetchReviews();
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    await deleteReview(reviewId, token);
    fetchReviews();
  };

  return (
    <div className="my-10 space-y-12">

      {/* TOP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 gap-10"
      >
        <img
          src={data.image}
          alt={data.name}
          className="rounded-xl w-full h-72 object-cover shadow"
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="text-lg">{data.university}</p>

          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Country:</strong> {data.country}</p>
          <p><strong>Degree:</strong> {data.degree}</p>
          <p><strong>Application Deadline:</strong> {data.deadline}</p>
          <p><strong>Fees:</strong> ${data.fees}</p>
          <p><strong>Monthly Stipend:</strong> ${data.stipend}</p>

          <p className="text-gray-700">{data.description}</p>

          {/* APPLY BUTTON */}
          <div className="pt-4">
            <button
              onClick={() => {
                if (!user) return navigate("/auth/login");

                if (data.fees > 0) {
                  return navigate(`/payment/checkout?id=${data._id}`);
                }

                handleFreeApply();
              }}
              className="btn btn-primary"
            >
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* REVIEW SECTION */}
      <section>
        <h2 className="text-3xl font-semibold mb-2">
          Reviews ({reviews.length}) — ⭐ {avgRating}
        </h2>

        {/* Reviews list */}
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="border p-4 rounded-xl bg-white shadow">
              <p className="font-semibold">
                {rev.email} — {"⭐".repeat(rev.rating)}
              </p>

              <p>{rev.comment}</p>

              {/* Delete own review */}
              {user?.email === rev.email && (
                <button
                  onClick={() => handleDeleteReview(rev._id)}
                  className="btn btn-xs btn-error mt-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add / update review */}
        <div className="mt-6">
          {user ? (
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add / Update Review
            </button>
          ) : (
            <p>
              <Link to="/auth/login" className="text-blue-500">
                Login to write a review
              </Link>
            </p>
          )}
        </div>

        {showModal && (
          <AddReviewModal
            onSubmit={handleSubmitReview}
            onClose={() => setShowModal(false)}
          />
        )}
      </section>

      {/* RELATED SCHOLARSHIPS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Related Scholarships</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {scholarshipsData
            .filter(
              (s) =>
                s.category === data.category &&
                String(s._id) !== String(data._id)
            )
            .slice(0, 3)
            .map((r) => (
              <Link
                key={r._id}
                to={`/scholarships/${r._id}`}
                className="card bg-white shadow-md hover:shadow-xl border border-base-200"
              >
                <figure>
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  <p className="text-sm">{r.university}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

    </div>
  );
};

export default ScholarshipDetails;
