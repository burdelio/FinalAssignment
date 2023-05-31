import { useContext, useState } from 'react';
import { Breadcrumb, Button, Layout, Menu, Typography, theme } from 'antd';
import { HomeOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, Link, Outlet } from 'react-router-dom';
import AuthContext from './providers/Auth';
import dbimg from './db.png'

const { Header, Content, Sider } = Layout;

const items = [
    { key: '/', label: (<Link to='/'>Home</Link>), icon: <HomeOutlined /> },
    { key: '/customers', label: (<Link to='customers'>Customers</Link>), icon: <UserOutlined /> },
    { key: '/orders', label: (<Link to='orders'>Orders</Link>), icon: <PieChartOutlined /> },
];

const MainLayout = () => {
    const { pathname: currentPath } = useLocation();
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { toggleLoggedIn } = useContext(AuthContext);

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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button className='logoutbutton' type="primary" onClick={toggleLoggedIn}>Log out</Button>
                </Header>
                <Content className='content'>
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Database</Breadcrumb.Item>
                        <Breadcrumb.Item>Project</Breadcrumb.Item>
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
}

export default MainLayout;