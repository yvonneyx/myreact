import React from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { adminRoutes } from "../../routes"
import ebay from './ebay.png';
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow);
function Index(props) {
	return (
		<Layout>
			<Header className="header" style={{ backgroundColor: '#333' }}>
				<div className="logo">
					<img src={ebay} alt="logo" style={{ height: "32px" }} />
				</div>
			</Header>
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{ height: '100%', borderRight: 0 }}
					>
						{routes.map(route => {
							return (
								<Menu.Item key={route.key} icon={route.icon} onClick={() => props.history.push(route.path)}>
									{route.title}</Menu.Item>
							)
						})}
					</Menu>
				</Sider>
				<Layout style={{ padding: '16px' }}>
					<Content
						style={{
							background: '#fff',
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						{props.children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}

export default withRouter(Index)
