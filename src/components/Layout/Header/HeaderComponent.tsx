import { useState } from 'react';
import { Layout, Dropdown, Switch, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/modules/layout/actions/LayoutActions';
import { RootState } from '@/redux/store';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from 'react-intl';
import enMessages from '@/locales/en-US.json';
import zhMessages from '@/locales/zh-CN.json';
import type { MenuProps } from 'antd';
import '@/styles/HeaderComponent.scss';
const messages = {
  'en-US': enMessages,
  'zh-CN': zhMessages,
};

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkTheme } = useSelector((state: RootState) => state.layout);
  const [currentLocale, setCurrentLocale] = useState<'en-US' | 'zh-CN'>(
    'en-US',
  );

  const changeLanguage = (lang: 'en-US' | 'zh-CN') => setCurrentLocale(lang);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Home',
      icon: <SettingOutlined />,
      onClick: () => navigate(''),
    },
  ];

  return (
    <IntlProvider
      locale={currentLocale}
      messages={messages[currentLocale] as Record<string, string>}
    >
      <Header
        className={isDarkTheme ? 'header dark-theme' : 'header light-theme'}
      >
        <div className="header-title">
          <h3>
            <FormattedMessage
              id="header.dashboard"
              defaultMessage="Dashboard"
            />
          </h3>
        </div>
        <div className="header-controls">
          <div className="switch-group">
            <Switch
              checkedChildren="🌛"
              unCheckedChildren="🔆"
              checked={isDarkTheme}
              onChange={() => dispatch(toggleTheme())}
            />
            <Switch
              checkedChildren="EN"
              unCheckedChildren="中文"
              checked={currentLocale === 'en-US'}
              onChange={(checked) =>
                changeLanguage(checked ? 'en-US' : 'zh-CN')
              }
            />
          </div>

          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <UserOutlined />
              <Space>Admin</Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </IntlProvider>
  );
};

export default HeaderComponent;
