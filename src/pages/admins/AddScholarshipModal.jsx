import { useState } from "react";
import axios from "axios";

const emptyForm = {
  name: "",
  university: "",
  country: "",
  degree: "",
  category: "",
  fees: "",
  stipend: "",
  deadline: "",
  description: "",
  image: "",
};

const AddScholarshipModal = ({ onClose, refetch }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/scholarships`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      refetch();        // reload table
      onClose();        // close modal
    } catch (err) {
      console.error("Add failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal modal-open">
      <form onSubmit={handleSubmit} className="modal-box max-w-3xl space-y-4">
        <h3 className="font-bold text-xl">Add Scholarship</h3>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(emptyForm).map((key) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.toUpperCase()}
              className="input input-bordered w-full"
              required={key !== "stipend"}
            />
          ))}
        </div>

        <div className="modal-action">
          <button
            type="button"
            className="btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddScholarshipModal;
