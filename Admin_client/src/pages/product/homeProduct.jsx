import React, { useState, useEffect } from "react";
import { Card, Button, Input, Table, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getProductAPI } from "../../network/product";
import LinkButton from "../../components/link_button/link_button";
export default function HomeProduct(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductAPI()
      .then(({ data }) =>
        data.success ? setProducts(data.products) : message.error(data.message)
      )
      .catch((error) => message.error(error.toString()));
  }, []);
  const title = (
    <div className="search">
      <Input style={{ width: "300px" }} placeholder="Search" />
      <Button type="primary" icon={<SearchOutlined />} />
    </div>
  );
  const addProduct = () => {
    props.history.push("/product/update");
  };
  const showProductDetail = (item) => {
    props.history.push({ pathname: "/product/detail", product: item });
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
    { title: "Keywords", dataIndex: "keywords", key: "keywords" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    { title: "Inventory", dataIndex: "inventory", key: "inventory" },
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
          <Button type="primary" onClick={() => showProductDetail(record)}>
            detail
          </Button>
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
  return (
    <Card title={title} bordered={false} extra={cardHeaderExtra}>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        bordered
      />
      ,
    </Card>
  );
}
