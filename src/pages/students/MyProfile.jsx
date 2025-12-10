import { useAuth } from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth() || {};

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className="bg-white p-5 rounded-xl shadow border space-y-2">
        <p><strong>Name:</strong> {user?.displayName || "Not set"}</p>
        <p><strong>Email:</strong> {user?.email}</p>

        <p className="text-gray-500">
          (More profile fields will come after backend)
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
