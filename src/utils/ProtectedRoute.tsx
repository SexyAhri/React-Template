import { Navigate } from "react-router-dom";

// 定义权限级别
const ADMIN = "admin";
const USER = "user";
const GUEST = "guest";

// 高阶组件 (HOC) 用于检查权限
const ProtectedRoute = ({ requiredRole, userRole, element }) => {
  if (!userRole || userRole === GUEST) {
    // 如果没有权限，重定向到登录页面
    return <Navigate to="/login" />;
  }

  if (requiredRole === ADMIN && userRole !== ADMIN) {
    // 如果需要管理员权限但不是管理员，重定向到首页
    return <Navigate to="/" />;
  }

  if (requiredRole === USER && userRole !== USER) {
    // 如果需要用户权限但不是用户，重定向到首页
    return <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;
