const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "student" },
  { id: 2, name: "Sarah Lee", email: "sarah@mail.com", role: "moderator" },
  { id: 3, name: "Admin", email: "admin@mail.com", role: "admin" },
];

const ManageUsers = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {dummyUsers.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="font-bold">{u.role}</td>

                <td className="flex gap-2">
                  <button className="btn btn-sm btn-primary">Make Admin</button>
                  <button className="btn btn-sm btn-accent">Make Moderator</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
