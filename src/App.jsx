import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { HomeOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

import './App.css'

const { Header, Content, Sider } = Layout;

const items = [
  { key: 1, label: (<Link to='/'>Home</Link>), icon: <HomeOutlined /> },
  { key: 2, label: (<Link to='customers'>Customers</Link>), icon: <UserOutlined /> },
  { key: 3, label: (<Link to='orders'>Orders</Link>), icon: <PieChartOutlined /> },
];

const App = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={menuCollapsed} onCollapse={(value) => setMenuCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content className='content'>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="App">
            <div>
              <a href="https://vitejs.dev" target="_blank" rel='noreferrer'>
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
            </div>
            <Typography.Title level={1}>Database Project</Typography.Title>

            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;