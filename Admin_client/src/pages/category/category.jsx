import React from "react";
import { Card, Button, Table } from "antd";
import { PlusOutlined, EditOutlined, SubnodeOutlined } from "@ant-design/icons";
import "./category.less";

export default function Category() {
  const addCategory = () => {
    console.log("addCategory");
  };
  const editCategory = () => {
    console.log("editCategory");
  };
  const getSubCategories = () => {
    console.log("getSubCategories");
  };
  const cardHeaderExtra = (
    <Button type="primary" onClick={addCategory}>
      <PlusOutlined />
      ADD
    </Button>
  );
  const tableHeaderActions = (
    <>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        onClick={editCategory}
      >
        <EditOutlined />
        EDIT
      </Button>
      <Button type="primary" onClick={getSubCategories}>
        <SubnodeOutlined />
        SUBS
      </Button>
    </>
  );
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: () => tableHeaderActions,
    },
  ];

  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
    },
  ];

  return (
    <Card
      title="Categories"
      extra={cardHeaderExtra}
      className="category-content"
    >
      <Table
        columns={columns}
        bordered
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
      ,
    </Card>
  );
}
