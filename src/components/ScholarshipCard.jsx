import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const { user } = useAuth() || {};
const token = localStorage.getItem("token");

const [bookmarked, setBookmarked] = useState(false);

// optional: check if bookmarked on mount (frontend-only dummy check if needed)
useEffect(() => {
  // if you want to check by calling /bookmarks/my and matching scholarshipId
}, []);



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
          <button
            onClick={async () => {
              if (!user) { return navigate("/auth/login"); }
              try {
                    const res = await axios.post("/bookmarks", { scholarshipId: item._id }, {
                    headers: { Authorization: `Bearer ${token}` }
                        });
                if (res.data.added) setBookmarked(true);
      // show toast
                } catch (err) { console.error(err); }
               }}
          className={`btn btn-sm ${bookmarked ? "btn-success" : "btn-ghost"}`}>
  {bookmarked ? "Bookmarked" : "Bookmark"}
  </button>

        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
