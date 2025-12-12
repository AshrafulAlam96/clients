import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { API_BASE_URL } from "../config/api";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  const [scholarship, setScholarship] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  /** -------------------------------
   *  LOAD SCHOLARSHIP + RELATED + REVIEWS
   -------------------------------- **/
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1️⃣ Load scholarship
        const res = await axios.get(`${API_BASE_URL}/scholarships/${id}`);
        const data = res.data?.data || res.data || null;

        if (!data) {
          console.error("Invalid scholarship response:", res.data);
          return;
        }
        setScholarship(data);

        // 2️⃣ Load related scholarships
        const relatedRes = await axios.get(`${API_BASE_URL}/scholarships`);
        let all = relatedRes.data?.data || relatedRes.data || [];

        if (!Array.isArray(all)) all = [];

        const filtered = all.filter(
          (item) =>
            item.category === data.category && String(item._id) !== String(data._id)
        );

        setRelated(filtered.slice(0, 3));

        // 3️⃣ Load reviews
        const reviewsRes = await axios.get(`${API_BASE_URL}/reviews/${id}`);
        let reviewList = reviewsRes.data?.data || reviewsRes.data || [];

        if (!Array.isArray(reviewList)) reviewList = [];

        setReviews(reviewList);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  /** -------------------------------
   *  APPLY SYSTEM LOGIC
   -------------------------------- **/
  const handleApply = async () => {
    if (!user) return navigate("/auth/login");

    // Paid scholarship → go to checkout
    if (scholarship.fees > 0) {
      return navigate(`/payment/checkout?id=${scholarship._id}`);
    }

    // Free → apply directly
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE_URL}/applications/apply`,
        { scholarshipId: scholarship._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Application submitted!");
    } catch (err) {
      console.error(err);
      alert("Application failed.");
    }
  };

  /** -------------------------------
   *  LOADING UI
   -------------------------------- **/
  if (loading || !scholarship) {
    return (
      <div className="flex justify-center min-h-[50vh] items-center">
        <span className="loading loading-lg"></span>
      </div>
    );
  }

  /** -------------------------------
   *  RENDER UI
   -------------------------------- **/
  return (
    <div className="my-10 space-y-12">

      {/* TOP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-10"
      >
        <img
          src={scholarship.image}
          alt={scholarship.name}
          className="rounded-xl w-full h-72 object-cover shadow"
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{scholarship.name}</h1>
          <p className="text-lg">{scholarship.university}</p>

          <p><strong>Category:</strong> {scholarship.category}</p>
          <p><strong>Country:</strong> {scholarship.country}</p>
          <p><strong>Degree:</strong> {scholarship.degree}</p>
          <p><strong>Deadline:</strong> {scholarship.deadline}</p>
          <p><strong>Fees:</strong> ${scholarship.fees}</p>
          <p><strong>Stipend:</strong> ${scholarship.stipend}</p>

          <p className="text-gray-700">{scholarship.description}</p>

          <button className="btn btn-primary mt-4" onClick={handleApply}>
            {scholarship.fees > 0 ? `Pay $${scholarship.fees} & Apply` : "Apply Free"}
          </button>
        </div>
      </motion.div>

      {/* REVIEWS */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="border p-4 rounded-xl bg-white shadow">
                <p className="font-semibold">
                  {r.userName || "Anonymous"} — ⭐{" "}
                  {r.rating || 5}
                </p>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          {user ? (
            <Link to={`/reviews/add/${id}`} className="btn btn-primary">
              Add Review
            </Link>
          ) : (
            <p><Link to="/auth/login" className="text-blue-500">Login to write review</Link></p>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Related Scholarships</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link
              key={r._id}
              to={`/scholarships/${r._id}`}
              className="card bg-white shadow-md hover:shadow-xl border"
            >
              <figure>
                <img src={r.image} className="h-40 w-full object-cover" />
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
