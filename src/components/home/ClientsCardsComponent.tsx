import React from "react";
import { StreamStatus } from "@/utils/types";
import { Card, Col, Row, Tag } from "antd";
import Link from "next/link";
import { PAGES } from "@/utils/pages";

interface ClientsCardsComponentsProps {
  streamsData: StreamStatus[][] | undefined
}

export const ClientsCardsComponents:React.FC<ClientsCardsComponentsProps> = ({ streamsData }) => {
  return (
    <Row>
      {
        streamsData?.map((streams, index) => (
          <Col span={8} key={`${index}-card-home-key-${streams[0].attributes.account_name}`}>
            <Card 
              title={
                <>
                  <span>{streams[0].attributes?.account_name}</span>
                  <br />
                  <Tag style={{ marginLeft: '10px' }} color="green">{ streams.filter(stream => stream.attributes.stream_status === 'Running Normal').length } Running Normal</Tag>
                  <Tag color="red">{ streams.filter(stream => stream.attributes.stream_status !== 'Running Normal').length } Have error</Tag>
                </>
              } 
              bordered={false} 
              style={{ width: "90%", marginTop: '15px', overflow: 'hidden', height: '223px' }}
            >
                <Link 
                  href={{ 
                    pathname: PAGES.CLIENT_DETAIL, 
                    query: {
                      account_name: streams[0].attributes.account_name
                    }
                  }}
                >
                  View All Info
                </Link>
              {
                streams.map((stream, index) => (
                  <p style={{ display: 'flex', justifyContent: 'space-between' }} key={`${index}-single-stream-status-key-${stream.attributes.stream_url}`}>
                    <span>{stream.attributes.stream_name}</span> 
                    <Tag color={stream.attributes.stream_status === 'Running Normal' ? 'green' : 'red'}>
                      {stream.attributes.stream_status}
                    </Tag>
                    <Link href={{ pathname: PAGES.STREAM_DETAIL, query: { id: stream.id } }}>View</Link>
                  </p>
                ))
              }
            </Card>
          </Col>
        ))
      }
    </Row>
  );
};
