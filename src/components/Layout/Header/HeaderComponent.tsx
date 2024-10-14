import { useState } from "react";
import { Layout, Button, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTheme,
  toggleCollapse,
} from "@/modules/layout/actions/LayoutActions";
import { RootState } from "@/redux/store";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import enMessages from "@/locales/en-US.json";
import zhMessages from "@/locales/zh-CN.json";
import "@/styles/HeaderComponent.scss";

const messages = {
  "en-US": enMessages,
  "zh-CN": zhMessages,
};

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkTheme, collapsed } = useSelector(
    (state: RootState) => state.layout
  );
  const [currentLocale, setCurrentLocale] = useState<"en-US" | "zh-CN">(
    "en-US"
  );

  const changeLanguage = (lang: "en-US" | "zh-CN") => setCurrentLocale(lang);
  const menu = (
    <Menu
      items={[
        {
          key: "0",
          icon: <UserOutlined />,
          label: (
            <span>
              <FormattedMessage id="menu.home" defaultMessage="Home" />
            </span>
          ),
        },
        {
          key: "1",
          icon: <UserOutlined />,
          label: (
            <span onClick={() => navigate("/profile")}>
              <FormattedMessage id="menu.profile" defaultMessage="Profile" />
            </span>
          ),
        },
        {
          key: "2",
          icon: <LogoutOutlined />,
          label: (
            <span onClick={() => navigate("/logout")}>
              <FormattedMessage id="menu.logout" defaultMessage="Logout" />
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
      <Header
        className={isDarkTheme ? "header dark-theme" : "header light-theme"}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(toggleCollapse())}
        />
        <div className="header-title">
          <h3>
            <FormattedMessage
              id="header.dashboard"
              defaultMessage="Dashboard"
            />
          </h3>
        </div>
        <div className="header-controls">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => dispatch(toggleTheme())}
          >
            <FormattedMessage
              id="button.toggleTheme"
              defaultMessage="Toggle Theme"
            />
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => changeLanguage("en-US")}
          >
            English
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => changeLanguage("zh-CN")}
          >
            中文
          </Button>
          <Dropdown menu={{ menu }} trigger={["click"]}>
            <Button type="text" icon={<UserOutlined />}>
              Admin
            </Button>
          </Dropdown>
        </div>
      </Header>
    </IntlProvider>
  );
};

export default HeaderComponent;
