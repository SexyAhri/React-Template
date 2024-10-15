import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { toggleCollapse } from "@/modules/layout/actions/LayoutActions";
import "@/styles/SidebarComponent.scss";

const { Sider } = Layout;

const SidebarComponent = ({ role }) => {
  const { isDarkTheme, collapsed } = useSelector((state) => state.layout); // 从 Redux 获取状态
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState([]);
  const dispatch = useDispatch();

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
        items: [
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

  useEffect(() => {
    const currentKey = menuItems.find((item) =>
      location.pathname.includes(item.key)
    );
    if (currentKey) {
      setSelectedKey([currentKey.key]);
    }
  }, [location.pathname, menuItems]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatch(toggleCollapse())}
      className={isDarkTheme ? "dark-sidebar" : "light-sidebar"}
    >
      <Menu selectedKeys={selectedKey} items={menuItems} />
    </Sider>
  );
};

export default SidebarComponent;
