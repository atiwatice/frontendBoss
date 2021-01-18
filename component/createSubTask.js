import React, { useState, useEffect } from "react";
import styles from "../styles/myTask.module.css";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Divider,
} from "antd";

import { userState, SelectTask, AllSubTask,AllCoperate } from "../store/recoilState";
import { useRecoilState } from "recoil";
import Axios from "../config/axios.setup";

const { RangePicker } = DatePicker;

export default function CreateSubTask() {
  const [form2] = Form.useForm();
  const dateFormat = "DD-MMM-YYYY";
  const { Option } = Select;
  const [user, setUser] = useRecoilState(userState);
  const [allcoperate, setAllcoperate] = useRecoilState(AllCoperate);
  const [selectAssignUser, setSelectAssignUser] = useState();
  const [taskSelectState, settaskSelectState] = useRecoilState(SelectTask);
  const [allsubTask, setAllSubTask] = useRecoilState(AllSubTask);

  var getAllCoperate = [];
  useEffect(async () => {
    await Axios.get("/getAllCoperate/" + user.userId.toString())
      .then((response) => {
        getAllCoperate = response.data;
        setAllcoperate(getAllCoperate);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let overallCoperate = [];
  allcoperate.forEach((value) => {
    if (value.accepterId.userId != user.userId) {
      overallCoperate.push(
        <Option key={value.accepterId.userId}>
          {value.accepterId.username}
        </Option>
      );
    } else {
      overallCoperate.push(
        <Option key={value.requesterId.userId}>
          {value.requesterId.username}
        </Option>
      );
    }
  });

  function handleChange(value) {
    setSelectAssignUser(value);
    // console.log(`Selected: ${selectAssignUser}`);
  }

  const onReset = () => {
    // console.log(user);
    // console.log(overallCoperate);
    form2.resetFields();
  };

  const handleFinish1 = React.useCallback((values) => {
    console.log(values);
    let startDate = values.perioddateSub[0]._d.toString().split(" ");
    let endDate = values.perioddateSub[1]._d.toString().split(" ");
    let newStartDate =
      startDate[2] + "-" + startDate[1].toUpperCase() + "-" + startDate[3];
    let newEndDate =
      endDate[2] + "-" + endDate[1].toUpperCase() + "-" + endDate[3];

    Axios.post("/insertNewSubTask", {
      subTaskName: values.subtask,
      startDate: newStartDate,
      endDate: newEndDate,
      assignTo: parseInt(values.assignto),
      taskId: taskSelectState,
    }).then(
      (response) => {
        // console.log(response.data.status);
        setTimeout(() => {
          if (response.data.status == "New sub Task is inserted") {
            Axios.get("/getAllSubTask/" + taskSelectState)
              .then((response) => {
                setAllSubTask(response.data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
          }
          form2.resetFields();
        }, 500);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <Form layout="vertical" form={form2} size="small" onFinish={handleFinish1}>
      <Row gutter={[16, 0]} justify="center">
        <Col span={24}>
          <Form.Item
            className={styles.itemFormSubTask}
            name="subtask"
            label="Sub Task"
            rules={[
              {
                required: true,
                message: "Please input Sub Task!",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]} justify="center">
        <Col span={24}>
          <Form.Item
            className={styles.itemFormSubTask}
            name="perioddateSub"
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
      <Row gutter={[16, 0]} justify="center">
        <Col span={24}>
          <Form.Item
            className={styles.itemFormSubTask}
            name="assignto"
            label="Assign To"
            rules={[
              {
                required: true,
                message: "Please input Assign To!",
              },
            ]}
          >
            <Select size="small" onChange={handleChange} style={{ width: 200 }}>
              {overallCoperate}
            </Select>
          </Form.Item>
        </Col>
      </Row>
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
    </Form>
  );
}
