// routes.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import ErrorPage from "@/pages/error/ErrorBoundaryPage";
import AdminPage from "@/pages/admin/AdminPage";
import UserListPage from "@/pages/admin/UserListPage";
import ProtectedRoute from "@/utils/ProtectedRoute";
import SettingComponent from "@/pages/setting/settingPage";
import LayoutComponent from "@/components/Layout/LayoutComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/home",
    element: <LayoutComponent />, // 使用带有导航栏的布局
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/index",
        element: <HomePage />,
      },
      {
        path: "/home/user",
        element: (
          <ProtectedRoute requireAuth={true} allowedRoles={["user", "admin"]}>
            <UserListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home/admin",
        element: (
          <ProtectedRoute requireAuth={true} allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home/setting",
        element: (
          <ProtectedRoute requireAuth={true} allowedRoles={["admin"]}>
            <SettingComponent />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/Error",
    element: <ErrorPage />,
  },
]);

const RouterConfig = () => {
  return <RouterProvider router={router} />;
};

export default RouterConfig;
