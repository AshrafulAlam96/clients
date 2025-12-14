import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/logo_01.jpg";

const Navbar = () => {
  const { user, role, logOut } = useAuth();

  const dashboardLink =
    role === "admin"
      ? "/dashboard/admin"
      : role === "moderator"
      ? "/dashboard/mod"
      : "/dashboard/student";

  return (
    <div className="navbar bg-white shadow px-4">
      {/* LOGO */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-10 h-10 rounded" />
          <span className="text-xl font-bold text-warning">
            ScholarStream
          </span>
        </Link>
      </div>

      {/* MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">Scholarships</Link></li>
        </ul>
      </div>

      {/* USER */}
      <div className="navbar-end">
        {!user ? (
          <>
            <Link to="/auth/login" className="btn btn-sm">Login</Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.email}</span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="font-semibold text-center capitalize">
                Role: {role}
              </li>
              <li>
                <Link to={dashboardLink}>Dashboard</Link>
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
