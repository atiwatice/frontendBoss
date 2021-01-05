import React, { useState, Component, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link.js";
import { useRouter } from "next/router";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import {
  PageHeader,
  Row,
  Col,
  Popover,
  Form,
  Input,
  Button,
  Modal,
  Avatar,
  notification,
} from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "../config/axios.setup";
import { Cookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { userState, loginState } from "../store/recoilState";

export default function HeaderComponent() {
  const [form] = Form.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const cookies = new Cookies();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [loginstatus, setLoginstatus] = useRecoilState(loginState);
  let userData = null;

  const openNotificationWithIcon = (type) => {
    let messageA = "";
    let desscriptionA = "";
    if (type == "success") {
      messageA = "SUCCESS";
      desscriptionA = "LOGIN SUCCESS";
    } else if (type == "error") {
      messageA = "FAIL";
      desscriptionA = "Username or Password is invalid";
    }

    notification[type]({
      message: messageA,
      description: desscriptionA,
    });
  };

  const handleFinish = React.useCallback((values) => {
    Axios.post("/authenticate", {
      username: values.username,
      password: values.password,
    }).then(
      async (response) => {
        // console.log(response.data.token);
        await setTimeout(async () => {
          setPending(false);
          setViewMode(true);
          if (response.data.token != null) {
            openNotificationWithIcon("success");
            const token = await response.data.token;
            cookies.set("token", token);

            userData = await Axios.get("/getUsers/" + values.username, {
              headers: { Authorization: `Bearer ${token}` },
            });

            let userInfo = userData.data.Output;
            await setUser({
              userId: userInfo.userId,
              username: userInfo.username,
            });
            await setLoginstatus("LOGIN");
          }
          form.resetFields();
          router.push("/home");
        }, 500);
      },
      (error) => {
        // console.error(error);
        openNotificationWithIcon("error");
      }
    );
  }, []);

  useEffect(async () => {
    // Update the document title using the browser API
    let token = cookies.get("token");

    if (token != null && loginstatus == "LOGOUT") {
      const user = jwtDecode(token);
      userData = await Axios.get("/getUsers/" + user.sub, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let userInfo = userData.data.Output;
      await setUser({
        userId: userInfo.userId,
        username: userInfo.username,
      });
      await setLoginstatus("LOGIN");
    }
  });

  const login = (
    <Form className={styles.formBackground} form={form} onFinish={handleFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.login_form_button}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );

  const loginStatus = useRecoilValue(loginState);
  const userDetail = useRecoilValue(userState);

  const onLogOut = async () => {
    await cookies.remove("token");
    await setUser({ userId: 0, username: "" });
    await setLoginstatus("LOGOUT");
    await router.push("/");
  };

  const logout = (
    <div className={styles.logout}>
      <Row justify="space-around" align="middle" gutter={[16, 32]}>
        <Col span={10}>
          <Avatar size={60}>USER</Avatar>
        </Col>
        <Col span={14}>{userDetail.username}</Col>
      </Row>
      <Row align="middle" gutter={[16, 32]}>
        <Button
          type="primary"
          className={styles.login_form_button}
          onClick={onLogOut}
        >
          Log Out
        </Button>
      </Row>
    </div>
  );

  const content = loginStatus == "LOGOUT" ? login : logout;

  return (
    <PageHeader
      className={styles.HeaderBackground}
      title={
        <div className={styles.title}>
          <LoadingOutlined /> Workplan
        </div>
      }
      extra={
        <Row gutter={30} className={styles.headerTopic}>
          <Col>
            <Link href="/home">
              <div className={styles.headerTopic}>
                <div className={styles.pointer}>HOME</div>
              </div>
            </Link>
          </Col>
          <Col>
            <div className={styles.pointer}>About Us</div>
          </Col>
          <Col>
            <Popover placement="bottom" content={content} trigger="hover">
              <div className={styles.pointer}>Profile</div>
            </Popover>
            
          </Col>
        </Row>
      }
    />
  );
}
