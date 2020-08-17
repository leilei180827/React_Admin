import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  Input,
  message,
  Space,
} from "antd";
import { getRolesAPI } from "../../network/role";
import { addUserAPI, editUserAPI } from "../../network/user";
const { Option } = Select;
export default function AddOrEditUserForm(props) {
  const [form] = Form.useForm();
  const [rolesOptions, setRolesOptions] = useState([]);
  const user = props.user || {};
  const title = Object.keys(props.user).length !== 0 ? "Edit" : "Add";
  const layout = {
    labelCol: { span: Object.keys(props.user).length !== 0 ? 6 : 4 },
    wrapperCol: { span: 16 },
  };
  const handleOK = async () => {
    try {
      const values = await form.validateFields();
      let result;
      //it's e adding
      if (Object.keys(props.user).length === 0) {
        result = await addUserAPI(values);
        result.data.success &&
          message.success(result.data.message) &&
          props.updateUsers(result.data.user, "add");
      }
      // editing
      else {
        for (let key in values) {
          values[key] === props.user[key] && delete values[key];
        }
        //something changed then update
        if (Object.keys(values).length !== 0) {
          values.id = props.user._id;
        }
        result = await editUserAPI(values);
        result.data.success &&
          message.success(result.data.message) &&
          props.updateUsers(result.data.user, "edit");
      }
      !result.data.success && message.error(result.data.message);
      props.handleCancel();
    } catch (errorInfo) {
      message.error(errorInfo.toString());
      props.handleCancel();
    }
  };
  useEffect(() => {
    initialSelectOptions();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      username: user.username || null,
      password: user.password || null,
      phone_number: user.phone_number || null,
      email: user.email || null,
      role: user.role || null,
    });
  }, [user]);
  const initialSelectOptions = () => {
    getRolesAPI()
      .then(({ data }) => {
        data.success
          ? setRolesOptions(data.roles.map((item) => item.name))
          : message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
  };

  return (
    <Modal
      forceRender
      title={title}
      visible={props.visible}
      onOk={handleOK}
      onCancel={props.handleCancel}
    >
      <Form form={form} {...layout}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        {Object.keys(props.user).length === 0 && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label="Phone"
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          hasFeedback
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select
            showSearch
            style={{ minWidth: 200 }}
            placeholder="Select a role"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {rolesOptions.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
