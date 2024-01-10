"use client";
import React, { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { login } from "@/services/services";
import { AuthContextTypes, LoginDto } from "@/utils/types";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/pages";

interface FormData {
  username: string;
  password: string;
}

const initialState: FormData = {
  username: "",
  password: "",
};

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(initialState);
  const { _, dispatch }: any = useAuthContext();

  async function handleSubmit() {
    const body: LoginDto = {
      identifier: formData.username,
      password: formData.password,
    };

    login(body)
      .then((response) => {
        dispatch({
          type: AuthContextTypes.LOGIN,
          payload: {
            token: response.jwt,
            username: response.user.username,
            email: response.user.email,
          },
        });

        router.push(PAGES.HOME)
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(e: { target: { name: string; value: string } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Flex
      justify="center"
      align="center"
      className="login-screen"
    >
      <Form
        className="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={formData}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="username" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password name="password" onChange={handleInputChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
