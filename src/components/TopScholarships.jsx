import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/scholarships/top`)
      .then(res => {
        setScholarships(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading top scholarships:", err);
        setLoading(false);
      });
  }, [API]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Top Scholarships
      </h2>

      {scholarships.length === 0 ? (
        <p className="text-center text-gray-500">
          No scholarships available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.university}, {item.country}
                </p>

                <p className="font-semibold">
                  Application Fees: ${item.fees}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/scholarships/${item._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopScholarships;
