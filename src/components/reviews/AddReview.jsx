import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddReview = ({ scholarshipId, existing, onDone }) => {
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");

  // If editing: pre-load values
  const [rating, setRating] = useState(existing?.rating || 5);
  const [comment, setComment] = useState(existing?.comment || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      await axios.post(
        "/reviews",
        {
          scholarshipId,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onDone(); // Close form + reload list
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-xl shadow-md border">
      
      <h3 className="text-xl font-semibold">
        {existing ? "✏️ Edit Your Review" : "📝 Add a Review"}
      </h3>

      {/* Rating */}
      <div>
        <label className="font-medium">Rating</label>
        <select
          className="select select-bordered mt-1 w-full"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="1">⭐ (1)</option>
        </select>
      </div>

      {/* Comment */}
      <div>
        <label className="font-medium">Comment</label>
        <textarea
          className="textarea textarea-bordered mt-1 w-full"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
        ></textarea>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onDone()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : existing
            ? "Update Review"
            : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default AddReview;
