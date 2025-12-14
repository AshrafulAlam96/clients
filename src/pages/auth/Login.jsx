import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const auth = useAuth();
  const signInUser = auth?.signInUser;
  const googleLogin = auth?.googleLogin;
  const loading = auth?.loading;

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Redirect to previous page or home
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Login to ScholarStream
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="btn btn-primary w-full">
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-sm mt-4 text-center">
        New here?{" "}
        <Link to="/auth/register" className="text-blue-500">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
