const ModeratorDashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Moderator Dashboard</h1>

      <p className="text-gray-600 mb-6">
        Approve scholarships, applications, and monitor user reviews.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="font-semibold">Scholarships Pending</h2>
          <p className="text-2xl font-bold mt-2">4</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="font-semibold">Applications Pending</h2>
          <p className="text-2xl font-bold mt-2">7</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="font-semibold">Reviews to Moderate</h2>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboardHome;
