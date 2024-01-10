import { instance } from "./api"
import { GetStreamsStatusesDto, LoginDto, RequestMethod, StreamStatus } from "@/utils/types";

function header(token: string) {
  return {
      Authorization: `Bearer ${token}`
    }
}

export async function login(body: LoginDto) {
  try {
    const response = await instance({
      method: RequestMethod.POST,
      url: '/auth/local',
      data: body
    })

    return response.data;
  } catch (error) {
    throw new Error()
  }
}

export async function getStreamStatuses(token: string): Promise<GetStreamsStatusesDto> {
  try {
    const response = await instance({
      method: RequestMethod.GET,
      url: '/monitoreo-stream-statuses',
      headers: header(token)
    })

    return response.data
  } catch (error) {
    throw new Error()
  }
}

export async function getClientStreams(token: string, account_name: string):Promise<GetStreamsStatusesDto> {
  try {
    const response = await instance({
      method: RequestMethod.GET,
      url: `/monitoreo-stream-statuses?filters[account_name][$eq]=${account_name}`,
      headers: header(token)
    })

    return response.data;
  } catch (error) {
    throw new Error()
  }
}

export async function getClientsAlarms(token: string, account_name: string):Promise<GetStreamsStatusesDto> {
  try {
    const response = await instance({
      method: RequestMethod.GET,
      url: `/monitoreo-stream-alarms?filters[account_name][$eq]=${account_name}`,
      headers: header(token)
    })

    return response.data
  } catch (error) {
    throw new Error()
  }
}

export async function getStreamById(token: string, stream_id: string):Promise<StreamStatus> {
  try {
    const response = await instance({
      method: RequestMethod.GET,
      url: `/monitoreo-stream-statuses/${stream_id}`,
      headers: header(token)
    })

    return response.data.data;
  } catch (error) {
    throw new Error()
  }
}

export async function getAlarmById(token: string, alarm_id: string):Promise<StreamStatus> {
  try {
    const response = await instance({
      method: RequestMethod.GET,
      url: `/monitoreo-stream-alarms/${alarm_id}`,
      headers: header(token)
    })

    return response.data.data
  } catch (error) {
    throw new Error()
  }
}
