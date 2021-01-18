import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/profile.module.css";
import { Row, Col, Form, Button, Modal } from "antd";
import Axios from "../config/axios.setup";
import { userState, SelectTask, AllSubTask } from "../store/recoilState";
import { useRecoilState } from "recoil";
import FormBuilder from "antd-form-builder";

export default function Profile() {
  const [user, setUser] = useRecoilState(userState);
  const [userProfile, setUserProfile] = useState();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [pending2, setPending2] = useState(false);

  const handleFinish = React.useCallback(async (values) => {
    // console.log(values);
    await Axios.get("/getCompanies/" + values.companyName.toString())
      .then((response) => {
        Axios.put("/putUserID/" + user.userId.toString(), {
          username: values.username,
          firstname: values.firstname,
          lastname: values.lastname,
          mobileNo: values.mobileNo,
          address: values.address,
          companyId: response.data.Output.companyId,
          email: values.email,
        }).then(
          (response) => {
            // console.log(response.data.status);
            setTimeout(async () => {
              if (response.data.status == "Update complete") {
                await Modal.success({
                  title: "Success",
                  content: "Profile updated success.",
                  onOk: hideModal,
                });
                await Axios.get("/getUsers/" + user.username.toString())
                  .then((response) => {
                    let data = response.data.Output;
                    setUserProfile({
                      username: data.username,
                      firstname: data.firstname,
                      lastname: data.lastname,
                      address: data.address,
                      mobileNo: data.mobileNo,
                      email: data.email,
                      companyName: data.companyId.companyName,
                    });
                    // getAllCoperate = response.data;
                    // setAllcoperate(getAllCoperate);
                  })
                  .catch((err) => {
                    console.error(err);
                  });

                await setViewMode(true);
              } else {
              }
              form1.resetFields();
            }, 500);
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFinishModal = useCallback(
    (values) => {
      setPending2(true);
      //   console.log("submit: ", values);
      setTimeout(() => {
        setPending2(false);

        Axios.post("/addCompany", {
          companyName: values.companyName,
          companyDetail: values.companyDetail,
        }).then(
          (response) => {
            // console.log(response.data.status);
            setTimeout(async () => {
              if (response.data.status == "This company already exist.") {
                Modal.warning({
                  title: "Warning",
                  content: "This company already exist.",
                  onOk: hideModal,
                });
              } else {
                await Axios.get("/getCompanies")
                  .then((response) => {
                    let companyData = response.data;
                    let compantListArr = [];
                    setCompanyList([]);
                    companyData.forEach((value) => {
                      compantListArr.push(value.companyName);
                    });

                    setCompanyList(compantListArr);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                await Modal.success({
                  title: "Success",
                  content: "New Company added.",
                  onOk: hideModal,
                });
              }
              form2.resetFields();
            }, 500);
          },
          (error) => {
            console.error(error);
          }
        );
      }, 1000);
    },
    [setPending2, hideModal]
  );

  useEffect(async () => {
    await Axios.get("/getUsers/" + user.username.toString())
      .then((response) => {
        let data = response.data.Output;
        // console.log(data);
        setUserProfile({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          mobileNo: data.mobileNo,
          email: data.email,
          companyName: data.companyId.companyName,
        });
        // getAllCoperate = response.data;
        // setAllcoperate(getAllCoperate);
      })
      .catch((err) => {
        console.error(err);
      });

    await Axios.get("/getCompanies")
      .then((response) => {
        let companyData = response.data;
        let compantListArr = [];
        setCompanyList([]);
        companyData.forEach((value) => {
          compantListArr.push(value.companyName);
        });

        setCompanyList(compantListArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getMeta = () => {
    const meta = {
      columns: 2,
      disabled: pending,
      initialValues: userProfile,
      fields: [
        { key: "username", label: "Username", required: true },
        { key: "email", label: "Email", required: true },
        { key: "firstname", label: "First name", required: true },
        { key: "lastname", label: "Last name", required: true },
        { key: "address", label: "Address", required: true },
        { key: "mobileNo", label: "Mobile No", required: true },
        {
          key: "companyName",
          label: "Company Name",
          widget: "select",
          options: companyList,
        },
      ],
    };
    return meta;
  };

  const metaModal = {
    disabled: pending2,
    fields: [
      { key: "companyName", label: "Company Name", required: true },
      { key: "companyDetail", label: "Company Detail" },
    ],
  };

  return (
    <div className={viewMode ? styles.background1 : styles.background2}>
      <div>
        <Form
          layout="horizontal"
          form={form1}
          className={styles.styleForm}
          onFinish={handleFinish}
        >
          <h3>
            Personal Infomation
            {viewMode && (
              <Button
                type="link"
                onClick={() => setViewMode(false)}
                style={{ float: "right" }}
              >
                Edit
              </Button>
            )}
          </h3>
          <FormBuilder form={form1} getMeta={getMeta} viewMode={viewMode} />
          {!viewMode && (
            <Col span={24}>
              <Row>
                <Form.Item
                  label="Add Company"
                  className={styles.FormAddcompany}
                  FormAddcompany
                >
                  <Button type="link" onClick={showModal}>
                    Add
                  </Button>
                  <Modal
                    title="Add New Company"
                    closable={!pending2}
                    maskClosable={!pending2}
                    visible={modalVisible}
                    destroyOnClose
                    onOk={() => {
                      form2.submit();
                    }}
                    onCancel={hideModal}
                    okText={pending2 ? "Loading..." : "Ok"}
                    okButtonProps={{ loading: pending2, disabled: pending2 }}
                    cancelButtonProps={{ disabled: pending2 }}
                  >
                    <Form form={form2} onFinish={handleFinishModal}>
                      <FormBuilder meta={metaModal} form={form2} />
                    </Form>
                  </Modal>
                </Form.Item>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item className="form-footer" wrapperCol={{ span: 16 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      disabled={pending}
                      className={styles.buttonC}
                    >
                      {pending ? "Updating..." : "Update"}
                    </Button>

                    <Button
                      onClick={() => {
                        form1.resetFields();
                        setViewMode(true);
                      }}
                      className={styles.buttonC}
                      style={{ marginLeft: "15px" }}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
        </Form>
      </div>
    </div>
  );
}
