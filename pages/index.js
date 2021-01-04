import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout } from "antd";
import HeaderComponent from "../component/header";
import Register from "../component/register";
const { Header, Footer, Sider, Content } = Layout;
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../store/recoilState";
import React, { useState, Component, useEffect } from "react";


export default function RegisterPage() {
  const [loginstatus, setLoginstatus] = useRecoilState(loginState);

  const content = null

  useEffect(async () => {

    const content = loginstatus == "LOGOUT" ? <Register /> : <div></div>;
  });




  return (
    <Layout className={styles.container}>
      <Header className={styles.HeaderBackground}>
        <HeaderComponent />
      </Header>
      {/* <Content className={styles.ContentBackground} ><Register/></Content> */}
      <Content className={styles.ContentBackground}>{content}</Content>
      <Footer className={styles.FooterBackground}>About us</Footer>
    </Layout>
  );
}
