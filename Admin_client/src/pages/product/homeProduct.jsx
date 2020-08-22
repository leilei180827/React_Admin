import React, { useState, useEffect } from "react";
import { Card, Button, Input, Table, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getProductAPI } from "../../network/product";
import { addOrUpdateProductAPI } from "../../network/product";

export default function HomeProduct(props) {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    getProductAPI()
      .then(({ data }) => {
        if (data.success) {
          setProducts(data.products);
          setFilterProducts(data.products);
        } else {
          message.error(data.message);
        }
      })
      .catch((error) => message.error(error.toString()));
  }, []);
  const title = (
    <Space>
      <Input.Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={(value) => searchProducts(value)}
        style={{ width: "300px" }}
      />
      <Button
        size="large"
        type="primary"
        onClick={() => setFilterProducts(products)}
      >
        All
      </Button>
    </Space>
  );
  const searchProducts = (value) => {
    if (!value) {
      setFilterProducts(products);
      return;
    } else {
      let copyProducts = [...products];
      let newFilterProducts = copyProducts.filter(
        (item) =>
          item.name.includes(value) ||
          item.keywords.includes(value) ||
          item.description.includes(value)
      );
      setFilterProducts(newFilterProducts);
    }
    // searchProductAPI({ q: value.trim() })
    //   .then(({ data }) =>
    //     data.success ? setProducts(data.products) : message.error(data.message)
    //   )
    //   .catch((error) => message.error(error.toString()));
  };
  const addProduct = () => {
    props.history.push("/product/update");
  };
  const showProductDetail = (item) => {
    // console.log("detail called");
    props.history.push({ pathname: "/product/detail", product: item });
  };
  const editProduct = (item) => {
    props.history.push({ pathname: "/product/update", product: item });
  };
  const offShelfProduct = async (item) => {
    let updatedStatus = item.status === 0 ? 1 : 0;
    const { data } = await addOrUpdateProductAPI({
      id: item._id,
      status: updatedStatus,
    });
    if (data.success) {
      let temp = [...filterProducts];
      setFilterProducts(
        temp.map((product) => {
          product._id === item._id && (product.status = updatedStatus);
          return product;
        })
      );
    } else {
      message.error(data.message);
    }
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
          <Button
            type="primary"
            onClick={() => editProduct(record)}
            style={{ margin: "2px 5px" }}
          >
            edit
          </Button>
          <Button
            type="primary"
            onClick={() => offShelfProduct(record)}
            style={{ textAlign: "left" }}
          >
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
        dataSource={filterProducts}
        rowKey={(record) => record._id}
        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
        bordered
      />
      ,
    </Card>
  );
}
