import { Link } from "react-router-dom";
import Logo from "../assets/logo_01.jpg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth(); // ✅ add logOut from context

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="navbar bg-white px-4 shadow-md">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <img
            src={Logo}
            alt="ScholarStream Logo"
            className="w-10 h-10 rounded-md object-contain"
          />
          <span className="text-warning">ScholarStream</span>
        </Link>
      </div>

      {/* Center: Main Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">All Scholarships</Link></li>
        </ul>
      </div>

      {/* Right: Auth/Profile */}
      <div className="navbar-end hidden lg:flex gap-2">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-gray-700"
        >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">All Scholarships</Link></li>
          {user ? (
            <>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/auth/login">Login</Link></li>
              <li><Link to="/auth/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;