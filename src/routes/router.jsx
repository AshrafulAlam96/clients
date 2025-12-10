import { createBrowserRouter } from "react-router-dom";

//? Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";

//? Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

//? Common 
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";

//? Student
// import StudentDashboardHome from "../pages/students/StudentDashboardHome";
// import MyApplications from "../pages/students/MyApplications";
// import MyReviews from "../pages/students/MyReviews";
// import MyProfile from "../pages/students/MyProfile";


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