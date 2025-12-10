const AdminDashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">
        Manage scholarships, users, and reviews from here.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-lg font-bold">Total Scholarships</h2>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl font-bold mt-2">89</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow border">
          <h2 className="text-lg font-bold">Pending Reviews</h2>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
