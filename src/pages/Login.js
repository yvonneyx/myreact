import React from "react";
import { Form, Input, Button, Checkbox, Card, message } from "antd";
import "./login.css";
import { loginApi } from "../services/auth";
import { setToken } from "../utils/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // setToken(values.username);
    // props.history.push("/admin/dashboard");
    loginApi({
      userName: values.username,
      password: values.password,
    })
      .then((res) => {
        const { code, token } = res;
        if (code === "success") {
          message.success('登录成功.')
          setToken(token);
          props.history.push("/admin/dashboard");
        } else {
          message.info(res.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        message.error("用户不存在.");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="loginCard" title="QF Admin SYS">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
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

export default Login;
