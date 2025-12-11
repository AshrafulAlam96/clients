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
import StudentDashboardHome from "../pages/students/StudentDashboardHome";
import MyApplications from "../pages/students/MyApplications";
import MyReviews from "../pages/students/MyReviews";
import MyBookmarks from "../pages/students/MyBookmarks";
// import MyProfile from "../pages/students/MyProfile";

//? Admin
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboardHome from "../pages/admins/AdminDashboardHome";
import ManageScholarships from "../pages/admins/ManageScholarships";
import AddScholarship from "../pages/admins/AddScholarship";
import ManageUsers from "../pages/admins/ManageUsers";
import ManageReviews from "../pages/admins/ManageReviews";

//? Moderator
import ModeratorDashboardLayout from "../layouts/ModeratorDashboardLayout";
import ModeratorDashboardHome from "../pages/mods/ModeratorDashboardHome";
import ScholarshipApproval from "../pages/mods/ScholarshipApproval";
import ApplicationApproval from "../pages/mods/ApplicationApproval";
import ReviewModeration from "../pages/mods/ReviewModeration";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/",                  element: <Home /> },
      { path: "/scholarships",      element: <AllScholarships /> },
      { path: "/scholarships/:id",  element: <ScholarshipDetails />,},
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
  {
  path: "/dashboard/student",
  element: <StudentDashboardLayout />,
  children: [
      { path: "", element: <StudentDashboardHome /> },
      { path: "applications", element: <MyApplications /> },
      { path: "reviews", element: <MyReviews /> },
      { path: "bookmarks", element: <MyBookmarks /> }
      // { path: "profile", element: <MyProfile /> },
    ],
  },
  {
  path: "/dashboard/mod",
  element: <ModeratorDashboardLayout />,
  children: [
      { path: "", element: <ModeratorDashboardHome /> },
      { path: "scholarship-approval", element: <ScholarshipApproval /> },
      { path: "application-approval", element: <ApplicationApproval /> },
      { path: "review-moderation", element: <ReviewModeration /> },
    ],
  },
  {
  path: "/dashboard/admin",
  element: <AdminDashboardLayout />,
  children: [
    { path: "", element: <AdminDashboardHome /> },
    { path: "scholarships", element: <ManageScholarships /> },
    { path: "add-scholarship", element: <AddScholarship /> },
    { path: "users", element: <ManageUsers /> },
    { path: "reviews", element: <ManageReviews /> },
  ],
},
]);