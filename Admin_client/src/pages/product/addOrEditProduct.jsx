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
export default function AddOrEditProduct(props) {
  const product = props.location.product || {};
  const categoryIds = [];
  if (Object.keys(product).length !== 0) {
    if (product.pCategory === CATEGORY_ROOT_ID) {
      categoryIds.push(product.category);
    } else {
      categoryIds.push(product.pCategory);
      categoryIds.push(product.category);
    }
  }
  const [cascaderOptions, setCascaderOptions] = useState([]);
  const uploadCompRef = React.useRef(null);
  const richTextEditorCompRef = React.useRef(null);
  const goBack = () => {
    props.history.go(-1);
  };
  const title = (
    <div>
      <ArrowLeftOutlined onClick={goBack} style={{ color: "#1DA57A" }} />
      <span style={{ marginLeft: "10px" }}>
        {Object.keys(product).length !== 0 ? "Edit" : "Add"}
      </span>
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
    console.log(cascaderOptions);
    let pCategory =
      values.category.length === 2 ? values.category[0] : CATEGORY_ROOT_ID;
    let category =
      values.category.length === 2 ? values.category[1] : values.category[0];
    let newProduct = {
      name: values.name,
      keywords: values.keywords,
      price: values.price,
      inventory: values.inventory,
      pCategory,
      category,
      images: uploadCompRef.current.getUploadImages(),
      description: richTextEditorCompRef.current.getRichTextEditor(),
    };
    //only update items user has changed
    if (Object.keys(product).length !== 0) {
      newProduct = collectChangedItems(product, newProduct);
      Object.keys(newProduct).length !== 0 && (newProduct.id = product._id);
    }
    //submit without items needed to be updated
    if (Object.keys(newProduct).length === 0) {
      message.success("successfully submitted");
      return;
    }
    addOrUpdateProductAPI(newProduct)
      .then(({ data }) => {
        data.success && message.success("successfully submitted");
        !data.success && message.error(data.message);
        props.history.push("/product");
      })
      .catch((error) => {
        message.error(error.toString());
        props.history.push("/product");
      });
  };
  //find changed items
  const collectChangedItems = (productOrigin, productNew) => {
    let result = {};
    for (let key in productNew) {
      if (productNew[key] === productOrigin[key]) {
        continue;
      } else {
        result[key] = productNew[key];
      }
    }
    return result;
  };
  const onFinishFailed = (errorInfo) => {
    console.log(cascaderOptions);
    console.log("Failed:", errorInfo);
  };
  const prepareCascade = async () => {
    let options = [];
    const { data } = await getCategory({ parentId: CATEGORY_ROOT_ID });
    if (data.success && data.categories.length !== 0) {
      data.categories.map((item) =>
        options.push({
          value: item._id,
          label: item.name,
          isLeaf: false,
        })
      );
    }
    if (
      Object.keys(product).length !== 0 &&
      product.pCategory !== CATEGORY_ROOT_ID
    ) {
      // console.log(product.pCategory);
      let children = [];
      const childrenResult = await getCategory({
        parentId: product.pCategory,
      });
      childrenResult.data.categories.map((item) =>
        children.push({
          value: item._id,
          label: item.name,
          isLeaf: true,
        })
      );
      children.length !== 0 &&
        (options.find(
          (item) => item.value === product.pCategory
        ).children = children);
    }
    setCascaderOptions(options);
  };
  useEffect(() => {
    prepareCascade();
  }, []);

  const cascaderLoadData = (selectedOptions) => {
    // const targetOption = { ...selectedOptions[0] };
    const targetOption = selectedOptions[0];
    if (targetOption.children && targetOption.children.length !== 0) {
      return;
    }
    targetOption.loading = true;
    // load options lazily
    getCategory({ parentId: targetOption.value })
      .then(({ data }) => {
        // console.log(data);
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
          : (targetOption.children = [...children]);
        // console.log(targetOption);
        // let newOptions = [...cascaderOptions];
        // newOptions = newOptions.map((item) =>
        //   item.value === targetOption.value ? targetOption : item
        // );
        // console.log(newOptions);
        setCascaderOptions([...cascaderOptions]);
      })
      .catch((error) => message.error(error.toString()));
  };
  return (
    <Card title={title}>
      <Form
        {...layout}
        initialValues={{
          name: product.name || null,
          keywords: product.keywords || null,
          price: product.price || null,
          inventory: product.inventory || null,
          category: categoryIds.length === 0 ? null : categoryIds,
        }}
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
          <PictureWall ref={uploadCompRef} images={product.images} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
        >
          <RichTextEditor
            ref={richTextEditorCompRef}
            description={product.description}
          />
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
