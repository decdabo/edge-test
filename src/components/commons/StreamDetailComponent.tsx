import { PAGES } from "@/utils/pages";
import { StreamStatus } from "@/utils/types";
import { Breadcrumb, Button, Col, Descriptions, Divider, Row, Tag } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

export const StreamDetailComponent = ({
  streamData,
  isStream = false
}: {
  streamData: StreamStatus;
  isStream: boolean
}) => {
  const [descriptionData, setDescriptionData] = useState<any>();

  useEffect(() => {
    if (streamData) {
      setDescriptionData([
        {
          key: "1",
          label: "Account User",
          children: streamData?.attributes.account_name,
        },
        {
          key: "2",
          label: "Stream ID",
          children: streamData?.attributes.stream_id,
        },
        {
          key: "6",
          label: "Probe ID",
          children: streamData?.attributes.probe_id,
        },
        {
          key: "7",
          label: "Test Spend Time",
          children: streamData?.attributes.stream_test_spent_time,
        },
        {
          key: "3",
          label: "Created At",
          children: new Date(
            streamData?.attributes.createdAt
          ).toLocaleDateString("es-us", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }),
        },
        {
          key: "4",
          label: "Updated At",
          children: new Date(
            streamData?.attributes.updatedAt
          ).toLocaleDateString("es-us", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }),
        },
        {
          key: "5",
          label: "Published At",
          children: new Date(
            streamData?.attributes.updatedAt
          ).toLocaleDateString("es-us", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }),
        },
        {
          key: "8",
          label: "Stream Url",
          children: (
            <Link href={streamData.attributes.stream_url} target="_blank">
              URL
            </Link>
          ),
        },
      ]);
    }
  }, [streamData]);
  return (
   <>
    <Row>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={PAGES.HOME}>
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={{ pathname: PAGES.CLIENT_DETAIL, query: { account_name: streamData.attributes.account_name } }}>
              {streamData.attributes.account_name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {isStream ? 'Stream' : 'Alarm'} {' '} {streamData.id}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Title level={4}>Stream: {streamData?.attributes.stream_name}</Title>
        <Tag
          color={
            streamData?.attributes.stream_status === "Running Normal"
              ? "green"
              : "volcano"
          }
        >
          {streamData?.attributes.stream_status}
        </Tag>
      </Col>
      <Divider />
      <Col span={24}>
        <Descriptions items={descriptionData} />
      </Col>
    </Row>
    <Divider />
    <CSVLink
      data={[streamData.attributes]} 
      filename={
        `${streamData.attributes.account_name}-${isStream ? 'stream' : 'alarm'}-${streamData.attributes.stream_name}-id-${streamData.attributes.stream_id}` 
        }>
      <Button type="primary">Download CSV</Button>
    </CSVLink>
   </>
  );
};
