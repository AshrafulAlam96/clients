import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_01.jpg";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/auth/login");
  };

  // 🔁 Role-based dashboard route
  const dashboardRoute = () => {
    if (user?.role === "admin") return "/dashboard/admin";
    if (user?.role === "moderator") return "/dashboard/mod";
    return "/dashboard/student";
  };

  return (
    <div className="navbar bg-white px-4 shadow-md">

      {/* LEFT — LOGO */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img src={Logo} className="w-10 h-10 rounded-md" />
          <span className="text-warning">ScholarStream</span>
        </Link>
      </div>

      {/* CENTER — LINKS */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">All Scholarships</Link></li>
        </ul>
      </div>

      {/* RIGHT — AUTH */}
      <div className="navbar-end">

        {/* 🔐 LOGGED IN */}
        {user ? (
          <div className="dropdown dropdown-end">

            {/* AVATAR BUTTON */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/2d0Y5zP/avatar.png"}
                  alt="avatar"
                />
              </div>
            </label>

            {/* DROPDOWN */}
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-sm font-semibold text-gray-600 cursor-default">
                {user.email}
              </li>

              <li className="text-xs text-gray-500 cursor-default">
                Role: <span className="capitalize">{user.role}</span>
              </li>

              <div className="divider my-1"></div>

              <li>
                <Link to={dashboardRoute()}>
                  Dashboard
                </Link>
              </li>

              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {/* 🔓 NOT LOGGED IN */}
            <Link to="/auth/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm ml-2">
              Register
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;
