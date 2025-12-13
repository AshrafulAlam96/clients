import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/scholarships").then(res => setScholarships(res.data));
  }, []);

  const handleDelete = (id) => {
    axiosSecure.delete(`/admin/scholarships/${id}`)
      .then(() => setScholarships(prev => prev.filter(s => s._id !== id)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Scholarships</h1>

      <table className="table bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>University</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {scholarships.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.university}</td>
              <td>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageScholarships;
