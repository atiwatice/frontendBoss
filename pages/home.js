import MyTask from "../component/MyTask";
import React, { useState } from "react";
import { Layout } from "antd";
import { handleAuthSSR } from "../utils/auth";
import HeaderComponent from "../component/header";
import styles from "../styles/Home.module.css";
import { Button, Tab, Row, Col, ListGroup } from "react-bootstrap";
import ManageCoperate from "../component/manageCoperate";
import Profile from "../component/profile";

const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout className={styles.container}>
      <Header className={styles.HeaderBackground}>
        <HeaderComponent />
      </Header>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#MT">
        <Row>
          <Col sm={2}>
            <ListGroup className={styles.siderList}>
              <ListGroup.Item action href="#MT" variant="light">
                My Task
              </ListGroup.Item>
              <ListGroup.Item action href="#UMT" variant="light">
                Update Task Status
              </ListGroup.Item>
              <ListGroup.Item action href="#MC" variant="light">
                Manage Collaborators
              </ListGroup.Item>
              <ListGroup.Item action href="#RE" variant="light">
                Report
              </ListGroup.Item>
              <ListGroup.Item action href="#PR" variant="light">
                Profile
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="#MT">
                <MyTask />
              </Tab.Pane>
              <Tab.Pane eventKey="#UMT">
                <div>Update</div>
              </Tab.Pane>
              <Tab.Pane eventKey="#MC">
                <ManageCoperate />
              </Tab.Pane>
              <Tab.Pane eventKey="#RE">
                <div>Report</div>
              </Tab.Pane>
              <Tab.Pane eventKey="#PR">
                <Profile/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
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
