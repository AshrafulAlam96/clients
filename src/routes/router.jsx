import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";   // ★ Added
// Future imports will go here:
// import AllScholarships from "../pages/AllScholarships";
// import ScholarshipDetails from "../pages/ScholarshipDetails";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // HOME PAGE
      {
        path: "/",
        element: <Home />,
      },

      // ALL SCHOLARSHIPS PAGE
      {
        path: "/scholarships",
        element: <div>All Scholarships Placeholder</div>, // will be replaced later
      },
    ],
  },
]);
