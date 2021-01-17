import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Dropdown, Avatar, message, Badge } from "antd";
import { connect } from "react-redux";
import { adminRoutes } from "../../routes";
import ebay from "./ebay.png";
import { DownOutlined } from "@ant-design/icons";
import "./frame.css";
import { clearToken } from "../../utils/auth";
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter((route) => route.isShow);

function Index(props) {
  console.log(props);
  const popMenu = (
    <Menu
      onClick={(p) => {
        if (p.key === "logout") {
          clearToken();
          props.history.push("/login");
        } else if ((p.key = "notification")) {
          props.history.push("/admin/notices");
        } else {
          message.info(p.key);
        }
      }}
    >
      <Menu.Item key="notification">Notification</Menu.Item>
      <Menu.Item key="setting">Setting</Menu.Item>
      <Menu.Item key="logout">Log out</Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src={ebay} alt="logo" style={{ height: "32px" }} key="logo" />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar style={{ color: "#fff", backgroundColor: "#0cb4b3" }}>
              U
            </Avatar>
            <Badge dot={!props.notice.isAllRead}>
              <span> Super Admin</span>
            </Badge>
            <DownOutlined />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map((route) => {
              return (
                <Menu.Item
                  key={route.key}
                  icon={route.icon}
                  onClick={() => props.history.push(route.path)}
                >
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          <Content
            style={{
              background: "#fff",
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
  );
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Index));
