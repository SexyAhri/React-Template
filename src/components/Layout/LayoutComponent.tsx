// AppLayout.tsx
import React, { useEffect, useState } from "react";
import { Layout, Spin, ConfigProvider, theme } from "antd";
import { Outlet, useNavigation } from "react-router-dom";
import SidebarComponent from "@/components/Layout/Sidebar/SidebarComponent";
import HeaderComponent from "@/components/Layout/Header/HeaderComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const { Content } = Layout;

const AppLayout = () => {
  const navigation = useNavigation();
  const { isDarkTheme, collapsed } = useSelector(
    (state: RootState) => state.layout
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(navigation.state === "loading");
  }, [navigation.state]);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: isDarkTheme ? "#1890ff" : "#001529" },
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <SidebarComponent role="admin" />
        <Layout>
          <HeaderComponent />
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
