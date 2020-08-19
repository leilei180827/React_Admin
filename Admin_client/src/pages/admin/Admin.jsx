import React, { useState } from "react";
import { Link, Redirect, Switch, Route } from "react-router-dom";

import { Layout, Menu, message } from "antd";

import logo from "../../assets/img/logo.png";
import "./admin.less";

import menus from "../../config/menus";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar/bar";
import Pie from "../charts/pie/pie";
import Line from "../charts/line/line";
import Not_Found from "../not_found/not_found";
import AdminHeader from "../../components/admin_header/admin_header";
import { connect } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Admin(props) {
  const permissions = props.user.detail_info.menus || [];
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  if (!props.user.token) {
    message.error("please login in first");
    props.history.replace("/login");
    return null;
  }
  const generateMenuList = (menulist) => {
    return menulist.map((item) => {
      let inMenus = false;
      permissions.indexOf(item.key) !== -1 && (inMenus = true);

      if (!inMenus && item.children) {
        item.children.map((child) => {
          if (permissions.indexOf(child.key) !== -1) {
            inMenus = true;
          }
        });
      }
      if (!inMenus) {
        return;
      }
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {generateMenuList(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="side-menu"
      >
        <div className="logo">
          <img src={logo} alt="logo" />
          <span className="first-title">React</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[props.location.pathname]}
          mode="inline"
        >
          {generateMenuList(menus)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <AdminHeader></AdminHeader>
        </Header>
        <Content style={{ padding: "20px", backgroundColor: "#5d6966" }}>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/category" component={Category}></Route>
            <Route path="/product" component={Product}></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/role" component={Role}></Route>
            <Route path="/charts/bar" component={Bar}></Route>
            <Route path="/charts/line" component={Line}></Route>
            <Route path="/charts/pie" component={Pie}></Route>
            <Redirect exact from="/admin" to="/home" />
            <Route component={Not_Found} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          React Admin System @2020 Designed By Leilei
        </Footer>
      </Layout>
    </Layout>
  );
}
const mapStateFromProps = (state) => ({
  user: state.user,
});
export default connect(mapStateFromProps, null)(Admin);
