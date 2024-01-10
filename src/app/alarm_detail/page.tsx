'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { StreamDetailComponent } from '@/components/commons/StreamDetailComponent'
import { getAlarmById } from '@/services/services'
import { PAGES } from '@/utils/pages'
import { StreamStatus } from '@/utils/types'
import { useAuthContext } from '@/context/auth-context'

const Page = () => {
  const router = useRouter()
  const { state }: any = useAuthContext();
  const stream_id = useSearchParams().get('id')
  const [ streamData, setStreamData ] = useState<StreamStatus>()

  useEffect(() => {
    if (stream_id) {
      getAlarmById(
        state.token,
        stream_id
      ) 
      .then(response => setStreamData(response))
    } else {
      router.push(PAGES.HOME)
    }
  }, [stream_id, state.token])

  return (
    <div className='bg-grey' style={{ height: '100%', padding: '20px' }}>
      {
        streamData && (
          <StreamDetailComponent streamData={streamData} isStream={false} />
        )
      }
    </div>
  )
}

export default Page;
