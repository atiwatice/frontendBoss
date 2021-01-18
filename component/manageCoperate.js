import React from "react";
import styles from "../styles/mangeCo.module.css";
import { Row, Col } from "antd";
import FindCollaborator from "./findCollaborator";
import RequestCollaborator from "./requestCollaborator";
import Collaborator from "./Collaborator";

export default function ManageCoperate() {
  return (
    <div className={styles.background}>
      <Row>
        <Col span={13} className={styles.leftrightTop}>
          <Row className={styles.findCollaboratorHeader}>Find Collaborator</Row>
          <Row  justify="center"><div className={styles.findCollaborator}><FindCollaborator/></div></Row>
          <Row className={styles.requestCollaboratorHeader}>Request Collaborator</Row>
          <Row justify="center"><div className={styles.requestCollaborator}><RequestCollaborator/></div></Row>
        </Col>
        <Col span={1}>
        <span className={styles.divider} />
        </Col>
        <Col className={styles.leftrightTop} span={10}>
          
          <Row className={styles.CollaboratorHeader}>Collaborator</Row>
          <Row ><div className={styles.Collaborator}><Collaborator/></div></Row>
        </Col>
      </Row>
    </div>
  );
}
