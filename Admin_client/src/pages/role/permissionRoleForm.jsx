import React, { useState } from "react";
import { Modal, Input, Form, TreeSelect, message } from "antd";
import menus from "../../config/menus";
import { updateRoleAPI } from "../../network/role";
import { connect } from "react-redux";

const { TreeNode } = TreeSelect;

function PermissionRoleForm(props) {
  const [selectedRights, setSelectedRights] = useState([]);
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };
  const onChange = (value) => {
    setSelectedRights(value);
  };
  const generateTreeNodes = (menuList) => {
    return menuList.map((item) => {
      return (
        <TreeNode
          value={item.key}
          title={<b style={{ textTransform: "capitalize" }}>{item.title}</b>}
          key={item.key}
        >
          {item.children && generateTreeNodes(item.children)}
        </TreeNode>
      );
    });
  };
  const updateRole = () => {
    updateRoleAPI({
      id: props.row._id,
      menus: selectedRights,
      auth_time: Date.now(),
      authorizer: props.user.username,
    })
      .then(({ data }) =>
        data.success ? props.handleOK(data.role) : message.error(data.message)
      )
      .catch((error) => message.error(error.toString()));
  };
  // props.handleOK;
  return (
    <Modal
      title="Set Permission"
      visible={props.visible}
      onOk={updateRole}
      onCancel={props.handleCancel}
    >
      <Form {...layout}>
        <Form.Item label="Role">
          <Input value={props.row.name} disabled />
        </Form.Item>
      </Form>
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        // value={this.state.value}
        dropdownStyle={{ minHeight: 200, overflow: "auto" }}
        placeholder="Please select visible area"
        allowClear
        multiple
        treeDefaultExpandAll
        treeCheckable
        onChange={onChange}
        defaultValue={props.row.menus}
      >
        {generateTreeNodes(menus)}
      </TreeSelect>
    </Modal>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(PermissionRoleForm);
