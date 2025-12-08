import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-4 shadow-md">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          ScholarStream
        </Link>
      </div>

      {/* Center: Main Navigation (visible on large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">All Scholarships</Link></li>
        </ul>
      </div>

      {/* Right: Placeholder for Auth / Profile */}
      <div className="navbar-end hidden lg:flex gap-2">
        <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
        <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/scholarships">All Scholarships</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;