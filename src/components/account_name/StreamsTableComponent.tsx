import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AutoComplete, Button, Divider, Input, Table, Tag } from "antd";
import { CSVLink } from 'react-csv';
import { PAGES } from "@/utils/pages";
import { AntDesignColors, StreamStatus } from "@/utils/types";
import { PAGE_SIZE, RUNNING_NORMAL } from "@/utils/constants";


interface StreamsTableComponentProps {
  streamsData: StreamStatus[];
  isStream?: boolean;
}

interface TableData {
  id: number;
  key: string;
  probe_id: string;
  account_id: number;
  account_name: string;
  stream_id: number;
  stream_name: string;
  stream_status: string;
  stream_test_spent_time: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  stream_url: string;
}

function autocompleteDataFormatter(table: StreamStatus[]) {
  return table.map((stream) => ({
    value: stream.attributes.stream_name,
    label: <span>{stream.attributes.stream_name}</span>,
  }));
}

export const StreamsTableComponent: React.FC<StreamsTableComponentProps> = ({
  streamsData,
  isStream,
}) => {
  const [tableData, setTableData] = useState<TableData[]>();
  const [currentTable, setCurrentTable] = useState<TableData[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = [
    {
      title: "Stream",
      dataIndex: "stream_name",
      key: "stream_name",
      render: (
        _: string,
        { stream_name, id }: { stream_name: string; id: number }
      ) => (
        <>
          {isStream ? (
            <Link href={{ pathname: PAGES.STREAM_DETAIL, query: { id } }}>
              {stream_name}
            </Link>
          ) : (
            <Link href={{ pathname: PAGES.ALARM_DETAIL, query: { id } }}>
              {stream_name}
            </Link>
          )}
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
      dataIndex: "stream_status",
      render: (
        _: any,
        { stream_status, probe_id }: { stream_status: string; probe_id: string }
      ) => {
        const color = stream_status === RUNNING_NORMAL ? AntDesignColors.OK : AntDesignColors.ERROR;

        return (
          <Tag key={probe_id} color={color}>
            {stream_status}
          </Tag>
        );
      },
    },
    {
      title: "Last updated",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (date: string) => (
        <span>
          {new Date(date).toLocaleDateString("es-us", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </span>
      ),
    },
  ];

  function handleSearchStream(stream_search: string) {
    if (!stream_search.length) return setCurrentTable(tableData);
    const searchData = tableData?.filter(
      (data) =>
        data.stream_name.toLowerCase().includes(stream_search.toLowerCase())
    );

    setCurrentTable(searchData);
  }

  useEffect(() => {
    const formatter = streamsData.map((stream, index) => {
      return {
        ...stream.attributes,
        id: stream.id,
        key: `${index}-table-streams-key`,
      };
    });

    setTableData(formatter);
    setCurrentTable(formatter);
  }, [streamsData]);

  return (
    <>
      <AutoComplete
        options={autocompleteDataFormatter(streamsData)}
        onSearch={handleSearchStream}
        onSelect={handleSearchStream}
      >
        <Input.Search size="large" placeholder="Search here..." enterButton />
      </AutoComplete>
      <Divider />

      <Table onChange={(page) => setCurrentPage(page.current || 1)} columns={columns} dataSource={currentTable} pagination={PAGE_SIZE} />
      <Divider />
      { (currentTable && currentTable.length > 0) && (
          <CSVLink 
            data={currentTable} 
            filename={
              `${streamsData[0].attributes.account_name}-${isStream ? 'monitoring' : 'alarms'}-page-${currentPage}` 
              }>
            <Button type="primary">Download CSV</Button>
          </CSVLink>
        ) 
      }
    </>
  );
};
