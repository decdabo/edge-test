"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb, Col, Divider, Row, message  } from "antd";
import { PAGES } from "@/utils/pages";
import { StreamStatus } from "@/utils/types";
import { getClientStreams, getClientsAlarms } from "@/services/services";
import { StreamsTableComponent } from "@/components/account_name/StreamsTableComponent";
import { SpinnerComponent } from "@/components/commons/SpinnerComponent";
import { AuthContextStateTypes, useAuthContext } from "@/context/auth-context";

const Page = () => {
  const router = useRouter();
  const { state }: AuthContextStateTypes = useAuthContext();
  const account_name = useSearchParams().get("account_name");
  const [streamsData, setStreamsData] = useState<StreamStatus[]>();
  const [ alarmsData, setAlarmsData ] = useState<StreamStatus[]>();
  
  const [isLoadingStream, setIsLoadingStream] = useState<boolean>(true);
  const [isLoadingAlarms, setIsLoadingAlarms ] = useState<boolean>(true)

  useEffect(() => {
    if (account_name) {
      // Here we get the client monitoring
      getClientStreams(
        state.token,
        account_name
      ).then((response) => {
        setStreamsData(response.data);
      })
      .catch(() => message.error('Error loading stream data'))
      .finally(() => setIsLoadingStream(false))

      // Here we get the client streams alarms 
      getClientsAlarms(state.token, account_name)
        .then(response => {
          setAlarmsData(response.data);
          setIsLoadingAlarms(false);
        })
        .catch(() => message.error('Error loading alarm data'))
        .finally(() => setIsLoadingStream(false))
    } else {
      // In case of query undefined we gonna move the user to home and notificate it
      router.push(PAGES.HOME);
      message.error('Stream not found')
    }
  }, [account_name, state.token]);


  return (
    <div className="page-wrapper">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href={PAGES.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Client</Breadcrumb.Item>
        <Breadcrumb.Item>{account_name}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <Row style={{ gap: '30px' }}>
        <Col span={11}>
          {!isLoadingStream ? (
            <>
              <Title level={3}>Monitoring</Title>
              <StreamsTableComponent streamsData={streamsData ?? []} isStream={true} />
            </>
          ) : (
            <SpinnerComponent />
          )}
        </Col>

        <Col span={11}>
          {!isLoadingAlarms ? (
            <>
              <Title level={3}>Log Error</Title>
              <StreamsTableComponent streamsData={alarmsData ?? []} />
            </>
          ) : (
            <SpinnerComponent />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Page;
