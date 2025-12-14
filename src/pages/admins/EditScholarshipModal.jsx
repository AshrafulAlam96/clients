import { useState } from "react";
import axios from "axios";

const EditScholarshipModal = ({ scholarship, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    name: scholarship.name,
    university: scholarship.university,
    country: scholarship.country,
    degree: scholarship.degree,
    fees: scholarship.fees,
    stipend: scholarship.stipend,
    category: scholarship.category,
    deadline: scholarship.deadline,
    image: scholarship.image,
    description: scholarship.description,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/scholarships/${scholarship._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      refetch();   // reload table data
      onClose();   // close modal
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">Edit Scholarship</h3>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="input input-bordered" />
          <input name="university" value={formData.university} onChange={handleChange} className="input input-bordered" />
          <input name="country" value={formData.country} onChange={handleChange} className="input input-bordered" />
          <input name="degree" value={formData.degree} onChange={handleChange} className="input input-bordered" />
          <input name="category" value={formData.category} onChange={handleChange} className="input input-bordered" />
          <input name="fees" type="number" value={formData.fees} onChange={handleChange} className="input input-bordered" />
          <input name="stipend" type="number" value={formData.stipend} onChange={handleChange} className="input input-bordered" />
          <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} className="input input-bordered" />
          <input name="image" value={formData.image} onChange={handleChange} className="input input-bordered col-span-2" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered col-span-2" />

          <div className="col-span-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditScholarshipModal;
