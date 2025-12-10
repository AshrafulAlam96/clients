const pendingApplications = [
  { id: 1, student: "John Doe", scholarship: "Harvard Excellence" },
  { id: 2, student: "Sarah Lee", scholarship: "NUS ASEAN Award" },
];

const ApplicationApproval = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Application Approval</h1>

      <div className="space-y-4">
        {pendingApplications.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-xl shadow border">
            <p className="font-bold">{app.student}</p>
            <p className="text-gray-600">{app.scholarship}</p>

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

export default ApplicationApproval;
