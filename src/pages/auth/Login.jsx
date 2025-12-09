import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, formState: { errors },} = useForm();

  const { signInUser } = useAuth();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
    })
  };

  return (
      <div className="bg-lime-100 rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full bg-gray-100"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Submit */}
          <button type="submit" className="btn w-full bg-amber-700 text-white hover:bg-amber-800">
            Login
          </button>
        </form>
      </div>
  );
};

export default Login;