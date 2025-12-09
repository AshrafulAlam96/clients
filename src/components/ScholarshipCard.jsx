import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-white shadow-md hover:shadow-xl border border-base-200"
    >
      <figure>
        <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p className="text-sm">{item.university}</p>
        <p className="text-sm">Country: {item.country}</p>
        <p className="font-semibold">Fees: ${item.fees}</p>

        <div className="card-actions justify-end">
          <Link to={`/scholarships/${item._id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
