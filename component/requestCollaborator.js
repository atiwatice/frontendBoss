import React, { useState, useEffect } from "react";
import styles from "../styles/mangeCo.module.css";
import { Row, Col, Table, Space, Button } from "antd";
import { userState, AllUserSameCompany,AllCoperate } from "../store/recoilState";
import { useRecoilState } from "recoil";
import Axios from "../config/axios.setup";
const { Column } = Table;

export default function RequestCollaborator() {
  const [user, setUser] = useRecoilState(userState);
  const [userWaitConfirm, setUserWaitConfirm] = useState([]);
  const [userSameCompany, setUserSameCompany] = useRecoilState(
    AllUserSameCompany
  );
  const [userAllCoperator,setUserAllCoperator] =useRecoilState(AllCoperate);
  useEffect(async () => {
    await Axios.get("/getAllWaitConfirm/" + user.userId.toString())
      .then((response) => {
        let getAllTask = response.data;
        setUserWaitConfirm(getAllTask);
        // console.log(getAllTask);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function onAccept(key) {
    Axios.put("/confirmRequest/" + user.userId.toString() + "/" + key)
      .then((response) => {
        Axios.get("/getAllWaitConfirm/" + user.userId.toString())
          .then((response) => {
            let getAllTask = response.data;
            setUserWaitConfirm(getAllTask);

            Axios.get("/getUsersSameCompany/" + user.userId.toString())
              .then((response) => {
                let getAllTask = response.data;
                setUserSameCompany(getAllTask);
                // console.log(getAllTask);
              })
              .catch((err) => {
                console.error(err);
              });
              Axios.get("/getAllCoperate/" + user.userId.toString())
              .then((response) => {
                let getAllUser = response.data;
                setUserAllCoperator(getAllUser);
                // console.log(getAllUser);
        
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

  function onDecline(key) {
    Axios.delete("/deleteRequest/" + user.userId.toString() + "/" + key)
      .then((response) => {
        Axios.get("/getAllWaitConfirm/" + user.userId.toString())
          .then((response) => {
            let getAllTask = response.data;
            setUserWaitConfirm(getAllTask);
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
        dataSource={userWaitConfirm}
        pagination={false}
      >
        <Column
          title="Name"
          key="manageCoperateId"
          render={(text, record) => (
            <Space size="middle">
              <div>{record.requesterId.firstname}</div>
              <div>{record.requesterId.lastname}</div>
            </Space>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={() => onAccept(record.requesterId.username)}>
                Accept
              </Button>
              <Button onClick={() => onDecline(record.requesterId.username)}>
                Decline
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
