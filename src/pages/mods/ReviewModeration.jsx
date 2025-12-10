const reportedReviews = [
  { id: 1, user: "John", comment: "Spam text", rating: 1 },
  { id: 2, user: "Mike", comment: "Inappropriate words", rating: 2 },
];

const ReviewModeration = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Review Moderation</h1>

      <div className="space-y-4">
        {reportedReviews.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-xl shadow border">
            <p className="font-bold">{r.user} — ⭐ {r.rating}</p>
            <p>{r.comment}</p>

            <div className="flex gap-2 mt-4">
              <button className="btn btn-warning btn-sm">Warn User</button>
              <button className="btn btn-error btn-sm">Delete Review</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewModeration;
