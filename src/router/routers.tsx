// routes.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/error/ErrorPage";
import AdminDashboard from "../pages/AdminDashboard ";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Error",
    element: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/user",
        element: (
          <ProtectedRoute requireAuth={true} allowedRoles={["user", "admin"]}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/home/admin",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute requireAuth={true} allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

const RouterConfig = () => {
  return <RouterProvider router={router} />;
};

export default RouterConfig;
