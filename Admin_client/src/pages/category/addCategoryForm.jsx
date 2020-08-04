import React from "react";
import {
  Form,
  Select,
  Input,
  Typography,
  Modal,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from "antd";
import { CATEGORY_ROOT_ID } from "../../utils/constants";
const { Option } = Select;
const { Paragraph } = Typography;
export default function AddCategoryForm(props) {
  const formRef = React.useRef();
  const addCategory = () => {
    console.log("access to Api");
    console.log(formRef.current.getFieldValue());
  };
  const handleCancel = () => {
    props.closeModal();
  };
  return (
    <Modal
      title="Add New Category"
      visible={props.visible}
      onOk={addCategory}
      onCancel={handleCancel}
    >
      <Form
        ref={formRef}
        initialValues={{
          ["parent-category-name"]: CATEGORY_ROOT_ID,
        }}
      >
        <label>Belongs to:</label>
        <Form.Item name="parentId" hasFeedback rules={[{ required: true }]}>
          <Select>
            <Option value={CATEGORY_ROOT_ID}>None</Option>
            {props.selectOptions.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <label>Name:</label>
        <Form.Item name="category-name">
          <Input placeholder="Enter a Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
