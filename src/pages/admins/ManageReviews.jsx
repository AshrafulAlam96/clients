const dummyReviews = [
  { id: 1, user: "John", rating: 5, comment: "Great scholarship!" },
  { id: 2, user: "Sarah", rating: 4, comment: "Nice process" },
];

const ManageReviews = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Reviews</h1>

      <div className="space-y-4">
        {dummyReviews.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">{r.user} — ⭐ {r.rating}</p>
            <p className="text-sm">{r.comment}</p>

            <div className="flex gap-2 mt-3">
              <button className="btn btn-sm btn-warning">Edit</button>
              <button className="btn btn-sm btn-error">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
