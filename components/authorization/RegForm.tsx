import React from "react";
import styles from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { RegFormDTO } from "@/api/dto/auth.dto";

import * as Api from "@/api";
import { setCookie } from "nookies";

export const RegForm: React.FC = ({}) => {
  const onSubmit = async (values: RegFormDTO) => {
    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: "Successful Registration!",
        description: "Dashboard will open in 3, 2, 1 ...",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });
      location.assign("/dashboard");
    } catch (e) {
      console.warn(e);

      notification.error({
        message: "Something went wrong",
        description: "Please retry",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="fullname"
          rules={[{ required: true, message: "Please enter your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
