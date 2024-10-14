import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "@/styles/SidebarComponent.scss";

const { Sider } = Layout;

const SidebarComponent = ({ role }) => {
  const { isDarkTheme, collapsed } = useSelector((state) => state.layout); // 从 Redux 获取状态
  const navigate = useNavigate();

  const getMenuItems = (role) => {
    const menuItems = [
      {
        key: "1",
        icon: <HomeOutlined />,
        label: "Home",
        onClick: () => navigate("/home/index"),
      },
      {
        key: "2",
        icon: <UserOutlined />,
        label: "User Dashboard",
        children: [
          {
            key: "2-1",
            label: "User Profile",
            onClick: () => navigate("/home/user/profile"),
          },
          {
            key: "2-2",
            label: "User Settings",
            onClick: () => navigate("/home/user/settings"),
          },
        ],
      },
    ];

    if (role === "admin") {
      menuItems.push(
        {
          key: "3",
          icon: <DashboardOutlined />,
          label: "Admin Dashboard",
          onClick: () => navigate("/home/admin"),
        },
        {
          key: "4",
          icon: <SettingOutlined />,
          label: "Settings",
          onClick: () => navigate("/home/setting"),
        }
      );
    }

    return menuItems;
  };

  const menuItems = getMenuItems(role);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={isDarkTheme ? "dark-sidebar" : "light-sidebar"}
    >
      <div className="logo">Admin Panel</div>
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
    </Sider>
  );
};

export default SidebarComponent;
