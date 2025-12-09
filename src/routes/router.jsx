import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/",                  element: <Home /> },
      { path: "/scholarships",      element: <AllScholarships /> },
      { path: "/scholarships/:id",  element: <ScholarshipDetails />,
},

    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);