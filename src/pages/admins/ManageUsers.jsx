import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const updateRole = (id, role) => {
    axiosSecure.patch(`/admin/users/role/${id}`, { role })
      .then(() => alert("Role updated"));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <table className="table bg-white">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => updateRole(u._id, "admin")}
                  className="btn btn-sm mr-2">Admin</button>
                <button onClick={() => updateRole(u._id, "moderator")}
                  className="btn btn-sm">Moderator</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageUsers;
