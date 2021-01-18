import React, { useState, useEffect } from "react";
import styles from "../styles/myTask.module.css";
import { Row, Col, Form, Input, DatePicker, Select } from "antd";
import CreateTask from "./createTask";
import SubTask from "./subTask";

export default function MyTask() {
  return (
    <div className={styles.background}>
      <Row>
        <Col span={12} className={styles.leftrightTop}>
          <CreateTask />
        </Col>
        <Col span={1}>
        <span className={styles.divider} />
        </Col>
        <Col className={styles.leftrightTop} span={11}>
          <SubTask/>
        </Col>
      </Row>
    </div>
  );
}
