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
const { Option } = Select;
export default function AddOrEditUserForm(props) {
  const [form] = Form.useForm();
  const [rolesOptions, setRolesOptions] = useState([]);
  const title = !!props.user ? "Edit" : "Add";
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const handleOK = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  useEffect(() => {
    initialSelectOptions();
  }, []);
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
      title={title}
      visible={props.visible}
      onOk={handleOK}
      onCancel={props.handleCancel}
    >
      <Form
        form={form}
        {...layout}
        // initialValues={{ remember: true }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
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
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option> */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
// export default AddOrEditProduct
