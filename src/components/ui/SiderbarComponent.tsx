import { useAuthContext } from "@/context/auth-context";
import { PAGES } from "@/utils/pages";
import { AuthContextTypes } from "@/utils/types";
import { Col, Divider, Layout, Menu, Row } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React from "react";

export const SiderbarComponent = () => {
  const { state, dispatch }: any = useAuthContext();

  // Here we logout from the context and delete de access token and user data
  function handleLogout() {
    dispatch({
      type: AuthContextTypes.LOGOUT
    })
  }
  
  const items = [
    {
      key: 0,
      label: <Link href={PAGES.HOME}>Home</Link>,
    },
    {
      key: 1,
      label: <Link className="text-red" onClick={handleLogout} href={PAGES.LOGIN}>
        Logout {' '}
      </Link>,
    },
  ];

  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0">
      <Row className="sidebar-row">
        <Col span={24}>
          <Title level={5} className="text-white">{state.username}</Title>
        </Col>
        <Col span={24}>
          <Title level={5} className="text-white">{state.email}</Title>
        </Col>
      </Row>
      <Divider />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
    </Layout.Sider>
  );
};
