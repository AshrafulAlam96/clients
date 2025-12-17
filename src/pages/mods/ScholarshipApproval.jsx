import { useEffect, useState } from "react";
import axios from "axios";

const ScholarshipReview = () => {
  const [scholarships, setScholarships] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/scholarships`)
      .then(res => setScholarships(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Scholarship Review</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {scholarships.map(s => (
          <div key={s._id} className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm">{s.university}</p>
            <p className="text-sm text-gray-500">{s.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipReview;
