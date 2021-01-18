import React, { useState, useEffect } from "react";
import styles from "../styles/mangeCo.module.css";
import { Row, Col, Table, Space, Button } from "antd";
import { userState,AllUserSameCompany } from "../store/recoilState";
import { useRecoilState } from "recoil";
import Axios from "../config/axios.setup";
const { Column } = Table;

export default function FindCollaborator() {
  const [user, setUser] = useRecoilState(userState);
  const [userSameCompany, setUserSameCompany] = useRecoilState(AllUserSameCompany);
  useEffect(async () => {
    await Axios.get("/getUsersSameCompany/" + user.userId.toString())
      .then((response) => {
        let getAllTask = response.data;
        setUserSameCompany(getAllTask);
        // console.log(getAllTask);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function onRequest(key) {
    Axios.post("/requestCoperate", {
      requesterId: user.userId,
      accepterId: key,
    })
      .then((response) => {
        Axios.get("/getUsersSameCompany/" + user.userId.toString())
          .then((response) => {
            let getAllTask = response.data;
            setUserSameCompany(getAllTask);
            console.log(getAllTask);
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
    <div style={{ height: "100%" }}>
      <Table
        scroll={{ y: 183 }}
        dataSource={userSameCompany}
        pagination={false}
      >
        <Column
          title="Name"
          key="userId"
          render={(text, record) => (
            <Space size="middle">
              <div>{record.firstname}</div>
              <div>{record.lastname}</div>
            </Space>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={() => onRequest(record.userId)}>Request</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
