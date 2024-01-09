import { PAGES } from "@/utils/pages";
import { StreamStatus } from "@/utils/types";
import { Space, Table, Tag } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface StreamsTableComponentProps {
  streamsData: StreamStatus[];
  isStream?: boolean;
}

interface TableData {
  id: number;
  key: string;
  probe_id: string,
  account_id: number,
  account_name: string,
  stream_id: number,
  stream_name: string,
  stream_status: string,
  stream_test_spent_time: number,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  stream_url: string;
}

export const StreamsTableComponent:React.FC<StreamsTableComponentProps> = ({ streamsData, isStream }) => {
  const [ tableData, setTableData ] = useState<TableData[]>()
  const columns = [
    {
      title: "Stream",
      dataIndex: "stream_name",
      key: "stream_name",
      render: (_: string, { stream_name, id }: { stream_name:string, id: number }) => (
        <>
          {
          isStream ? (
            <Link href={{ pathname: PAGES.STREAM_DETAIL, query: { id } }}>
              {stream_name}
            </Link>
          ) : (
            <Link href={{ pathname: PAGES.ALARM_DETAIL, query: { id } }}>
              {stream_name}
            </Link>
          )
        }
        </>
      ),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      key: "stream_status",
      dataIndex: "stream_status",
      render: (_: any, { stream_status, probe_id }: { stream_status: string, probe_id: string }) => {
        const color = stream_status === 'Running Normal' ? 'green' : 'volcano'

        return (
          <Tag key={probe_id} color={color}>{stream_status}</Tag>
        )
      },
    },
    {
      title: "Last updated",
      key: "updatedAt",
      dataIndex: 'updatedAt',
      render: (date: string) => <span>{new Date(date).toLocaleDateString('es-us',{ day: '2-digit', month: 'short', year: '2-digit' })}</span>
    },
  ];

  useEffect(() => {
    const formatter = streamsData.map((stream, index) => {
      return {
        ...stream.attributes,
        id: stream.id,
        key: `${index}-table-streams-key`
      }
    })

    setTableData(formatter);
  }, [streamsData])

  return <Table columns={columns} dataSource={tableData} />;
};
