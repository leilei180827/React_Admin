import React, { useState, useEffect, useImperativeHandle } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  uploadSingleImageAPI,
  deleteSingleImageAPI,
} from "../../network/upload";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const PrictureWall = React.forwardRef((props, ref) => {
  const convertFromProps = (props) => {
    let initialState = [];
    if (props.images && props.images.length !== 0) {
      initialState = props.images.map((item) => {
        item.uid = item.name;
        item.status = "done";
        return item;
      });
    }
    return initialState;
  };
  const [preview, setPreview] = useState({
    visible: false,
    image: "",
    title: "",
  });
  const [files, setFiles] = useState(() => {
    const initialState = convertFromProps(props);
    return initialState;
  });
  useImperativeHandle(
    ref,
    () => ({
      getUploadImages: () => {
        return files;
      },
    }),
    [files]
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">More</div>
    </div>
  );
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      visible: true,
      image: file.url || file.preview,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const handleCancel = () =>
    setPreview({
      visible: false,
      image: "",
      title: "",
    });
  const handleChange = ({ file }) => {
    if (file.status === "removed") {
      deleteSingleImageAPI({ name: file.name })
        .then(({ data }) => {
          if (data.success) {
            let temp = [...files];
            setFiles(temp.filter((item) => item.uid !== file.uid));
            message.success(data.message);
          } else {
            message.error(data.message);
          }
        })
        .catch((error) => message.error(error.toString()));
    }
  };

  const onSuccess = (response) => {
    let temp = [...files];
    response.uid = response.name;
    temp.push(response);
    setFiles(temp);
    message.success("successfully uploaded ");
  };
  const onError = (hint) => {
    message.error(hint);
  };
  const uploadImage = (options) => {
    const { onSuccess, file, onError } = options;
    const formData = new FormData();
    formData.append("image", file);
    uploadSingleImageAPI(formData)
      .then(({ data }) =>
        data.success ? onSuccess(data.file) : onError("upload fails")
      )
      .catch((error) => onError(error));
  };

  return (
    <div className="clearfix">
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        listType="picture-card"
        fileList={files}
        onPreview={handlePreview}
        onChange={handleChange}
        onSuccess={onSuccess}
        onError={onError}
      >
        {files.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        visible={preview.visible}
        title={preview.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={preview.image} />
      </Modal>
    </div>
  );
});
export default PrictureWall;
