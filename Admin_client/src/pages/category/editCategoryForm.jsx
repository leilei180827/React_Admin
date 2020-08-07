import React, { useState } from "react";
import {
  Input,
  Typography,
  Modal,
  message,
} from "antd";

import { updateCategoryAPI } from "../../network/category";
const { Paragraph, Title } = Typography;
export default function EditCategoryForm(props) {
  const [newName, setNewName] = useState(props.category.name);
  const editCategory = () => {
    if (props.category.name === newName) {
      message.error("must enter a different name!");
      return;
    }
    let newCategory = {
      name: newName,
      id: props.category._id,
    };
    updateCategoryAPI(newCategory)
      .then(({ data }) => {
        data.success && props.updateCategories(data.category);
        !data.success && message.error(data.message);
        props.closeModal();
      })
      .catch((error) => {
        message.error(error.toString());
        props.closeModal();
      });
  };
  const updateCategoryName = (event) => {
    setNewName(event.target.value);
  };
  return (
    <Modal
      title="Edit  Category"
      visible={props.visible}
      onOk={editCategory}
      onCancel={() => props.closeModal()}
    >
      <Paragraph>
        Current Category:
        <Title
          style={{
            display: "inline-block",
            marginLeft: "10px",
            textTransform: "capitalize",
          }}
          level={4}
        >
          {props.category.name}
        </Title>
      </Paragraph>
      <Paragraph>Update Name:</Paragraph>
      <Input placeholder="Enter a Name" onBlur={updateCategoryName} />
    </Modal>
  );
}
