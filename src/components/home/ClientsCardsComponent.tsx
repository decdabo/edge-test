import React from "react";
import { StreamStatus } from "@/utils/types";
import { Card, Col, Row, Tag, Tooltip } from "antd";
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
                <p>
                  <span>{streams[0].attributes?.account_name}</span>
                  <br />
                  <Tag color="green">{ streams.filter(stream => stream.attributes.stream_status === 'Running Normal').length } Running Normal</Tag>
                  <Tag color="red">{ streams.filter(stream => stream.attributes.stream_status !== 'Running Normal').length } Have error</Tag>
                </p>
              } 
              bordered={false} 
              className="home-card-stream"
            >
              <div className="scroll-shadows">
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
                  <p className="stream-card-body" key={`${index}-single-stream-status-key-${stream.attributes.stream_url}`}>
                    <Tooltip title={stream.attributes.stream_name}>
                      <span className="stream-card-name">
                      {stream.attributes.stream_name}
                      </span> 
                    </Tooltip>
                      <Tag className="stream-card-tag" color={stream.attributes.stream_status === 'Running Normal' ? 'green' : 'red'}>
                        {stream.attributes.stream_status}
                      </Tag>
                    <Link href={{ pathname: PAGES.STREAM_DETAIL, query: { id: stream.id } }}>View</Link>
                  </p>
                ))
              }
              </div>
            </Card>
          </Col>
        ))
      }
    </Row>
  );
};
