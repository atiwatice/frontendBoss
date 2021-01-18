import React, { useState } from "react";
import styles from "../styles/myTask.module.css";
import { Row, Col, Form, Input, Select, List, Button } from "antd";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { SelectTask, AllTask, AllSubTask } from "../store/recoilState";
import Axios from "../config/axios.setup";
import { DeleteOutlined } from "@ant-design/icons";
import CreateSubTask from "./createSubTask";
var moment = require("moment"); // require
export default function SubTask() {
  const [percentTask, setPercentTask] = useRecoilState(AllTask);
  const [allsubTask, setAllSubTask] = useRecoilState(AllSubTask);
  const [taskSelectState, settaskSelectState] = useRecoilState(SelectTask);
  const [form] = Form.useForm();
  const { Option } = Select;

  const allTask = [];
  percentTask.forEach((value) =>
    allTask.push(<Option key={value.task_id}>{value.task_name}</Option>)
  );

  let getAllSubTask = [];
  function handleChange(value) {
    // console.log(`Selected: ${value}`);
    Axios.get("/getAllSubTask/" + value.toString())
      .then((response) => {
        getAllSubTask = response.data;
        setAllSubTask(getAllSubTask);
        settaskSelectState(value.toString());
        // console.log(getAllSubTask);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const onReset = () => {
    form.resetFields();
  };

  function onDeleteSubTask(key) {
    // console.log(key);
    Axios.delete("/deleteSubTask/" + key.toString())
      .then((response) => {
        Axios.get("/getAllSubTask/" + taskSelectState)
          .then((response) => {
            getAllSubTask = response.data;
            setAllSubTask(getAllSubTask);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={styles.allform}>
      <Row gutter={[16, 0]} justify="start">
        <Col span={22}>
          <Row className={styles.selectTask}>
            <Col>Select Task:&nbsp;</Col>
            <Col>
              <Select
                size="small"
                onChange={handleChange}
                style={{ width: 200 }}
              >
                {allTask}
              </Select>
            </Col>
          </Row>
          <Row>
            <div className={styles.boxRight}>
              <Row justify="center">
                <Col span={24}>
                  <List
                    header={
                      <h6 className={styles.headerTaskList}>
                        <b>Sub Task List</b>
                      </h6>
                    }
                    itemLayout="horizontal"
                    dataSource={allsubTask}
                    renderItem={(item) => (
                      <List.Item>
                        <Col span={22}>
                          <Row
                            className={styles.listTask}
                            justify="space-between"
                          >
                            <Col>Sub task name: {item.subTaskName}</Col>{" "}
                            <Col>
                              <Button
                                type="text"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                onClick={() => onDeleteSubTask(item.subTaskId)}
                              />
                            </Col>
                          </Row>
                          <Row className={styles.listTask} justify="start">
                            <Col>
                              Start:{" "}
                              {moment(item.startDate).format("DD-MMM-YYYY")}
                            </Col>
                            <Col> &nbsp;&nbsp;&nbsp;</Col>
                            <Col>
                              End: {moment(item.endDate).format("DD-MMM-YYYY")}
                            </Col>
                          </Row>
                          <Row className={styles.listTask} justify="start">
                            <Col>Assign To: {item.assignTo.username}</Col>
                          </Row>
                        </Col>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
              <Row>
              <span className={styles.dividerHori} />
              </Row>
              <Row className={styles.listTask}>
                <Col span={24}>
                  <CreateSubTask />
                </Col>
              </Row>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
