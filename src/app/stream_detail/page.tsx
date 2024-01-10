'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGES } from '@/utils/pages'
import { StreamStatus } from '@/utils/types'
import { StreamDetailComponent } from '@/components/commons/StreamDetailComponent'
import { AuthContextStateTypes, useAuthContext } from '@/context/auth-context'
import { getStreamById } from '@/services/services'
import { message } from 'antd'



const Page = () => {
  const router = useRouter()
  const stream_id = useSearchParams().get('id')
  const { state }: AuthContextStateTypes = useAuthContext();
  const [ streamData, setStreamData ] = useState<StreamStatus>()

  useEffect(() => {
    if (stream_id) {
      getStreamById(
        state.token,
        stream_id
      ) 
      .then(response => setStreamData(response))
      .catch(() => message.error('Error getting stream data'))
    } else {
      router.push(PAGES.HOME)
    }
  }, [stream_id, state.token])

  

  return (
    <div className="page-wrapper">
      {
        streamData && (
          <StreamDetailComponent streamData={streamData} isStream={true} />
        )
      }
    </div>
  )
}

export default Page;
