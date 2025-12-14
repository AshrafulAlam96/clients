import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import EditScholarshipModal from "./EditScholarshipModal";
import AddScholarshipModal from "./AddScholarshipModal";


const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  /* FETCH */
  const fetchScholarships = async () => {
    const res = await axios.get(`${API}/scholarships`);
    setScholarships(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  /* DELETE */
  const deleteScholarship = async (id) => {
    if (!window.confirm("Delete this scholarship?")) return;

    await axios.delete(`${API}/scholarships/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


    fetchScholarships();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Scholarships</h1>
        <button
          onClick={() => setAddOpen(true)}
          className="btn btn-primary gap-2"
        >
          <FaPlus /> Add Scholarship
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>University</th>
              <th>Country</th>
              <th>Fees</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.university}</td>
                <td>{s.country}</td>
                <td>${s.fees}</td>
                <td className="flex justify-center gap-3">
                  <button
                    onClick={() => setViewItem(s)}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setEditItem(s)}
                    className="btn btn-sm btn-warning text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteScholarship(s._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD */}
      {addOpen && (
        <AddScholarshipModal
          onClose={() => setAddOpen(false)}
          refetch={fetchScholarships}
        />
      )}

      {/* EDIT */}
      {editItem && (
        <EditScholarshipModal
          scholarship={editItem}
          onClose={() => setEditItem(null)}
          refetch={fetchScholarships}
        />
      )}

      {/* VIEW */}
      {viewItem && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">{viewItem.name}</h3>
            <img src={viewItem.image} className="rounded mb-4" />
            <p><b>University:</b> {viewItem.university}</p>
            <p><b>Country:</b> {viewItem.country}</p>
            <p><b>Category:</b> {viewItem.category}</p>
            <p className="mt-2">{viewItem.description}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setViewItem(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageScholarships;
