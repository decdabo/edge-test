"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Form, Input, message } from "antd";
import { PAGES } from "@/utils/pages";
import { AuthContextTypes, LoginDto } from "@/utils/types";
import { login } from "@/services/services";
import { AuthContextStateTypes, useAuthContext } from "@/context/auth-context";

// Some types needed
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
  const { state, dispatch }: AuthContextStateTypes = useAuthContext();
  const [formData, setFormData] = useState<FormData>(initialState);

  // Here we handle the POST form using the login service already created
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
            isAuth: true,
            token: response.jwt,
            username: response.user.username,
            email: response.user.email,
          },
        })

        router.push(PAGES.HOME)
      })
      .catch(() => message.error('Error login into aplication'))
  }

  // Here we manage the input value and form data
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
