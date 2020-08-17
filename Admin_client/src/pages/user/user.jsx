import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Input, message, Space } from "antd";
import { formatDate } from "../../utils/formatDate";
import LinkButton from "../../components/link_button/link_button";
import AddOrEditUserForm from "./addOrEditUserForm";
import { getUsersAPI, deleteUserAPI } from "../../network/user";
export default function User() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState({});
  const onUserDelete = (record) => {
    deleteUserAPI({ id: record._id })
      .then(({ data }) => {
        data.success &&
          message.success(data.message) &&
          updateUsers(record, "delete");
        !data.success && message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
  };
  useEffect(() => {
    initialUsers();
  }, []);
  const initialUsers = () => {
    getUsersAPI()
      .then(({ data }) => {
        data.success && setUsers(data.users);
        !data.success && message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
  };
  const onUserEdit = (record) => {
    setEditUser(record);
    setModalVisible(true);
  };
  const handleModalCancel = () => {
    setEditUser({});
    setModalVisible(false);
  };
  const title = (
    <Button onClick={() => setModalVisible(true)} type="primary">
      Add User
    </Button>
  );
  const updateUsers = (target, type) => {
    let tempList = [...users];
    switch (type) {
      case "add":
        tempList.push(target);
        break;
      case "delete":
        tempList = tempList.filter((item) => item._id !== target._id);
        break;
      case "edit":
        tempList = tempList.map((item) =>
          item._id === target._id ? target : item
        );
        break;
      default:
        break;
    }
    setModalVisible(false);
    setUsers(tempList);
  };
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
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Registration",
      dataIndex: "createdAt",
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
        updateUsers={updateUsers}
        user={editUser}
      />
    </Card>
  );
}
