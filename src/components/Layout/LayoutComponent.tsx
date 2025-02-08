// LayoutComponent.tsx
import { useEffect, useState } from 'react';
import { Layout, Spin, ConfigProvider, theme, Breadcrumb } from 'antd';
import { Outlet, useNavigation, Link, useLocation } from 'react-router-dom';
import SidebarComponent from '@/components/Layout/Sidebar/SidebarComponent';
import HeaderComponent from '@/components/Layout/Header/HeaderComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCollapse } from '@/modules/layout/actions/LayoutActions';
import ErrorBoundary from '@/pages/error/ErrorBoundaryPage';
const { Content } = Layout;

const AppLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isDarkTheme, collapsed } = useSelector(
    (state: RootState) => state.layout,
  );
  const [loading, setLoading] = useState(false);

  const [autoCollapsed, setAutoCollapsed] = useState(false);
  const collapseThreshold = 768;

  const handleResize = () => {
    if (window.innerWidth < collapseThreshold && !collapsed) {
      setAutoCollapsed(true);
      dispatch(toggleCollapse());
    } else if (
      window.innerWidth >= collapseThreshold &&
      collapsed &&
      autoCollapsed
    ) {
      setAutoCollapsed(false);
      dispatch(toggleCollapse());
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [collapsed, autoCollapsed, dispatch]);

  useEffect(() => {
    setLoading(navigation.state === 'loading');
  }, [navigation.state]);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbItems = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    return {
      key: routeTo,
      title: isLast ? name : <Link to={routeTo}>{name}</Link>,
    };
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkTheme ? '#1890ff' : '#001529',
          borderRadius: 2,
        },
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderComponent />
        <Layout>
          <SidebarComponent role="admin" />
          <ErrorBoundary>
            <Content
              className={isDarkTheme ? 'dark-theme' : 'light-theme'}
              style={{ margin: '10px', flex: 1 }} // 确保 Content 占据剩余空间
            >
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={breadcrumbItems}
              />
              <Spin spinning={loading} tip="Loading...">
                <Outlet />
              </Spin>
            </Content>
          </ErrorBoundary>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
