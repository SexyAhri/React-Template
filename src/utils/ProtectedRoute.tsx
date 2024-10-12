import { Navigate } from "react-router-dom";

// 定义权限级别
const ADMIN = "admin";
const USER = "user";

// 高阶组件 (HOC) 用于检查权限
const ProtectedRoute = ({ requiredRole, userRole, element }) => {
  const isLoggedIn = localStorage.getItem("token");
  // 检查是否已登录
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // 根据角色进行权限检查
  if (requiredRole === ADMIN && userRole !== ADMIN) {
    return <Navigate to="/user" />;
  }

  if (requiredRole === USER && userRole !== USER) {
    return <Navigate to="/home" />;
  }

  // 如果所有条件都不满足，则返回原始组件
  return element;
};

export default ProtectedRoute;
