"use client";
import { useEffect, useState } from "react";
import { Divider, message } from "antd";

import { ClientsCardsComponents } from "@/components/home/ClientsCardsComponent";
import { getStreamStatuses } from "@/services/services";
import { GetStreamsStatusesDto, StreamStatus } from "@/utils/types";
import { AuthContextStateTypes, useAuthContext } from "@/context/auth-context";
import { SpinnerComponent } from "@/components/commons/SpinnerComponent";
import { RELOAD_IN_MS } from "@/utils/constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [streamsData, setStreamsData] = useState<StreamStatus[][]>();
  const { state }: AuthContextStateTypes = useAuthContext()

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
      state.token
    ).then((response: GetStreamsStatusesDto) => {
      handleStackStreamsByClient(response.data);
      setIsLoading(false);
    })
    .catch(() => message.error('Error gretting streams data'))

  },[state.token])

  // Here refresh continously
  useEffect(() => {
    const interval = setInterval(() => {
      getStreamStatuses(
        state.token
      ).then((response: GetStreamsStatusesDto) => {
        handleStackStreamsByClient(response.data);
        setIsLoading(false);
      });
      //Here we can set time per ms
    }, RELOAD_IN_MS);
    
    return () => clearInterval(interval)
  }, [state.token]);


  return (
    <div className="page-wrapper">
      <Divider />
      {!isLoading && streamsData && (
        <ClientsCardsComponents streamsData={streamsData ?? []} />
      )}
      {isLoading && (
        <SpinnerComponent height="80%" />
      )}
    </div>
  );
}
