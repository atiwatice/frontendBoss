import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout } from "antd";
import HeaderComponent from "../component/header";
import Register from "../component/register";
const { Header, Footer, Sider, Content } = Layout;
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../store/recoilState";
import React, { useState, Component, useEffect, useRef } from "react";

export default function RegisterPage() {
  const [loginstatus, setLoginstatus] = useRecoilState(loginState);
  const lastestLoginStatus = useRef(loginstatus);

  useEffect(() => {
    lastestLoginStatus.current = loginstatus;
  }, [loginstatus]);

  useEffect(() => {});

  return (
    <Layout className={styles.container}>
      <Header className={styles.HeaderBackground}>
        <HeaderComponent />
      </Header>
      {/* <Content className={styles.ContentBackground} ><Register/></Content> */}
      <Content className={styles.ContentBackground}>
        {loginstatus === "LOGIN" ? <div></div> : <Register />}
      </Content>
      <Footer className={styles.FooterBackground}>About us</Footer>
    </Layout>
  );
}
