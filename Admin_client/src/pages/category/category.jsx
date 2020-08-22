import React, { useState, useEffect } from "react";
import { Card, Button, Table, message } from "antd";
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
import EditCategoryForm from "./editCategoryForm";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentId, setParentId] = useState(CATEGORY_ROOT_ID);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState("");
  //get categories
  useEffect(() => {
    handleGetCategory(parentId);
  }, [parentId]);

  const handleGetCategory = (parentId) => {
    getCategory({
      parentId: parentId,
    })
      .then(({ data }) => {
        // console.log(data);
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
  //Modal related methods
  const showAddCategoryModal = () => {
    setAddCategoryModal(true);
  };
  const showEditCategoryModal = (category) => {
    setEditCategory(category);
  };
  const handleCancel = () => {
    setAddCategoryModal(false);
    setEditCategory("");
  };
  const updateCategories = (data) => {
    let newCategories;
    parentId === CATEGORY_ROOT_ID
      ? (newCategories = [...categories])
      : (newCategories = [...subCategories]);
    let isExisted = newCategories.find((item) => item._id === data._id);
    if (isExisted) {
      newCategories[newCategories.indexOf(isExisted)] = data;
    } else {
      newCategories.push(data);
    }

    parentId === CATEGORY_ROOT_ID
      ? setCategories(newCategories)
      : setSubCategories(newCategories);
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
          pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        />
      </Card>
      <AddCategoryForm
        selectOptions={categories}
        closeModal={handleCancel}
        updateCategories={updateCategories}
        visible={addCategoryModal}
        //currentParentId decides to update page or not
        currentParentId={parentId}
      />
      <EditCategoryForm
        closeModal={handleCancel}
        updateCategories={updateCategories}
        visible={editCategory}
        category={editCategory}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, null)(Category);
