import React, { useState, useEffect } from "react";
import styles from "../styles/mangeCo.module.css";
import { Row, Col, Table, Space, Button } from "antd";
import {
  userState,
  AllUserSameCompany,
  AllCoperate,
} from "../store/recoilState";
import { useRecoilState } from "recoil";
import Axios from "../config/axios.setup";
const { Column } = Table;

export default function Collaborator() {
  const [user, setUser] = useRecoilState(userState);
  const [userAllCoperator, setUserAllCoperator] = useRecoilState(AllCoperate);
  const [userSameCompany, setUserSameCompany] = useRecoilState(
    AllUserSameCompany
  );
  useEffect(async () => {
    await Axios.get("/getAllCoperate/" + user.userId.toString())
      .then((response) => {
        let getAllUser = response.data;
        setUserAllCoperator(getAllUser);
        // console.log(getAllUser);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function onDelete(key) {
    Axios.delete("/deleteCoperate/" + user.userId.toString() + "/" + key)
      .then((response) => {
        //   console.log(key)
        Axios.get("/getAllCoperate/" + user.userId.toString())
          .then((response) => {
            let getAllUser = response.data;
            setUserAllCoperator(getAllUser);
            // console.log(getAllUser);
            Axios.get("/getUsersSameCompany/" + user.userId.toString())
              .then((response) => {
                let getAllTask = response.data;
                setUserSameCompany(getAllTask);
                // console.log(getAllTask);
              })
              .catch((err) => {
                console.error(err);
              });
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
        dataSource={userAllCoperator}
        pagination={false}
      >
        <Column
          title="Name"
          key="manageCoperateId"
          render={(text, record) => (
            <>
              {record.accepterId.userId == user.userId ? (
                <Space size="middle">
                  <div>{record.requesterId.firstname}</div>
                  <div>{record.requesterId.lastname}</div>
                </Space>
              ) : (
                <Space size="middle">
                  <div>{record.accepterId.firstname}</div>
                  <div>{record.accepterId.lastname}</div>
                </Space>
              )}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                onClick={() =>
                  onDelete(
                    record.accepterId.userId == user.userId
                      ? record.requesterId.username
                      : record.accepterId.username
                  )
                }
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
