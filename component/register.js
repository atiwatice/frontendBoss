import React, { Component, useState } from "react";
import styles from "../styles/Register.module.css";
import { Row, Col, Form, Input, Button, Divider, Modal } from "antd";
import Axios from "../config/axios.setup";
export default function Register() {
  const [form] = Form.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);

  const handleFinish = React.useCallback((values) => {
    Axios.post("/register", {
      username: values.username,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      address: values.address,
      email: values.email,
      mobileNo: values.mobileno,
    }).then(
      (response) => {
        // console.log(response.data.status);
        setTimeout(() => {
          setPending(false);
          setViewMode(true);
          if (response.data.status == "User created.") {
            Modal.success({
              title: "Success",
              content: response.data.status,
            });
          } else {
            Modal.error({ title: "Fail", content: response.data.status });
          }
          form.resetFields();
        }, 500);
      },
      (error) => {
        console.error(error);
        Modal.error({ title: "Fail", content: error });
      }
    );
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.background}>
      <Row>
        <h1 className={styles.topicRegister}>REGISTER</h1>
      </Row>
      <Row>
        <Divider className={styles.divider} />
      </Row>
      <Row>
        <Col span={24}>
          <Form
            className={styles.allform}
            layout="vertical"
            form={form}
            onFinish={handleFinish}
          >
            <Row gutter={[16, 0]}>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="firstname"
                  label="Firstname"
                  rules={[
                    {
                      message: "The input is not valid firsname!",
                    },
                    {
                      required: true,
                      message: "Please input your Firstname!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="lastname"
                  label="Lastname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Lastname!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={20}>
                <Form.Item
                className={styles.itemForm}
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                className={styles.itemForm}
                  name="mobileno"
                  label="Mobile no."
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile no.!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col span={10}></Col>
              <Col span={10}>
                <Row justify="space-around">
                  <Form.Item >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.login_form_button}
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className={styles.login_form_button}
                      onClick={onReset}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
