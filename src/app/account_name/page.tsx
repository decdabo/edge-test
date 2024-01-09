"use client";
import { StreamsTableComponent } from "@/components/account_name/StreamsTableComponent";
import { getClientStreams, getClientsAlarms } from "@/services/services";
import { PAGES } from "@/utils/pages";
import { StreamStatus } from "@/utils/types";
import { Breadcrumb, Col, Divider, Flex, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const account_name = useSearchParams().get("account_name");
  const [streamsData, setStreamsData] = useState<StreamStatus[]>();
  const [ alarmsData, setAlarmsData ] = useState<StreamStatus[]>();
  
  const [isLoadingStream, setIsLoadingStream] = useState<boolean>(true);
  const [isLoadingAlarms, setIsLoadingAlarms ] = useState<boolean>(true)

  useEffect(() => {
    if (account_name) {
      // Here we get the client monitoring
      getClientStreams(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0NzI2NzkzLCJleHAiOjE3MDczMTg3OTN9.08cdBikBQG1wDhXrbvMpAHRwC-xE9rS4j6jolwA0Xtk",
        account_name
      ).then((response) => {
        setStreamsData(response.data);
        setIsLoadingStream(false)
      });

      // Here we get the client streams alarms 
      getClientsAlarms("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0NzI2NzkzLCJleHAiOjE3MDczMTg3OTN9.08cdBikBQG1wDhXrbvMpAHRwC-xE9rS4j6jolwA0Xtk", account_name)
        .then(response => {
          setAlarmsData(response.data);
          setIsLoadingAlarms(false);
        })
    } else {
      router.push(PAGES.HOME);
    }
  }, [account_name]);


  return (
    <div className="bg-grey" style={{ padding: "20px", height: "100%" }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href={PAGES.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Client</Breadcrumb.Item>
        <Breadcrumb.Item>{account_name}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <Divider />
      <Row style={{ gap: '30px' }}>
        <Col span={11}>
          {!isLoadingStream ? (
            <>
              <Title level={3}>Monitoring</Title>
              <StreamsTableComponent streamsData={streamsData ?? []} isStream={true} />
            </>
          ) : (
            <Flex align="center" justify="center" style={{ height: "75vh" }}>
              <Spin />
            </Flex>
          )}
        </Col>

        <Col span={11}>
          {!isLoadingAlarms ? (
            <>
              <Title level={3}>Log Error</Title>
              <StreamsTableComponent streamsData={alarmsData ?? []} />
            </>
          ) : (
            <Flex align="center" justify="center" style={{ height: "75vh" }}>
              <Spin />
            </Flex>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Page;
