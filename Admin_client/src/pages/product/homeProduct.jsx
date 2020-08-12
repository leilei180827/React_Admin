import React from "react";
import { Card, Button, Input, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link_button/link_button";
export default function HomeProduct(props) {
  const title = (
    <div className="search">
      <Input style={{ width: "300px" }} placeholder="Search" />
      <Button type="primary" icon={<SearchOutlined />} />
    </div>
  );
  const addProduct = () => {
    props.history.push("/product/update");
  };
  //add new product
  const cardHeaderExtra = (
    <Button type="primary" onClick={addProduct}>
      <PlusOutlined />
      ADD
    </Button>
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>{status === 0 ? "on shelf" : "off shelf"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <span>
          <Button type="primary">detail</Button>
          <Button type="primary" style={{ margin: "2px 5px" }}>
            edit
          </Button>
          <Button type="primary" style={{ textAlign: "left" }}>
            {record.status === 0 ? "off shelf" : "on shelf"}
          </Button>
        </span>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      name: "Lenovo ThinkPad",
      description:
        "recently released X390 T490, thin body and fashion leading design",
      price: 660,
      status: 0,
    },
  ];
  return (
    <Card title={title} bordered={false} extra={cardHeaderExtra}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        bordered
      />
      ,
    </Card>
  );
}
