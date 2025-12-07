import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div>Hello World (Home Placeholder)</div>,
      },
      {
        path: "/scholarships",
        element: <div>All Scholarships Placeholder</div>,
      },
    ],
  },
]);
