// routers.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load components to improve performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const AdminPage = lazy(() => import('@/pages/admin/AdminPage'));
const UserListPage = lazy(() => import('@/pages/admin/UserListPage'));
const ProtectedRoute = lazy(() => import('@/utils/ProtectedRoute'));
const SettingComponent = lazy(() => import('@/pages/setting/settingPage'));
const LayoutComponent = lazy(
  () => import('@/components/Layout/LayoutComponent'),
);
const UnauthorizedPage = lazy(() => import('@/pages/error/UnauthorizedPage'));

// Define routes in a separate constant for better maintainability
const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/error',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UnauthorizedPage />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LayoutComponent />
      </Suspense>
    ),
    children: [
      {
        path: '', // Default sub-path
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'user',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute requireAuth={true} allowedRoles={['user', 'admin']}>
              <UserListPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'admin',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute requireAuth={true} allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'setting',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute requireAuth={true} allowedRoles={['admin']}>
              <SettingComponent />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const RouterConfig = () => {
  return <RouterProvider router={router} />;
};

export default RouterConfig;
