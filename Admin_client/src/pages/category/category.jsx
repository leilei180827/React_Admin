import React, { useState, useEffect, createRef } from "react";
import { Card, Button, Table, Modal, Select, Input, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SubnodeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getCategory } from "../../network/category";
import "./category.less";
import { connect } from "react-redux";
import LinkButton from "../../components/link_button/link_button";
import { CATEGORY_ROOT_ID } from "../../utils/constants";
import AddCategoryForm from "./addCategoryForm";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentId, setParentId] = useState(CATEGORY_ROOT_ID);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const addCategoryRef = React.useRef();

  //Modal related methods
  const showAddCategoryModal = () => {
    setAddCategoryModal(true);
  };
  const showEditCategoryModal = () => {
    setEditCategoryModal(true);
  };
  const handleCancel = () => {
    setAddCategoryModal(false);
    setEditCategoryModal(false);
  };
  //get categories
  useEffect(() => {
    handleGetCategory(parentId);
  }, [parentId]);
  const handleGetCategory = (parentId) => {
    getCategory({
      parentId: parentId,
    })
      .then(({ data }) => {
        console.log(data);
        !data.success && message.error(data.message);
        data.success && parentId === "0" && setCategories(data.categories);
        data.success && parentId !== "0" && setSubCategories(data.categories);
      })
      .catch((error) => message.error(error));
  };
  const getSubCategories = (category) => {
    setSubCategoryName(category.name);
    setParentId(category._id);
  };

  //add new category
  const cardHeaderExtra = (
    <Button type="primary" onClick={showAddCategoryModal}>
      <PlusOutlined />
      ADD
    </Button>
  );
  //edit and subs button
  const tableHeaderActions = (category) => {
    return (
      <>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => showEditCategoryModal(category)}
        >
          <EditOutlined />
          EDIT
        </Button>
        {parentId === CATEGORY_ROOT_ID && (
          <Button type="primary" onClick={() => getSubCategories(category)}>
            <SubnodeOutlined />
            SUBS
          </Button>
        )}
      </>
    );
  };
  //category card title
  const title =
    parentId === CATEGORY_ROOT_ID ? (
      "Categories"
    ) : (
      <span>
        <LinkButton
          onClick={() => {
            setParentId(CATEGORY_ROOT_ID);
          }}
        >
          Categories
        </LinkButton>
        <ArrowRightOutlined style={{ padding: "0 10px" }} />
        {subCategoryName}
      </span>
    );
  //table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (category) => tableHeaderActions(category),
    },
  ];
  //add category access to API
  const addCategory = (e) => {
    console.log(e);
    console.log("addCategory");
  };
  //edit category access to API
  const editCategory = (e) => {
    console.log("editCategory");
  };
  return (
    <>
      <Card title={title} extra={cardHeaderExtra} className="category-content">
        <Table
          columns={columns}
          bordered
          dataSource={
            parentId === CATEGORY_ROOT_ID ? categories : subCategories
          }
          rowKey={(record) => record._id}
          pagination={{ position: ["bottomCenter"] }}
        />
      </Card>
      <AddCategoryForm
        selectOptions={categories}
        closeModal={handleCancel}
        visible={addCategoryModal}
      />
      <Modal
        title="Edit Category"
        visible={editCategoryModal}
        onOk={editCategory}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(Category);
