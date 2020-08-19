import React, { useState, useEffect } from "react";
import { Card, List, Typography, message } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { getCategoryInfoAPI } from "../../network/category";
import { CATEGORY_ROOT_ID } from "../../utils/constants";
export default function DetailProduct(props) {
  const product = props.location.product;
  console.log(product);
  if (!product) {
    message.error("can't access to product details");
    props.history.push("/product");
  }
  const [categories, setCategories] = useState({
    pCategoryName: "",
    categoryName: "",
  });
  const goBack = () => {
    props.history.go(-1);
  };
  const title = (
    <div>
      <ArrowLeftOutlined onClick={goBack} style={{ color: "#1DA57A" }} />
      <span style={{ marginLeft: "10px" }}>Detail</span>
    </div>
  );

  const getCategoryNameByIds = () => {
    if (!product) {
      return;
    }
    if (product.pCategory === CATEGORY_ROOT_ID) {
      getCategoryInfoAPI({ id: product.category })
        .then(({ data }) =>
          data.success
            ? setCategories({ categoryName: data.category.name })
            : setCategories({ categoryName: "unknown" })
        )
        .catch((error) => message.error(error.toString()));
    } else {
      Promise.all([
        getCategoryInfoAPI({ id: product.pCategory }),
        getCategoryInfoAPI({ id: product.category }),
      ])
        .then((responses) => {
          responses[0].data.success && responses[1].data.success
            ? setCategories({
                pCategoryName: responses[0].data.category.name,
                categoryName: responses[1].data.category.name,
              })
            : setCategories({
                pCategoryName: "unknown",
                categoryName: "unknown",
              });
        })
        .catch((error) => message.error(error.toString()));
    }
  };
  useEffect(() => {
    getCategoryNameByIds();
  }, [getCategoryNameByIds]);
  // if(product){
  //   return ()
  // }else{
  //   message.error()
  // }
  return (
    <Card title={title}>
      {product ? (
        <List>
          <List.Item className="list-item">
            <span className="list-item-title">Name:</span>
            <span className="list-item-content">{product.name}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Keywords:</span>
            <span className="list-item-content">{product.keywords}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Price:</span>
            <span className="list-item-content">
              <Typography.Text>$</Typography.Text>
              {product.price}
            </span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Inventory:</span>
            <span className="list-item-content">{product.inventory}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Category:</span>
            <span className="list-item-content">
              {categories.pCategoryName ? (
                <span>
                  {categories.pCategoryName}
                  <ArrowRightOutlined />
                </span>
              ) : null}
              {categories.categoryName}
            </span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Images:</span>
            <span className="list-item-content">
              {product.images.map((item, index) => (
                <img
                  className="list-item-img"
                  src={item.url}
                  alt={item.name}
                  key={index}
                />
              ))}
            </span>
          </List.Item>
          <List.Item className="list-item">
            <span className="list-item-title">Description:</span>
            <span
              className="list-item-content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></span>
          </List.Item>
        </List>
      ) : (
        message.error("can't access to product details")
      )}
    </Card>
  );
}
