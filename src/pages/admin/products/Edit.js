import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, Upload } from "antd";
import { createApi, getOneById } from "../../../services/products";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { serverUrl } from "../../../utils/config";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import "./edit.css";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const formEditorItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

function Edit(props) {
  //props.match.params.id 存在的话表示修改，否则为新增
  console.log(props);
  const [form] = Form.useForm();
  //初始化的时候执行
  const [currentData, setCurrentData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState("")
  );
  useEffect(() => {
    // const { name, price } = currentData;
    if (props.match.params.id) {
      getOneById(props.match.params.id).then((res) => {
        setCurrentData(res);
        setImageUrl(res.coverImg);
        setEditorState(BraftEditor.createEditorState(res.content));
      });
    }
  }, [props.match.params.id]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // 上传文件
      // Get this url from response in real world.
      setLoading(false);
      setImageUrl(info.file.response.info);
    }
  };

  //富文本编辑器
  const handleEditorChange = (v) => {
    setEditorState(v);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      // console.log(values);
      // editorState.toHTML() 获取富文本编辑器内容
      createApi({
        ...values,
        coverImg: imageUrl,
        content: editorState.toHTML(),
      })
        .then((res) => {
          props.history.push("/admin/products");
        })
        .catch((err) => console.log(err));
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const validatePrice = (rule, value) => {
    return new Promise(async (resolve, reject) => {
      if (!value) {
        await reject("Price is required!");
      } else if (value > 200) {
        await reject("The price is less than 200.");
      } else {
        await resolve();
      }
    });
  };

  form.setFieldsValue({ ...currentData });

  return (
    <Card
      title="Edit"
      extra={
        <Button
          type="primary"
          onClick={() => props.history.push("/admin/products")}
        >
          Back
        </Button>
      }
    >
      <Form form={form} onFinish={onFinish} {...formItemLayout}>
        <Form.Item
          name="name"
          label="Name"
          key="name"
          rules={[
            {
              required: true,
              message: "Please input product name.",
            },
          ]}
        >
          <Input placeholder="Please input product name." />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="price"
          label="Price"
          key="price"
          rules={[
            {
              required: true,
              validator: validatePrice,
            },
          ]}
        >
          <Input placeholder="Please input product price." />
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={serverUrl + "/api/v1/common/file_upload"}
            onChange={(info) => handleChange(info)}
          >
            {imageUrl ? (
              <img
                src={serverUrl + imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Details" {...formEditorItemLayout}>
          <BraftEditor
            value={editorState}
            onChange={(e) => handleEditorChange(e)}
          />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button htmlType="submit" type="primary" onClick={onCheck}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
