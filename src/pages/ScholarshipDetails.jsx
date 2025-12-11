import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";   // ✔ correct import

// If still using local JSON temporarily
import { scholarshipsData } from "../data/scholarshipsData";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);

  // Load scholarship details
  useEffect(() => {
    const found = scholarshipsData.find(
      (item) => String(item._id) === String(id)
    );
    setData(found || null);
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Free apply handler (you may replace with backend API)
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

                // Free scholarship
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
        <h2 className="text-3xl font-semibold mb-6">Reviews</h2>

        {/* Replace placeholder with backend reviews later */}
        <div className="space-y-4">
          <div className="border p-4 rounded-xl bg-white shadow">
            <p className="font-semibold">Sarah — ⭐⭐⭐⭐⭐</p>
            <p>Great scholarship program and very helpful staff!</p>
          </div>

          <div className="border p-4 rounded-xl bg-white shadow">
            <p className="font-semibold">John — ⭐⭐⭐⭐☆</p>
            <p>Well structured application process.</p>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="mt-6">
          {user ? (
            <button className="btn btn-primary">Add Review</button>
          ) : (
            <p>
              <Link to="/auth/login" className="text-blue-500">
                Login to write a review
              </Link>
            </p>
          )}
        </div>
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
