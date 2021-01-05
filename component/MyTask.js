import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/myTask.module.css";
import { Row, Col } from "antd";

export default function MyTask() {
  return (
    <div className={styles.background}>
        <Col span={24}>
      <Row gutter={[40, 16]}>
        <Col span={10}>col-12</Col>
        <Col span={10}>col-12</Col>
      </Row>
      </Col>
    </div>
  );
}
