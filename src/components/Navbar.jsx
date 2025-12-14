import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Logo from "../assets/logo_01.jpg";

const Navbar = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logOut = auth?.logOut;

  const [role, setRole] = useState("student");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
        )
        .then((res) => setRole(res.data.role))
        .catch(() => setRole("student"));
    }
  }, [user]);

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "moderator"
      ? "/dashboard/mod"
      : "/dashboard/student";

  return (
    <div className="navbar bg-white shadow px-4">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-10 h-10 rounded" />
          <span className="text-xl font-bold text-warning">
            ScholarStream
          </span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">Scholarships</Link></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        {!user ? (
          <>
            <Link to="/auth/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm ml-2">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              <li className="text-gray-600 text-sm px-2">
                {user.email}
              </li>
              <li className="text-xs text-gray-400 px-2">
                Role: {role}
              </li>
              <li>
                <Link to={dashboardPath}>Dashboard</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
