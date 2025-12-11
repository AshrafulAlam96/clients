import { useState } from "react";

const AddReviewModal = ({ initialRating = 5, initialComment = "", onSubmit, onClose }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Write a Review</h2>

        {/* Rating input */}
        <select
          className="select select-bordered w-full"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>

        {/* Comment */}
        <textarea
          className="textarea textarea-bordered w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
        />

        <div className="flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={() => onSubmit({ rating, comment })}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
