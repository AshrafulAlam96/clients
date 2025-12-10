// Dummy admin-submitted scholarships
const pendingScholarships = [
  { id: 1, name: "Harvard Excellence", university: "Harvard", category: "Merit-Based" },
  { id: 2, name: "NUS ASEAN Award", university: "NUS", category: "Government" },
];

const ScholarshipApproval = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Scholarship Approval</h1>

      <div className="space-y-4">
        {pendingScholarships.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl shadow border">
            <h2 className="font-bold text-lg">{s.name}</h2>
            <p>{s.university}</p>
            <p className="text-sm text-gray-500">{s.category}</p>

            <div className="flex gap-2 mt-4">
              <button className="btn btn-success btn-sm">Approve</button>
              <button className="btn btn-error btn-sm">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipApproval;
