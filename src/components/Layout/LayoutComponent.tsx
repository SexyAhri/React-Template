import React, { useEffect, useState } from "react";
import { Layout, Spin, ConfigProvider, theme } from "antd";
import { Outlet, useNavigation } from "react-router-dom";
import SidebarComponent from "@/components/Layout/Sidebar/SidebarComponent";
import HeaderComponent from "@/components/Layout/Header/HeaderComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleCollapse } from "@/modules/layout/actions/LayoutActions";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const { Content } = Layout;

const AppLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isDarkTheme, collapsed } = useSelector(
    (state: RootState) => state.layout
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapsed, autoCollapsed, dispatch]);

  const handleToggle = () => {
    setAutoCollapsed(false);
    dispatch(toggleCollapse());
  };

  useEffect(() => {
    setLoading(navigation.state === "loading");
  }, [navigation.state]);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: isDarkTheme ? "#1890ff" : "#001529" },
        borderRadius: 2,
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderComponent />
        <Layout>
          <SidebarComponent role="admin" />
          <Content className={isDarkTheme ? "dark-theme" : "light-theme"}>
            <Spin spinning={loading} tip="Loading...">
              <Outlet />
            </Spin>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
