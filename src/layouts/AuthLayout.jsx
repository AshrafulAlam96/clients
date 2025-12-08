import React from "react";
import { Outlet } from "react-router-dom"; // ✅ use react-router-dom
import Logo from "../assets/logo_01.png";
import authImg from "../assets/auth_01.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side: Logo + Outlet */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <img src={Logo} alt="ScholarStream Logo" className="w-50 mb-6" />

        {/* Auth form will render here */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right side: Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-base-200">
        <img src={authImg} alt="Auth Illustration" className="max-w-md" />
      </div>
    </div>
  );
};

export default AuthLayout;