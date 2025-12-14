import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ FIX HERE
import useAuth from "../../hooks/useAuth";
import { toastSuccess, toastError } from "../../utils/toast";

const Register = () => {
  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    photo: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(
        form.email,
        form.password,
        form.name,
        form.photo
      );

      toastSuccess("Registration successful 🎉");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login.");
        toastError("This email is already registered. Please login.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
        toastError("Password must be at least 6 characters.");
      } else {
        setError("Registration failed. Try again.");
        toastError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && (
        <p className="text-red-500 mb-3 text-sm">{error}</p>
      )}

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />

        <input
          name="photo"
          placeholder="Avatar URL"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-full">
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        onClick={googleLogin}
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
        Have any Account?{" "}
        <Link to="/auth/login" className="text-blue-500 font-medium">
          Go Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
