import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import styles from "../styles/myTask.module.css";
var moment = require("moment"); // require
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Modal,
  Button,
  List,
  Progress,
  Tooltip,
} from "antd";
import { userState, AllTask } from "../store/recoilState";
import { useRecoilState } from "recoil";
import Axios from "../config/axios.setup";
import { DeleteOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function CreateTask() {
  const [user, setUser] = useRecoilState(userState);
  const [form] = Form.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [percentTask, setPercentTask] = useRecoilState(AllTask);
  const dateFormat = "DD-MMM-YYYY";
  var getAllTask = [];
  useEffect(async () => {
    await Axios.get("/getAllPercentTask/" + user.userId.toString())
      .then((response) => {
        getAllTask = response.data;
        setPercentTask(getAllTask);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFinish = React.useCallback(
    (values) => {
      let startDate = values.perioddate[0]._d.toString().split(" ");
      let endDate = values.perioddate[1]._d.toString().split(" ");
      let newStartDate =
        startDate[2] + "-" + startDate[1].toUpperCase() + "-" + startDate[3];
      let newEndDate =
        endDate[2] + "-" + endDate[1].toUpperCase() + "-" + endDate[3];
      Axios.post("/insertNewTask", {
        taskName: values.task,
        startDate: newStartDate,
        endDate: newEndDate,
        taskOwnerId: user.userId,
      }).then(
        (response) => {
          // console.log(response.data.status);
          setTimeout(() => {
            setPending(false);
            setViewMode(true);
            if (response.data.status == "Task is Created") {
              Modal.success({
                title: "Success",
                content: response.data.status,
              });
              Axios.get("/getAllPercentTask/" + user.userId.toString())
                .then((response) => {
                  getAllTask = response.data;
                  setPercentTask(getAllTask);
                  //   console.log(getAllTask)
                  console.log(percentTask);
                })
                .catch((err) => {
                  console.error(err);
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
    },
    [percentTask]
  );

  const onReset = () => {
    form.resetFields();
  };

 

  function onDeleteTask(key) {
    // console.log(key);
    Axios.delete("/deleteTask/" + key.toString())
      .then((response) => {
        Axios.get("/getAllPercentTask/" + user.userId.toString())
          .then((response) => {
            getAllTask = response.data;
            setPercentTask(getAllTask);
            //   console.log(getAllTask)
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
    <Form layout="vertical" form={form} size="small" onFinish={handleFinish}>
      <Row gutter={[16, 0]} justify="center">
        <Col span={22}>
          <Form.Item
            className={styles.itemForm}
            name="task"
            label="Task"
            rules={[
              {
                required: true,
                message: "Please input Task!",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]} justify="center">
        <Col span={22}>
          <Form.Item
            className={styles.itemForm}
            name="perioddate"
            label="Period Date"
            rules={[
              {
                required: true,
                message: "Please input period date!",
              },
            ]}
            hasFeedback
          >
            <RangePicker size="small" format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={10}>
          <Form.Item
            className={styles.itemForm}
            name="createby"
            label="Create by"
          >
            <Input size="small" disabled placeholder={user.username} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row
            justify="space-around"
            align="bottom"
            className={styles.createButton}
          >
            <Form.Item>
              <Button
                type="primary"
                variant="secondary"
                htmlType="submit"
                className={styles.login_form_button}
                size="sm"
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                variant="secondary"
                className={styles.login_form_button}
                onClick={onReset}
                size="sm"
              >
                Cancel
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>

      <Row justify="center">
        <div className={styles.boxLeft}>
          <List
            header={
              <h6 className={styles.headerTaskList}>
                <b>Task List</b>
              </h6>
            }
            itemLayout="horizontal"
            dataSource={percentTask}
            renderItem={(item) => (
              <List.Item>
                <Col span={22}>
                  <Row className={styles.listTask} justify="space-between">
                    <Col>Task name: {item.task_name}</Col>
                    <Col>
                      <Button
                        type="text"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => onDeleteTask(item.task_id)}
                      />
                    </Col>
                  </Row>
                  <Row className={styles.listTask} justify="start">
                    <Col>
                      Start: {moment(item.start_date).format("DD-MMM-YYYY")}
                    </Col>
                    <Col> &nbsp;&nbsp;&nbsp;</Col>
                    <Col>
                      End: {moment(item.end_date).format("DD-MMM-YYYY")}
                    </Col>
                  </Row>
                  <Row className={styles.listTask}>
                    <Progress percent={item.total_percent} status="active" />
                  </Row>
                </Col>
              </List.Item>
            )}
          />
        </div>
      </Row>
    </Form>
  );
}
