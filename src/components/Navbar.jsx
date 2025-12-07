import { Link } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext();

  const menuItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/scholarships">All Scholarships</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-200 px-4 shadow-md">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">ScholarStream</Link>
      </div>

      {/* Center: Main Navigation */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>

      {/* Right: Auth Actions */}
      <div className="flex-none">
        {!user ? (
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;