import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const RoutesComponent = (users, userRole) => {
  const ADMIN = "admin";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/login" element={<LoginPage />}></Route> */}
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
          path="/login"
          element={
            <ProtectedRoute
              requiredRole={ADMIN}
              userRole={userRole}
              element={<LoginPage />}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
