import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Input, message } from "antd";
import PermissionRoleForm from "./permissionRoleForm";
import { addRoleAPI, getRolesAPI } from "../../network/role";
import { formatDate } from "../../utils/formatDate";

import "./role.less";
export default function Role() {
  const [permissionDisabled, setPermissionDisabled] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const title = (
    <div className="role-title">
      <Button
        type="primary"
        className="role-title-create"
        onClick={() => setCreateModalVisible(true)}
      >
        create role
      </Button>
      <Button
        type="primary"
        className="role-title-permission"
        disabled={permissionDisabled}
        onClick={() => setPermissionModalVisible(true)}
      >
        set permission
      </Button>
    </div>
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Create Time",
      dataIndex: "createdAt",
      render: (time) => formatDate(time, "yyyy-MM-dd hh-mm-ss"),
    },
    {
      title: "Authority Time",
      dataIndex: "auth_time",
    },
    { title: "Authorizer", dataIndex: "authorizer" },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setPermissionDisabled(!permissionDisabled);
      selectedRows[0].menus = ["/home", "/product"];
      setSelectedRow(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    initialRoles();
  }, []);
  const initialRoles = () => {
    getRolesAPI()
      .then(({ data }) => {
        data.success ? setRoles(data.roles) : message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
  };
  const createModalHandleOK = () => {
    if (!roleName) {
      message.error("you must name it");
      return;
    }
    addRoleAPI({
      name: roleName,
    })
      .then(({ data }) => {
        data.success
          ? setRoles([...roles, data.role])
          : message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
    setCreateModalVisible(false);
  };
  const permissionModalHandleOK = () => {
    console.log("permisionss");
    setPermissionModalVisible(false);
  };
  const modalHandleCancel = () => {
    setPermissionModalVisible(false);
    setCreateModalVisible(false);
  };
  return (
    <Card title={title}>
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={roles}
        rowKey={(record) => record._id}
        bordered
        pagination={{ pageSize: 3 }}
      />
      <Modal
        title="Create Role"
        visible={createModalVisible}
        onOk={createModalHandleOK}
        onCancel={modalHandleCancel}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="createRoleName">Name:</label>
          <Input
            name="createRoleName"
            placeholder="input name"
            onBlur={(event) => {
              setRoleName(event.target.value);
            }}
          />
        </div>
      </Modal>
      <PermissionRoleForm
        visible={permissionModalVisible}
        handleOK={permissionModalHandleOK}
        handleCancel={modalHandleCancel}
        row={selectedRow}
      />
    </Card>
  );
}
