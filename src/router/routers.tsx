import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard ";

const RoutesComponent = (users, userRole) => {
  const ADMIN = "admin";
  const USER = "user";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        {Array.isArray(users) && users.length > 0
          ? users.map((user) => (
              <Route
                key={user.id}
                path={`/user/${user.id}`}
                element={<h1>{user.id}</h1>}
              ></Route>
            ))
          : null}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              requiredRole={ADMIN}
              userRole={userRole}
              element={<AdminDashboard />}
            />
          }
        ></Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute
              requiredRole={USER}
              userRole={userRole}
              element={<UserDashboard />}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
