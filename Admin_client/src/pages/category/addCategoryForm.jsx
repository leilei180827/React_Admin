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
  message,
} from "antd";
import { CATEGORY_ROOT_ID } from "../../utils/constants";
import { addCategoryAPI } from "../../network/category";
const { Option } = Select;
export default function AddCategoryForm(props) {
  const formRef = React.useRef();
  const addCategory = () => {
    let values = formRef.current.getFieldValue();
    console.log(values);
    addCategoryAPI(values)
      .then(({ data }) => {
        console.log(data);
        data.success &&
          props.currentParentId === values.parentId &&
          props.updateCategories(data.category);
        props.closeModal();
      })
      .catch((error) => {
        message.error(error);
        props.closeModal();
      });
  };

  return (
    <Modal
      title="Add New Category"
      visible={props.visible}
      onOk={addCategory}
      onCancel={() => props.closeModal()}
    >
      <Form
        ref={formRef}
        initialValues={{
          ["parentId"]: CATEGORY_ROOT_ID,
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
        <Form.Item name="name">
          <Input placeholder="Enter a Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
