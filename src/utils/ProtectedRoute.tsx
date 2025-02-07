import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface User {
  isAuthenticated: boolean;
  role: string | undefined;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

const getCurrentUser = async (): Promise<User> => {
  // 模拟异步用户信息请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isAuthenticated: true, // 假设用户已登录
        role: 'admin', // 用户角色 'admin' 或 'user'
      });
    }, 500); // 模拟500毫秒的请求延迟
  });
};

// 路由守卫组件，检查用户是否有权限访问页面
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = false,
  allowedRoles = [],
  redirectTo = '/',
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  // 如果还在加载用户信息
  if (loading) {
    return <div>Loading...</div>; // 可以替换成更优雅的加载动画
  }

  // 如果需要认证，但用户未登录
  if (requireAuth && !user?.isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // 如果路由有角色限制，但用户角色不匹配
  if (
    allowedRoles.length > 0 &&
    user?.role &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 权限验证通过，渲染子组件
  return <>{children}</>;
};

export default ProtectedRoute;
