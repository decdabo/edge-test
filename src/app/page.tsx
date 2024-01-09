"use client";
import { useEffect, useState } from "react";
import { Divider, Flex, Spin } from "antd";

import { ClientsCardsComponents } from "@/components/home/ClientsCardsComponents";
import { getStreamStatuses } from "@/services/services";
import { GetStreamsStatusesDto, StreamStatus } from "@/utils/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [streamsData, setStreamsData] = useState<StreamStatus[][]>();


  // Function needed for UI adapter
  function handleStackStreamsByClient(streams: StreamStatus[]) {
    const obj: any = {};

    //First let's separate the streams by account_name
    for (let i = 0; i < streams.length; i++) {

      const clientName = streams[i].attributes.account_name;
      if (!obj.hasOwnProperty(clientName)) {
        obj[clientName] = [];
      }
      obj[clientName].push(streams[i]);
    }

    setStreamsData(Object.values(obj));
  }

  // First call printing the home
  useEffect(() => {
    getStreamStatuses(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0NzI2NzkzLCJleHAiOjE3MDczMTg3OTN9.08cdBikBQG1wDhXrbvMpAHRwC-xE9rS4j6jolwA0Xtk"
    ).then((response: GetStreamsStatusesDto) => {
      handleStackStreamsByClient(response.data);
      setIsLoading(false);
    });
  },[])

  // Here refresh continously
  useEffect(() => {
    const interval = setInterval(() => {
      getStreamStatuses(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA0NzI2NzkzLCJleHAiOjE3MDczMTg3OTN9.08cdBikBQG1wDhXrbvMpAHRwC-xE9rS4j6jolwA0Xtk"
      ).then((response: GetStreamsStatusesDto) => {
        handleStackStreamsByClient(response.data);
        setIsLoading(false);
      });
      //Here we can set time per ms
    }, 60000);
    
    return () => clearInterval(interval)
  }, []);


  return (
    <div className="bg-grey" style={{ padding: "20px", height: "100%" }}>
      <Divider />
      {!isLoading && streamsData && (
        <ClientsCardsComponents streamsData={streamsData ?? []} />
      )}
      {isLoading && (
        <Flex align="center" justify="center" style={{ height: "80%" }}>
          <Spin />
        </Flex>
      )}
    </div>
  );
}
