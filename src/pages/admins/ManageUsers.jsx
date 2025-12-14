import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  /* Fetch all users */
  useEffect(() => {
    axios
      .get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  /* Update role */
  const updateRole = async (id, role) => {
    try {
      await axios.patch(
        `${API}/users/role/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role } : u
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* Delete user */
  const deleteUser = async (id) => {
    const confirm = window.confirm(
      "⚠️ Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-xs">{user._id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>

                <td className="flex justify-center items-center gap-3">
                  {/* VIEW ICON */}
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="btn btn-sm btn-circle btn-info text-white"
                    title="View User"
                  >
                    <FaEye />
                  </button>

                  {/* ROLE SELECT */}
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(user._id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* DELETE ICON */}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-sm btn-circle btn-error text-white"
                    title="Delete User"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      {selectedUser && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FaUserShield /> User Details
            </h3>
            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
