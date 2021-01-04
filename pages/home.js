import Example from "../component/inner";
import React, { useState } from "react";
import { Button, Layout, Menu, Breadcrumb } from "antd";
import { handleAuthSSR } from "../utils/auth";
import HeaderComponent from "../component/header";
import styles from "../styles/Home.module.css";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout className={styles.container}>
      <Header className={styles.HeaderBackground}>
        <HeaderComponent />
      </Header>
      <Layout className={styles.siderList}>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

// Server-Side Rendering
Home.getInitialProps = async (ctx) => {
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. You can do that
  // with Router from 'next/router
  let result = await handleAuthSSR(ctx);

  // Must return an object
  return {};
};
