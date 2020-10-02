import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button } from "antd";
import { createApi, getOneById } from "../../../services/products";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

function Edit(props) {
  //props.match.params.id 存在的话表示修改，否则为新增
  const [form] = Form.useForm();
  const [currentData, setCurrentData] = useState({});
  //初始化的时候执行

  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then((res) => {
        setCurrentData(res);
        console.log(currentData);
      });
    }
  }, []);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      //   console.log("Success:", values);
      console.log(values);
      createApi(values)
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
  return (
    <Card title="Edit">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
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
          initialValue={{ currentData }}
          rules={[
            {
              required: true,
              validator: validatePrice,
            },
          ]}
        >
          <Input placeholder="Please input product price." />
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
