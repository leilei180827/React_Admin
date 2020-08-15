import React, { useState } from "react";
import { Card, Button, Table, Modal, Input, message, Space } from "antd";
import { formatDate } from "../../utils/formatDate";
import LinkButton from "../../components/link_button/link_button";
import AddOrEditUserForm from "./addOrEditUserForm";
export default function User() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const onUserDelete = (record) => {
    console.log("delete");
  };
  const onUserEdit = (record) => {
    console.log("edit");
    console.log(record);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  const title = (
    <Button onClick={() => setModalVisible(true)} type="primary">
      Add User
    </Button>
  );
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Registration",
      dataIndex: "registration_time",
      key: "registration_time",
      render: (time) => formatDate(time, "yyyy-MM-dd hh:mm:ss"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <LinkButton onClick={() => onUserEdit(record)}>Edit</LinkButton>
          <LinkButton onClick={() => onUserDelete(record)}>Delete</LinkButton>
        </Space>
      ),
    },
  ];

  return (
    <Card title={title}>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        bordered
        pagination={{ pageSize: 3 }}
      />
      <AddOrEditUserForm
        visible={modalVisible}
        handleCancel={handleModalCancel}
      />
    </Card>
  );
}
