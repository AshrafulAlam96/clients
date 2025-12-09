import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser} = useAuth();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(result => console.log(result.user))
      .catch(error => console.log(error));
  };

  return (
    <div className="min-h-screen bg-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <label className="text-sm text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full bg-gray-100"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {/* Email */}
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full bg-gray-100"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="input input-bordered w-full bg-gray-100"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Submit */}
          <button type="submit" className="btn w-full bg-amber-700 text-white hover:bg-amber-800">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Signup */}
        <SocialLogin></SocialLogin>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-amber-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;