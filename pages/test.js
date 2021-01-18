import Example from "../component/inner";
import React, { useState } from 'react';
import { Form, Button, Input, Divider } from "antd";
import { handleAuthSSR } from '../utils/auth';
import CreateSubTask from "../component/createSubTask";

export default function Test() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [form1, form2] = Form.useForm();
  function handleFinish1(values) {
    console.log("VALUES", values);
    alert("Check console for values");
  }
  function handleFinish2(values) {
    console.log("VALUES", values);
    alert("Check console for values");
  }

  return (
    <div>
    <p>About Next.js</p>
    <Form form={form1}  onFinish={handleFinish1}>
        <Form.Item
          name="first"
          label="Persistent Field"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Divider dashed>Additional Fields</Divider>
        {/* <DynamicField /> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Form form={form2}  onFinish={handleFinish2}>
        <Form.Item
          name="first"
          label="Persistent Field"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Divider dashed>Additional Fields</Divider>
        {/* <DynamicField /> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

  </div>
  );
}

