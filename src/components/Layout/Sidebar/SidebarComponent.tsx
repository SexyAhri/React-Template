import { Layout, Menu, theme } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { toggleCollapse } from '@/modules/layout/actions/LayoutActions';
import '@/styles/SidebarComponent.scss';
import { RootState } from '@/redux/store';
const { useToken } = theme;
const { Sider } = Layout;
interface SidebarComponentProps {
  role: string;
}
const SidebarComponent: React.FC<SidebarComponentProps> = ({ role }) => {
  const { isDarkTheme, collapsed } = useSelector(
    (state: RootState) => state.layout,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { token } = useToken();

  const menuItems = useMemo(() => {
    const items = [
      {
        key: '1',
        icon: <HomeOutlined />,
        label: 'Home',
        path: '',
        onClick: () => navigate(''),
      },
      {
        key: '2',
        icon: <UserOutlined />,
        label: 'User Dashboard',
        children: [
          {
            key: '2-1',
            label: 'User Profile',
            path: 'User',
            onClick: () => navigate('user'),
          },
        ],
      },
    ];

    if (role === 'admin') {
      items.push(
        {
          key: '3',
          icon: <DashboardOutlined />,
          label: 'Admin Dashboard',
          path: 'Admin',
          onClick: () => navigate('admin'),
        },
        {
          key: '4',
          icon: <SettingOutlined />,
          label: 'Settings',
          path: 'Setting',
          onClick: () => navigate('setting'),
        },
      );
    }

    return items;
  }, [role]);
  useEffect(() => {
    const findCurrentKey = (items: any[], pathname: string): string | null => {
      for (const item of items) {
        if (item.path === pathname) {
          return item.key;
        }
        if (item.children) {
          const childKey = findCurrentKey(item.children, pathname);
          if (childKey) {
            return childKey;
          }
        }
      }
      return null;
    };

    const currentKey = findCurrentKey(menuItems, location.pathname);
    if (currentKey) {
      setSelectedKey([currentKey]);
    } else {
      setSelectedKey([]); // 确保在没有匹配项时重置 selectedKey
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkTheme.toString());
    localStorage.setItem('collapsed', collapsed.toString());
  }, [isDarkTheme, collapsed]);
  return (
    <Sider
      width={256}
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatch(toggleCollapse())}
      className={isDarkTheme ? 'dark-sidebar' : 'light-sidebar'}
    >
      <Menu
        selectedKeys={selectedKey}
        items={menuItems}
        mode="inline"
        style={{ backgroundColor: token.colorBgContainer }}
      />
    </Sider>
  );
};

export default SidebarComponent;
