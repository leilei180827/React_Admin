import React, { useState, useEffect } from "react";
import {
  Card,
  Cascader,
  Input,
  Button,
  Form,
  InputNumber,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getCategory } from "../../network/category";
import { addOrUpdateProductAPI } from "../../network/product";
import { CATEGORY_ROOT_ID } from "../../utils/constants";
import PictureWall from "../../components/picture_wall/pricture_wall";
import RichTextEditor from "../../components/rich_text_editor/rich_text_editor";
const { TextArea } = Input;
export default function EditAddProduct(props) {
  const [cascaderOptions, setCascaderOptions] = useState([]);
  const uploadCompRef = React.useRef(null);
  const richTextEditorCompRef = React.useRef(null);
  const goBack = () => {
    props.history.go(-1);
  };
  const title = (
    <div>
      <ArrowLeftOutlined onClick={goBack} style={{ color: "#1DA57A" }} />
      <span style={{ marginLeft: "10px" }}>Add</span>
    </div>
  );
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 2, span: 8 },
  };
  const onFinish = (values) => {
    let pCategory =
      values.category.length === 2 ? values.category[0] : CATEGORY_ROOT_ID;
    let category =
      values.category.length === 2 ? values.category[1] : values.category[0];
    let product = {
      name: values.name,
      keywords: values.keywords,
      price: values.price,
      inventory: values.inventory,
      pCategory,
      category,
      images: uploadCompRef.current.getUploadImages(),
      description: richTextEditorCompRef.current.getRichTextEditor(),
    };
    addOrUpdateProductAPI(product)
      .then(({ data }) => {
        data.success && message.success("successfully submitted");
        !data.success && message.error(data.message);
      })
      .catch((error) => message.error(error.toString()));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    prepareCascade();
  }, []);
  const prepareCascade = () => {
    getCategory({ parentId: CATEGORY_ROOT_ID })
      .then(({ data }) => {
        if (!data.success) {
          message.error(data.message);
          return;
        }
        let options = [];
        data.success &&
          data.categories.map((item) => {
            options.push({
              value: item._id,
              label: item.name,
              isLeaf: false,
            });
          });
        setCascaderOptions(options);
      })
      .catch((error) => message.error(error.toString()));
  };
  const cascaderLoadData = (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    // load options lazily
    getCategory({ parentId: targetOption.value })
      .then(({ data }) => {
        targetOption.loading = false;
        if (!data.success) {
          message.error(data.message);
          return;
        }
        let children = [];
        data.success &&
          data.categories.map((item) =>
            children.push({
              value: item._id,
              label: item.name,
              isLeaf: true,
            })
          );
        children.length === 0
          ? (targetOption.isLeaf = true)
          : (targetOption.children = children);
        setCascaderOptions([...cascaderOptions]);
      })
      .catch((error) => message.error(error.toString()));
  };
  return (
    <Card title={title}>
      <Form
        {...layout}
        initialValues={{ name: "", desc: "" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input a name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Keywords"
          name="keywords"
          rules={[
            { required: true, message: "Please input a short description!" },
          ]}
        >
          <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input a valid price!",
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            min={1}
          />
        </Form.Item>
        <Form.Item
          label="Inventory"
          name="inventory"
          rules={[{ required: true, message: "Please input a valid number!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Cascader options={cascaderOptions} loadData={cascaderLoadData} />
        </Form.Item>
        <Form.Item label="Images" name="image">
          <PictureWall ref={uploadCompRef} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
        >
          <RichTextEditor ref={richTextEditorCompRef} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
